import { fetchApi } from '@/utils/fetcher';
import { TUser, TUserCreate } from '@/types/user';

//in a production app this base url can be moved to a env file or have a separate config to generate that
const baseURL = 'https://6779288f482f42b62e908e4a.mockapi.io/';

export const fetchUsersApiCall = async (
  page: string,
  sortBy?: string,
  order?: string,
  searchQuery?: string,
) => {
  const params = new URLSearchParams('limit=10');
  params.set('page', page);
  if (sortBy && order) {
    params.set('sortBy', sortBy);
    params.set('order', order);
  }

  if (searchQuery) {
    params.set('search', searchQuery);
  }

  return await fetchApi<undefined, Array<TUser> | 'Not found'>({
    method: 'GET',
    baseURL: baseURL,
    resource: `users?${params.toString()}`,
  });
};

export const fetchAllUsersApiCall = async () => {
  return await fetchApi<undefined, Array<TUser> | 'Not found'>({
    method: 'GET',
    baseURL: baseURL,
    resource: `users`,
  });
};

export const createUserApiCall = async (user: TUserCreate) => {
  console.log('Creating user', user);

  return await fetchApi<TUserCreate, boolean>({
    method: 'POST',
    baseURL: baseURL,
    resource: 'users',
    body: user,
  });
};

export const updateUserApiCall = async (user: TUserCreate, id: string) => {
  console.log('Updating user', user);

  return await fetchApi<TUserCreate, boolean>({
    method: 'PUT',
    baseURL: baseURL,
    resource: `users/${id}`,
    body: user,
  });
};

export const fetchSingleUserApiCall = async (id: string) => {
  console.log('Fetching user', id);

  return await fetchApi<undefined, TUser>({
    method: 'GET',
    baseURL: baseURL,
    resource: `users/${id}`,
  });
};
