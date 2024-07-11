import {StyleSheet} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Image} from 'react-native';
import { IMAGES } from '../../assets/Images';
export const AppBackgroundImage = () => {
  console.log('---AppBackgroundImage---');
  
  return (
    <Image
      source={IMAGES.definition3}
      style={[styles.img, StyleSheet.absoluteFillObject]}
    />
  );
};
