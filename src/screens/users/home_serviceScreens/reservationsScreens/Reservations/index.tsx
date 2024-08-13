import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Trans } from '../../../../../translation';
import { COLORS } from '../../../../../utils/theme';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import AppTab from '../../../../../components/AppTab';
import AppTabView from '../../../../../components/AppTabView';
import { FlatList } from 'react-native-gesture-handler';
import ReservationItem from '../../../../../components/ReservationItem';
import { RootState, useAppDispatch } from '../../../../../redux/store/store';
import { useSelector } from 'react-redux';
import { pervious_data } from '../../../../../middleware/appointments/pervious/pervious';
import { upcoming_data } from '../../../../../middleware/appointments/upcoming/upcoming';
import { calcHeight } from '../../../../../utils/sizes';
import AppLoading from '../../../../../components/AppLoading';
import AppEmptyScreen from '../../../../../components/AppEmptyScreen/AppEmptyScreen';
import { setAppointmentsPerviousData } from '../../../../../redux/store/appointments_pervious/appointments_perviousSlice';

const Reservations: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { appointmentsPerviousLoader, appointmentsPerviousData, appointmentsPerviousCount } = useSelector((store: RootState) => store?.appointments_pervious);
  const { appointmentsUpcomingLoader, appointmentsUpcomingData, appointmentsUpcomingCount } = useSelector((store: RootState) => store?.appointments_upcoming);

  const [page_pervious, setPage_pervious] = useState<number>(1);
  const [page_upcoming, setPage_upcoming] = useState<number>(1);
  const [selectTab, setSelectTab] = useState<number>(1);
  const [selectFillter, setSelectFillter] = useState<string>('');

  const getPervious = (page: number) => {
    dispatch(pervious_data({page, status: selectFillter}));
  };
  const getUpcoming = (page: number) => {
    dispatch(upcoming_data({page}));
  };

  useEffect(() => {
    dispatch(setAppointmentsPerviousData([]));
    getPervious(1);
  }, [selectFillter]);

  useEffect(() => {
    getPervious(1);
    getUpcoming(1);
    setPage_pervious(1);
    setPage_upcoming(1);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPervious(1);
      getUpcoming(1);
      setPage_pervious(1);
      setPage_upcoming(1);
    });
    return unsubscribe;
  }, [navigation]);

  const _onRefresh_Pervious = () => {
    getPervious(1);
    setPage_pervious(1);
  };
  const _loadMore_Pervious = () => {
    if((appointmentsPerviousData.length < appointmentsPerviousCount)) {
      getPervious(page_pervious + 1);
      setPage_pervious(page_pervious + 1);
    }
  };

  const _onRefresh_Upcoming = () => {
    getPervious(1);
    setPage_pervious(1);
  };
  const _loadMore_Upcoming = () => {
    if((appointmentsUpcomingData.length < appointmentsUpcomingCount)) {
      getUpcoming(page_upcoming + 1);
      setPage_upcoming(page_upcoming + 1);
    }
  };

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
          onPress={() => setSelectFillter('')}
          containerStyle={{}}
          backgroundColor={selectFillter == '' ? 'rgba(197, 122, 222, 0.15)' : COLORS.white}
          select={selectFillter == ''}
          title={Trans('allReservations')}
        />
        <AppTabView
          onPress={() => setSelectFillter('completed')}
          containerStyle={{}}
          backgroundColor={selectFillter == 'completed' ? 'rgba(197, 122, 222, 0.15)' : COLORS.white}
          select={selectFillter == 'completed'}
          title={Trans('accepted')}
        />
        <AppTabView
          onPress={() => setSelectFillter('cancelled')}
          containerStyle={{}}
          backgroundColor={selectFillter == 'cancelled' ? 'rgba(197, 122, 222, 0.15)' : COLORS.white}
          select={selectFillter == 'cancelled'}
          title={Trans('cancelled')}
        />
        <AppTabView
          onPress={() => setSelectFillter('rejected_by_service_provider')}
          containerStyle={{}}
          backgroundColor={selectFillter == 'rejected_by_service_provider' ? 'rgba(197, 122, 222, 0.15)' : COLORS.white}
          select={selectFillter == 'rejected_by_service_provider'}
          title={Trans('rejected')}
        />
      </View>
    );
  };

  const listSectionPervious = () => {
    const renderItem = ({item, index} : {item: any, index: number}) => {
      return (
        <ReservationItem
          item={item}
          onPress={() => navigation.navigate('HS_ReservationDetailsStack', {screen: 'HS_ReservationDetails', id: item.id})}
        />
      )
    };

    return (
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={appointmentsPerviousData}
          renderItem={renderItem}
          keyExtractor={item => `${item}`}
          refreshing={appointmentsPerviousLoader && page_pervious == 1}
          onRefresh={_onRefresh_Pervious}
          onEndReached={() => {
            _loadMore_Pervious();
          }}
          onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.2}
          ListFooterComponent={() => {
            return (
              <>
                {appointmentsPerviousData.length == 0 ? (
                  <>
                    {/* <WarningScreen
                      image={IMAGES.emptySearch}
                      title={Trans('dontHaveSearchResultsTitle')}
                      description={Trans('dontHaveSearchResultsDescription')}
                    /> */}
                  </>
                ) : (
                  <View style={{backgroundColor: COLORS.backgroundLight, width: '100%', paddingVertical: calcHeight(4), justifyContent: 'center', paddingBottom: calcHeight(32)}}>
                    {(appointmentsPerviousLoader && page_pervious > 1) && <ActivityIndicator color={COLORS.primaryGradient} size={'large'}/>}
                  </View>
                )}
              </>
            )
          }}
        />
      </View>
    );
  };

  const listSectionUpcoming = () => {
    const renderItem = ({item, index} : {item: any, index: number}) => {
      return (
        <ReservationItem
          item={item}
          onPress={() => navigation.navigate('HS_ReservationDetailsStack', {screen: 'HS_ReservationDetails', id: item.id})}
        />
      )
    };

    return (
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={appointmentsUpcomingData}
          renderItem={renderItem}
          keyExtractor={item => `${item}`}
          refreshing={appointmentsUpcomingLoader && page_upcoming == 1}
          onRefresh={_onRefresh_Upcoming}
          onEndReached={() => {
            _loadMore_Upcoming();
          }}
          onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.2}
          ListFooterComponent={() => {
            return (
              <>
                {appointmentsUpcomingData.length == 0 ? (
                  <>
                    {/* <WarningScreen
                      image={IMAGES.emptySearch}
                      title={Trans('dontHaveSearchResultsTitle')}
                      description={Trans('dontHaveSearchResultsDescription')}
                    /> */}
                  </>
                ) : (
                  <View style={{backgroundColor: COLORS.backgroundLight, width: '100%', paddingVertical: calcHeight(4), justifyContent: 'center', paddingBottom: calcHeight(32)}}>
                    {(appointmentsUpcomingLoader && page_upcoming > 1) && <ActivityIndicator color={COLORS.primaryGradient} size={'large'}/>}
                  </View>
                )}
              </>
            )
          }}
        />
      </View>
    );
  };

  const emptySection = () => {
    const title = selectTab == 1 ? Trans('dontHaveAnyReservations') : (selectFillter == '' ? Trans('dontHaveAnyReservations') : selectFillter == 'completed' ? Trans('dontHaveAnyReservationsComplated') : selectFillter == 'cancelled' ? Trans('dontHaveAnyReservationsCanceled') : selectFillter == 'rejected_by_service_provider' ? Trans('dontHaveAnyReservationsRejected') : '')
    return (
      <AppEmptyScreen
        image={IMAGES.empty_appointment}
        title={title}
      />
    )
  };

  const loadingSection = () => {
    return (
      <AppLoading
        margin_top={calcHeight(440)}
        size={'large'}
        visible={(appointmentsPerviousLoader && page_pervious == 1) || (appointmentsUpcomingLoader && page_upcoming == 1)}
      />
    )
  };

  console.log('appointmentsUpcomingData---------', appointmentsUpcomingData);
  
  return (
    <View style={[styles.container, {paddingBottom: selectTab == 2 ? calcHeight(180) : calcHeight(140)}]}>
      {loadingSection()}
      {headerSection()}
      {tabsSection()}
      {selectTab == 2 && fillterSection()}
      {}
      {(selectTab == 2 && appointmentsPerviousData.length != 0) ? listSectionPervious() : (selectTab == 1 && appointmentsUpcomingData.length != 0) ? listSectionUpcoming() :  (appointmentsPerviousLoader || appointmentsUpcomingLoader)  ?  <></> : emptySection()}
      {}
    </View>
  );
};

export default Reservations;


