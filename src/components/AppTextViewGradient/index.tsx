import React from 'react';
import TextGradient from '@furkankaya/react-native-linear-text-gradient';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import AppText from '../AppText';
import { ViewStyle } from 'react-native';

interface AppTextViewGradientProps {
    containerStyle?: ViewStyle;
    colorStart?: string | any;
    colorEnd?: string | any;
    textColor?: string | any;
    title?: string | any;
    fontFamily?: string;
    fontSize?:  number;
    textAlign?: string | any;
    textColorStart?: string | any;
    textColorEnd?: string | any;
};

const AppTextViewGradient: React.FC<AppTextViewGradientProps> = ({
    containerStyle,
    colorStart,
    colorEnd,
    textColor,
    title,
    fontFamily,
    fontSize,
    textAlign,
    textColorStart,
    textColorEnd,
}) => {
    return (
        <LinearGradient
            style={[styles.container, containerStyle]}
            colors={[colorStart, colorEnd]}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            {textColor  ? (
                <AppText
                    title={title}
                    fontFamily={fontFamily}
                    fontSize={fontSize}
                    textAlign={textAlign}
                    color={textColor}
                />
            ) : (
                <TextGradient
                    text={title}
                    style={{fontFamily, fontSize, textAlign}}
                    colors={[textColorStart, textColorEnd]}
                    locations={[0, 1]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                />
            )}
        </LinearGradient>
    );
};

export default AppTextViewGradient;
