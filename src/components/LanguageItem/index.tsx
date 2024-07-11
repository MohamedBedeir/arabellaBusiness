import React from 'react';
import { TouchableOpacity, ViewStyle, Image, View, ImageBackground } from 'react-native';
import { styles } from './styles';
import { calcFont } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
import { IMAGES } from '../../assets/Images';
import LinearGradient from 'react-native-linear-gradient';
import AppTextGradient from '../AppTextGradient';
import AppText from '../AppText';

interface LanguageItemProps {
    containerStyle?: ViewStyle;
    onPress?: () => void;
    select?: boolean;
    profileImage?: string | any;
    title?: string;
    code?: string;
};

const LanguageItem: React.FC<LanguageItemProps> = ({
    containerStyle,
    onPress,
    select,
    title,
    code,
}) => (

    <TouchableOpacity
        style={[styles.container]}
        onPress={onPress}
    >
        <View style={styles.iconView}>
        {select && (
            <Image source={IMAGES.correct} style={styles.icon}/>
        )}
        </View>
        <View style={styles.view}>
            <View style={styles.nameView}>
                <AppTextGradient
                    title={title}
                    fontSize={calcFont(17)}
                    fontFamily={FONTS.medium}
                    colorStart={select ? COLORS.secondGradient : COLORS.textDark}
                    colorEnd={select ? COLORS.primaryGradient : COLORS.textDark}
                />
            </View>
            <LinearGradient
                style={[styles.typeContainer, {borderWidth: select ? 0 : 1}]}
                colors={[
                    select ? COLORS.primaryGradient : COLORS.white,
                    select ? COLORS.secondGradient : COLORS.white]}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <AppText
                    title={code}
                    fontSize={calcFont(18)}
                    fontFamily={FONTS.regular}
                    color={select ? COLORS.white : COLORS.textLight}
                />
            </LinearGradient>
        </View>
    </TouchableOpacity>
);

export default LanguageItem;
