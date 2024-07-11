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
import AppInput from '../../../../../components/AppInput';
import AppPickerSelect from '../../../../../components/AppPickerSelect';

const BlockAppointments: React.FC = () => {
  const navigation = useNavigation<any>();
  const [visibleDeleteTime, setVisibleDeleteTime] = useState<boolean>(false);
  const [visibleAddNewTime, setVisibleAddNewTime] = useState<boolean>(false);
  const [visibleEditTime, setVisibleEditTime] = useState<boolean>(false);
  const [visibleSaveData, setVisibleSaveData] = useState<boolean>(false);

  const [selectBlockType, setSelectBlockType] = useState<number>(1);

  const DATA = [
    {
      id: 1,
      title: '#1234',
      dateFron: 'Jun 3, 2024/06/2024',
      dateTo: 'Jun 3, 2024/06/2024',
      timeFrom: '15:00:00',
      timeTo: '15:00:00',
      type: 'محجوز',
    },
    {
      id: 2,
      title: '#1234',
      dateFron: 'Jun 3, 2024/06/2024',
      dateTo: 'Jun 3, 2024/06/2024',
      type: 'مغلق لفترة',
    },
    {
      id: 3,
      title: '#1234',
      dateFron: 'Jun 3, 2024/06/2024',
      dateTo: 'Jun 3, 2024/06/2024',
      timeFrom: '15:00:00',
      timeTo: '15:00:00',
      type: 'محجوز',
    },
    {
      id: 4,
      title: '#1234',
      dateFron: 'Jun 3, 2024/06/2024',
      dateTo: 'Jun 3, 2024/06/2024',
      type: 'مغلق لفترة',
    },
    {
      id: 5,
      title: '#1234',
      dateFron: 'Jun 3, 2024/06/2024',
      dateTo: 'Jun 3, 2024/06/2024',
      timeFrom: '15:00:00',
      timeTo: '15:00:00',
      type: 'محجوز',
    },
  ];

  const renderItem = ({item, index} : {item: any, index: number}) => {
    return (
      <BlockAppointmentsItem
        item={item}
        onPressDelete={() => setVisibleDeleteTime(true)}
        onPressEdit={() => setVisibleEditTime(true)}
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

  return (
    <View style={styles.container}>
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('blockAppointments')}
        logo={IMAGES.logoColors}
      />
      <AppButtonDefault
        colorStart={COLORS.primaryGradient}
        colorEnd={COLORS.secondGradient}
        border={false}
        onPress={() => setVisibleAddNewTime(true)}
        title={Trans('construction')}
        icon={IMAGES.plusCircleWhite}
        buttonStyle={{marginVertical: calcHeight(16)}}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
      />
      {addNewTimeSection()}
      {editTimeSection()}
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
      <Modal_Warning
        visible={visibleSaveData}
        onClose={() => setVisibleSaveData(false)}
        onPress={() => setVisibleSaveData(false)}
        image={IMAGES.modalDone}
        title={Trans('dataSavedSuccessfully')}
        buttonTitle={Trans('done')}
      />
    </View>
  );
};

export default BlockAppointments;


