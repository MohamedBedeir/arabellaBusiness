import React, { useEffect, useState } from 'react';
import {I18nManager, TouchableOpacity, View,} from 'react-native';
import styles from './styles';
import { COLORS, FONTS } from '../../../utils/theme';
import AppText from '../../../components/AppText';
import { IMAGES } from '../../../assets/Images';
import I18n, { Trans } from '../../../translation';
import { calcFont, calcHeight } from '../../../utils/sizes';
import AppButtonDefault from '../../../components/AppButtonDefault';
import AuthHeader from '../../../components/AuthHeader';
import OtpInputs from 'react-native-otp-inputs';

const VerficationOTP: React.FC<{}> = (params: any) => {
  const [OTPCode, setOTPCode] = useState<string>('');
  const [errors, setErrors] = useState<any>();

  const [focused, setFocused] = useState<boolean>(false);

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
            title={Trans('verificationCodeSent')}
            color={COLORS.textDark}
            fontSize={calcFont(22)}
            fontFamily={FONTS.extra_bold}
            marginBottom={calcHeight(8)}
          />
          <AppText
            title={Trans('enterOTPCodeSent')}
            color={COLORS.textDark}
            fontSize={calcFont(14)}
            fontFamily={FONTS.regular}
          />
          <AppText
            title={'+966540802488'}
            color={COLORS.textDark}
            fontSize={calcFont(16)}
            fontFamily={FONTS.bold}
            marginBottom={calcHeight(20)}
            textAlign={'left'}
          />
        </View>
      )
    };

    const codeSection = () => {
      return (
        <View style={styles.otpContainer}>
          <OtpInputs
            autofillFromClipboard
            // onFocus={() => setFocused(true)}
            // ref={otpRef}
            handleChange={code => {
              setErrors('');
              setOTPCode(code);
            }}
            style={{
              flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
              justifyContent: 'space-between',
            }}
            numberOfInputs={5}
            inputStyles={
              !errors
                ? [styles.otpInput, {borderColor: focused ? COLORS.primaryGradient : COLORS.gray}]
                : [styles.otpInput, {borderColor: 'red'}]
            }
          />
        </View>
      )
    };

    const dontSendOTPSection = () => {
      return (
        <View style={styles.dontHaveAccountView}>
          <AppText
            title={Trans('youReceiveVerificationCodeQ')}
            color={COLORS.textDark}
            fontFamily={FONTS.medium}
            fontSize={calcFont(14)}
          />
          <TouchableOpacity style={styles.dontHaveAccountTouch}>
            <AppText
              title={Trans('reTransmitter')}
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
        {codeSection()}
        <AppButtonDefault
          title={Trans('send')}
          onPress={() => console.log('---')}
          colorStart={COLORS.primaryGradient}
          colorEnd={COLORS.secondGradient}
          buttonStyle={{marginTop: calcHeight(20)}}
        />
        {dontSendOTPSection()}
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
export default VerficationOTP;