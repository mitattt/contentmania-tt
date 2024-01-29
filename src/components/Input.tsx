import {
  TextInput,
  StyleSheet,
  TextStyle,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {PALETTE} from '../utils/PALETTE';

type TProps = {
  value: string;
  onChangeText: (title: string) => void;
  containerStyles?: TextStyle;
  placeholder?: string;
};

export const Input: React.FC<TProps> = ({
  value,
  onChangeText,
  placeholder,
  containerStyles,
  ...props
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <TextInput
        style={[styles.input, containerStyles]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={PALETTE.grey}
        {...props}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 14,
    width: '100%',
    borderRadius: 100,
    backgroundColor: PALETTE.white,
    flex: 1,
  },
});
