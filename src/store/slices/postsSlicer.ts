import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TPost} from '../../types/TPost';
import {editPostOnServer} from '../../api/fetchClient';

interface PostsState {
  posts: TPost[];
}

const initialState: PostsState = {
  posts: [],
};

export const updatePost = createAsyncThunk<
  TPost,
  {postId: string; post: TPost}
>('posts/updatePost', async ({postId, post}) => {
  const updatedPost = await editPostOnServer(postId, post);
  return updatedPost as TPost;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<TPost[]>) => {
      state.posts = action.payload;
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    addPost: (state, action: PayloadAction<TPost>) => {
      state.posts.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(updatePost.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      const index = state.posts.findIndex(post => post.id === updatedPost.id);
      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    });
  },
});

export const {setPosts, deletePost, addPost} = postsSlice.actions;
export default postsSlice.reducer;
