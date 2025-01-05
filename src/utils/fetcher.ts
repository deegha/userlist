interface IFetchApi<TBody> {
  method: 'POST' | 'GET' | 'PUT';
  baseURL: string;
  resource: string;
  body?: TBody;
}
export const fetchApi = async <TBody, TResponse>({
  method,
  body,
  baseURL,
  resource,
}: IFetchApi<TBody>): Promise<TResponse> => {
  const url = baseURL + resource;
  const response = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();
  return data as TResponse;
};
