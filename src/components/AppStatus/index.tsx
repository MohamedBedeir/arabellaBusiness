import React from 'react';
import { TouchableOpacity, ViewStyle, TextStyle, Image, ImageStyle, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import AppText from '../AppText';
import { calcFont } from '../../utils/sizes';
import { FONTS } from '../../utils/theme';

interface AppHeaderProps {
    backgroundColor?: string;
    width?: number;
    height?: number;
    title?: string;
    color?: string;
};

const AppStatus: React.FC<AppHeaderProps> = ({
    backgroundColor,
    width,
    height,
    title,
    color,
}) => (
    <View
        style={[styles.container, {backgroundColor, width, height}]}
    >
        <AppText
            title={title}
            fontSize={calcFont(14)}
            fontFamily={FONTS.medium}
            color={color}
        />
    </View>
);

export default AppStatus;
