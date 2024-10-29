import React, { useEffect } from 'react';
import {I18nManager, Image, NativeModules, Platform, View,} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from '../../../translation';
import { IMAGES } from '../../../assets/Images';
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { init_lang, init_token } from '../../../network';
import { useAppDispatch } from '../../../redux/store/store';
import { cities } from '../../../middleware/general/cities';
import { setAppointmentTimer } from '../../../redux/store/appointment_timer/appointment_timer';
import { appVersions } from '../../../middleware/general/appVersion';
// import messaging from '@react-native-firebase/messaging';

const Splash: React.FC<{}> = (params: any) => {
  const dispatch = useAppDispatch();
  // const testNewNoti = async () => {
  //   // messaging().onMessage(async message => this.getNotifications());
  //   const authStatus = await messaging().requestPermission();
  //   console.log("authStatus---------", authStatus);
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //   if (enabled) {
  //     console.log("Authorization status:-------------------", authStatus);
  //   }
  // };
  // messaging().getInitialNotification().then(async (remoteMessage: any) => {
  //   console.log('getInitialNotification-------tabs--------', remoteMessage);
  //   if (remoteMessage.data.notificationType == 'appointment' || remoteMessage.data.notificationType == 'reviewService' && remoteMessage.data.notificationTypeId) {
  //     // navigation.navigate('ReservationDetails', {appointmentId: remoteMessage.data.notificationTypeId});
  //   } else if (remoteMessage.data.notificationType == 'serviceProvider' && remoteMessage.data.notificationTypeId) {
  //     // navigation.navigate("AllBranches", { salonId: remoteMessage.data.id });
  //   } else if (remoteMessage.data.notificationType == 'branch' && remoteMessage.data.notificationTypeId) {
  //     // navigation.navigate("SalonDetails", {id: remoteMessage.data.notificationTypeId});
  //   } else if (remoteMessage.data.notificationType == 'service' && remoteMessage.data.notificationTypeId) {
  //     console.log('remoteMessage.data.notificationType == service && remoteMessage.data.notificationTypeId)');
  //     // navigation.navigate('ServiceDetails', {
  //     //   type: 'from branch',
  //     //   serviceId: remoteMessage.data.notificationTypeId,
  //     //   salonId: remoteMessage.data?.serviceProviderId,
  //     //   branchId: remoteMessage.data?.params.item.id,
  //     //   address: remoteMessage.data?.address,
  //     //   location: remoteMessage.data?.location,
  //     // });
  //   } else if (remoteMessage.data.notificationType == 'offer' && remoteMessage.data.notificationTypeId) {
  //     console.log('remoteMessage.data.notificationType == offer && remoteMessage.data.notificationTypeId');
  //     // navigation.navigate('ServiceDetails', {
  //     //   type: 'from offers',
  //     //   serviceId: remoteMessage.data.notificationTypeId,
  //     // });
  //   } else if (remoteMessage.data.notificationType == 'coupon') {
  //     // navigation.navigate('Notifications');
  //   } else {
  //     console.log('nullnullnullnullnullnullnullnullnull');
  //     null;
  //   }
  // });
  useEffect(() => {
    // testNewNoti();
    checkLanguage();
    dispatch(cities({}));
    dispatch(appVersions({}));
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
          await AsyncStorage.setItem('user_lang', locale);
          init_lang(locale);
          I18n.locale = locale;
          I18nManager.allowRTL('ar' === locale);
          I18nManager.forceRTL('ar' === locale);
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
    const timer : any = await AsyncStorage.getItem('timer');
    console.log('timer-------------', timer, parseInt(timer, 10));
    
    dispatch(setAppointmentTimer(parseInt(timer, 10)));
    setTimeout(() => {
      if (skip == 'done') {
        if (user && JSON.parse(user).id) {
          const _user = JSON.parse(user);
          init_token(token);
          const userData = JSON.parse(user);
          console.log('userData--------', userData);
          
          if (userData.type == 'super_admin' || userData.type == 'admin') {
            params.navigation.navigate('AD_Tabs');
          } else if (userData.type == 'salon_admin') {
            params.navigation.navigate('SA_Tabs');
          } else if (userData.type == 'makeup_artist') {
            params.navigation.navigate('MA_Tabs');
          } else if (userData.type == 'home_service_provider') {
            params.navigation.navigate('HS_Tabs');
          } else if (userData.type == 'trainer') {
            params.navigation.navigate('TR_Tabs');
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
