import React, { useEffect, useState } from 'react';
import {I18nManager, View,} from 'react-native';
import styles from './styles';
import { COLORS, FONTS } from '../../../utils/theme';
import AppText from '../../../components/AppText';
import { IMAGES } from '../../../assets/Images';
import I18n, { Trans } from '../../../translation';
import { calcFont, calcHeight } from '../../../utils/sizes';
import AppButtonDefault from '../../../components/AppButtonDefault';
import AuthHeader from '../../../components/AuthHeader';
import AppInputPhone from '../../../components/AppInputPhone';

const ForgotPassword: React.FC<{}> = (params: any) => {
  const [phone, setPhone] = useState<string>('');

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
        <AppButtonDefault
          title={Trans('send')}
          onPress={() => console.log('---')}
          colorStart={COLORS.primaryGradient}
          colorEnd={COLORS.secondGradient}
          buttonStyle={{marginTop: calcHeight(20)}}
        />
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
export default ForgotPassword;