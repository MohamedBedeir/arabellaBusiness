import React from 'react';
import { TouchableOpacity, ViewStyle, TextStyle, Image, ImageStyle, View, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import AppText from '../AppText';
import { calcFont } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
import { GradientBorderView } from '@good-react-native/gradient-border';
import AppTextGradient from '../AppTextGradient';
import { IMAGES } from '../../assets/Images';
import { Trans } from '../../translation';

interface AppHeaderProps {
    onPress?: () => void;
    icon?: string | any;
    iconStyle?: ImageStyle;
    title?: string;
    logo?: boolean;
};

const AppHeaderAdvanced: React.FC<AppHeaderProps> = ({
    onPress,
    icon,
    title,
    logo,
}) => (
    <View style={styles.container}>
        <View style={styles.view}>
            <View style={styles.profileContainer}>
                <ImageBackground source={IMAGES.userTest} style={styles.profileImage} imageStyle={styles.profileImage}>
                    <View style={styles.statusBorder} >
                        <View style={styles.statusView}>

                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.profileData}>
                    <AppText
                        title={Trans('welcome')}
                        fontFamily={FONTS.black}
                        fontSize={calcFont(14)}
                        textAlign={'left'}
                        color={COLORS.textDark}
                    />
                    <AppText
                        title={'اسماء محمد'}
                        fontFamily={FONTS.light}
                        fontSize={calcFont(14)}
                        textAlign={'left'}
                        color={COLORS.textLight}
                    />
                </View>
            </View>
            <Image source={IMAGES.logoColors} style={styles.icon}/>
            <View style={styles.notContainer}>
                <TouchableOpacity onPress={onPress}>
                    <Image source={IMAGES.notificationsNew} style={styles.icon}/>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

export default AppHeaderAdvanced;
