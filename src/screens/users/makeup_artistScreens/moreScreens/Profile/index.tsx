import React, { useEffect, useState } from 'react';
import { I18nManager, TouchableOpacity, View } from 'react-native';
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
import { RootState, useAppDispatch } from '../../../../../redux/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { profile_data, profile_updateUser } from '../../../../../middleware/profile/profile';
import AppLoading from '../../../../../components/AppLoading';
import { useSelector } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import endpoints from '../../../../../network/endpoints';
import { password_update } from '../../../../../middleware/authentication/updatePassword';
import { setPasswordUpdateState, setProfileUpdateState } from '../../../../../redux/store/profile/profileSlice';
import { useToast } from 'react-native-toast-notifications';

const Profile: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { profileLoader, profileUpdateState, passwordUpdateState, profileData } = useSelector((store: RootState) => store?.profile);

  const [userData, setUserData] = useState<any>();
  const [featuredImage, setFeaturedImage] = useState<string>('');
  const [base64, setBase64] = useState('');
  const [providerName, setProviderName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [percentage, setPercentage] = useState<string>('');
  const [passwordCurrent, setPasswordCurrent] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConvert, setPasswordConvert] = useState<string>('');
  const [passwordCurrentError, setPasswordCurrentError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordConvertError, setPasswordConvertError] = useState<boolean>(false);
  const [visibleUpdateData, setVisibleUpdateData] = useState<boolean>(false);
  const [visibleUpdatePassword, setVisibleUpdatePassword] = useState<boolean>(false);
  
  const toast = useToast();
  const _toast = (type: string, body: string) => {
    toast.show(body, {
      type: type,
      placement: 'bottom',
      offset: 30,
      animationType: 'slide-in',
    });
  };
  console.log('userData-------', userData);

  const getUser = async () => {
    const user: any = await AsyncStorage.getItem('user');
    const user_data = JSON.parse(user);
    setUserData(user_data);
    setFeaturedImage((`${endpoints.imageUrl}${user_data?.serviceProvider?.featuredImage}`));
    setProviderName(I18nManager.isRTL ? user_data?.serviceProvider?.name : user_data?.serviceProvider?.nameEn);
    setUserName(user_data?.name);
    setPhone(user_data?.phoneNumber);
    setEmail(user_data?.email);
    setPercentage(`${parseInt(user_data?.serviceProvider?.commission, 10)}%`);
    dispatch(profile_data({id: user_data?.id}));
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (profileUpdateState == 'done') {
      setVisibleUpdateData(true);
      dispatch(setProfileUpdateState(''));
    }
  }, [profileUpdateState]);

  useEffect(() => {
    if (passwordUpdateState == 'done') {
      setPasswordCurrent('');
      setPassword('');
      setPasswordConvert('');
      setVisibleUpdatePassword(true);
      dispatch(setPasswordUpdateState(''));
    } else if (passwordUpdateState == 'error') {
      _toast('danger', Trans('incorrectPasswordPleaseTryAgain'));
      dispatch(setPasswordUpdateState(''));
    };
  }, [passwordUpdateState]);

  const onUpdateProfile = () => {
    const data = {
      user_id: userData?.id,
      profider_id: userData?.serviceProviderId,
      name: userName,
      email: email,
      image: base64 != '' ? featuredImage : '',
      profiderName: userData?.serviceProvider?.name,
      profiderNameEn: userData?.serviceProvider?.nameEn,
    }
    dispatch(profile_updateUser({data}))
  };

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

  const selectImage = async () => {
    try {
      DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      }).then(image => {
        setFeaturedImage(JSON.stringify(image));
        RNFS.readFile(image[0].uri, 'base64').then((result: any) => {
          setBase64(result);
        });
      });
    } catch (error) {
      setFeaturedImage('');
    }
  };

  const bodySection = () => {
    const imageSection = () => {
      const defaultImage = userData?.serviceProvider?.featuredImage ? {uri: `${endpoints.imageUrl}${userData?.serviceProvider?.featuredImage}`} : IMAGES.userTest;
      const image = base64 != '' ? { uri: `data:image/png;base64,${base64}` } : defaultImage;
      return (
        <ProfileImageItem
          containerStyle={{}}
          profileImage={image}
          onPressImage={() => selectImage()}
          profileType={providerName}
        />
      )
    };

    const dataSection = () => {
      return (
        <>
          <AppInput
            title={Trans('name')}
            image={IMAGES.authUser}
            value={userName}
            placeholder={Trans('name')}
            onChangeText={(text: string) =>setUserName(text)}
            inputContainer={{borderColor: userName == '' ? COLORS.red : COLORS.backgroundLight}}
            // error={'emailError'}
            containerStyle={{marginTop: calcHeight(20)}}
          />
          <AppInputPhone
            containerStyle={{marginTop: calcHeight(20)}}
            title={Trans('mobileNumber')}
            value={phone}
            image={IMAGES.authPhone}
            placeholder={Trans('mobileNumber')}
            inputContainer={{borderColor: COLORS.backgroundLight}}
            keyboardType={'number-pad'}
            onChangeText={(text: string) => setPhone(text)}
            editable={false}
          />
          <AppInput
            title={Trans('email')}
            image={IMAGES.authEmail}
            value={email}
            placeholder={Trans('email')}
            onChangeText={(text: string) =>setEmail(text)}
            inputContainer={{borderColor: email == '' ? COLORS.red : COLORS.backgroundLight}}
            // error={'emailError'}
            containerStyle={{marginTop: calcHeight(20)}}
          />
          <AppInput
            title={Trans('arabellaCompanyPercentage')}
            image={IMAGES.authEmail}
            value={percentage}
            placeholder={Trans('arabellaCompanyPercentage')}
            onChangeText={(text: string) =>setPercentage(text)}
            inputContainer={{borderColor: COLORS.backgroundLight}}
            editable={false}
            containerStyle={{marginTop: calcHeight(20)}}
          />
          <View style={styles.policiesView}>
            <AppText
              title={Trans('percentageWasAgreed')}
              color={COLORS.textDark}
              fontFamily={FONTS.medium}
              fontSize={calcFont(14)}
              textAlign={'left'}
              marginBottom={calcHeight(4)}
            />
            <TouchableOpacity
              style={styles.policiesTouch}
              onPress={() => navigation.navigate('MA_TermsAndConditions')}
            >
              <AppText
                title={Trans('arabellaPolicies')}
                fontFamily={FONTS.medium}
                fontSize={calcFont(14)}
                color={COLORS.primaryGradient}
                textAlign={'left'}
              />
            </TouchableOpacity>
          </View>
          <AppButtonDefault
            colorStart={COLORS.primaryGradient}
            colorEnd={COLORS.secondGradient}
            border={false}
            onPress={() => onUpdateProfile()}
            title={Trans('save')}
            buttonStyle={{marginTop: calcHeight(24)}}
          />
        </>
      )
    };

    const onUpdatePassword = () => {
      if (passwordCurrent == '') {
        setPasswordCurrentError(true);
      } else if (password == '') {
        setPasswordCurrentError(false);
        setPasswordError(true);
      } else if (passwordConvert != password) {
        setPasswordCurrentError(false);
        setPasswordError(false);
        setPasswordConvertError(true);
      } else {
        setPasswordCurrentError(false);
        setPasswordError(false);
        setPasswordConvertError(false);
        const data = {
          currentPassword: passwordCurrent,
          password: password,
          confirmPassword: passwordConvert,
        };
        dispatch(password_update(data));
      }
    };

    const passwordSection = () => {
      return (
        <>
          <AppInput
            secret
            title={Trans('oldPassword')}
            image={IMAGES.authPassword}
            value={passwordCurrent}
            placeholder={''}
            onChangeText={(text: string) =>setPasswordCurrent(text)}
            inputContainer={{borderColor: passwordCurrentError ? COLORS.red : COLORS.backgroundLight}}
            // error={'emailError'}
            // containerStyle={{marginTop: calcHeight(20)}}
          />
          <AppInput
            secret
            title={Trans('newPassword')}
            image={IMAGES.authPassword}
            value={password}
            placeholder={''}
            onChangeText={(text: string) =>setPassword(text)}
            inputContainer={{borderColor: passwordError ? COLORS.red : COLORS.backgroundLight}}
            // error={'emailError'}
            containerStyle={{marginTop: calcHeight(20)}}
          />
          <AppInput
            secret
            title={Trans('confirmNewPassword')}
            image={IMAGES.authPassword}
            value={passwordConvert}
            placeholder={''}
            onChangeText={(text: string) =>setPasswordConvert(text)}
            inputContainer={{borderColor: passwordConvertError ? COLORS.red : COLORS.backgroundLight}}
            // error={'emailError'}
            containerStyle={{marginTop: calcHeight(20)}}
          />
          <AppButtonDefault
            colorStart={COLORS.primaryGradient}
            colorEnd={COLORS.secondGradient}
            border={false}
            onPress={() => onUpdatePassword()}
            title={Trans('save')}
            buttonStyle={{marginTop: calcHeight(24)}}
          />
        </>
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
      </ScrollView>
    )
  };
  
  const loadingSection = () => {
    return (
      <AppLoading
        margin_top={calcHeight(440)}
        size={'large'}
        visible={profileLoader}
      />
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
    <View style={styles.container}>
      {loadingSection()}
      {headerSection()}
      {bodySection()}
      {modalUpdateData()}
      {modalUpdatePassword()}
    </View>
  );
};

export default Profile;


