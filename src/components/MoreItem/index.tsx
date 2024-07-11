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
    containerStyle?: ViewStyle;
    onPress?: () => void;
    image?: string | any;
    title?: string;
    icon?: string | any;
    iconStyle?: ImageStyle;
};

const MoreItem: React.FC<AppHeaderProps> = ({
    containerStyle,
    onPress,
    image,
    title,
    icon,
    iconStyle,
}) => (
    <View style={[styles.container, containerStyle]}>
        <TouchableOpacity
            style={styles.bodyContainer}
            onPress={onPress}
        >
        <View style={styles.dataContainer}>
            <Image
                source={image}
                style={styles.image}
            />
            <AppText
                title={title}
                fontSize={calcFont(17)}
                fontFamily={FONTS.bold}
                color={COLORS.textDark}
            />
        </View>
        <Image
            source={icon}
            style={[styles.icon, iconStyle]}
        />
    </TouchableOpacity>
    </View>
);

export default MoreItem;
