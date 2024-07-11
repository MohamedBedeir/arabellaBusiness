import React from 'react';
import { TouchableOpacity, ViewStyle, TextStyle, Image, ImageStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import AppText from '../AppText';
import { calcFont } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
import { GradientBorderView } from '@good-react-native/gradient-border';
import AppTextGradient from '../AppTextGradient';

interface AppButtonProps {
    colorStart?: string | any;
    colorEnd?: string | any;
    buttonStyle?: ViewStyle | any;
    disabled?: boolean;
    border?: boolean;
    onPress?: () => void;
    icon?: string | any;
    iconStyle?: ImageStyle;
    title?: string;
    fontFamily?: string,
    fontSize?: number,
    textAlign?: string,
    titleColor?: string,
    titleStyle?: TextStyle | any;
};

const AppButtonDefault: React.FC<AppButtonProps> = ({
    colorStart,
    colorEnd,
    buttonStyle,
    disabled,
    border,
    onPress,
    icon,
    iconStyle,
    title,
    fontFamily,
    fontSize,
    textAlign,
    titleColor,
}) => (
    border ? (
        <TouchableOpacity onPress={onPress}>
            <GradientBorderView
                gradientProps={{
                    colors: [COLORS.primaryGradient, COLORS.secondGradient]
                }}
                style={[styles.buttonBorder, buttonStyle]}
            >
                {icon && (
                    <Image
                        source={icon}
                        style={[styles.icon, iconStyle]}
                    />
                )}
                {title && (
                    <AppTextGradient
                        title={title}
                        fontFamily={fontFamily || FONTS.bold}
                        fontSize={fontSize || calcFont(14)}
                        textAlign={textAlign}
                        colorStart={COLORS.primaryGradient}
                        colorEnd={COLORS.secondGradient}
                    />
                )}
            </GradientBorderView>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                style={[styles.button, buttonStyle]}
                colors={[colorStart, colorEnd]}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                
                {icon && (
                    <Image
                        source={icon}
                        style={[styles.icon, iconStyle]}
                    />
                )}
                {title && (
                    <AppText
                        title={title}
                        fontFamily={fontFamily || FONTS.bold}
                        fontSize={fontSize || calcFont(14)}
                        textAlign={textAlign}
                        color={titleColor || COLORS.white}
                    />
                )}
            </LinearGradient>
        </TouchableOpacity>
    )
);

export default AppButtonDefault;
