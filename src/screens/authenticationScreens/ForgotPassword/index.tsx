import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { COLORS, FONTS } from '../../../utils/theme';
import AppText from '../../../components/AppText';
import { IMAGES } from '../../../assets/Images';
import { Trans } from '../../../translation';
import { calcFont, calcHeight } from '../../../utils/sizes';
import AppButtonDefault from '../../../components/AppButtonDefault';
import AuthHeader from '../../../components/AuthHeader';
import AppInputPhone from '../../../components/AppInputPhone';
import { useNavigation } from '@react-navigation/native';
import { RootState, useAppDispatch } from '../../../redux/store/store';
import { forgotPassword } from '../../../middleware/authentication/forgotPassword';
import { useSelector } from 'react-redux';
import AppLoading from '../../../components/AppLoading';
import { useToast } from 'react-native-toast-notifications';
import { setForgotPasswordState } from '../../../redux/store/auth/authenticationSlice';

const ForgotPassword: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const { authenticationLoader, forgotPasswordState } = useSelector((store: RootState) => store?.auth);

  const [phone, setPhone] = useState<string>('');
  const [checkPhone, setCheckPhone] = useState<boolean>(false);

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
    if(forgotPasswordState == 'error') {
      _toast('danger', Trans('problemOccurredTryAgain'));
      dispatch(setForgotPasswordState(''));
    };
  }, [forgotPasswordState]);
  
  useEffect(() => {}, []);

  const onChangePhone = (text: string) => {
    {setPhone(text)}
    phone != '' ? setCheckPhone(false) : null;
  };

  const onForgotPassword = () => {
    if (phone == '') {
      setCheckPhone(true);
    } else {
      setCheckPhone(false);
      const data = {
        navigation,
        phone: `+966${phone}`,
      };
      dispatch(forgotPassword(data));
      // navigation.navigate('ResetPassword', { phone: phone })
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
            title={Trans('forgotPassword')}
            color={COLORS.textDark}
            fontSize={calcFont(22)}
            fontFamily={FONTS.extra_bold}
            marginBottom={calcHeight(8)}
            textAlign={'left'}
          />
          <AppText
            title={Trans('enterEmailResetPassword')}
            color={COLORS.textDark}
            fontSize={calcFont(14)}
            fontFamily={FONTS.regular}
            marginBottom={calcHeight(20)}
            textAlign={'left'}
          />
        </View>
      )
    };

    const forgotPasswordSection = () => {
      return (
        <>
          <AppInputPhone
            containerStyle={{marginTop: calcHeight(20)}}
            title={Trans('mobileNumber')}
            image={IMAGES.authPhone}
            placeholder={Trans('mobileNumber')}
            value={phone}
            keyboardType={'number-pad'}
            onChangeText={(text: string) => onChangePhone(text)}
            inputContainer={{borderColor: checkPhone ? COLORS.red : COLORS.gray}}
          />
          <AppButtonDefault
            title={Trans('send')}
            onPress={() => onForgotPassword()}
            colorStart={COLORS.primaryGradient}
            colorEnd={COLORS.secondGradient}
            buttonStyle={{marginTop: calcHeight(20)}}
          />
        </>
      )
    };
  
    return (
      <View style={styles.dataContainer}>
        {titleSection()}
        {forgotPasswordSection()}
      </View>
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
    </View>
  );
};
export default ForgotPassword;