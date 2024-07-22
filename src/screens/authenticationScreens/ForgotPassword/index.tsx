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
import { useAppDispatch } from '../../../redux/store/store';
import { forgotPassword } from '../../../middleware/authentication/forgotPassword';

const ForgotPassword: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const [phone, setPhone] = useState<string>('');
  const [checkPhone, setCheckPhone] = useState<boolean>(false);

  useEffect(() => {}, []);

  const onChangePhone = (text: string) => {
    {setPhone(text)}
    phone != '' ? setCheckPhone(false) : null;
  };

  // navigation.navigate('VerficationOTP')
  const onForgotPassword = () => {
    if (phone == '') {
      // _toast('danger', Trans('pleaseEnterRequiredData'));
      setCheckPhone(true);
    } else {
      setCheckPhone(false);
      const data = {
        navigation,
        phone,
      };
      dispatch(forgotPassword(data));
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
          />
          <AppText
            title={Trans('enterEmailResetPassword')}
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

  return (
    <View style={styles.container}>
      {headerSection()}
      {dataSection()}
    </View>
  );
};
export default ForgotPassword;