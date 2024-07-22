import React, { useState } from 'react';
import { I18nManager, Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { COLORS, FONTS } from '../../../utils/theme';
import AppText from '../../../components/AppText';
import { IMAGES } from '../../../assets/Images';
import { Trans } from '../../../translation';
import { calcFont, calcHeight } from '../../../utils/sizes';
import AppButtonDefault from '../../../components/AppButtonDefault';
import { useNavigation } from '@react-navigation/native';
import AppModalLanguage from '../../../components/AppModalLanguage';

const LetsStart: React.FC<{}> = (params: any) => {
  const navigation = useNavigation<any>();
  const [visibleLanguage, setVisibleLanguage] = useState<boolean>(false);

  const languageSection = () => {
    return (
      <View style={styles.languageLangContainer}>
        <TouchableOpacity
          style={styles.languageLangView}
          onPress={() => setVisibleLanguage(true)}
        >
          <AppText
            title={Trans('switchLanguage')}
            fontFamily={FONTS.medium}
            fontSize={calcFont(16)}
            color={COLORS.white}
          />
          <Image source={I18nManager.isRTL ? IMAGES.languageAr : IMAGES.languageEn} style={styles.languageLangImage}/>
        </TouchableOpacity>
      </View>
    )
  };

  const messageSection = () => {
    return (
      <View style={styles.messageContainer}>
        <AppText
          title={Trans('letsGetStarted')}
          fontFamily={FONTS.extra_bold}
          fontSize={calcFont(32)}
          color={COLORS.white}
          lineHeight={calcHeight(42)}
          marginBottom={calcHeight(8)}
        />
        <AppText
          title={Trans('notOnlyOrganizeReservations')}
          fontFamily={FONTS.light}
          fontSize={calcFont(18)}
          color={COLORS.white}
          lineHeight={calcHeight(24)}
        />
      </View>
    )
  };

  const authSection = () => {
    return (
      <View style={styles.authContainer}>
        <AppButtonDefault
          colorStart={COLORS.primaryGradient}
          colorEnd={COLORS.secondGradient}
          border={false}
          onPress={() => navigation.navigate('AuthenticationStack', {screen: 'Login'})}
          title={Trans('signIn')}
        />
        {/* <View style={styles.authView}>
          <AppText
            title={Trans('dontHaveAccount')}
            color={COLORS.white}
            fontFamily={FONTS.medium}
            fontSize={calcFont(14)}
          />
          <TouchableOpacity
            style={styles.authTouch}
            onPress={() => navigation.navigate('AuthenticationStack', {screen: 'SignUp'})}
          >
            <AppText
              title={Trans('createAccount')}
              fontFamily={FONTS.medium}
              fontSize={calcFont(14)}
              color={COLORS.primaryGradient}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    )
  };

  const modalLanguageSection = () => {
    return (
      <AppModalLanguage
        visible={visibleLanguage}
        onClose={() => setVisibleLanguage(false)}
      />
    )
  };

  return (
    <ImageBackground source={IMAGES.start}  style={styles.container} imageStyle={styles.container}>
      {languageSection()}
      {messageSection()}
      {authSection()}
      {modalLanguageSection()}
    </ImageBackground>
  );
};
export default LetsStart;