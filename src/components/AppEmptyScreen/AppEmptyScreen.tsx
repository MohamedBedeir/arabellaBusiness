import React from 'react';
import { ViewStyle, Image, ImageStyle, View } from 'react-native';
import { styles } from './styles';
import AppText from '../AppText';
import { COLORS, FONTS } from '../../utils/theme';
import AppButtonDefault from '../AppButtonDefault';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';

interface AppEmptyProps {
    containerStyle?: ViewStyle;
    image?: string | any;
    imageStyle?: ImageStyle;
    title?: string;
    fontSize?: number;
    fontFamily?: string;
    textColor?: string;
    textAlign?: string;
    textWidth?: number;
    buttonTitle?: string;
    onPress?: () => void;
};

const AppEmptyScreen: React.FC<AppEmptyProps> = ({
    containerStyle,
    image,
    imageStyle,
    title,
    fontSize,
    fontFamily,
    textColor,
    textAlign,
    textWidth,
    buttonTitle,
    onPress
}) => (
    <View style={[styles.container, containerStyle]}>
        <Image source={image} style={[styles.image, imageStyle]}/>
        <AppText
            title={title}
            fontSize={fontSize || calcFont(22)}
            fontFamily={fontFamily || FONTS.medium}
            color={textColor || COLORS.textDark}
            textAlign={textAlign || 'center'}
            width={textWidth || calcWidth(343)}
            numberOfLines={2}
        />
        {buttonTitle && (
            <AppButtonDefault
                title={buttonTitle}
                onPress={onPress}
                colorStart={COLORS.primaryGradient}
                colorEnd={COLORS.secondGradient}
                buttonStyle={{marginTop: calcHeight(12), width: calcWidth(160)}}
            />
        )}
    </View>
);

export default AppEmptyScreen;
