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

interface AppHeaderProps {
    onPress?: () => void;
    icon?: string | any;
    iconStyle?: ImageStyle;
    title?: string;
    logo?: boolean;
};

const AppHeaderDefault: React.FC<AppHeaderProps> = ({
    onPress,
    icon,
    title,
    logo,
}) => (
    <View style={styles.container}>
        <View style={styles.view}>
            <View style={styles.imageView}>
                {icon && (
                    <TouchableOpacity onPress={onPress}>
                        <Image
                            source={IMAGES.back}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                )}
            </View>
            <AppText
                title={title}
                fontSize={calcFont(18)}
                fontFamily={FONTS.bold}
                color={COLORS.textDark}
            />
            <View style={styles.imageView}>
                {logo && (
                    <Image
                        source={IMAGES.logoColors}
                        style={styles.logo}
                    />
                )}
            </View>
        </View>
    </View>
);

export default AppHeaderDefault;
