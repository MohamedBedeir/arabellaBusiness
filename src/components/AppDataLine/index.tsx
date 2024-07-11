import React from 'react';
import { ViewStyle, Image, ImageStyle, View } from 'react-native';
import { styles } from './styles';
import AppText from '../AppText';
import { COLORS } from '../../utils/theme';
import AppTextGradient from '../AppTextGradient';

interface AppDataLineProps {
    containerStyle?: ViewStyle;
    image?: string | any;
    imageStyle?: ImageStyle;
    title?: string;
    fontSize?: number;
    fontFamily?: string;
    textColor?: string;
    textAlign?: string;
    textWidth?: number;
};

const AppDataLine: React.FC<AppDataLineProps> = ({
    containerStyle,
    image,
    imageStyle,
    title,
    fontSize,
    fontFamily,
    textColor,
    textAlign,
    textWidth,
}) => (
    <View style={[styles.container, containerStyle]}>
        <Image source={image} style={[styles.image, imageStyle]}/>
        {textColor ? (
            <AppText
                title={title}
                fontSize={fontSize}
                fontFamily={fontFamily}
                color={textColor}
                textAlign={textAlign}
                width={textWidth}
            />
        ) : (
            <AppTextGradient
                title={title}
                fontSize={fontSize}
                fontFamily={fontFamily}
                colorStart={COLORS.primaryGradient}
                colorEnd={COLORS.secondGradient}
                textAlign={textAlign}
            />
        )}
        
    </View>
);

export default AppDataLine;
