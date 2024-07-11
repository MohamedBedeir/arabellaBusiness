import React from 'react';
import { TouchableOpacity, ViewStyle, Image, View, ImageBackground } from 'react-native';
import { styles } from './styles';
import { calcFont } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
import { IMAGES } from '../../assets/Images';
import LinearGradient from 'react-native-linear-gradient';
import AppTextGradient from '../AppTextGradient';

interface ProfileImageItemProps {
    containerStyle?: ViewStyle;
    profileImage?: string | any;
    onPressImage?: () => void;
    profileType?: string;
};

const ProfileImageItem: React.FC<ProfileImageItemProps> = ({
    containerStyle,
    profileImage,
    onPressImage,
    profileType,
}) => (

    <View style={[styles.container, containerStyle]}>
        <ImageBackground source={profileImage} style={styles.imageContainerStyle} imageStyle={styles.imageContainer}>
            <TouchableOpacity onPress={onPressImage}>
                <Image source={IMAGES.image} style={styles.image}/>
            </TouchableOpacity>
        </ImageBackground>
        <LinearGradient
            style={[styles.typeContainer]}
            colors={['rgba(237, 81, 155, 0.2)', 'rgba(197, 122, 222, 0.2)']}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <AppTextGradient
                title={profileType}
                fontSize={calcFont(14)}
                fontFamily={FONTS.bold}
                colorStart={COLORS.secondGradient}
                colorEnd={COLORS.primaryGradient}
            />
        </LinearGradient>
    </View>
);

export default ProfileImageItem;
