import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, Dimensions, I18nManager } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import { Text } from 'react-native';
import { IMAGES } from '../../assets/Images';
import AppText from '../AppText';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
import { Trans } from '../../translation';
import { DUMMY_DATA } from '../../utils/dummyData';
import AppButtonDefault from '../AppButtonDefault';

export interface Props {
  visible?: boolean;
  onClose?: any;
  onSave?: (item: any) => void;
};

const AppModalTimings: React.FC<Props> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [currentBedroom, setCurrentBedroom] = useState<any>();
  const [minBedroom, setMinBedroom] = useState<any>();
  const [maxBedroom, setMaxBedroom] = useState<any>();

  const onSelect = (item: any) => {
    var current: any = currentBedroom;
    var minArr: any = minBedroom;
    var maxArr: any = maxBedroom;
    if (!minArr) {
      minArr = item;
    } else if (minArr && !maxArr) {
      if (minArr.id < item.id) {
        maxArr = item;
      } else if (minArr.id > item.id) {
        maxArr = minArr;
        minArr = item;
      } else {
        minArr = item;
      }
    } else {
      if (minArr.id > item.id) {
        minArr = item;
      } else if (maxArr.id < item.id) {
        maxArr = item;
      } else {
        if (current.id < item.id) {
          maxArr = item;
          minArr = current;
        } else {
          minArr = item;
          maxArr = current;
        }
      }
    };
    setCurrentBedroom(item);
    setMaxBedroom(maxArr);
    setMinBedroom(minArr);
  };
  // const onSelect = (item: any) => {
  //   params.multiSelect ? null : params.onClose();
  //   params.onSelectItem(item);
  // };

  const renderItem = ({item, index} : {item: any, index: number}) => {
    let select: boolean = (item.id >= minBedroom?.id && item.id <= maxBedroom?.id) || (item.id == minBedroom?.id || item.id == maxBedroom?.id);
    // for (let s = 0; s < params.itemSelected.length; s++) {
    //   if (item.id === params.itemSelected[s].id) {
    //     select = true;
    //   }
    // };

    // const selectedItem: boolean = !params.multiSelect ? (item.id === params.itemSelected.id) : select;
    return (
      <TouchableOpacity
        onPress={() => onSelect(item)}
        style={[styles.itemContainer, {backgroundColor: select ? COLORS.primaryGradient : COLORS.backgroundLight}]}
      >
        <AppText
          title={item?.title}
          fontSize={(index == 0 || index == 48) ? calcFont(12) : calcFont(16)}
          fontFamily={FONTS.medium}
          color={select ? COLORS.white : COLORS.textDark}
          textAlign={'left'}
        />
      </TouchableOpacity>
    )
  };
  const onPressClose = () => {
    onClose();
    setCurrentBedroom({});
    setMaxBedroom({});
    setMinBedroom({});
  };

  const onPressSave = () => {
    onClose();
    onSave({start: minBedroom, end: maxBedroom});
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
      <View style={styles.modalView}>
        <AppText
          title={Trans('selectBlockingPeriod')}
          fontSize={calcFont(16)}
          fontFamily={FONTS.bold}
          color={COLORS.textDark}
          textAlign={'left'}
          marginBottom={calcHeight(24)}
        />
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={DUMMY_DATA.TIMINGS}
          numColumns={7}
          renderItem={renderItem}
          keyExtractor={item => `${item?.id}`}
        />
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
      </View>
    </Modal>
  );
};

export default AppModalTimings;
