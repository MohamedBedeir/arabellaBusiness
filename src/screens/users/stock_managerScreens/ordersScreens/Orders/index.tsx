import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Trans } from '../../../../../translation';
import { COLORS } from '../../../../../utils/theme';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import AppTab from '../../../../../components/AppTab';
import { FlatList } from 'react-native-gesture-handler';
import { RootState, useAppDispatch } from '../../../../../redux/store/store';
import { useSelector } from 'react-redux';
import { calcHeight } from '../../../../../utils/sizes';
import AppLoading from '../../../../../components/AppLoading';
import AppEmptyScreen from '../../../../../components/AppEmptyScreen/AppEmptyScreen';
import { upcoming_data_product_orders } from '../../../../../middleware/orders/upcoming/upcoming';
import { pervious_data_product_orders } from '../../../../../middleware/orders/pervious/pervious';
import { cancelled_data_product_orders } from '../../../../../middleware/orders/cancelled/cancelled';
import OrderItem from '../../../../../components/OrderItem';

const Orders: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { ordersUpcomingLoader, ordersUpcomingData, ordersUpcomingCount } = useSelector((store: RootState) => store?.orders_upcoming);
  const { ordersPerviousLoader, ordersPerviousData, ordersPerviousCount } = useSelector((store: RootState) => store?.orders_pervious);
  const { ordersCancelledLoader, ordersCancelledData, ordersCancelledCount } = useSelector((store: RootState) => store?.orders_cancelled);

  const [page_pervious, setPage_pervious] = useState<number>(1);
  const [page_upcoming, setPage_upcoming] = useState<number>(1);
  const [page_cancelled, setPage_cancelled] = useState<number>(1);
  const [selectTab, setSelectTab] = useState<number>(1);

  const getUpcoming = (page: number) => {
    dispatch(upcoming_data_product_orders({page}));
  };
  const getPervious = (page: number) => {
    dispatch(pervious_data_product_orders({page}));
  };
  const getCancelled = (page: number) => {
    dispatch(cancelled_data_product_orders({page}));
  };

  useEffect(() => {
    getUpcoming(1);
    getPervious(1);
    getCancelled(1);
    setPage_pervious(1);
    setPage_upcoming(1);
    setPage_cancelled(1);
  }, []);
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUpcoming(1);
      getPervious(1);
      getCancelled(1);
      setPage_pervious(1);
      setPage_upcoming(1);
      setPage_cancelled(1);
    });
    return unsubscribe;
  }, [navigation]);

  const _onRefresh_Upcoming = () => {
    getPervious(1);
    setPage_pervious(1);
  };
  const _loadMore_Upcoming = () => {
    if((ordersUpcomingData.length < ordersUpcomingCount)) {
      getUpcoming(page_upcoming + 1);
      setPage_upcoming(page_upcoming + 1);
    }
  };

  const _onRefresh_Pervious = () => {
    getPervious(1);
    setPage_pervious(1);
  };
  const _loadMore_Pervious = () => {
    if((ordersPerviousData.length < ordersPerviousCount)) {
      getPervious(page_pervious + 1);
      setPage_pervious(page_pervious + 1);
    }
  };

  const _onRefresh_Cancelled = () => {
    getCancelled(1);
    setPage_cancelled(1);
  };
  const _loadMore_Cancelled = () => {
    if((ordersCancelledData.length < ordersCancelledCount)) {
      getCancelled(page_cancelled + 1);
      setPage_cancelled(page_cancelled + 1);
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
          title={Trans('upcomingOrders')}
        />
        <AppTab
          onPress={() => setSelectTab(2)}
          containerStyle={{}}
          select={selectTab == 2}
          title={Trans('perviousOrders')}
        />
        <AppTab
          onPress={() => setSelectTab(3)}
          containerStyle={{}}
          select={selectTab == 3}
          title={Trans('canceledOrders')}
        />
      </View>
    );
  };

  const listSectionPervious = () => {
    const renderItem = ({item, index} : {item: any, index: number}) => {
      return (
        <OrderItem
          item={item}
          onPress={() => navigation.navigate('SM_OrderDetailsStack', {screen: 'SM_OrderDetails', id: item?.id})}
        />
      )
    };

    return (
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={ordersPerviousData}
          renderItem={renderItem}
          keyExtractor={item => `${item}`}
          refreshing={ordersPerviousLoader && page_pervious == 1}
          onRefresh={_onRefresh_Pervious}
          onEndReached={() => {
            _loadMore_Pervious();
          }}
          onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.2}
          ListFooterComponent={() => {
            return (
              <>
                {ordersPerviousData.length == 0 ? null : (
                  <View style={{backgroundColor: COLORS.backgroundLight, width: '100%', paddingVertical: calcHeight(4), justifyContent: 'center', paddingBottom: calcHeight(32)}}>
                    {(ordersPerviousLoader && page_pervious > 1) && <ActivityIndicator color={COLORS.primaryGradient} size={'large'}/>}
                  </View>
                )}
              </>
            )
          }}
        />
      </View>
    );
  };

  const listSectionCancelled = () => {
    const renderItem = ({item, index} : {item: any, index: number}) => {
      return (
        <OrderItem
          item={item}
          onPress={() => navigation.navigate('SM_OrderDetailsStack', {screen: 'SM_OrderDetails', id: item?.id})}
        />
      )
    };

    return (
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={ordersCancelledData}
          renderItem={renderItem}
          keyExtractor={item => `${item}`}
          refreshing={ordersCancelledLoader && page_cancelled == 1}
          onRefresh={_onRefresh_Cancelled}
          onEndReached={() => {
            _loadMore_Cancelled();
          }}
          onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.2}
          ListFooterComponent={() => {
            return (
              <>
                {ordersCancelledData.length == 0 ? null : (
                  <View style={{backgroundColor: COLORS.backgroundLight, width: '100%', paddingVertical: calcHeight(4), justifyContent: 'center', paddingBottom: calcHeight(32)}}>
                    {(ordersCancelledLoader && page_cancelled > 1) && <ActivityIndicator color={COLORS.primaryGradient} size={'large'}/>}
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
        <OrderItem
          type={'training'}
          item={item}
          onPress={() => navigation.navigate('SM_OrderDetailsStack', {screen: 'SM_OrderDetails', id: item?.id})}
        />
      )
    };

    return (
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={ordersUpcomingData}
          renderItem={renderItem}
          keyExtractor={item => `${item}`}
          refreshing={ordersUpcomingLoader && page_upcoming == 1}
          onRefresh={_onRefresh_Upcoming}
          onEndReached={() => {
            _loadMore_Upcoming();
          }}
          onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.2}
          ListFooterComponent={() => {
            return (
              <>
                {ordersUpcomingData.length == 0 ? null : (
                  <View style={{backgroundColor: COLORS.backgroundLight, width: '100%', paddingVertical: calcHeight(4), justifyContent: 'center', paddingBottom: calcHeight(32)}}>
                    {(ordersUpcomingLoader && page_upcoming > 1) && <ActivityIndicator color={COLORS.primaryGradient} size={'large'}/>}
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
    const title = selectTab == 1 ? Trans('dontHaveAnyOrdersUpcoming') : selectTab == 2 ? Trans('dontHaveAnyOrdersPervious') : selectTab == 3 ? Trans('dontHaveAnyOrdersCancelled') : '';
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
        visible={(ordersUpcomingLoader && page_upcoming == 1) || (ordersPerviousLoader && page_pervious == 1) || (ordersCancelledLoader && page_cancelled == 1)}
      />
    )
  };

  console.log('ordersUpcomingData---------', ordersUpcomingData, ordersPerviousData, ordersCancelledData);
  
  return (
    <View style={[styles.container, {paddingBottom: selectTab == 2 ? calcHeight(180) : calcHeight(140)}]}>
      {loadingSection()}
      {headerSection()}
      {tabsSection()}
      {(selectTab == 1 && ordersUpcomingData.length != 0) ? listSectionUpcoming() : (selectTab == 2 && ordersPerviousData.length != 0) ? listSectionPervious() : (selectTab == 3 && ordersCancelledData.length != 0) ? listSectionCancelled() :  (ordersUpcomingLoader || ordersPerviousLoader || ordersCancelledLoader )  ?  <></> : emptySection()}
    </View>
  );
};

export default Orders;


