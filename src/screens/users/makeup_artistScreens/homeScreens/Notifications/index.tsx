import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../../../components/AppText';
import { Trans } from '../../../../../translation';
import { COLORS, FONTS } from '../../../../../utils/theme';
import { calcFont, calcHeight } from '../../../../../utils/sizes';
import { IMAGES } from '../../../../../assets/Images';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import NotificationItem from '../../../../../components/NotificationItem';
import Modal_Warning from '../../../../../components/Modal_Warning';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../../redux/store/store';
import AppLoading from '../../../../../components/AppLoading';
import { notifications_data, notifications_delete } from '../../../../../middleware/notifications/notifications';

const Notifications: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { notificationsLoader, notificationsData } = useSelector((store: RootState) => store?.notifications);
  const [visibleDeleteAllNotification, setVisibleDeleteAllNotification] = useState<boolean>(false);

  const getNotifications = () => {
    dispatch(notifications_data({}));
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const headerSection = () => {
    return (
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('notifications')}
        logo={IMAGES.logoColors}
      />
    )
  };

  const deleteAllSection = () => {
    return (
      <View style={styles.deleteContainer}>
        <TouchableOpacity
          style={styles.deleteTouch}
          onPress={() => setVisibleDeleteAllNotification(true)}
        >
          <AppText
            title={Trans('deleteNotifications')}
            color={COLORS.red}
            fontFamily={FONTS.bold}
            fontSize={calcFont(14)}
          />
        </TouchableOpacity>
      </View>
    )
  };

  const listSection = () => {
    const renderItem = ({item, index} : {item: any, index: number}) => {
      return (
        <NotificationItem
          item={item}
          onPress={() => navigation.navigate('MA_ReservationDetailsStack', {screen: 'MA_ReservationDetails', id: item.notificationTypeId})}
        />
      )
    };

    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={notificationsData}
          renderItem={renderItem}
          keyExtractor={item => `${item}`}
        />
      </View>
    )
  };

  const modalDelateAllSection = () => {
    return (
      <Modal_Warning
        visible={visibleDeleteAllNotification}
        onClose={() => setVisibleDeleteAllNotification(false)}
        onPress1={() => {setVisibleDeleteAllNotification(false); dispatch(notifications_delete({}))}}
        onPress2={() => setVisibleDeleteAllNotification(false)}
        image={IMAGES.modalCancel}
        title={Trans('areSureCanDeleteAllNotifications')}
        button1Title={Trans('yes')}
        button2Title={Trans('no')}
      />
    )
  };

  const loadingSection = () => {
    return (
      <AppLoading
        margin_top={calcHeight(440)}
        size={'large'}
        visible={notificationsLoader}
      />
    )
  };

  return (
    <View style={styles.container}>
      {loadingSection()}
      {headerSection()}
      {notificationsData?.length >= 1 && deleteAllSection()}
      {listSection()}
      {modalDelateAllSection()}
    </View>
  );
};

export default Notifications;