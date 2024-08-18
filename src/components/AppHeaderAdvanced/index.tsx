import React from 'react';
import { TouchableOpacity, ViewStyle, TextStyle, Image, ImageStyle, View, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import AppText from '../AppText';
import { calcFont, calcHeight } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
import { GradientBorderView } from '@good-react-native/gradient-border';
import AppTextGradient from '../AppTextGradient';
import { IMAGES } from '../../assets/Images';
import { Trans } from '../../translation';

interface AppHeaderProps {
    user?: any;
    onPress1?: () => void;
    onPress2?: () => void;
    icon?: string | any;
    iconStyle?: ImageStyle;
    title?: string;
    logo?: boolean;
    image?: boolean;
};

const AppHeaderAdvanced: React.FC<AppHeaderProps> = ({
    user,
    onPress1,
    onPress2,
    icon,
    title,
    logo,
    image,
}) => (
    <View style={styles.container}>
        <View style={styles.view}>
            <TouchableOpacity
                onPress={onPress2}
                style={styles.profileContainer}
            >
                <ImageBackground source={user?.image} style={styles.profileImage} imageStyle={styles.profileImage}>
                    <View style={styles.statusBorder} >
                        <View style={styles.statusView}>

                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.profileData}>
                    <AppText
                        title={Trans('welcome')}
                        fontFamily={FONTS.black}
                        fontSize={calcFont(16)}
                        textAlign={'left'}
                        color={COLORS.textDark}
                        // marginBottom={calcHeight(2)}
                    />
                    <AppText
                        title={user?.name}
                        fontFamily={FONTS.regular}
                        fontSize={calcFont(14)}
                        textAlign={'left'}
                        color={COLORS.textDark}
                    />
                </View>
            </TouchableOpacity>
            <Image source={IMAGES.logoColors} style={styles.icon}/>
            <View style={styles.notContainer}>
                <TouchableOpacity onPress={onPress1}>
                    <Image source={image} style={styles.icon}/>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

export default AppHeaderAdvanced;
