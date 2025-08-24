import { Prisma } from '@prisma/client';
import { middleware } from '@share/graphql/middleware';
import { CallbackManager } from 'langchain/callbacks';
import { ChatVectorDBQAChain, LLMChain, loadQAChain } from 'langchain/chains';
import { geminiAPI } from '@lib/gemini';
import { OpenAI } from 'langchain/llms';
import { PromptTemplate } from 'langchain/prompts';
import { SupabaseVectorStore } from 'langchain/vectorstores';
import {
    arg,
    idArg,
    inputObjectType,
    list,
    mutationField,
    nullable,
    objectType,
    queryField,
    stringArg,
} from 'nexus';
import pdf from 'pdf-parse';

const ConversationsRepsonse = objectType({
    name: 'ConversationsRepsonse',
    definition(t) {
        t.field({
            name: 'data',
            type: list('Conversation'),
        });
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
    },
});

const ConversationsInputType = inputObjectType({
    name: 'ConversationsInputType',
    definition(t) {
        t.nullable.field({
            name: 'type',
            type: 'ConversationType',
        });
        t.nullable.int('page');
        t.nullable.int('perPage');
    },
});

export const ConversationsQuery = queryField('conversations', {
    type: ConversationsRepsonse,
    authorize: (_, __, context) => middleware.auth(context),
    args: { input: arg({ type: ConversationsInputType }) },
    async resolve(
        _,
        { input: { perPage = 15, page = 1, type = 'Chat' } },
        { prisma, project }
    ) {
        if (!project) {
            return {
                data: [],
                pagination: {
                    total: 0,
                    perPage,
                    page,
                },
            };
        }

        const where: Prisma.ConversationWhereInput = {
            projectId: project.id,
            type,
        };

        const data = await prisma.conversation.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            where,
        });

        const total = await prisma.conversation.count({
            where,
        });

        return {
            data,
            pagination: {
                page,
                perPage,
                total,
            },
        };
    },
});

export const ConversationQuery = queryField('conversation', {
    type: nullable('Conversation'),
    authorize: (_, __, context) => middleware.auth(context),
    args: { conversationId: idArg() },
    resolve(_, { conversationId }, { prisma }) {
        return prisma.conversation.findFirst({
            where: { id: conversationId },
        });
    },
});

const ListMessageConversationResponse = objectType({
    name: 'ListMessageConversationResponse',
    definition(t) {
        t.field({
            name: 'data',
            type: list('ConversationItem'),
        });
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
    },
});

const ListMessageConversationInputType = inputObjectType({
    name: 'ListMessageConversationInputType',
    definition(t) {
        t.nullable.id('conversationId');
        t.nullable.int('page');
        t.nullable.int('perPage');
    },
});

export const ListMessageConversation = queryField('listMessageConversation', {
    type: ListMessageConversationResponse,
    authorize: (_, __, context) => middleware.auth(context),
    args: { input: arg({ type: ListMessageConversationInputType }) },
    async resolve(
        _,
        { input: { conversationId, page = 1, perPage = 100 } },
        { prisma }
    ) {
        if (!conversationId) {
            return {
                data: [],
                pagination: {
                    total: 0,
                    perPage,
                    page,
                },
            };
        }

        let where: Prisma.ConversationItemWhereInput = {
            conversationId,
        };

        const data = await prisma.conversationItem.findMany({
            // skip: perPage * (page - 1),
            // take: perPage,
            // orderBy: { createdAt: 'desc' },
            where,
        });

        const total = await prisma.conversationItem.count({
            where,
        });

        return {
            data,
            pagination: {
                page,
                perPage,
                total,
            },
        };
    },
});

export const ConversationDefault = queryField('conversationDefault', {
    type: nullable('Conversation'),
    authorize: (_, __, context) => middleware.auth(context),
    args: { projectId: idArg() },
    async resolve(_, { projectId }, { prisma, project, user }) {
        const conversationDefault = await prisma.conversation.findFirst({
            where: {
                projectId,
                isDefault: true,
            },
        });

        if (!conversationDefault) {
            const newConversationDefault = await prisma.conversation.create({
                data: {
                    projectId: project?.id,
                    title: 'Default',
                    isDefault: true,
                    createdById: user?.id,
                },
            });

            return newConversationDefault;
        }

        return conversationDefault;
    },
});

const CONDENSE_PROMPT =
    PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.
Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`);

const QA_PROMPT = PromptTemplate.fromTemplate(
    `You are an AI assistant providing helpful advice. You are given the following extracted parts of a long document and a question. Provide a conversational answer based on the context provided.
You should only provide hyperlinks that reference the context below. Do NOT make up hyperlinks.
If you can't find the answer in the context below, just say "Hmm, I'm not sure." Don't try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
Question: {question}
=========
{context}
=========
Answer in Markdown:`
);

export const makeChain = (
    vectorstore: SupabaseVectorStore,
    onTokenStream?: (token: string) => void
) => {
    const questionGenerator = new LLMChain({
        llm: new OpenAI({ temperature: 0 }),
        prompt: CONDENSE_PROMPT,
    });

    console.log({ questionGenerator });

    const docChain = loadQAChain(
        new OpenAI({
            temperature: 0,
            streaming: Boolean(onTokenStream),
            callbackManager: onTokenStream
                ? CallbackManager.fromHandlers({
                      async handleLLMNewToken(token) {
                          onTokenStream(token);
                      },
                  })
                : undefined,
        }),
        { prompt: QA_PROMPT }
    );

    return new ChatVectorDBQAChain({
        vectorstore,
        combineDocumentsChain: docChain,
        questionGeneratorChain: questionGenerator,
        returnSourceDocuments: true,
        k: 2, //number of source documents to return
    });
};
