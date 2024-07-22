import React, { useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
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
import { DUMMY_DATA } from '../../../../../utils/dummyData';
import AppModalTimings from '../../../../../components/AppModalTimings';
import AppModalCalendar from '../../../../../components/AppModalCalendar';
import moment from 'moment';
import AppModalSelectItem from '../../../../../components/AppModalSelectItem';

const BlockAppointments: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectBlockType, setSelectBlockType] = useState<number>(1);
  const [date, setDate] = useState<any>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [timeFrom, setTimeFrom] = useState<any>({});
  const [timeTo, setTimeTo] = useState<any>({});

  const [visibleDeleteTime, setVisibleDeleteTime] = useState<boolean>(false);
  const [visibleAddNewTime, setVisibleAddNewTime] = useState<boolean>(false);
  const [visibleEditTime, setVisibleEditTime] = useState<boolean>(false);
  const [visibleCalendar, setVisibleCalendar] = useState<boolean>(false);
  const [visibleTimings, setVisibleTimings] = useState<boolean>(false);
  
  


  const [visibleSaveData, setVisibleSaveData] = useState<boolean>(false);


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
          onPressDelete={() => setVisibleDeleteTime(true)}
          onPressEdit={() => setVisibleEditTime(true)}
        />
      )
    };
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DUMMY_DATA.BLOCKAPPOINTMENTS}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
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
                onPress={() => setVisibleCalendar(true)}
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
              onPress={() => {setVisibleSaveData(true); setVisibleAddNewTime(false)}}
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
  console.log('date========>>>>>>', date);

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

  const deleteTimeSection = () => {
    return (
      <Modal_Warning
        visible={visibleDeleteTime}
        onClose={() => setVisibleDeleteTime(false)}
        onPress1={() => setVisibleDeleteTime(false)}
        onPress2={() => setVisibleDeleteTime(false)}
        image={IMAGES.modalCancel}
        title={Trans('doDeleteAppointmentBlockedAppointments')}
        button1Title={Trans('yes')}
        button2Title={Trans('no')}
      />
    )
  };

  const saveDataSection = () => {
    return (
      <Modal_Warning
        visible={visibleSaveData}
        onClose={() => setVisibleSaveData(false)}
        onPress={() => setVisibleSaveData(false)}
        image={IMAGES.modalDone}
        title={Trans('dataSavedSuccessfully')}
        buttonTitle={Trans('done')}
      />
    )
  };

  const calendarSection = () => {
    return (
      <AppModalCalendar
        visible={visibleCalendar}
        onClose={() => setVisibleCalendar(false)}
        onSave={(item: any) => {setDate(item)}}
      />
    )
  };

  const timingsSection = () => {
    return (
      <AppModalTimings
        visible={visibleTimings}
        onClose={() => setVisibleTimings(false)}
        onSave={(item: any) => {setTimeFrom(item.start); setTimeTo(item.end); console.log('item-----', item)}}
        // onSelectItem?: (item: any) => void;
        // title?: string;
        // data?: any[];
        // itemSelected?: any;
        // multiSelect?: boolean;
      />
    )
  };

  
  return (
    <View style={styles.container}>
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


