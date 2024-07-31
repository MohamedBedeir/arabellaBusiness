import React, { useEffect, useState } from 'react';
import {I18nManager, Image, ScrollView, TouchableOpacity, View,} from 'react-native';
import styles from './styles';
import { COLORS, FONTS } from '../../../utils/theme';
import AppText from '../../../components/AppText';
import { IMAGES } from '../../../assets/Images';
import AppInput from '../../../components/AppInput';
import { Trans } from '../../../translation';
import { calcFont, calcHeight } from '../../../utils/sizes';
import AppButtonDefault from '../../../components/AppButtonDefault';
import AuthHeader from '../../../components/AuthHeader';
import { useNavigation } from '@react-navigation/native';
import { RootState, useAppDispatch } from '../../../redux/store/store';
import AppLoading from '../../../components/AppLoading';
import { useSelector } from 'react-redux';
import OtpInputs from 'react-native-otp-inputs';
import { resetPassword } from '../../../middleware/authentication/resetPassword';
import { setResetPasswordState } from '../../../redux/store/auth/authenticationSlice';
import Modal_Warning from '../../../components/Modal_Warning';
import { useToast } from 'react-native-toast-notifications';

const ResetPassword: React.FC<{}> = (params: any) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { authenticationLoader, resetPasswordState } = useSelector((store: RootState) => store?.auth);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [checkNewPassword, setCheckNewPassword] = useState<boolean>(false);
  const [checkConfirmNewPassword, setCheckConfirmNewPassword] = useState<boolean>(false);
  const [visibleUpdatePassword, setVisibleUpdatePassword] = useState<boolean>(false);

  const [OTPCode, setOTPCode] = useState<string>('');
  const [errors, setErrors] = useState<boolean>();
  const [focused, setFocused] = useState<boolean>(false);

  const toast = useToast();
  const _toast = (type: string, body: string) => {
    toast.show(body, {
      type: type,
      placement: 'bottom',
      offset: 30,
      animationType: 'slide-in',
    });
  };

  useEffect(() => {
    if (resetPasswordState == 'done') {
      setVisibleUpdatePassword(true);
      dispatch(setResetPasswordState(''));
    } else if (resetPasswordState == 'error') {
      _toast('danger', Trans('problemOccurredTryAgain'));
      dispatch(setResetPasswordState(''));
    };
  }, [resetPasswordState]);

  const onChangeNewPassword = (text: string) => {
    setNewPassword(text);
    newPassword != '' ? setCheckNewPassword(false) : null;
  };
  const onChangeConfirmNewPassword = (text: string) => {
    setConfirmNewPassword(text);
    confirmNewPassword != '' ? setCheckConfirmNewPassword(false) : null;
  };

  const onReset = () => {
    if (OTPCode == '' || OTPCode.length < 5) {
      setErrors(true);
    } else if (newPassword == '') {
      setErrors(false);
      setCheckNewPassword(true);
    } else if (confirmNewPassword == '' || confirmNewPassword != newPassword) {
      setErrors(false);
      setCheckConfirmNewPassword(true);
    } else {
      setErrors(false);
      setCheckNewPassword(false);
      setCheckConfirmNewPassword(false);
      const data = {
        navigation: navigation,
        phone: params.route.params.phone,
        otp: OTPCode,
        newPassword,
        confirmNewPassword,
      };
      dispatch(resetPassword(data));
    }
  };

  const headerSection = () => {
    return (
      <AuthHeader
        image={IMAGES.frame}
        icon={IMAGES.logoWhite}
      />
    )
  };

  const dataSection = () => {
    const titleSection = () => {
      return (
        <View style={styles.titleContainer}>
          <AppText
            title={Trans('resetPassword')}
            color={COLORS.textDark}
            fontSize={calcFont(22)}
            fontFamily={FONTS.extra_bold}
            marginBottom={calcHeight(8)}
            textAlign={'left'}
          />
          <AppText
            title={Trans('fillInCodeAndPassword')}
            color={COLORS.textDark}
            fontSize={calcFont(14)}
            fontFamily={FONTS.light}
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
              setErrors(false);
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
            />
          </TouchableOpacity>
        </View>
      )
    };

    const passwordSection = () => {
      return (
        <View style={styles.passwordContainer}>
          <AppInput
            containerStyle={{marginTop: calcHeight(20)}}
            title={Trans('newPassword')}
            image={IMAGES.authPassword}
            secret
            placeholder={Trans('newPassword')}
            value={newPassword}
            onChangeText={(text: string) => onChangeNewPassword(text)}
            inputContainer={{borderColor: checkNewPassword ? COLORS.red : COLORS.gray}}
          />
          <AppInput
            containerStyle={{marginTop: calcHeight(20)}}
            title={Trans('confirmNewPassword')}
            image={IMAGES.authPassword}
            secret
            placeholder={Trans('confirmNewPassword')}
            value={confirmNewPassword}
            onChangeText={(text: string) => onChangeConfirmNewPassword(text)}
            inputContainer={{borderColor: checkConfirmNewPassword ? COLORS.red : COLORS.gray}}
          />
          <AppButtonDefault
            title={Trans('reset')}
            onPress={() => onReset()}
            colorStart={COLORS.primaryGradient}
            colorEnd={COLORS.secondGradient}
            buttonStyle={{marginTop: calcHeight(64)}}
          />
        </View>
      )
    };

    return (
      <ScrollView>
        <View style={styles.dataContainer}>
          {titleSection()}
          {codeSection()}
          {dontSendOTPSection()}
          {passwordSection()}
        </View>
      </ScrollView>
    )
  };

  const goToLogin = () => {
    setVisibleUpdatePassword(false);
    navigation.navigate('Login');
  }
  const modalUpdatePassword = () => {
    return (
      <Modal_Warning
        visible={visibleUpdatePassword}
        onClose={() => goToLogin()}
        onPress={() => goToLogin()}
        image={IMAGES.modalDone}
        title={Trans('passwordUpdateSuccessfully')}
        buttonTitle={Trans('done')}
      />
    )
  };

  const loadingSection = () => {
    return (
      <AppLoading
        margin_top={calcHeight(440)}
        size={'large'}
        visible={authenticationLoader}
      />
    )
  };

  return (
    <View style={styles.container}>
      {loadingSection()}
      {headerSection()}
      {dataSection()}
      {modalUpdatePassword()}
    </View>
  );
};

export default ResetPassword;