import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, Dimensions, I18nManager } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import { Text } from 'react-native';
import { IMAGES } from '../../assets/Images';
import AppText from '../AppText';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
import CalendarPicker from "react-native-calendar-picker";
import { Trans } from '../../translation';
import AppButtonDefault from '../AppButtonDefault';

export interface Props {
  visible?: boolean;
  onClose?: any;
  title?: string;
  onSave?: (item: any) => void;
  onMonth?: (item: any) => void;
  initialView?: 'years' | 'months' | 'days';
  buttons?: boolean;
}

const AppModalCalendar: React.FC<Props> = ({
  visible,
  onClose,
  title,
  onSave,
  onMonth,
  initialView,
  buttons,
}) => {
  const [selectSingleDate, setSelectSingleDate] = useState<any>('');
  const [selectSingleMonth, setSelectSingleMonth] = useState<any>('');
  const minDate = new Date(); // Today
  const maxDate = new Date(2024, 7, 7);
  // const startDate = selectedStartDate ? selectedStartDate.toString() : "";
  // const endDate = selectedEndDate ? selectedEndDate.toString() : "";

  const onPressClose = () => {
    onClose();
  };

  const onPressSave = () => {
    onClose();
  };

  return (
    <Modal
      style={{ margin: 0, justifyContent: 'flex-end', }}
      hasBackdrop propagateSwipe={true}
      animationIn= 'slideInUp'
      animationInTiming= {800}
      animationOutTiming= {800}
      isVisible={visible}
      onBackdropPress={() => onPressClose()}
      onBackButtonPress={() => onPressClose()}
      deviceHeight={Dimensions.get('screen').height}
      statusBarTranslucent
    >
      <View style={styles.container}>
        <AppText
          title={title ? title : Trans('selectBlockingDate')}
          fontSize={calcFont(16)}
          fontFamily={FONTS.bold}
          color={COLORS.textDark}
          textAlign={'left'}
          marginBottom={calcHeight(24)}
        />
        <CalendarPicker
          todayBackgroundColor={COLORS.borderLight}
          todayTextStyle={{color: COLORS.textDark}}
          selectedDayColor={COLORS.primaryGradient}
          selectedDayTextColor="#FFFFFF"
          onDateChange={(date: any) => onSave(date)}
          onMonthChange={(date: any) => onMonth ?  onMonth(date) : null}
          initialView={initialView || 'days'}
          minDate={new Date()}
          // maxDate={maxDate}
          // selectedStartDate={new Date(2024, 7, 20)}
          // selectedEndDate={new Date(2024, 7, 23)}
        />
        {buttons && (
          <View style={styles.modalActionContainer}>
            <AppButtonDefault
              title={Trans('save')}
              onPress={() => onPressSave()}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(164), height: calcHeight(48)}}
            />
            <AppButtonDefault
              title={Trans('cancellation')}
              onPress={() => onPressClose()}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(164), height: calcHeight(48)}}
              border
            />
          </View>
        )}
      </View>
    </Modal>
    )
};

export default AppModalCalendar;
