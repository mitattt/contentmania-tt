import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import 'react-native-get-random-values';
import {v4} from 'uuid';
import {addPostOnServer} from '../api/fetchClient';
import {AppDispatch} from '../store';
import {addPost} from '../store/slices';
import {RootStackScreenProps} from '../types';
import {PALETTE} from '../utils/PALETTE';

const NewPostScreen: React.FC<RootStackScreenProps<'NewPostScreen'>> = ({
  navigation,
}) => {
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');

  const isButtonEnabled = newTitle.length > 0 && newDescription.length > 0;
  const buttonBackground = isButtonEnabled ? PALETTE.blue : PALETTE.lightBlue;

  const dispatch: AppDispatch = useDispatch();

  const handlePressSave = () => {
    const newId = v4();
    dispatch(
      addPost({title: newTitle, description: newDescription, id: newId}),
    );
    addPostOnServer({title: newTitle, description: newDescription, id: newId});
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.element}>
          <Text style={styles.text}>Title</Text>
          <View style={styles.titleContainer}>
            <TextInput
              style={styles.title}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Write the title for your post"
            />
          </View>
        </View>
        <View style={styles.element}>
          <Text style={styles.text}>Description</Text>
          <View style={styles.titleContainer}>
            <TextInput
              multiline={true}
              style={styles.description}
              value={newDescription}
              onChangeText={setNewDescription}
              placeholder="What do you want to say?"
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonCancel]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.textCancel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonSave,
              {backgroundColor: buttonBackground},
            ]}
            onPress={handlePressSave}
            disabled={!isButtonEnabled}>
            <Text style={styles.textSave}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
  text: {
    color: PALETTE.black,
    fontSize: 12,
    marginBottom: 12,
  },
  element: {
    marginBottom: 12,
  },
  title: {
    color: PALETTE.black,
  },
  titleContainer: {
    padding: 16,
  },
  description: {
    color: PALETTE.black,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 140,
    padding: 16,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
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

export default NewPostScreen;
