import React, {useState} from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store';
import {updatePost} from '../store/slices';
import {RootStackScreenProps} from '../types';
import {PALETTE} from '../utils/PALETTE';

const EditPostScreen: React.FC<RootStackScreenProps<'EditPostScreen'>> = ({
  route,
  navigation,
}) => {
  const {post} = route.params;
  const {title, description, id} = post;
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);

  const dispatch: AppDispatch = useDispatch();

  const handleGoHome = () => {
    Keyboard.dismiss();
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeScreen'}],
    });
  };

  const handleSavePress = () => {
    dispatch(
      updatePost({
        postId: id,
        post: {id, title: newTitle, description: newDescription},
      }),
    );
    handleGoHome();
  };

  const handleCancelPress = () => {
    setNewTitle(title);
    setNewDescription(description);
    handleGoHome();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.element}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Enter your title"
            />
          </View>
          <View style={styles.element}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              multiline={true}
              value={newDescription}
              onChangeText={setNewDescription}
              placeholder="Enter your description"
            />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={handleCancelPress}>
              <Text style={styles.textCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonSave]}
              onPress={handleSavePress}>
              <Text style={styles.textSave}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: PALETTE.lightBlue,
    paddingHorizontal: 16,
  },
  container: {
    backgroundColor: PALETTE.white,
    padding: 20,
    borderRadius: 12,
  },
  label: {
    color: PALETTE.black,
    fontSize: 12,
    marginBottom: 12,
  },
  element: {
    marginBottom: 12,
  },
  input: {
    color: PALETTE.black,
    fontWeight: '600',
    fontSize: 18,
    padding: 8,
    borderRadius: 8,
    borderColor: PALETTE.grey,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textTransform: 'capitalize',
  },
  buttonCancel: {
    backgroundColor: PALETTE.white,
    borderColor: PALETTE.blue,
    borderWidth: 1,
  },
  buttonSave: {
    color: PALETTE.white,
    backgroundColor: PALETTE.blue,
  },
  textCancel: {
    color: PALETTE.black,
    textTransform: 'capitalize',
  },
  textSave: {
    color: PALETTE.white,
    textTransform: 'capitalize',
  },
});

export default EditPostScreen;
