import React, { useState } from 'react';
import {TextStyle, ViewStyle, TouchableOpacity, Text, Image, ImageSourcePropType, TextInput, View, I18nManager} from 'react-native';
import styles from './styles';
import { COLORS, FONTS } from '../../utils/theme';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { IMAGES } from '../../assets/Images';
import { KeyboardType } from 'react-native';
import AppText from '../AppText';

export interface Props {
  containerStyle?: ViewStyle;
  inputContainer?: ViewStyle;
  title?: string | undefined;
  value?: string;
  image?: ImageSourcePropType;
  placeholder?: string;
  keyboardType?: KeyboardType;
  onChangeText: (text: any) => void | undefined;
  onFocus?: () => void;
  onEndEditing?: () => void;
  numberOfLines?: number;
  secret?: boolean;
  maxLength?: number;
  editable?: boolean,
  _textAligne?: boolean;
  inputStyle?: ViewStyle | TextStyle;
  error?: string;
};
export const AppInputPhone: React.FC<Props> = ({
  containerStyle,
  inputContainer,
  title,
  value,
  image,
  placeholder,
  keyboardType,
  onChangeText,
  onFocus,
  onEndEditing,
  numberOfLines,
  secret,
  maxLength,
  editable,
  _textAligne,
  inputStyle,
  error,
}) => {
  const [hidePass, setHidePass] = useState<boolean>(true);
  return (
    <View style={[styles.container, containerStyle]}>
      {title && (
        <AppText
          title={title}
          fontSize={calcFont(14)}
          fontFamily={FONTS.medium}
          color={COLORS.textDark}
          lineHeight={calcHeight(23)}
          textAlign={'left'}
          marginBottom={calcHeight(8)}
        />
      )}
      {I18nManager.isRTL ? (
        <View style={styles.dataContainer}>
          <View style={[styles.inputContainer, inputContainer]}>
            {image && <Image source={image} style={styles.image}/>}
            <TextInput
              value={value}
              placeholder={placeholder}
              keyboardType={keyboardType || "default"}
              onChangeText={onChangeText}
              placeholderTextColor={COLORS.textLight}
              numberOfLines={numberOfLines || 1}
              secureTextEntry={secret && hidePass ? true : false}
              editable={editable}
              onFocus={onFocus}
              onEndEditing={onEndEditing}
              maxLength={maxLength || undefined}
              style={[styles.input, inputStyle, {
                textAlign: _textAligne ? 'left' : I18nManager.isRTL ? 'right' : 'left',
              }]}
            />
          </View>
          <TouchableOpacity style={styles.codeContainer}>
            <AppText title={'+966'} fontSize={calcFont(16)} fontFamily={FONTS.medium} color={COLORS.textLight}/>
            <Image source={IMAGES.languageAr} style={styles.codeIcon}/>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.dataContainer}>
          <TouchableOpacity style={styles.codeContainer}>
            <Image source={IMAGES.languageAr} style={styles.codeIcon}/>
            <AppText title={'+966'} fontSize={calcFont(16)} fontFamily={FONTS.medium} color={COLORS.textLight}/>
          </TouchableOpacity>
          <View style={[styles.inputContainer, inputContainer]}>
            {image && <Image source={image} style={styles.image}/>}
            <TextInput
              value={value}
              placeholder={placeholder}
              keyboardType={keyboardType || "default"}
              onChangeText={onChangeText}
              placeholderTextColor={COLORS.textLight}
              numberOfLines={numberOfLines || 1}
              secureTextEntry={secret && hidePass ? true : false}
              editable={editable}
              onFocus={onFocus}
              onEndEditing={onEndEditing}
              maxLength={maxLength || undefined}
              style={[styles.input, inputStyle, {
                textAlign: _textAligne ? 'left' : I18nManager.isRTL ? 'right' : 'left',
              }]}
            />
          </View>
        </View>
      )}
      {error && (
        <AppText
          title={error} 
          fontSize={calcFont(14)}
          color={COLORS.red}
          fontFamily={FONTS.medium}
        />
      )}
    </View>
  );
};
export default AppInputPhone;
