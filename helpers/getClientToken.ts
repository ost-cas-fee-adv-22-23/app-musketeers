import { Session } from 'next-auth';

export const getClientToken = (session: Session | null) => session?.token?.accessToken;
