import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {editCommentOnServer} from '../../api/fetchClient';
import {TComment} from '../../types';

type TComments = {
  comments: TComment[];
};

const initialState: TComments = {
  comments: [],
};

export const updateComment = createAsyncThunk<
  TComment,
  {commentId: string; comment: TComment}
>('comments/updateComment', async ({commentId, comment}) => {
  const updatedComment = await editCommentOnServer(commentId, comment);
  return updatedComment as TComment;
});

const commentsSlices = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<TComment[]>) {
      state.comments = action.payload;
    },
    addComment(state, action: PayloadAction<TComment>) {
      state.comments.push(action.payload);
    },
    deleteComment(state, action: PayloadAction<string>) {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(updateComment.fulfilled, (state, action) => {
      const {id} = action.payload;
      const index = state.comments.findIndex(comment => comment.id === id);
      if (index !== -1) {
        state.comments[index] = action.payload;
      }
    });
  },
});

export const {setComments, addComment, deleteComment} = commentsSlices.actions;
export default commentsSlices.reducer;
