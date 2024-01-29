import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {Comment} from './Comment';

export const CommentsList = () => {
  const {comments} = useSelector((state: RootState) => state.comments);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ScrollView>
  );
};
