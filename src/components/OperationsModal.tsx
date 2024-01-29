import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {EditIcon} from './Icons/EditIcon';
import {DeleteIcon} from './Icons/DeleteIcon';
import {PALETTE} from '../utils/PALETTE';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export const OperationsModal: React.FC<Props> = ({onEdit, onDelete}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.element} onPress={onEdit}>
        <Text style={styles.title}>Edit</Text>
        <EditIcon />
      </TouchableOpacity>
      <TouchableOpacity style={styles.element} onPress={onDelete}>
        <Text style={styles.redTitle}>Delete</Text>
        <DeleteIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: PALETTE.white,
    elevation: 5,
    borderRadius: 8,
    padding: 12,
  },
  element: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  title: {
    color: PALETTE.black,
  },
  redTitle: {
    color: PALETTE.red,
  },
});
