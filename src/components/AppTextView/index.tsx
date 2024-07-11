import React from 'react';
import TextGradient from '@furkankaya/react-native-linear-text-gradient';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import { View, ViewStyle } from 'react-native';
import AppText from '../AppText';

interface AppTextViewProps {
    containerStyle?: ViewStyle;
    textColor?: string | any;
    title?: string | any;
    fontSize?:  number;
    fontFamily?: string;
    textAlign?: string | any;
    textColorStart?: string | any;
    textColorEnd?: string | any;
};

const AppTextView: React.FC<AppTextViewProps> = ({
    containerStyle,
    textColor,
    title,
    fontFamily,
    fontSize,
    textAlign,
    textColorStart,
    textColorEnd,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
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
        </View>
    );
};

export default AppTextView;
                   