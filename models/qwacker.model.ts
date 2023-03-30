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
