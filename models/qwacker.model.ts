import { UserModel } from './user.model';

export type QwackModel = {
  id: string;
  creator: string;
  text: string;
  mediaUrl: string;
  mediaType: string;
  likeCount: number;
  likedByUser: boolean;
  type: string;
  replyCount: number;
};

export type QwackModelDecorated = QwackModel & {
  creatorData: UserModel;
};

export type QwackerPostsParamModel = {
  token: string;
  limit?: number;
  offset?: number;
  newerThan?: string;
  olderThan?: string;
  creator?: string;
};

export type QwackerSearchParamsModel = {
  text?: string;
  tags?: string[];
  likedBy?: string[];
  mentions?: string[];
  isReply?: boolean;
  offset?: number;
  limit?: number;
};

export type QwackerCreateParamsModel = {
  text?: string;
  image?: string;
};

export type QwackerTokenParamsModel = { token: string; id: string };
