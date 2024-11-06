import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Trans } from '../../../../../translation';
import { calcHeight, calcWidth } from '../../../../../utils/sizes';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import MoreItem from '../../../../../components/MoreItem';
import LogOutItem from '../../../../../components/LogOutItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { getMessaging } from '@react-native-firebase/messaging';
import endpoints from '../../../../../network/endpoints';
import { init_token } from '../../../../../network';
import Modal_Warning from '../../../../../components/Modal_Warning';


const More: React.FC = () => {
  const navigation = useNavigation<any>();
  const [userData, setUserData] = useState<any>();
  const [notification, setNotification] = useState<boolean>(false);
  const [visibleLogout, setVisibleLogout] = useState<boolean>(false);

  const getUser = async () => {
    const user: any = await AsyncStorage.getItem('user');
    setUserData(JSON.parse(user));
  };

  useEffect(() => {
    getUser();
  }, []);

  const restart = () => {
    setTimeout(() => {
      RNRestart.Restart();
    }, 500);
  };

  const logout =  async() => {
    getMessaging().unsubscribeFromTopic(`${endpoints.topik}${userData?.id}`).then((item: any) => {
      console.log('unsubscribeFromTopic--------', item);
      
    });
    await AsyncStorage.setItem('user', '');
    init_token('');
    restart();
  }

  const headerSection = () => {
    return (
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('more')}
        logo={IMAGES.logoColors}
      />
    )
  };

  const bodySection = () => {
    return (
      <View style={styles.body}>
        <View>
          <MoreItem
            onPress={() => navigation.navigate('SC_MoreDetailsStack', {screen: 'SC_Profile'})}
            image={IMAGES.moreAccount}
            title={Trans('profilePersonly')}
            icon={IMAGES.dropDown}
            iconStyle={{}}
          />
          {/* <MoreItem
            onPress={() => navigation.navigate('SC_MoreDetailsStack', {screen: 'SC_Branches'})}
            image={IMAGES.moreBranches}
            title={Trans('branches')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          /> */}
          {/* <MoreItem
            onPress={() => navigation.navigate('SC_MoreDetailsStack', {screen: 'SC_Employees'})}
            image={IMAGES.moreEmployees}
            title={Trans('employees')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          /> */}
          {/* <MoreItem
            onPress={() => navigation.navigate('SC_MoreDetailsStack', {screen: 'SC_Services'})}
            image={IMAGES.moreService}
            title={Trans('services')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          /> */}
          {/* <MoreItem
            onPress={() => navigation.navigate('SC_MoreDetailsStack', {screen: 'SC_Offers'})}
            image={IMAGES.moreOffers}
            title={Trans('offers')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          /> */}
          <MoreItem
            onPress={() => navigation.navigate('SC_MoreDetailsStack', {screen: 'SC_BlockAppointments'})}
            image={IMAGES.moreDate}
            title={Trans('blockAppointments')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          />
          {/* <MoreItem
            onPress={() => navigation.navigate('SC_MoreDetailsStack', {screen: 'SC_Accounts'})}
            image={IMAGES.moreAccounts}
            title={Trans('accounts')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          /> */}
          {/* <MoreItem
            onPress={() => setNotification(!notification)}
            image={IMAGES.moreNotifications}
            title={Trans('notifications')}
            icon={notification ? IMAGES.switchActive : IMAGES.switchUnActive}
            containerStyle={styles.moreItemContainer}
            iconStyle={{transform: [{rotate: '0deg'}], width: calcWidth(34), height: calcWidth(20)}}
          /> */}
          <MoreItem
            onPress={() => navigation.navigate('SC_MoreDetailsStack', {screen: 'SC_Language'})}
            image={IMAGES.moreLanguage}
            title={Trans('language')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          />
          {/* <MoreItem
            onPress={() => navigation.navigate('SC_MoreDetailsStack', {screen: 'SC_Ratings'})}
            image={IMAGES.moreReviews}
            title={Trans('ratings')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          /> */}
          <MoreItem
            onPress={() => navigation.navigate('SC_MoreDetailsStack', {screen: 'SC_TermsAndConditions'})}
            image={IMAGES.morePolicy}
            title={Trans('arabellaPolicies')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          />
        </View>
        <LogOutItem
          containerStyle={{marginTop: calcHeight(24)}}
          onPress={() => setVisibleLogout(true)}
          image={IMAGES.moreLogout}
          title={Trans('signOut')}
        />
      </View>
    )
  };

  const modalLogoutSection = () => {
    return (
      <Modal_Warning
        visible={visibleLogout}
        onClose={() => setVisibleLogout(false)}
        onPress1={() => logout()}
        onPress2={() => setVisibleLogout(false)}
        image={IMAGES.modalCancel}
        title={Trans('doWantLogout')}
        button1Title={Trans('yes')}
        button2Title={Trans('no')}
      />
    )
  };
  
  return (
    <View style={styles.container}>
      {headerSection()}
      {bodySection()}
      {modalLogoutSection()}
    </View>
  );
};

export default More;


