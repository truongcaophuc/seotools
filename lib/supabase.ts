import { createClient } from '@supabase/supabase-js';

export function supabaseClient() {
    return createClient(
        process.env.SUPABASE_URL || '',
        process.env.SUPABASE_PRIVATE_KEY || ''
    );
}

// const vectorStore = await SupabaseVectorStore.fromTexts(
//     ['Hello world', 'Bye bye', "What's this?"],
//     [{ id: 2 }, { id: 1 }, { id: 3 }],
//     new OpenAIEmbeddings(),
//     {
//         client,
//         tableName: 'documents',
//         queryName: 'match_documents',
//     }
// );

// const resultOne = await vectorStore.similaritySearch('Hello world', 1);
//  console.log(resultOne);
// };
