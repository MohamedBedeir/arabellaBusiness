import React, { useEffect } from 'react';
import {I18nManager, Image, NativeModules, Platform, View,} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from '../../../translation';
import { IMAGES } from '../../../assets/Images';
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { init_lang } from '../../../network';

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
    const skip = await AsyncStorage.getItem('skip');
    setTimeout(() => {
      // params.navigation.navigate('Definition');
      if (skip == 'done') {
        params.navigation.navigate('Definition');
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
