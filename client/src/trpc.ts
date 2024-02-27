
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../backend/src/trpc/index';
 
export const trpc = createTRPCReact<AppRouter>();