import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {Dots, OperationsModal} from '.';
import {deletePostFromServer} from '../api/fetchClient';
import {AppDispatch} from '../store';
import {deletePost} from '../store/slices';
import {TPost} from '../types';
import {PALETTE} from '../utils/PALETTE';

type TProps = {
  post: TPost;
};

type RootStackParamList = {
  PostScreen: TProps;
  EditPostScreen: TProps;
};

type EditPostScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const Post: React.FC<TProps> = React.memo(({post}) => {
  const {id, title, description} = post;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const navigation = useNavigation<EditPostScreenNavigationProp>();
  const dispatch: AppDispatch = useDispatch();

  const handleOperationsPress = () => {
    setIsModalVisible(prev => !prev);
  };

  const handleEditPress = () => {
    navigation.navigate('EditPostScreen', {post});
  };

  const handleDeletePress = useCallback(() => {
    deletePostFromServer(id)
      .then(() => dispatch(deletePost(id)))
      .catch(error => console.error('Error deleting comment:', error));
  }, [id, dispatch]);

  const handlePostPress = () => {
    navigation.navigate('PostScreen', {
      post,
    });
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.postContainer} onPress={handlePostPress}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <TouchableOpacity onPress={handleOperationsPress}>
            <Dots />
          </TouchableOpacity>
        </View>
        <Text style={styles.description} numberOfLines={7} ellipsizeMode="tail">
          {description}
        </Text>
        {isModalVisible && (
          <OperationsModal
            onDelete={handleDeletePress}
            onEdit={handleEditPress}
          />
        )}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
  },
  postContainer: {
    position: 'relative',
    padding: 20,
    backgroundColor: PALETTE.white,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: PALETTE.black,
  },
  description: {
    color: PALETTE.black,
    fontSize: 14,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
