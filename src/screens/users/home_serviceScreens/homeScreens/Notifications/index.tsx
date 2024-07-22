import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../../../components/AppText';
import { Trans } from '../../../../../translation';
import { COLORS, FONTS } from '../../../../../utils/theme';
import { calcFont } from '../../../../../utils/sizes';
import { IMAGES } from '../../../../../assets/Images';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import NotificationItem from '../../../../../components/NotificationItem';
import Modal_Warning from '../../../../../components/Modal_Warning';
import { DUMMY_DATA } from '../../../../../utils/dummyData';

const Notifications: React.FC = () => {
  const navigation = useNavigation<any>();
  const [visibleDeleteAllNotification, setVisibleDeleteAllNotification] = useState<boolean>(false);

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
          onPress={() => {}}
        />
      )
    };

    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DUMMY_DATA.NOTIFICATIONS}
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
        onPress1={() => setVisibleDeleteAllNotification(false)}
        onPress2={() => setVisibleDeleteAllNotification(false)}
        image={IMAGES.modalCancel}
        title={Trans('areSureCanDeleteAllNotifications')}
        button1Title={Trans('yes')}
        button2Title={Trans('no')}
      />
    )
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle={'dark-content'}/> */}
      {headerSection()}
      {deleteAllSection()}
      {listSection()}
      {modalDelateAllSection()}
    </View>
  );
};

export default Notifications;