import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPosts} from '../api/fetchClient';
import {PostsList} from '../components';
import {AppDispatch, RootState} from '../store';
import {setPosts} from '../store/slices';
import {RootStackScreenProps} from '../types';
import {Box} from '../components/Box';
import {PALETTE} from '../utils/PALETTE';

const HomeScreen: React.FC<RootStackScreenProps<'HomeScreen'>> = ({
  navigation,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const {posts} = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        dispatch(setPosts(response));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleAddPost = () => {
    navigation.navigate('NewPostScreen');
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar />
      {posts.length > 0 ? (
        <PostsList />
      ) : (
        <Box title="Create your first post!" />
      )}
      <TouchableOpacity style={styles.button} onPress={handleAddPost}>
        <Text style={styles.buttonText}>Create new post +</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: PALETTE.lightBlue,
  },
  button: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    borderRadius: 100,
    backgroundColor: PALETTE.blue,
    padding: 16,
    elevation: 10,
  },
  buttonText: {
    color: PALETTE.white,
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default HomeScreen;
