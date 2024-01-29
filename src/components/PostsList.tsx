import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {TPost} from '../types/TPost';
import {Post} from '../components/Post';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

export const PostsList = () => {
  const {posts} = useSelector((state: RootState) => state.posts);

  const renderItem = ({item}: {item: TPost; index: number}) => (
    <Post post={item} />
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      contentContainerStyle={{gap: 12, paddingBottom: 90}}
      showsVerticalScrollIndicator={false}
      keyExtractor={post => post.id.toString()}
    />
  );
};
