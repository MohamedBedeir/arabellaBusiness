import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { COLORS, FONTS } from '../../../utils/theme';
import AppText from '../../../components/AppText';
import { IMAGES } from '../../../assets/Images';
import AppInput from '../../../components/AppInput';
import { Trans } from '../../../translation';
import { calcFont, calcHeight } from '../../../utils/sizes';
import AppButtonDefault from '../../../components/AppButtonDefault';
import AuthHeader from '../../../components/AuthHeader';
import AppPickerSelect from '../../../components/AppPickerSelect';
import AppInputPhone from '../../../components/AppInputPhone';
import { useNavigation } from '@react-navigation/native';

const SignUp: React.FC<{}> = (params: any) => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [accept, setAccept] = useState<boolean>(false);

  useEffect(() => {}, []);

  const headerSection = () => {
    return (
      <AuthHeader
        image={IMAGES.frame}
        icon={IMAGES.logoWhite}
      />
    )
  };
  
  const titleSection = () => {
    return (
      <View style={styles.border}>
        <View style={styles.titleContainer}>
          <AppText
            title={Trans('createNewAccount')}
            color={COLORS.textDark}
            fontSize={calcFont(22)}
            fontFamily={FONTS.extra_bold}
            marginBottom={calcHeight(8)}
            textAlign={'left'}
          />
          <AppText
            title={Trans('fillInformationRegister')}
            color={COLORS.textDark}
            fontSize={calcFont(14)}
            fontFamily={FONTS.regular}
            marginBottom={calcHeight(20)}
            textAlign={'left'}
          />
        </View>
      </View>
    )
  };
  
  const dataSection = () => {
    const termsAndConditionsSection = () => {
      return (
        <TouchableOpacity
          style={styles.termsAndContainer}
          onPress={() => setAccept(!accept)}
        >
          <Image source={accept ? IMAGES.selectActive : IMAGES.selectUnActive} style={styles.termsAndIcon}/>
          <AppText
            title={`${Trans('agreeTo')} `}
            color={COLORS.textDark}
            fontSize={calcFont(14)}
            fontFamily={FONTS.medium}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('TermsAndConditions')}
          >
            <AppText
              title={`${Trans('termsAndConditions')} `}
              color={COLORS.primaryGradient}
              fontSize={calcFont(14)}
              fontFamily={FONTS.medium}
            />
          </TouchableOpacity>
          <AppText
            title={Trans('arabellaApplication')}
            color={COLORS.textDark}
            fontSize={calcFont(14)}
            fontFamily={FONTS.medium}
          />
        </TouchableOpacity>
      )
    };
  
    const doHaveAccountSection = () => {
      return (
        <View style={styles.dontHaveAccountView}>
          <AppText
            title={Trans('doHaveAccount')}
            color={COLORS.textDark}
            fontFamily={FONTS.medium}
            fontSize={calcFont(14)}
          />
          <TouchableOpacity
            style={styles.dontHaveAccountTouch}
            onPress={() => navigation.navigate('Login')}
          >
            <AppText
              title={Trans('logIn')}
              fontFamily={FONTS.medium}
              fontSize={calcFont(14)}
              color={COLORS.primaryGradient}
            />
          </TouchableOpacity>
        </View>
      )
    };

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dataContainer}>
          <AppInput
            title={Trans('fullName')}
            image={IMAGES.authUser}
            value={name}
            placeholder={Trans('fullName')}
            onChangeText={(text: string) =>setName(text)}
            inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
            // error={'emailError'}
            containerStyle={{}}
          />
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
            title={Trans('email')}
            image={IMAGES.authEmail}
            value={email}
            placeholder={Trans('email')}
            onChangeText={(text: string) =>setEmail(text)}
            inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
            // error={'emailError'}
            containerStyle={{marginTop: calcHeight(20)}}
          />
          <AppPickerSelect
            containerStyle={{marginTop: calcHeight(20)}}
            styleTitle={{}}
            onPress={() => {}}
            title={Trans('qualityActivity')}
            image={IMAGES.authType}
            icon={IMAGES.dropDown}
          />
          <AppInput
            title={Trans('password')}
            image={IMAGES.authPassword}
            value={password}
            secret
            placeholder={Trans('password')}
            onChangeText={(text: string) =>setPassword(text)}
            inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
            // error={'emailError'}
            containerStyle={{marginTop: calcHeight(20)}}
          />
          <AppButtonDefault
            title={Trans('register')}
            onPress={() => console.log('---')}
            colorStart={COLORS.primaryGradient}
            colorEnd={COLORS.secondGradient}
            buttonStyle={{marginTop: calcHeight(20)}}
          />
          {termsAndConditionsSection()}
          {doHaveAccountSection()}
        </View>
      </ScrollView>
    )
  };

  return (
    <View style={styles.container}>
      {headerSection()}
      {titleSection()}
      {dataSection()}
    </View>
  );
};
export default SignUp;