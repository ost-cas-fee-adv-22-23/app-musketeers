import { Session } from 'next-auth';

export const getClientToken = (session: Session | null) => session?.token?.accessToken;
export const getUserId = (session: Session | null) => session?.token?.user?.id;
