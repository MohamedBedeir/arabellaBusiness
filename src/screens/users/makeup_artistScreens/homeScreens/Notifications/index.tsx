import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../../../components/AppText';
import { Trans } from '../../../../../translation';
import { COLORS, FONTS } from '../../../../../utils/theme';
import { calcFont, calcHeight, calcWidth } from '../../../../../utils/sizes';
import AppHeaderAdvanced from '../../../../../components/AppHeaderAdvanced';
import ReservationsReport from '../../../../../components/ReservationsReport';
import { IMAGES } from '../../../../../assets/Images';
import SearchByDate from '../../../../../components/SearchByDate';
import AppButtonDefault from '../../../../../components/AppButtonDefault';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import AppDataLine from '../../../../../components/AppDataLine';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import NotificationItem from '../../../../../components/NotificationItem';
import Modal_Warning from '../../../../../components/Modal_Warning';

const Notifications: React.FC = () => {
  const navigation = useNavigation<any>();
  const [visibleDeleteAllNotification, setVisibleDeleteAllNotification] = useState<boolean>(false);

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
    const DATA = [
      { title: 'طلب جديد' },
      { title: 'قبول عرض' },
      { title: 'رفض عرض' },
      { title: 'اقتراب موعد حجز' },
    ]
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
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => `${item}`}
        />
      </View>
    )
  }

  // const data=[ {value:50}, {value:80}, {value:90}, {value:70}, {value:90} ]
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'}/>
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('notifications')}
        logo={IMAGES.logoColors}
      />
      {deleteAllSection()}
      {listSection()}
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
    </View>
  );
};

export default Notifications;