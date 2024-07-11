import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../../../components/AppText';
import { Trans } from '../../../../../translation';
import { calcFont, calcWidth } from '../../../../../utils/sizes';
import { COLORS, FONTS } from '../../../../../utils/theme';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import MoreItem from '../../../../../components/MoreItem';
import LogOutItem from '../../../../../components/LogOutItem';

const More: React.FC = () => {
  const navigation = useNavigation<any>();
  const [notification, setNotification] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('more')}
        logo={IMAGES.logoColors}
      />
      <View style={styles.body}>
        <MoreItem
          onPress={() => navigation.navigate('MA_MoreDetailsStack', {screen: 'MA_Profile'})}
          image={IMAGES.moreAccount}
          title={Trans('profilePersonly')}
          icon={IMAGES.dropDown}
          iconStyle={{}}
        />
        <MoreItem
          onPress={() => navigation.navigate('MA_MoreDetailsStack', {screen: 'MA_AvailableServices'})}
          image={IMAGES.moreService}
          title={Trans('availableServices')}
          icon={IMAGES.dropDown}
          containerStyle={styles.moreItemContainer}
          iconStyle={{}}
        />
        <MoreItem
          onPress={() => navigation.navigate('MA_MoreDetailsStack', {screen: 'MA_AvailableServices'})}
          image={IMAGES.moreService}
          title={Trans('availableServices')}
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
          onPress={() => {}}
          image={IMAGES.morePolicy}
          title={Trans('arabellaPolicies')}
          icon={IMAGES.dropDown}
          containerStyle={styles.moreItemContainer}
          iconStyle={{}}
        />
        <LogOutItem
        containerStyle={{}}
        onPress={() => {}}
        image={IMAGES.moreLogout}
        title={Trans('signOut')}
        />
      </View>
    </View>
  );
};

export default More;


