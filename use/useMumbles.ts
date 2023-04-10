import useSWRMutation from 'swr/mutation';
import { fetchPostsWithUsers } from '../services/qwacker.service';
import { QwackerPostsParamModel } from '../models/qwacker.model';

export const useFetchPostsWithUsers = ({ token, limit, offset, creator }: QwackerPostsParamModel) => {
  const { data, error, trigger } = useSWRMutation(['useFetchPostsWithUsers', token, limit, offset, creator], () =>
    fetchPostsWithUsers({ token, limit, offset, creator })
  );

  return { data, error, trigger };
};
