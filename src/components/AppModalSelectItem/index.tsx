import React from 'react';
import { View, FlatList, TouchableOpacity, Image, Dimensions, I18nManager } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import { Text } from 'react-native';
import { IMAGES } from '../../assets/Images';
import AppText from '../AppText';
import { calcFont, calcHeight } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';

export interface Props {
  visible?: boolean;
  onClose?: () => void;
  onSelectItem?: (item: any) => void;
  title?: string;
  data?: any[];
  itemSelected?: any;
  multiSelect?: boolean;
}

const AppModalSelectItem: React.FC<Props> = (params: any) => {
  console.log('data--------', params.data);
  
  const onSelect = (item: any) => {
    params.multiSelect ? null : params.onClose();
    params.onSelectItem(item);
  };

  const renderItem = ({item, index} : {item: any, index: number}) => {
    var select = false;
    for (let s = 0; s < params.itemSelected.length; s++) {
      if (item.id === params.itemSelected[s].id) {
        select = true;
      }
    };

    const selectedItem: boolean = !params.multiSelect ? (item.id === params.itemSelected.id) : select;
    return (
      <TouchableOpacity
        onPress={() => onSelect(item)}
        style={styles.itemContainer}
      >
        <Image
          source={selectedItem ? IMAGES.selectActive : IMAGES.selectUnActive}
          style={styles.itemIcon}
        />
        <AppText
          title={I18nManager.isRTL ? item.nameAr : item.nameEn}
          fontSize={calcFont(14)}
          fontFamily={FONTS.medium}
          color={selectedItem ? COLORS.textDark : COLORS.textLight}
          textAlign={'left'}
        />
      </TouchableOpacity>
    )
  };

  return (
    <Modal
      style={{ margin: 0, justifyContent: 'flex-end', }}
      hasBackdrop propagateSwipe={true}
      animationIn= 'slideInUp'
      animationInTiming= {800}
      animationOutTiming= {800}
      isVisible={params.visible}
      onBackdropPress={() => { params.onClose()}}
      onBackButtonPress={() => { params.onClose()}}
      deviceHeight={Dimensions.get('screen').height}
      statusBarTranslucent
    >
      <View style={styles.modalView}>
        <AppText
          title={params.title}
          fontSize={calcFont(16)}
          fontFamily={FONTS.bold}
          color={COLORS.textDark}
          textAlign={'left'}
          marginBottom={calcHeight(16)}
        />
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={params.data}
          renderItem={renderItem}
          keyExtractor={item => `${item?.id}`}
        />
      </View>
    </Modal>
  );
};

export default AppModalSelectItem;
