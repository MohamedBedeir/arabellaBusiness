import React, { useEffect } from 'react';
import {I18nManager, Image, NativeModules, Platform, StatusBar, Text, View,} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from '../../../translation';
import { IMAGES } from '../../../assets/Images';
import { COLORS } from '../../../utils/theme';

const Splash: React.FC<{}> = (params: any) => {
  useEffect(() => {
    checkLanguage();
  }, []);

  const checkLanguage = async (): Promise<void> => {
    const _lang: string = 'ar';
    I18n.locale = _lang;
    // RestWorker.init_language(_lang);
    I18nManager.allowRTL(_lang === 'ar');
    I18nManager.forceRTL(_lang === 'ar');
    // const _lang = await AsyncStorage.getItem('user_lang');
    // const locale = Platform.OS === 'ios' ? 
    //   (NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]).substring(0, 2) 
    //   : (NativeModules.I18nManager.localeIdentifier).substring(0, 2);
    // console.log('====>>>>>>>>', _lang, '--', locale);
    // if (_lang) {
    //   console.log('lang---------', _lang);
    //   // init_lang(_lang);
    //   I18n.locale = _lang;
    //   // RestWorker.init_language(_lang);
    //   I18nManager.allowRTL(_lang === 'ar');
    //   I18nManager.forceRTL(_lang === 'ar');
    // } else {
    //   console.log('locale----------', locale);
    //   if (locale) {
    //     await AsyncStorage.setItem('user_lang', locale);
    //     I18n.locale = locale;
    //     // init_lang(locale);
    //     // RestWorker.init_language(_lang);
    //     I18nManager.allowRTL(locale === 'ar');
    //     I18nManager.forceRTL(locale === 'ar');
    //   } else {
    //     await AsyncStorage.setItem('user_lang', 'ar');
    //     // init_lang('ar');
    //     I18n.locale = 'ar';
    //     // RestWorker.init_language(_lang);
    //     I18nManager.allowRTL('ar' === 'ar');
    //     I18nManager.forceRTL('ar' === 'ar');
    //   }
    // }
    startup();
  };

  const startup = async () => {
    // console.log('user_data = ', JSON.parse(user_data));
    // if (JSON.parse(user_data)?.access_token) {
    //   init_token(`Bearer ${JSON.parse(user_data).access_token}`);
    // } else if (JSON.parse(user_data)?.token) {
    //   init_token(JSON.parse(user_data).token);
    // }
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
