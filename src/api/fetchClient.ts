import {TComment} from '../types/TComment';
import {TPost} from '../types/TPost';

const BASE_URL = 'http://10.0.2.2:3001';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = {method};
  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }
  const response = await fetch(BASE_URL + url, options);
  return response.json();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};

export const getAllPosts = () => {
  return client.get<TPost[]>('/posts');
};

export const addPostOnServer = (post: TPost) => {
  return client.post('/posts', post);
};

export const editPostOnServer = (postId: string, post: TPost) => {
  return client.patch(`/posts/${postId}`, post);
};

export const deletePostFromServer = (postId: string) => {
  return client.delete(`/posts/${postId}`);
};

export const getPostComments = (postId: string) => {
  return client.get<TComment[]>(`/comments?postId=${postId}`);
};

export const addCommentOnServer = (comment: TComment) => {
  return client.post<TComment[]>('/comments', comment);
};

export const deleteCommentFromServer = (commentId: string) => {
  return client.delete(`/comments/${commentId}`);
};

export const editCommentOnServer = (commentId: string, comment: TComment) => {
  return client.patch(`/comments/${commentId}`, comment);
};
