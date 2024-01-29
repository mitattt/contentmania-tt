import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {PALETTE} from '../utils/PALETTE';

type TProps = {
  title: string;
};

export const Box: React.FC<TProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: PALETTE.black,
  },
});
