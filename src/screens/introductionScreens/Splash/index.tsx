import React, { useEffect } from 'react';
import {I18nManager, Image, NativeModules, Platform, View,} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from '../../../translation';
import { IMAGES } from '../../../assets/Images';
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { init_lang, init_token } from '../../../network';

const Splash: React.FC<{}> = (params: any) => {
  useEffect(() => {
    checkLanguage();
  }, []);

  const checkInternet = async (): Promise<void> => {
    const response: NetInfoState = await NetInfo.fetch();
    console.log("NETINFO RESPONSE == ", response)
    if(response.isConnected) {
      startup();
    } else{
      params.navigation.navigate('NoInternet');
    }
  };

  const checkLanguage = async (): Promise<void> => {
    const _lang = await AsyncStorage.getItem('user_lang');
    const locale = Platform.OS === 'ios' ? 
      (NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]).substring(0, 2) 
      : (NativeModules.I18nManager.localeIdentifier).substring(0, 2);

    if (_lang) {
      init_lang(_lang);
      I18n.locale = _lang;
      I18nManager.allowRTL(_lang === 'ar');
      I18nManager.forceRTL(_lang === 'ar');
    } else {
      console.log('locale----------', locale);
      if (locale) {
        //-------test------
        await AsyncStorage.setItem('user_lang', 'ar');
        init_lang('ar');
        I18n.locale = 'ar';
        I18nManager.allowRTL('ar' === 'ar');
        I18nManager.forceRTL('ar' === 'ar');
        // await AsyncStorage.setItem('user_lang', locale);
        // I18n.locale = locale;
        // init_lang(locale);
        // I18nManager.allowRTL(locale === 'ar');
        // I18nManager.forceRTL(locale === 'ar');
      } else {
        await AsyncStorage.setItem('user_lang', 'ar');
        init_lang('ar');
        I18n.locale = 'ar';
        I18nManager.allowRTL('ar' === 'ar');
        I18nManager.forceRTL('ar' === 'ar');
      }
    }
    checkInternet()
  };

  const startup = async () => {
    const skip: any = await AsyncStorage.getItem('skip');
    const user: any = await AsyncStorage.getItem('user');
    const token: any = await AsyncStorage.getItem('token');

    setTimeout(() => {
      if (skip == 'done') {
        if (user && JSON.parse(user).id) {
          const _user = JSON.parse(user);
          init_token(token);
          const userData = JSON.parse(user);
          if (userData.type == 'super_admin' || userData.type == 'admin') {
            params.navigation.navigate('AD_Tabs');
          } else if (userData.type == 'salon_admin') {
            params.navigation.navigate('SA_Tabs');
          } else if (userData.type == 'makeup_artist') {
            params.navigation.navigate('MA_Tabs');
          } else if (userData.type == 'home_service_provider') {
            params.navigation.navigate('HS_Tabs');
          };
        } else {
          params.navigation.navigate('AuthenticationStack', {screen: 'Login'});
        }
      } else {
        params.navigation.navigate('Definition');
      }
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Image source={IMAGES.splashScreen} style={styles.splashScreen}/>
    </View>
  );
};
export default Splash;
