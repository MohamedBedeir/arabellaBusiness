import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../../../components/AppText';
import { Trans } from '../../../../../translation';
import { calcFont, calcHeight } from '../../../../../utils/sizes';
import { COLORS, FONTS } from '../../../../../utils/theme';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import ProfileImageItem from '../../../../../components/ProfileImageItem';
import AppInput from '../../../../../components/AppInput';
import AppInputPhone from '../../../../../components/AppInputPhone';
import { ScrollView } from 'react-native-gesture-handler';
import AppButtonDefault from '../../../../../components/AppButtonDefault';
import Modal_Warning from '../../../../../components/Modal_Warning';

const Profile: React.FC = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState<string>('صالون الملاك الأول');
  const [phone, setPhone] = useState<string>('555555555');
  const [email, setEmail] = useState<string>('Asmaamohamed@gmail.com');
  const [percentage, setPercentage] = useState<string>('15%');
  const [passwordOld, setPasswordOld] = useState<string>('');
  const [passwordNew, setPasswordNew] = useState<string>('');
  const [passwordConvert, setPasswordConvert] = useState<string>('');

  const [visibleUpdateData, setVisibleUpdateData] = useState<boolean>(false);
  const [visibleUpdatePassword, setVisibleUpdatePassword] = useState<boolean>(false);
  
  const headerSection = () => {
    return (
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('profilePersonly')}
        logo={IMAGES.logoColors}
      />
    )
  };

  const bodySection = () => {
    const imageSection = () => {
      return (
        <ProfileImageItem
          containerStyle={{}}
          profileImage={IMAGES.userTest3}
          onPressImage={() => {}}
          profileType={'صالون'}
        />
      )
    };

    const dataSection = () => {
      return (
        <>
          <AppInput
            title={Trans('name')}
            image={IMAGES.authUser}
            value={name}
            placeholder={Trans('name')}
            onChangeText={(text: string) =>setName(text)}
            inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
            // error={'emailError'}
            containerStyle={{marginTop: calcHeight(20)}}
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
            inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
            // error={'emailError'}
            containerStyle={{marginTop: calcHeight(20)}}
          />
          <AppInput
            title={Trans('arabellaCompanyPercentage')}
            image={IMAGES.authEmail}
            value={percentage}
            placeholder={Trans('arabellaCompanyPercentage')}
            onChangeText={(text: string) =>setPercentage(text)}
            inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
            // error={'emailError'}
            containerStyle={{marginTop: calcHeight(20)}}
          />
          <View style={styles.policiesView}>
            <AppText
              title={Trans('percentageWasAgreed')}
              color={COLORS.textDark}
              fontFamily={FONTS.medium}
              fontSize={calcFont(14)}
            />
            <TouchableOpacity
              style={styles.policiesTouch}
              onPress={() => navigation.navigate('SA_TermsAndConditions')}
            >
              <AppText
                title={Trans('arabellaPolicies')}
                fontFamily={FONTS.medium}
                fontSize={calcFont(14)}
                color={COLORS.primaryGradient}
              />
            </TouchableOpacity>
          </View>
          <AppButtonDefault
            colorStart={COLORS.primaryGradient}
            colorEnd={COLORS.secondGradient}
            border={false}
            onPress={() => setVisibleUpdateData(true)}
            title={Trans('save')}
            buttonStyle={{marginTop: calcHeight(24)}}
          />
        </>
      )
    };
  
    const passwordSection = () => {
      return (
        <>
          <AppInput
            title={Trans('oldPassword')}
            image={IMAGES.authPassword}
            value={passwordOld}
            placeholder={'************'}
            onChangeText={(text: string) =>setPasswordOld(text)}
            inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
            // error={'emailError'}
            // containerStyle={{marginTop: calcHeight(20)}}
          />
          <AppInput
            title={Trans('newPassword')}
            image={IMAGES.authPassword}
            value={passwordNew}
            placeholder={'************'}
            onChangeText={(text: string) =>setPasswordNew(text)}
            inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
            // error={'emailError'}
            containerStyle={{marginTop: calcHeight(20)}}
          />
          <AppInput
            title={Trans('confirmNewPassword')}
            image={IMAGES.authPassword}
            value={passwordConvert}
            placeholder={'************'}
            onChangeText={(text: string) =>setPasswordConvert(text)}
            inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
            // error={'emailError'}
            containerStyle={{marginTop: calcHeight(20)}}
          />
          <AppButtonDefault
            colorStart={COLORS.primaryGradient}
            colorEnd={COLORS.secondGradient}
            border={false}
            onPress={() => setVisibleUpdatePassword(true)}
            title={Trans('save')}
            buttonStyle={{marginTop: calcHeight(24)}}
          />
        </>
      )
    };

    const modalUpdateData = () => {
      return (
        <Modal_Warning
          visible={visibleUpdateData}
          onClose={() => setVisibleUpdateData(false)}
          onPress={() => setVisibleUpdateData(false)}
          image={IMAGES.modalDone}
          title={Trans('dataUpdateSuccessfully')}
          buttonTitle={Trans('done')}
        />
      )
    };

    const modalUpdatePassword = () => {
      return (
        <Modal_Warning
          visible={visibleUpdatePassword}
          onClose={() => setVisibleUpdatePassword(false)}
          onPress={() => setVisibleUpdatePassword(false)}
          image={IMAGES.modalDone}
          title={Trans('passwordUpdateSuccessfully')}
          buttonTitle={Trans('done')}
        />
      )
    };

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          {imageSection()}
          {dataSection()}
          <View style={styles.line}/>
          {passwordSection()}
        </View>
        {modalUpdateData()}
        {modalUpdatePassword()}
      </ScrollView>
    )
  };
  
  return (
    <View style={styles.container}>
      {headerSection()}
      {bodySection()}
    </View>
  );
};

export default Profile;


