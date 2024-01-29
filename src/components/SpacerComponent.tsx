import {View} from 'react-native';
import React from 'react';

export const SpacerComponent = ({value = 4}) => {
  const marginBottom = value * 2;
  return <View style={{marginBottom}} />;
};
