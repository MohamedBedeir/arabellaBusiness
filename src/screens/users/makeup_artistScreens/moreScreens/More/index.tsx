import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Trans } from '../../../../../translation';
import { calcWidth } from '../../../../../utils/sizes';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import MoreItem from '../../../../../components/MoreItem';
import LogOutItem from '../../../../../components/LogOutItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { init_token } from '../../../../../network';
import RNRestart from 'react-native-restart';
import Modal_Warning from '../../../../../components/Modal_Warning';

const More: React.FC = () => {
  const navigation = useNavigation<any>();
  const [notification, setNotification] = useState<boolean>(false);
  const [visibleLogout, setVisibleLogout] = useState<boolean>(false);
  


  const restart = () => {
    setTimeout(() => {
      RNRestart.Restart();
    }, 500);
  };

  const logout =  async() => {
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
        <MoreItem
          onPress={() => navigation.navigate('MA_MoreDetailsStack', {screen: 'MA_Profile'})}
          image={IMAGES.moreAccount}
          title={Trans('profilePersonly')}
          icon={IMAGES.dropDown}
          iconStyle={{}}
        />
        <MoreItem
          onPress={() => navigation.navigate('MA_MoreDetailsStack', {screen: 'MA_Services'})}
          image={IMAGES.moreService}
          title={Trans('services')}
          icon={IMAGES.dropDown}
          containerStyle={styles.moreItemContainer}
          iconStyle={{}}
        />
        <MoreItem
          onPress={() => navigation.navigate('MA_MoreDetailsStack', {screen: 'MA_BlockAppointments'})}
          image={IMAGES.moreDate}
          title={Trans('blockAppointments')}
          icon={IMAGES.dropDown}
          containerStyle={styles.moreItemContainer}
          iconStyle={{}}
        />
        <MoreItem
          onPress={() => setNotification(!notification)}
          image={IMAGES.moreNotifications}
          title={Trans('notifications')}
          icon={notification ? IMAGES.switchActive : IMAGES.switchUnActive}
          containerStyle={styles.moreItemContainer}
          iconStyle={{transform: [{rotate: '0deg'}], width: calcWidth(34), height: calcWidth(20)}}
        />
        <MoreItem
          onPress={() => navigation.navigate('MA_MoreDetailsStack', {screen: 'MA_Language'})}
          image={IMAGES.moreLanguage}
          title={Trans('language')}
          icon={IMAGES.dropDown}
          containerStyle={styles.moreItemContainer}
          iconStyle={{}}
        />
        <MoreItem
          onPress={() => navigation.navigate('MA_MoreDetailsStack', {screen: 'MA_TermsAndConditions'})}
          image={IMAGES.morePolicy}
          title={Trans('arabellaPolicies')}
          icon={IMAGES.dropDown}
          containerStyle={styles.moreItemContainer}
          iconStyle={{}}
        />
        <LogOutItem
          containerStyle={{}}
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


