import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Trans } from '../../../../../translation';
import { COLORS, FONTS } from '../../../../../utils/theme';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import AppTab from '../../../../../components/AppTab';
import AppTabView from '../../../../../components/AppTabView';
import { FlatList } from 'react-native-gesture-handler';
import ReservationItem from '../../../../../components/ReservationItem';

const Reservations: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectTab, setSelectTab] = useState<number>(1);
  const [selectFillter, setSelectFillter] = useState<number>(1);

  const headerSection = () => {
    return (
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('reservations')}
        logo={IMAGES.logoColors}
      />
    )
  };

  const tabsSection = () => {
    return (
      <View style={styles.tabsContainer}>
        <AppTab
          onPress={() => setSelectTab(1)}
          containerStyle={{}}
          select={selectTab == 1}
          title={Trans('upcomingReservations')}
        />
        <AppTab
          onPress={() => setSelectTab(2)}
          containerStyle={{}}
          select={selectTab == 2}
          title={Trans('previousReservations')}
        />
      </View>
    );
  };

  const fillterSection = () => {
    return (
      <View style={styles.filtterContainer}>
        <AppTabView
          onPress={() => setSelectFillter(1)}
          containerStyle={{}}
          backgroundColor={selectFillter == 1 ? 'rgba(197, 122, 222, 0.15)' : COLORS.white}
          select={selectFillter == 1}
          title={Trans('allReservations')}
        />
        <AppTabView
          onPress={() => setSelectFillter(2)}
          containerStyle={{}}
          backgroundColor={selectFillter == 2 ? 'rgba(197, 122, 222, 0.15)' : COLORS.white}
          select={selectFillter == 2}
          title={Trans('accepted')}
        />
        <AppTabView
          onPress={() => setSelectFillter(3)}
          containerStyle={{}}
          backgroundColor={selectFillter == 3 ? 'rgba(197, 122, 222, 0.15)' : COLORS.white}
          select={selectFillter == 3}
          title={Trans('cancelled')}
        />
      </View>
    );
  };

  const listSection = () => {
    const renderItem = ({item, index} : {item: any, index: number}) => {
      return (
        <ReservationItem
          item={item}
          onPress={() => navigation.navigate('MA_ReservationDetailsStack', {screen: 'MA_ReservationDetails'})}
        />
      )
    };

    return (
      <View style={styles.listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[1,2,3,4,5,6]}
            renderItem={renderItem}
            keyExtractor={item => `${item}`}
          />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {headerSection()}
      {tabsSection()}
      {selectTab == 2 && fillterSection()}
      {listSection()}
    </View>
  );
};

export default Reservations;


