import React from 'react';
import { TouchableOpacity, ViewStyle, TextStyle, Image, ImageStyle, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import AppText from '../AppText';
import { calcFont } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
import { GradientBorderView } from '@good-react-native/gradient-border';
import AppTextGradient from '../AppTextGradient';
import { IMAGES } from '../../assets/Images';

interface LogOutItemProps {
    containerStyle?: ViewStyle;
    onPress?: () => void;
    image?: string | any;
    title?: string;
};

const LogOutItem: React.FC<LogOutItemProps> = ({
    containerStyle,
    onPress,
    image,
    title,
}) => (
    <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={onPress}
    >
        <AppText
            title={title}
            fontSize={calcFont(14)}
            fontFamily={FONTS.bold}
            color={COLORS.red}
        />
        <Image
            source={image}
            style={styles.image}
        />
    </TouchableOpacity>
);

export default LogOutItem;
