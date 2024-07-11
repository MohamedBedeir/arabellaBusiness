import React from 'react';
import {TextStyle, ViewStyle, TouchableOpacity, Text, Image, ImageSourcePropType, View} from 'react-native';
import styles from './styles';
import AppText from '../AppText';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';

export interface Props {
  onPress: () => void;
  title?: string | undefined;
  placeholder?: string | undefined;
  image?: ImageSourcePropType;
  icon?: ImageSourcePropType;
  containerStyle?: ViewStyle | null;
  styleTitle?: TextStyle | null;
  touchContainerStyle?: ViewStyle | null;
};
export const AppPickerSelect: React.FC<Props> = ({
  containerStyle,
  touchContainerStyle,
  onPress,
  title,
  placeholder,
  image,
  icon,
}) => {
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
      <TouchableOpacity
        style={[styles.touchContainer, touchContainerStyle]}
        onPress={onPress}
      >
        {image && <Image source={image} style={styles.image}/>}
        <AppText
          title={placeholder || title}
          fontSize={calcFont(14)}
          fontFamily={FONTS.medium}
          color={COLORS.textLight}
          width={calcWidth(269)}
          textAlign={'left'}
        />
        <TouchableOpacity onPress={onPress}>
          <Image source={icon} style={styles.icon}/>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
export default AppPickerSelect;
