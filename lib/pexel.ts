import { PEXELS_KEY } from '@constants/image';
import { createClient } from 'pexels';

export const pexelsClient = createClient(PEXELS_KEY);
