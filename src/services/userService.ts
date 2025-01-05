import { fetchApi } from '@/utils/fetcher';
import { TUser } from '@/types/user';

const baseURL = 'https://6779288f482f42b62e908e4a.mockapi.io/';

export const fetchUsersApiCall = async (
  page: string,
  sortBy?: string,
  order?: string,
) => {
  const params = new URLSearchParams('limit=10');
  params.set('page', page);
  if (sortBy && order) {
    params.set('sortBy', sortBy);
    params.set('order', order);
  }
  return await fetchApi<undefined, Array<TUser>>({
    method: 'GET',
    baseURL: baseURL,
    resource: `users?${params.toString()}`,
  });
};
