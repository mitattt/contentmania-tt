import React, {useCallback, useEffect, useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  addCommentOnServer,
  deletePostFromServer,
  getPostComments,
} from '../api/fetchClient';
import {
  Dots,
  OperationsModal,
  SpacerComponent,
  Input,
  CommentsList,
} from '../components';
import {AppDispatch} from '../store';
import {addComment, deletePost, setComments} from '../store/slices';
import {RootStackScreenProps} from '../types';
import 'react-native-get-random-values';
import {v4} from 'uuid';
import {PALETTE} from '../utils/PALETTE';

const PostScreen: React.FC<RootStackScreenProps<'PostScreen'>> = ({
  route,
  navigation,
}) => {
  const {post} = route.params;
  const {id, title, description} = post;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');

  const isButtonDisabled = newTitle.length === 0;
  const buttonBackground = isButtonDisabled ? PALETTE.ocean : PALETTE.blue;
  const dispatch: AppDispatch = useDispatch();

  const handleAddComment = useCallback(() => {
    const newId = v4();
    dispatch(addComment({title: newTitle, postId: post.id, id: newId}));
    addCommentOnServer({title: newTitle, postId: post.id, id: newId});
    setNewTitle('');
    Keyboard.dismiss();
  }, [newTitle, post.id]);

  const handleDeletePress = useCallback(() => {
    deletePostFromServer(id);
    dispatch(deletePost(id));
    navigation.goBack();
  }, [id, dispatch, navigation]);

  const handleEditPress = () => {
    navigation.navigate('EditPostScreen', {post});
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostComments(id);
        dispatch(setComments(response));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.postContainer}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <TouchableOpacity
            style={styles.operations}
            onPress={() => setIsModalVisible(prev => !prev)}>
            <Dots />
          </TouchableOpacity>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        {isModalVisible && (
          <OperationsModal
            onDelete={handleDeletePress}
            onEdit={handleEditPress}
          />
        )}
      </View>

      <SpacerComponent value={8} />
      <View>
        <Text style={styles.title}>Comments</Text>
        <SpacerComponent value={4} />
        <View style={styles.inputContainer}>
          <Input
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="Write your comment"
          />
          <TouchableOpacity
            onPress={handleAddComment}
            style={[styles.button, {backgroundColor: buttonBackground}]}
            disabled={isButtonDisabled}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CommentsList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: PALETTE.lightBlue,
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
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: PALETTE.black,
  },
  description: {
    fontSize: 14,
    color: PALETTE.black,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  operations: {
    position: 'relative',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 12,
    height: 50,
    marginBottom: 16,
  },
  button: {
    minWidth: 70,
    padding: 16,
    borderRadius: 100,
  },
  buttonText: {
    textTransform: 'uppercase',
    color: PALETTE.white,
  },
});

export default PostScreen;
