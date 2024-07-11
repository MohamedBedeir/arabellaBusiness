import React, { useEffect, useState } from 'react';
import {I18nManager, Image, TouchableOpacity, View,} from 'react-native';
import styles from './styles';
import { COLORS, FONTS } from '../../../utils/theme';
import AppTextGradient from '../../../components/AppTextGradient';
import AppText from '../../../components/AppText';
import { IMAGES } from '../../../assets/Images';
import AppInput from '../../../components/AppInput';
import I18n, { Trans } from '../../../translation';
import { calcFont, calcHeight } from '../../../utils/sizes';
import AppButtonDefault from '../../../components/AppButtonDefault';
import AuthHeader from '../../../components/AuthHeader';
import AppInputPhone from '../../../components/AppInputPhone';

const Login: React.FC<{}> = (params: any) => {
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {
    const _lang = 'ar';
    I18n.locale = _lang;
    I18nManager.allowRTL(_lang === 'ar');
    I18nManager.forceRTL(_lang === 'ar');
  }, []);

  const dataSection = () => {
    const titleSection = () => {
      return (
        <View style={styles.titleContainer}>
          <AppText
            title={Trans('signIn')}
            color={COLORS.textDark}
            fontSize={calcFont(22)}
            fontFamily={FONTS.extra_bold}
            marginBottom={calcHeight(8)}
          />
          <AppText
            title={Trans('fillInYourEmail')}
            color={COLORS.textDark}
            fontSize={calcFont(14)}
            fontFamily={FONTS.regular}
            marginBottom={calcHeight(20)}
          />
        </View>
      )
    };
  
    const forgotPasswordSection = () => {
      return (
        <View style={styles.forgotContainer}>
          <TouchableOpacity
            style={styles.forgotPasswordView}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <Image source={rememberMe ? IMAGES.selectActive : IMAGES.selectUnActive} style={styles.forgotIcon}/>
            <AppText
              title={Trans('rememberMe')}
              color={COLORS.textLight}
              fontSize={calcFont(14)}
              fontFamily={FONTS.medium}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.forgotRememberContainer}
            onPress={() => console.log('')}
          >
            <AppTextGradient
              title={Trans('forgotPasswordQ')}
              fontSize={14}
              fontFamily={FONTS.medium}
              textAlign={'center'}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
            />
          </TouchableOpacity>
        </View>
      )
    };
  
    const dontHaveAccountSection = () => {
      return (
        <View style={styles.dontHaveAccountView}>
          <AppText
            title={Trans('dontHaveAccount')}
            color={COLORS.textDark}
            fontFamily={FONTS.medium}
            fontSize={calcFont(14)}
          />
          <TouchableOpacity style={styles.dontHaveAccountTouch}>
            <AppText
              title={Trans('createAccount')}
              fontFamily={FONTS.medium}
              fontSize={calcFont(14)}
              color={COLORS.primaryGradient}
              // colorEnd={COLORS.primaryGradient}
            />
          </TouchableOpacity>
        </View>
      )
    };

    return (
      <View style={styles.dataContainer}>
        {titleSection()}
        <AppInputPhone
          containerStyle={{marginTop: calcHeight(20)}}
          title={Trans('mobileNumber')}
          value={phone}
          image={IMAGES.authPhone}
          placeholder={Trans('mobileNumber')}
          // keyboardType={}
          onChangeText={(text: string) => setPhone(text)}
          // onFocus={}
          // onEndEditing={}
          // numberOfLines={}
          // maxLength={}
          // editable={}
          // _textAligne={}
          // inputStyle={}
          // error={}
        />
        <AppInput
          title={Trans('password')}
          image={IMAGES.authPassword}
          value={password}
          secret
          placeholder={Trans('password')}
          onChangeText={(text: string) =>setPassword(text)}
          inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
          // error={'emailError'}
          containerStyle={{marginTop: calcHeight(20)}}
        />
        <AppButtonDefault
          title={Trans('signIn')}
          onPress={() => console.log('---')}
          colorStart={COLORS.primaryGradient}
          colorEnd={COLORS.secondGradient}
          buttonStyle={{marginTop: calcHeight(20)}}
        />
        {forgotPasswordSection()}
        {dontHaveAccountSection()}
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <AuthHeader
        image={IMAGES.frame}
        icon={IMAGES.logoWhite}
      />
      {dataSection()}
    </View>
  );
};
export default Login;