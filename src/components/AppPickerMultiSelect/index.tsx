import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, Dimensions, I18nManager } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import { Text } from 'react-native';
import { IMAGES } from '../../assets/Images';
import { Trans } from '../../translation';
import AppButtonDefault from '../AppButtonDefault';
import { COLORS } from '../../utils/theme';
import { calcWidth } from '../../utils/sizes';

export interface Props {
  visible?: boolean;
  onClose?: () => void;
  onSelectItem?: (array: any) => void;
  title?: string;
  data?: any[];
  itemSelected?: any;
  multiSelect?: boolean;
  marital_status?: any[];
};

const AppPickerMultiSelect: React.FC<Props> = (params: any) => {
  const [selectItemMartial, setSelectItemMartial] = useState<any[]>([]);
  console.log('params.data--------', params.data);
  console.log('params?.marital_status--------', params?.marital_status);
  useEffect(() => {
    let maritalStatus = [];
    for (let i = 0; i < params?.data?.length; i++) {
      for (let r = 0; r < params?.marital_status?.length; r++) {
        if (params.data[i].key == params?.marital_status[r]) {
          maritalStatus.push(params.data[i]);
        } else if (params.data[i].id == params?.marital_status[r].id) {
          maritalStatus.push(params.data[i]);
        }
      }
    };
    console.log('maritalStatus--------', maritalStatus);
    setSelectItemMartial([...maritalStatus]);
  },[]);

  useEffect(() => {
    onSelect2();
  }, [selectItemMartial]);
  console.log('selectItemMartial--------', selectItemMartial);
  const onSelect = () => {
    params.multiSelect ? null : params.onClose();
    params.onSelectItem(selectItemMartial);
  };
  const onSelect2 = () => {
    params.onSelectItem(selectItemMartial);
  };

  const renderItem = ({item, index} : {item: any, index: number}) => {
    // const selectedItem: boolean = selectItemMartial?.includes(item);
    let selectedItem: boolean = [...selectItemMartial].findIndex((e: any) => e.id === item.id) != -1;
      const setArray = (item: any) => {
        var _Array: any = selectItemMartial;
        const find = [...selectItemMartial].findIndex((e: any) => e.id === item.id);
        find == -1 ? _Array.push(item) : _Array.splice(find, 1);
        setSelectItemMartial([..._Array]);
      };
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => setArray(item)}
          style={styles.itemView}
        >
          <View style={styles.itemViewRight}>
          <Image
            source={selectedItem ? IMAGES.selectActive : IMAGES.selectUnActive}
            style={styles.itemIcon}
          />
          {item.image && <Image source={{uri: item.image}} style={styles.itemImage}/>}
          <Text style={styles.itemTitle}>
            {I18nManager.isRTL ? item.name : item.nameEn}
          </Text>
          </View>
          {item.code && <Text style={styles.itemText}>
            {item.code}
          </Text>}
        </TouchableOpacity>
      </View>
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
        <Text style={styles.title}>{params.title}</Text>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={params.data}
          renderItem={renderItem}
          keyExtractor={item => `${item?.id}`}
        />
        <View>
          <AppButtonDefault
            onPress={() => onSelect()}
            title={Trans('confirm')}
            colorStart={COLORS.primaryGradient}
            colorEnd={COLORS.secondGradient}
            buttonStyle={{width: calcWidth(343)}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AppPickerMultiSelect;
