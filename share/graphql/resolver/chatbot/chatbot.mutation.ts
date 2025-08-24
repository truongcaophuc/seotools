import { middleware } from '@share/graphql/middleware';
import { formatUrlImage } from '@share/helps/format-url-image';
import {
    arg,
    idArg,
    inputObjectType,
    list,
    mutationField,
    nonNull,
    nullable,
    objectType,
    queryField,
    stringArg,
} from 'nexus';

import { OPENAI_API_KEY, GEMINI_API_KEY } from '@constants/openai';
import { supabaseClient } from '@lib/supabase';
import { encode } from 'gpt-3-encoder';
import { Document } from 'langchain/document';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { SupabaseVectorStore } from 'langchain/vectorstores';
import { geminiAPI } from '@lib/gemini';
import pdf from 'pdf-parse';

import { getTotalTokenDoc } from '@share/helps/token-document';
import { loadQAStuffChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms';
import stripIndent from 'strip-indent';

const ConversationItemInputType = inputObjectType({
    name: 'ConversationItemInputType',
    definition(t) {
        t.nonNull.string('message');
        t.nullable.id('createdById');
        t.nullable.id('conversationId');
    },
});

const AddConversationInputType = inputObjectType({
    name: 'AddConversationInputType',
    definition(t) {
        t.nonNull.string('title');
        t.field({
            name: 'items',
            type: list(ConversationItemInputType),
        });
    },
});

export const AddConversation = mutationField('addConversation', {
    type: nullable('Conversation'),
    authorize: (_, __, context) => middleware.auth(context),
    args: { input: arg({ type: AddConversationInputType }) },
    async resolve(_, { input: { title, items } }, { prisma, user, project }) {
        const conversation = await prisma.conversation.create({
            data: {
                title,
                projectId: project?.id,
                createdById: user?.id,
            },
        });

        if (items && items.length > 0) {
            await prisma.conversationItem.createMany({
                data: items.map((item) => ({
                    conversationId: conversation?.id,
                    message: item.message,
                    createdById: item.createdById,
                })),
            });
        }

        return conversation;
    },
});

const UpdateConversationInputType = inputObjectType({
    name: 'UpdateConversationInputType',
    definition(t) {
        t.nonNull.string('title');
        t.nonNull.id('id');
    },
});

export const UpdateConversation = mutationField('updateConversation', {
    type: nullable('Conversation'),
    authorize: (_, __, context) => middleware.auth(context),
    args: { input: arg({ type: UpdateConversationInputType }) },
    resolve(_, { input: { title, id } }, { prisma }) {
        return prisma.conversation.update({
            where: { id },
            data: { title },
        });
    },
});

export const DeleteConversation = mutationField('deleteConversation', {
    type: 'Boolean',
    authorize: (_, __, context) => middleware.auth(context),
    args: { conversationId: idArg() },
    async resolve(_, { conversationId }, { prisma }) {
        const deleteConversation = prisma.conversation.delete({
            where: { id: conversationId },
        });
        const deleteMessages = prisma.conversationItem.deleteMany({
            where: { conversationId },
        });

        await prisma.$transaction([deleteConversation, deleteMessages]);
        return true;
    },
});

export const AddMessageInConversation = mutationField(
    'addMessageInConversation',
    {
        type: nullable('ConversationItem'),
        authorize: (_, __, context) => middleware.auth(context),
        args: { input: arg({ type: ConversationItemInputType }) },
        resolve(_, { input }, { prisma }) {
            return prisma.conversationItem.create({
                data: {
                    conversationId: input.conversationId as string,
                    createdById: input.createdById,
                    message: input.message,
                },
            });
        },
    }
);

export const DeleteMessageInConversation = mutationField(
    'deleteMessageInConversation',
    {
        type: 'Boolean',
        authorize: (_, __, context) => middleware.auth(context),
        args: { messageId: nonNull(idArg()) },
        async resolve(_, { messageId }, { prisma }) {
            await prisma.conversationItem.delete({
                where: {
                    id: messageId,
                },
            });
            return true;
        },
    }
);

export const EmbeddedDocument3 = mutationField('embeddedDocument3', {
    type: 'Boolean',
    args: { documentId: idArg() },
    async resolve(_, { documentId }, { prisma }) {
        try {
            // console.log({ documentId });
            const document = await prisma.image.findFirst({
                where: { id: documentId },
            });

            if (!document) return false;

            const urlFile = `tandao/${document.url}`;
            const url = `${formatUrlImage(urlFile)}`;

            const responseBlob = await fetch(url);

            const buffer = await responseBlob
                .arrayBuffer()
                .then((ab) => Buffer.from(ab));

            const metadata = { source: 'blob', blobType: responseBlob.type };
            const parsed = await pdf(buffer);

            const rawDocs = [
                new Document({
                    pageContent: parsed.text,
                    metadata: {
                        ...metadata,
                        pdf_numpages: parsed.numpages,
                        source: document?.id.toString(),
                    },
                }),
            ];

            const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
            });

            const docs = await textSplitter.splitDocuments(rawDocs);
            // console.log('split docs', docs);

            // const pinecone = await initPinecone();

            // const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

            // console.log({ pineconeIndex });

            // await PineconeStore.fromDocuments(
            //     docs,
            //     new OpenAIEmbeddings({
            //         modelName: 'text-embedding-ada-002',
            //         openAIApiKey: OPENAI_API_KEY,
            //     }),
            //     {
            //         pineconeIndex,
            //     }
            // );

            const client = supabaseClient();

            // await SupabaseVectorStore.fromDocuments(
            //     docs,
            //     new OpenAIEmbeddings({
            //         modelName: 'text-embedding-ada-002',
            //         openAIApiKey: OPENAI_API_KEY,
            //     }),
            //     {
            //         client,
            //         tableName: 'documents',
            //         queryName: 'match_documents',
            //     }
            // );

            const embeddings = new OpenAIEmbeddings({
                modelName: 'text-embedding-ada-002',
                openAIApiKey: OPENAI_API_KEY,
            });

            const chunkSize = 100;
            for (let i = 0; i < docs.length; i += chunkSize) {
                const chunk = docs.slice(i, i + chunkSize);
                console.log('chunk', i, chunk);
                // await PineconeStore.fromDocuments(chunk, embeddings, {
                //     pineconeIndex: pineconeIndex,
                //     namespace: PINECONE_NAME_SPACE,
                //     textKey: 'text',
                // });

                await SupabaseVectorStore.fromDocuments(
                    docs,
                    new OpenAIEmbeddings({
                        modelName: 'text-embedding-ada-002',
                        openAIApiKey: OPENAI_API_KEY,
                    }),
                    {
                        client,
                        tableName: 'documents',
                        queryName: 'match_documents',
                    }
                );
            }

            return true;
        } catch (error) {
            console.log(error);
        }
    },
});

// Using Gemini API instead of OpenAI for chat completions
// Keep OpenAI for embeddings as Gemini doesn't have embedding API yet

export const EmbeddedDocument1 = mutationField('embeddedDocument1', {
    type: 'Boolean',
    args: { documentId: idArg() },
    async resolve(_, { documentId }, { prisma }) {
        try {
            const document = await prisma.image.findFirst({
                where: { id: documentId },
            });

            if (!document) return false;

            const urlFile = `tandao/${document.url}`;
            const url = `${formatUrlImage(urlFile)}`;

            const responseBlob = await fetch(url);

            const buffer = await responseBlob
                .arrayBuffer()
                .then((ab) => Buffer.from(ab));

            const metadata = { source: 'blob', blobType: responseBlob.type };
            const parsed = await pdf(buffer);

            const rawDocs = [
                new Document({
                    pageContent: parsed.text,
                    metadata: {
                        ...metadata,
                        pdf_numpages: parsed.numpages,
                        source: document?.id.toString(),
                    },
                }),
            ];

            const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
            });

            const docs = await textSplitter.splitDocuments(rawDocs);
            // console.log('split docs', docs);

            for (const doc of docs) {
                console.log(doc.pageContent);
                // OpenAI recommends replacing newlines with spaces for best results
                const input = doc.pageContent.replace(/\n/g, ' ');

                // Note: Using OpenAI for embeddings as Gemini doesn't have embedding API
                const response = await fetch('https://api.openai.com/v1/embeddings', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'text-embedding-ada-002',
                        input,
                    }),
                });
                const embeddingResponse = await response.json();

                const [{ embedding }] = embeddingResponse.data;

                const client = supabaseClient();

                // In production we should handle possible errors
                await client.from('documents').insert({
                    content: doc.pageContent,
                    embedding,
                    document_id: document.id,
                });
            }

            return true;
        } catch (error) {
            console.log(error);
        }
    },
});

export const EmbeddedDocument = mutationField('embeddedDocument', {
    type: 'Boolean',
    args: { documentId: idArg() },
    async resolve(
        _,
        { documentId },
        { prisma, workspace, user, project, setting }
    ) {
        try {
            const documentRes = await prisma.image.findFirst({
                where: { id: documentId },
            });

            if (!documentRes) return false;

            const urlFile = `${workspace?.bucket}/${documentRes.url}`;
            const url = `${formatUrlImage(urlFile)}`;

            const responseBlob = await fetch(url);

            const buffer = await responseBlob
                .arrayBuffer()
                .then((ab) => Buffer.from(ab));

            const metadata = { source: 'blob', blobType: responseBlob.type };
            const parsed = await pdf(buffer);

            const content = (parsed.text as string).replaceAll(
                /[\x00-\x1F]+/gi,
                ''
            );

            const totalToken = getTotalTokenDoc(content);
            const totalPrice = totalToken * setting?.priceToken;
            const balance = workspace?.balance;

            if (totalPrice > balance) {
                console.log('Không đủ balance');
                return false;
            }

            const rawDocs = [
                new Document({
                    pageContent: content,
                    metadata: {
                        ...metadata,
                        pdf_numpages: parsed.numpages,
                        document_id: documentRes.id.toString(),
                    },
                }),
            ];

            const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
            });

            const docs = await textSplitter.splitDocuments(rawDocs);
            const client = supabaseClient();

            const chunkSize = 100;

            for (let i = 0; i < docs.length; i += chunkSize) {
                const chunk = docs.slice(i, i + chunkSize);

                await SupabaseVectorStore.fromDocuments(
                    chunk,
                    new OpenAIEmbeddings({
                        modelName: 'text-embedding-ada-002',
                        openAIApiKey: OPENAI_API_KEY,
                    }),
                    {
                        client,
                        tableName: 'documents',
                        queryName: 'match_documents',
                    }
                );
            }

            const updateBalanceWorkspace = prisma.workspace.update({
                where: { id: workspace.id },
                data: { balance: balance - totalPrice },
            });

            const createNewConversation = prisma.conversation.create({
                data: {
                    type: 'Research',
                    createdById: user.id,
                    projectId: project.id,
                    title: documentRes.name || documentRes.url,
                    docId: documentId,
                },
            });

            const updateDocEmbedded = prisma.image.update({
                where: { id: documentRes.id },
                data: {
                    isEmbedded: true,
                },
            });

            await prisma.$transaction([
                updateBalanceWorkspace,
                createNewConversation,
                updateDocEmbedded,
            ]);

            return true;
        } catch (error) {
            console.log(error);
        }
    },
});

export const TestSupabase = queryField('testSupabase', {
    type: 'Boolean',
    async resolve() {
        const client = supabaseClient();
        // const { data, error } = await client.rpc('create_table_cp', {
        //     t_name: 'hello',
        // });

        const { data, error } = await client
            .from('documents')
            .select()
            .textSearch('content', 'React');
        // .textSearch('metadata->source', '6422d54a03ffdae8fb5b8777');
        // .eq('metadata->source', ');

        console.log({ data, error });
        return true;
    },
});

export const CreateTableSupabase = mutationField('createTableSupabase', {
    type: 'Boolean',
    async resolve() {
        const client = supabaseClient();
        const table = client.from('6422d54a03ffdae8fb5b8777');

        return true;
    },
});

export const ReSearchDocument1 = queryField('researchDocument1', {
    type: 'String',
    args: { question: stringArg() },
    async resolve(_, { question }, {}) {
        const client = supabaseClient();

        // const vectorstore = await SupabaseVectorStore.fromExistingIndex(
        //     new OpenAIEmbeddings({
        //         modelName: 'text-embedding-ada-002',
        //         openAIApiKey: OPENAI_API_KEY,
        //     }),
        //     {
        //         client,
        //         tableName: 'documents',
        //         queryName: 'match_documents',
        //     }
        // );

        // console.log({ vectorstore });

        // const model = new OpenAI({
        //     modelName: 'gpt-3.5-turbo',
        //     openAIApiKey: OPENAI_API_KEY,
        // });

        // const chain = ConversationalRetrievalQAChain.fromLLM(
        //     model,
        //     vectorstore.asRetriever(),
        //     {
        //         returnSourceDocuments: true,
        //     }
        // );
        // /* Ask it a question */
        // const res = await chain.call({ question, chat_history: [] });
        // console.log(res);
        // // /* Ask it a follow up question */
        // // const chatHistory = question + res.text;
        // // const followUpRes = await chain.call({
        // //     question: 'Was that nice?',
        // //     chat_history: chatHistory,
        // // });

        // // console.log({ vectorStore });

        // return res.text;

        // const embeddings = new OpenAIEmbeddings();

        // const res = await embeddings.embedQuery('Reactjs');

        // Note: Using OpenAI for embeddings as Gemini doesn't have embedding API
        const response = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'text-embedding-ada-002',
                input: question.replace(/\n/g, ' '),
            }),
        });
        const embeddingResponse = await response.json();
        const [{ embedding }] = embeddingResponse.data;

        // const { data, error } = await client.rpc('match_documents1', {
        //     query_embedding: embedding,
        //     similarity_threshold: 0.78, // Choose an appropriate threshold for your data
        //     match_count: 10, // Choose the number of matches
        //     doc_id: '6422d54a03ffdae8fb5b8777',
        // });

        const { data, error } = await client
            //     .from('documents')
            //     .select('*')
            //     .eq('embedding', embedding);
            // .eq('document_id', '6422d54a03ffdae8fb5b8777');
            .rpc('match_documents', {
                query_embedding: embedding,
                similarity_threshold: 0.78, // Choose an appropriate threshold for your data
                match_count: 10, // Choose the number of matches
                doc_id: '642272e6eaf375123a68801e',
            });

        console.log({ data, error });

        const llmA = new OpenAI({});
        const chainA = loadQAStuffChain(llmA);

        const docs = data.map(
            (item) => new Document({ pageContent: item.content })
        );

        const resA = await chainA.call({
            input_documents: docs,
            question,
        });

        console.log({ resA });

        // const embedding = new OpenAIEmbeddings({
        //     modelName: 'text-embedding-ada-002',
        //     openAIApiKey: OPENAI_API_KEY,
        // });

        // const { data: documents } = await client.rpc('match_documents', {
        //     query_embedding: embedding,
        //     match_threshold: 0.78, // Choose an appropriate threshold for your data
        //     match_count: 10, // Choose the number of matches
        // });

        // console.log({ documents });

        return 'dasd';
    },
});

const ReSearchDocumentInputType = inputObjectType({
    name: 'ReSearchDocumentInputType',
    definition(t) {
        t.string('question');
        t.id('documentId');
    },
});

export const ReSearchDocument = mutationField('reSearchDocument', {
    type: 'String',
    args: { input: arg({ type: ReSearchDocumentInputType }) },
    async resolve(_, { input: { question, documentId } }, { prisma }) {
        const documentRes = await prisma.image.findFirst({
            where: { id: documentId },
        });

        if (!documentRes) return 'Not found document';

        const client = supabaseClient();

        // Note: Using OpenAI for embeddings as Gemini doesn't have embedding API
        const response = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'text-embedding-ada-002',
                input: question,
            }),
        });
        const embeddingResponse = await response.json();
        const [{ embedding }] = embeddingResponse.data;

        const { data, error } = await client.rpc('match_documents', {
            query_embedding: embedding,
            similarity_threshold: 0.78, // Choose an appropriate threshold for your data
            match_count: 10, // Choose the number of matches
            doc_id: documentId,
        });

        let tokenCount = 0;
        let contextText = '';
        for (let i = 0; i < data.length; i++) {
            const item = data[i];

            const text = item.content;

            const encoded = encode(text);

            tokenCount += encoded.length;
            if (tokenCount > 1500) {
                break;
            }

            contextText += `${text.trim()}\n---\n`;
        }

        const prompt = stripIndent(`{oneLine}
        You are a very enthusiastic Supabase representative who loves
        to help people! Given the following sections from the Supabase
        documentation, answer the question using only that information,
        outputted in markdown format. If you are unsure and the answer
        is not explicitly written in the documentation, say
        "Sorry, I don't know how to help with that."}
    
        Context sections:
        ${contextText}
    
        Answer as markdown (including related code snippets if available):
      `);

        const completion = await geminiAPI.createChatCompletion({
            messages: [{ role: 'user', content: 'Hello world' }],
            temperature: 0.7,
            maxTokens: 1000,
        });

        const message = completion.data.choices[0]?.message;
        return message?.content || '';

        // console.log({ data, error });

        // const llmB = new OpenAI({
        //     modelName: 'gpt-3.5-turbo',
        //     maxConcurrency: 10,
        //     streaming: true,
        //     callbackManager: CallbackManager.fromHandlers({
        //         async handleLLMNewToken(token: string) {},
        //     }),
        // });

        // const chainB = loadQAMapReduceChain(llmB);

        // const resB = await chainB.call({
        //     input_documents: data.map((item) => ({
        //         ...item,
        //         pageContent: item.content,
        //     })),
        //     question,
        // });

        // console.log({ resB });

        // return resB.text;
    },
});

const GetTotalTokenDocResponseData = objectType({
    name: 'GetTotalTokenDocResponseData',
    definition(t) {
        t.int('totalToken');
        t.float('totalPrice');
    },
});

export const GetTotalTokenDoc = mutationField('getTotalTokenDoc', {
    type: GetTotalTokenDocResponseData,
    args: { url: stringArg() },
    async resolve(_, { url }, { setting }) {
        const responseBlob = await fetch(url);

        const buffer = await responseBlob
            .arrayBuffer()
            .then((ab) => Buffer.from(ab));

        const parsed = await pdf(buffer);

        const encoded = encode(parsed.text);

        const totalToken = encoded.length;
        const totalPrice = totalToken * setting.priceToken;

        return {
            totalPrice,
            totalToken,
        };
    },
});
