import { OPENAI_API_KEY } from '@constants/openai';
import {
    Configuration as ConfigurationEdge,
    OpenAIApi as OpenAIApiEdge,
} from 'openai-edge';
import { Configuration, ConfigurationParameters, OpenAIApi } from 'openai';

const configs: ConfigurationParameters = {
    apiKey: OPENAI_API_KEY,
};
const configurationEdge = new ConfigurationEdge(configs);

const openAiWithEdge = new OpenAIApiEdge(configurationEdge);

const configuration = new Configuration(configs);

const openAi = new OpenAIApi(configuration);

export { openAiWithEdge, openAi };
