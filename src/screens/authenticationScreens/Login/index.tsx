import React, { useEffect, useState } from 'react';
import {Image, TouchableOpacity, View,} from 'react-native';
import styles from './styles';
import { COLORS, FONTS } from '../../../utils/theme';
import AppTextGradient from '../../../components/AppTextGradient';
import AppText from '../../../components/AppText';
import { IMAGES } from '../../../assets/Images';
import AppInput from '../../../components/AppInput';
import { Trans } from '../../../translation';
import { calcFont, calcHeight } from '../../../utils/sizes';
import AppButtonDefault from '../../../components/AppButtonDefault';
import AuthHeader from '../../../components/AuthHeader';
import AppInputPhone from '../../../components/AppInputPhone';
import { useNavigation } from '@react-navigation/native';
import { RootState, useAppDispatch } from '../../../redux/store/store';
import { login } from '../../../middleware/authentication/login';
import AppLoading from '../../../components/AppLoading';
import { useSelector } from 'react-redux';

const Login: React.FC<{}> = (params: any) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { authenticationLoader } = useSelector((store: RootState) => store?.auth);
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPhone, setCheckPhone] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {}, []);

  const onChangePhone = (text: string) => {
    {setPhone(text)}
    phone != '' ? setCheckPhone(false) : null;
  };

  const onChangePassword = (text: string) => {
    setPassword(text);
    password != '' ? setCheckPassword(false) : null;
  };

  const onLogin = () => {
    if (phone == '') {
      // _toast('danger', Trans('pleaseEnterRequiredData'));
      setCheckPhone(true);
    } else if (password == '') {
      // _toast('danger', Trans('pleaseEnterRequiredData'));
      setCheckPassword(true);
    } else {
      setCheckPhone(false);
      setCheckPassword(false);
      const data = {
        navigation: params.navigation,
        phone: `+966${phone}`,
        password,
      };
      dispatch(login(data));
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
            fontFamily={FONTS.light}
          />
        </View>
      )
    };

    const loginSection = () => {
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
          <AppInput
            containerStyle={{marginTop: calcHeight(20)}}
            title={Trans('password')}
            image={IMAGES.authPassword}
            secret
            placeholder={Trans('password')}
            value={password}
            onChangeText={(text: string) => onChangePassword(text)}
            inputContainer={{borderColor: checkPassword ? COLORS.red : COLORS.gray}}
          />
          <AppButtonDefault
            title={Trans('signIn')}
            onPress={() => onLogin()}
            colorStart={COLORS.primaryGradient}
            colorEnd={COLORS.secondGradient}
            buttonStyle={{marginTop: calcHeight(20)}}
          />
        </>
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
            onPress={() => navigation.navigate('ForgotPassword')}
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
          <TouchableOpacity
            style={styles.dontHaveAccountTouch}
            onPress={() => navigation.navigate('SignUp')}
          >
            <AppText
              title={Trans('createAccount')}
              fontFamily={FONTS.medium}
              fontSize={calcFont(14)}
              color={COLORS.primaryGradient}
            />
          </TouchableOpacity>
        </View>
      )
    };

    return (
      <View style={styles.dataContainer}>
        {titleSection()}
        {loginSection()}
        {forgotPasswordSection()}
        {/* {dontHaveAccountSection()} */}
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
export default Login;