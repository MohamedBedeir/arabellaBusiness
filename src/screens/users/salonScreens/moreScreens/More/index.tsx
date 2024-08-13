import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Trans } from '../../../../../translation';
import { calcHeight, calcWidth } from '../../../../../utils/sizes';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import MoreItem from '../../../../../components/MoreItem';
import LogOutItem from '../../../../../components/LogOutItem';

const More: React.FC = () => {
  const navigation = useNavigation<any>();
  const [notification, setNotification] = useState<boolean>(false);

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <MoreItem
            onPress={() => navigation.navigate('SA_MoreDetailsStack', {screen: 'SA_Profile'})}
            image={IMAGES.moreAccount}
            title={Trans('profilePersonly')}
            icon={IMAGES.dropDown}
            iconStyle={{}}
          />
          <MoreItem
            onPress={() => navigation.navigate('SA_MoreDetailsStack', {screen: 'SA_Branches'})}
            image={IMAGES.moreBranches}
            title={Trans('branches')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          />
          <MoreItem
            onPress={() => navigation.navigate('SA_MoreDetailsStack', {screen: 'SA_Employees'})}
            image={IMAGES.moreEmployees}
            title={Trans('employees')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          />
          <MoreItem
            onPress={() => navigation.navigate('SA_MoreDetailsStack', {screen: 'SA_Services'})}
            image={IMAGES.moreService}
            title={Trans('services')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          />
          {/* <MoreItem
            onPress={() => navigation.navigate('SA_MoreDetailsStack', {screen: 'SA_Offers'})}
            image={IMAGES.moreOffers}
            title={Trans('offers')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          /> */}
          <MoreItem
            onPress={() => navigation.navigate('SA_MoreDetailsStack', {screen: 'SA_BlockAppointments'})}
            image={IMAGES.moreDate}
            title={Trans('blockAppointments')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          />
          {/* <MoreItem
            onPress={() => navigation.navigate('SA_MoreDetailsStack', {screen: 'SA_Accounts'})}
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
            onPress={() => navigation.navigate('SA_MoreDetailsStack', {screen: 'SA_Language'})}
            image={IMAGES.moreLanguage}
            title={Trans('language')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          />
          {/* <MoreItem
            onPress={() => navigation.navigate('SA_MoreDetailsStack', {screen: 'SA_Ratings'})}
            image={IMAGES.moreReviews}
            title={Trans('ratings')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          /> */}
          <MoreItem
          onPress={() => navigation.navigate('SA_MoreDetailsStack', {screen: 'SA_TermsAndConditions'})}
          image={IMAGES.morePolicy}
            title={Trans('arabellaPolicies')}
            icon={IMAGES.dropDown}
            containerStyle={styles.moreItemContainer}
            iconStyle={{}}
          />
          <LogOutItem
            containerStyle={{marginTop: calcHeight(24)}}
            onPress={() => {}}
            image={IMAGES.moreLogout}
            title={Trans('signOut')}
          />
        </View>
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

export default More;


