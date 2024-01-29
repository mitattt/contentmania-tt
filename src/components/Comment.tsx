import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Dots, OperationsModal} from '.';
import {deleteCommentFromServer} from '../api/fetchClient';
import {AppDispatch} from '../store';
import {deleteComment, updateComment} from '../store/slices';
import {TComment} from '../types';
import {PALETTE} from '../utils/PALETTE';

type TProps = {
  comment: TComment;
};

export const Comment: React.FC<TProps> = ({comment}) => {
  const {id, title, postId} = comment;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const inputRef = useRef<TextInput>(null);
  const dispatch: AppDispatch = useDispatch();

  const handleToggleModal = () => {
    setIsModalVisible(prev => !prev);
    setIsEditing(prev => !prev);
  };

  const handleOpenModal = () => {
    setIsModalVisible(prev => !prev);
  };

  const handleCancelPress = () => {
    setNewTitle(title);
    setIsEditing(false);
    setIsModalVisible(false);
  };

  const handleDeletePress = useCallback(() => {
    deleteCommentFromServer(id)
      .then(() => dispatch(deleteComment(id)))
      .catch(error => console.error('Error deleting comment:', error));
  }, [id, dispatch]);

  const handleSavePress = () => {
    dispatch(
      updateComment({commentId: id, comment: {id, postId, title: newTitle}}),
    );
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.actionsContainer}>
        <TextInput
          ref={inputRef}
          style={styles.text}
          value={newTitle}
          editable={isEditing}
          onChangeText={setNewTitle}
        />
        {!isEditing && (
          <TouchableOpacity onPress={handleOpenModal}>
            <Dots />
          </TouchableOpacity>
        )}
      </View>
      {isModalVisible && (
        <OperationsModal
          onDelete={handleDeletePress}
          onEdit={handleToggleModal}
        />
      )}

      {isEditing && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonCancel]}
            onPress={handleCancelPress}>
            <Text style={styles.textCancel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={handleSavePress}>
            <Text style={styles.textSave}>Save changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    backgroundColor: PALETTE.white,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  text: {
    color: PALETTE.black,
    padding: 0,
  },
  data: {
    fontSize: 12,
    color: PALETTE.lightGrey,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 140,
    padding: 12,
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
    textTransform: 'uppercase',
  },
  textSave: {
    color: PALETTE.white,
    textTransform: 'uppercase',
  },
});
