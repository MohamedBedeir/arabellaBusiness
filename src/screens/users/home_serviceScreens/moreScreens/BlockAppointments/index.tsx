import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Platform, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Trans } from '../../../../../translation';
import { calcFont, calcHeight, calcWidth } from '../../../../../utils/sizes';
import { COLORS, FONTS } from '../../../../../utils/theme';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import AppButtonDefault from '../../../../../components/AppButtonDefault';
import BlockAppointmentsItem from '../../../../../components/BlockAppointmentsItem';
import Modal from 'react-native-modal';
import Modal_Warning from '../../../../../components/Modal_Warning';
import AppTextGradient from '../../../../../components/AppTextGradient';
import AppTabView from '../../../../../components/AppTabView';
import AppText from '../../../../../components/AppText';
import AppPickerSelect from '../../../../../components/AppPickerSelect';
import AppModalTimings from '../../../../../components/AppModalTimings';
import AppModalCalendar from '../../../../../components/AppModalCalendar';
import moment from 'moment';
import AppLoading from '../../../../../components/AppLoading';
import { RootState, useAppDispatch } from '../../../../../redux/store/store';
import { useSelector } from 'react-redux';
import { slot_add, slot_delete, slots_data } from '../../../../../middleware/slots/slots';
import { setslotAddState, setslotDeleteState, setslotEditState } from '../../../../../redux/store/slots/slotsSlice';

const BlockAppointments: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { slotsLoader, slotData, slotCount, slotAddState, slotEditState, slotDeleteState } = useSelector((store: RootState) => store?.slots);
  const [selectBlockType, setSelectBlockType] = useState<number>(1);
  const [calenderType, setCalenderType] = useState<string>('');
  const [date, setDate] = useState<any>('');
  const [timeFrom, setTimeFrom] = useState<any>('');
  const [timeTo, setTimeTo] = useState<any>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [visibleDeleteTime, setVisibleDeleteTime] = useState<boolean>(false);
  const [visibleAddNewTime, setVisibleAddNewTime] = useState<boolean>(false);
  const [visibleEditTime, setVisibleEditTime] = useState<boolean>(false);
  const [visibleCalendar, setVisibleCalendar] = useState<boolean>(false);
  const [visibleTimings, setVisibleTimings] = useState<boolean>(false);
  const [visibleSaveData, setVisibleSaveData] = useState<boolean>(false);
  const [selectSlot, setSelectSlot] = useState<any>({});
  const [page, setPage] = useState<number>(1);

  const getSlots = (page: number) => {
    dispatch(slots_data({page}));
  };

  useEffect(() => {
    getSlots(1);
  }, []);

  const setData = () => {
    setDate('');
    setTimeFrom('');
    setTimeTo('');
    setDateFrom('');
    setDateTo('');
    setSelectBlockType(1);
  };

  useEffect(() => {
    if (slotAddState == 'done') {
      setVisibleAddNewTime(false);
      setData();
      setVisibleSaveData(true);
      setslotAddState('');
    }
  }, [slotAddState]);

  useEffect(() => {
    if (slotEditState == 'done') {
      setVisibleEditTime(false);
      setData();
      setVisibleSaveData(true);
      setslotEditState('');
    }
  }, [slotEditState]);

  useEffect(() => {
    if (slotDeleteState == 'done') {
      setVisibleDeleteTime(false);
      setVisibleSaveData(true);
      setslotDeleteState('');
    }
  }, [slotDeleteState]);

  const _onRefresh_Slots = () => {
    getSlots(1);
    setPage(1);
  };
  const _loadMore_Slots = () => {
    if((slotData.length < slotCount)) {
      getSlots(page + 1);
      setPage(page + 1);
    }
  };

  const onAdd = () => {
    if (selectBlockType == 1) {
      if (date != '') {
        var from: Date = new Date(date);
        var to: Date = new Date(date);
        if (timeFrom != '' && timeTo != '') {
          from.setHours(timeFrom.hour, timeFrom.minute);
          to.setHours(timeTo.hour, timeTo.minute);
          const data = {
            from,
            to,
            serviceProviderId: 5,
            employeeId: null,
            type: 'booked'
          };
          dispatch(slot_add({data}));
        } else {

        };

      } else {

      };
    } else if (selectBlockType == 2) {
      if (dateFrom != '' && dateTo != '') {
        var from: Date = new Date(dateFrom);
        var to: Date = new Date(dateTo);
        from.setHours(0, 0);
        to.setHours(0, 0);
        const data = {
          from,
          to,
          serviceProviderId: 5,
          employeeId: null,
          type: 'booked'
        };
        dispatch(slot_add({data}));
      }
    };
    // const data = {
    //   from: dateFrom,
    //   to: dateTo,
    //   serviceProviderId: 0,
    //   employeeId: null,
    //   type: 'booked'
    // };
    // dispatch(slot_add({data}));
  };

  const headerSection = () => {
    return (
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('blockAppointments')}
        logo={IMAGES.logoColors}
      />
    )
  };

  const addSection = () => {
    return (
      <AppButtonDefault
        colorStart={COLORS.primaryGradient}
        colorEnd={COLORS.secondGradient}
        border={false}
        onPress={() => setVisibleAddNewTime(true)}
        title={Trans('construction')}
        icon={IMAGES.plusCircleWhite}
        buttonStyle={{marginVertical: calcHeight(16)}}
      />
    )
  };

  const listSection = () => {
    const renderItem = ({item, index} : {item: any, index: number}) => {
      return (
        <BlockAppointmentsItem
          item={item}
          onPressDelete={() => {setVisibleDeleteTime(true); setSelectSlot(item)}}
          onPressEdit={() => setVisibleEditTime(true)}
        />
      )
    };
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={slotData}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        refreshing={slotsLoader && page == 1}
          onRefresh={_onRefresh_Slots}
          onEndReached={() => {
            _loadMore_Slots();
          }}
          onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.2}
          ListFooterComponent={() => {
            return (
              <>
                {slotData.length == 0 ? (
                  <>
                    {/* <WarningScreen
                      image={IMAGES.emptySearch}
                      title={Trans('dontHaveSearchResultsTitle')}
                      description={Trans('dontHaveSearchResultsDescription')}
                    /> */}
                  </>
                ) : (
                  <View style={{backgroundColor: COLORS.backgroundLight, width: '100%', paddingVertical: calcHeight(4), justifyContent: 'center', paddingBottom: calcHeight(32)}}>
                    {(slotsLoader && page > 1) && <ActivityIndicator color={COLORS.primaryGradient} size={'large'}/>}
                  </View>
                )}
              </>
            )
          }}
      />
    )
  };

  const addNewTimeSection = () => {
    return (
      <Modal
        style={{ margin: 0, justifyContent: 'flex-end', }}
        hasBackdrop propagateSwipe={true}
        animationIn= 'slideInUp'
        animationInTiming= {600}
        animationOutTiming= {600}
        isVisible={visibleAddNewTime}
        onBackdropPress={() => setVisibleAddNewTime(false)}
        onBackButtonPress={() => setVisibleAddNewTime(false)}
        deviceHeight={Dimensions.get('screen').height}
        statusBarTranslucent
      >
        <View style={styles.modalContainer}>
          <AppTextGradient
            title={Trans('addBlockingAppointment')}
            fontSize={calcFont(17)}
            fontFamily={FONTS.bold}
            colorStart={COLORS.secondGradient}
            colorEnd={COLORS.primaryGradient}
          />
          <View style={styles.modalTabsContainer}>
            <AppTabView
              onPress={() => setSelectBlockType(1)}
              containerStyle={{width: calcWidth(151), height: calcHeight(41), marginEnd: 0}}
              backgroundColor={selectBlockType == 1 ? 'rgba(197, 122, 222, 0.15)' : COLORS.gray}
              select={selectBlockType == 1}
              title={Trans('blockAppointments')}
            />
            <AppTabView
              onPress={() => setSelectBlockType(2)}
              containerStyle={{width: calcWidth(151), height: calcHeight(41), marginEnd: 0}}
              backgroundColor={selectBlockType == 2 ? 'rgba(197, 122, 222, 0.15)' : COLORS.gray}
              select={selectBlockType == 2}
              title={Trans('requestCloseReservationsPeriod')}
            />
          </View>
          <View style={styles.modalDataContainer}>
            {selectBlockType == 1 && (
              <AppPickerSelect
                containerStyle={{marginBottom: calcHeight(16)}}
                styleTitle={{}}
                onPress={() => {setVisibleCalendar(true); setCalenderType('date')}}
                title={Trans('date')}
                placeholder={date ? moment(date.toString()).format('YYYY/MM/DD') : Trans('date')}
                image={IMAGES.calender}
              />
            )}
            <AppText
              title={selectBlockType == 1 ? Trans('startEndTime') : Trans('duration')}
              fontFamily={FONTS.medium}
              fontSize={calcFont(14)}
              textAlign={'left'}
              color={COLORS.textDark}
            />
            {selectBlockType == 1 && (
              <View style={styles.modalDataView}>
                <AppPickerSelect
                  containerStyle={{width: calcWidth(166)}}
                  touchContainerStyle={{width: calcWidth(166)}}
                  styleTitle={{}}
                  onPress={() => setVisibleTimings(true)}
                  title={Trans('forWhile')}
                  placeholder={timeFrom?.title || Trans('forWhile')}
                  image={IMAGES.timer}
                />
                <AppPickerSelect
                  containerStyle={{width: calcWidth(166)}}
                  touchContainerStyle={{width: calcWidth(166)}}
                  styleTitle={{}}
                  onPress={() => setVisibleTimings(true)}
                  title={Trans('longTimeAgo')}
                  placeholder={timeTo?.title || Trans('longTimeAgo')}
                  image={IMAGES.timer}
                />
              </View>
            )}
            {selectBlockType == 2 && (
              <View style={styles.modalDataView}>
                <AppPickerSelect
                  containerStyle={{width: calcWidth(166)}}
                  touchContainerStyle={{width: calcWidth(166)}}
                  styleTitle={{}}
                  onPress={() => {setVisibleCalendar(true); setCalenderType('dateFrom')}}
                  title={Trans('fromDate')}
                  placeholder={dateFrom ? moment(dateFrom.toString()).format('YYYY/MM/DD') : Trans('fromDate')}
                  image={IMAGES.calender}
                />
                <AppPickerSelect
                  containerStyle={{width: calcWidth(166)}}
                  touchContainerStyle={{width: calcWidth(166)}}
                  styleTitle={{}}
                  onPress={() => {setVisibleCalendar(true); setCalenderType('dateTo')}}
                  title={Trans('toDate')}
                  placeholder={dateTo ? moment(dateTo.toString()).format('YYYY/MM/DD') : Trans('toDate')}
                  image={IMAGES.calender}
                />
              </View>
            )}
          </View>
          <View style={styles.modalActionContainer}>
            <AppButtonDefault
              title={Trans('save')}
              onPress={() => onAdd()}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(164), height: calcHeight(48)}}
            />
            <AppButtonDefault
              title={Trans('cancellation')}
              onPress={() => setVisibleAddNewTime(false)}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(164), height: calcHeight(48)}}
              border
            />
          </View>
        </View>
      </Modal>
    )
  };

  const editTimeSection = () => {
    return (
      <Modal
        style={{ margin: 0, justifyContent: 'flex-end', }}
        hasBackdrop propagateSwipe={true}
        animationIn= 'slideInUp'
        animationInTiming= {600}
        animationOutTiming= {600}
        isVisible={visibleEditTime}
        onBackdropPress={() => setVisibleEditTime(false)}
        onBackButtonPress={() => setVisibleEditTime(false)}
        deviceHeight={Dimensions.get('screen').height}
        statusBarTranslucent
      >
        <View style={styles.modalContainer}>
          <AppTextGradient
            title={Trans('editBlockingAppointment')}
            fontSize={calcFont(17)}
            fontFamily={FONTS.bold}
            colorStart={COLORS.secondGradient}
            colorEnd={COLORS.primaryGradient}
          />
          <View style={styles.modalTabsContainer}>
            <AppTabView
              onPress={() => setSelectBlockType(1)}
              containerStyle={{width: calcWidth(151), height: calcHeight(41), marginEnd: 0}}
              backgroundColor={selectBlockType == 1 ? 'rgba(197, 122, 222, 0.15)' : COLORS.gray}
              select={selectBlockType == 1}
              title={Trans('blockAppointments')}
            />
            <AppTabView
              onPress={() => setSelectBlockType(2)}
              containerStyle={{width: calcWidth(151), height: calcHeight(41), marginEnd: 0}}
              backgroundColor={selectBlockType == 2 ? 'rgba(197, 122, 222, 0.15)' : COLORS.gray}
              select={selectBlockType == 2}
              title={Trans('requestCloseReservationsPeriod')}
            />
          </View>
          <View style={styles.modalDataContainer}>
            {selectBlockType == 1 && (
              <AppPickerSelect
                containerStyle={{marginBottom: calcHeight(16)}}
                styleTitle={{}}
                onPress={() => {}}
                title={Trans('date')}
                image={IMAGES.calender}
              />
            )}
            <AppText
              title={selectBlockType == 1 ? Trans('startEndTime') : Trans('duration')}
              fontFamily={FONTS.medium}
              fontSize={calcFont(14)}
              textAlign={'left'}
              color={COLORS.textDark}
            />
            {selectBlockType == 1 && (
              <View style={styles.modalDataView}>
                <AppPickerSelect
                  containerStyle={{width: calcWidth(166)}}
                  touchContainerStyle={{width: calcWidth(166)}}
                  styleTitle={{}}
                  onPress={() => {}}
                  title={Trans('longTimeAgo')}
                  image={IMAGES.timer}
                />
                <AppPickerSelect
                  containerStyle={{width: calcWidth(166)}}
                  touchContainerStyle={{width: calcWidth(166)}}
                  styleTitle={{}}
                  onPress={() => {}}
                  title={Trans('forWhile')}
                  image={IMAGES.timer}
                />
              </View>
            )}
            {selectBlockType == 2 && (
              <View style={styles.modalDataView}>
                <AppPickerSelect
                  containerStyle={{width: calcWidth(166)}}
                  touchContainerStyle={{width: calcWidth(166)}}
                  styleTitle={{}}
                  onPress={() => {}}
                  title={Trans('fromDate')}
                  image={IMAGES.calender}
                />
                <AppPickerSelect
                  containerStyle={{width: calcWidth(166)}}
                  touchContainerStyle={{width: calcWidth(166)}}
                  styleTitle={{}}
                  onPress={() => {}}
                  title={Trans('toDate')}
                  image={IMAGES.calender}
                />
              </View>
            )}
          </View>
          <View style={styles.modalActionContainer}>
            <AppButtonDefault
              title={Trans('save')}
              onPress={() => {setVisibleSaveData(true); setVisibleEditTime(false)}}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(164), height: calcHeight(48)}}
            />
            <AppButtonDefault
              title={Trans('cancellation')}
              onPress={() => setVisibleEditTime(false)}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(164), height: calcHeight(48)}}
              border
            />
          </View>
        </View>
      </Modal>
    )
  };
  const onDelete = () => {
    setVisibleDeleteTime(false)
    dispatch(slot_delete({id: selectSlot?.id}));
  };
  const deleteTimeSection = () => {
    return (
      <Modal_Warning
        visible={visibleDeleteTime}
        onClose={() => setVisibleDeleteTime(false)}
        onPress1={() => onDelete()}
        onPress2={() => setVisibleDeleteTime(false)}
        image={IMAGES.modalCancel}
        title={Trans('doDeleteAppointmentBlockedAppointments')}
        button1Title={Trans('yes')}
        button2Title={Trans('no')}
      />
    )
  };

  const onDoneSave = () => {
    setVisibleSaveData(false);
    getSlots(1);
    setPage(1);
  };

  const saveDataSection = () => {
    return (
      <Modal_Warning
        visible={visibleSaveData}
        onClose={() => onDoneSave()}
        onPress={() => onDoneSave()}
        image={IMAGES.modalDone}
        title={Trans('dataSavedSuccessfully')}
        buttonTitle={Trans('done')}
      />
    )
  };

  const onSetCalender = (item: any) => {
    if (calenderType == 'date') {
      setDate(item);
    } else if (calenderType == 'dateFrom') {
      setDateFrom(item);
    } else if (calenderType == 'dateTo') {
      setDateTo(item);
    }
  };

  const calendarSection = () => {
    return (
      <AppModalCalendar
        visible={visibleCalendar}
        onClose={() => setVisibleCalendar(false)}
        onSave={(item: any) => onSetCalender(item)}
        buttons
      />
    )
  };

  const timingsSection = () => {
    return (
      <AppModalTimings
        visible={visibleTimings}
        onClose={() => setVisibleTimings(false)}
        onSave={(item: any) => {setTimeFrom(item.start); setTimeTo(item.end)}}
        // onSelectItem?: (item: any) => void;
        // title?: string;
        // data?: any[];
        // itemSelected?: any;
        // multiSelect?: boolean;
      />
    )
  };

  const loadingSection = () => {
    return (
      <AppLoading
        margin_top={calcHeight(440)}
        size={'large'}
        visible={slotsLoader && page == 1}
      />
    )
  };

  return (
    <View style={styles.container}>
      {loadingSection()}
      {headerSection()}
      {addSection()}
      {listSection()}
      {addNewTimeSection()}
      {editTimeSection()}
      {deleteTimeSection()}
      {saveDataSection()}
      {calendarSection()}
      {timingsSection()}
      
    </View>
  );
};

export default BlockAppointments;


