import React, { useEffect } from 'react';

import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import IntroductionStack from './Stacks/IntroductionStack';
import AuthenticationStack from './Stacks/AuthenticationStack';
import MA_Tabs from './Tabs/MA_Tabs';
import I18n from '../translation';
import { I18nManager } from 'react-native';
import MA_MoreDetailsStack from './Stacks/MA_MoreDetailsStack';
import MA_MoreStack from './Stacks/MA_MoreStack';
import MA_ReservationDetailsStack from './Stacks/MA_ReservationDetailsStack';
import MA_HomeDetailsStack from './Stacks/MA_HomeDetailsStack';
import MA_HomeStack from './Stacks/MA_HomeStack';

export const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();

const RootStack = createStackNavigator();

const RootNavigation = () => {
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
  };
  return (
    <RootStack.Navigator
      initialRouteName={'MA_Tabs'}
      screenOptions={{headerShown: false}}
    >
      <RootStack.Screen name="IntroductionStack" component={IntroductionStack} />
      <RootStack.Screen name="AuthenticationStack" component={AuthenticationStack} />
      <RootStack.Screen name="MA_Tabs" component={MA_Tabs}/>
      <RootStack.Screen name="MA_HomeStack" component={MA_HomeStack} />
      <RootStack.Screen name="MA_HomeDetailsStack" component={MA_HomeDetailsStack} />
      <RootStack.Screen name="MA_MoreStack" component={MA_MoreStack} />
      <RootStack.Screen name="MA_MoreDetailsStack" component={MA_MoreDetailsStack} />
      <RootStack.Screen name="MA_ReservationDetailsStack" component={MA_ReservationDetailsStack} />
      
      
      
    </RootStack.Navigator>
  );
};

const Navigation: React.FC = () => (
  <NavigationContainer ref={navigationRef}>
    <RootNavigation />
  </NavigationContainer>
);
export default Navigation;

export const navigate = (name: any, params: object | undefined) => {
  navigationRef.current ? navigationRef.current.navigate(name, params) : undefined;
};
