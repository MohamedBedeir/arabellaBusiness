import React, { useEffect, useState } from 'react';
import { View, Dimensions, Image, TouchableOpacity, I18nManager } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import AppText from '../AppText';
import { COLORS, FONTS } from '../../utils/theme';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import AppButtonDefault from '../AppButtonDefault';
import I18n, { Trans } from '../../translation';
import { IMAGES } from '../../assets/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { init_lang } from '../../network';
import RNRestart from 'react-native-restart';

export interface Props {
  visible?: boolean;
  onClose?: () => void;
};

const AppModalLanguage: React.FC<Props> = ({visible, onClose}) => {
  const [selectLang, setSelectLang] = useState<number>();

  useEffect(() => {
    getCurrentLang();
  }, []);

  const getCurrentLang = async () => {
    const _lang = await AsyncStorage.getItem('user_lang');
    if (_lang == 'ar') {
      setSelectLang(1);
    } else if (_lang == 'en') {
      setSelectLang(2);
    } else {
      setSelectLang(1);
    }
  };

  const restart = () => {
    setTimeout(() => {
      RNRestart.Restart();
    }, 500);
  };

  const updateLanguage = async () => {
    if (selectLang == 1) {
      await AsyncStorage.setItem('user_lang', 'ar');
      init_lang('ar');
      I18n.locale = 'ar';
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    } else if (selectLang == 2) {
      await AsyncStorage.setItem('user_lang', 'en');
      init_lang('en');
      I18n.locale = 'en';
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    } else {
      await AsyncStorage.setItem('user_lang', 'ar');
      init_lang('ar');
      I18n.locale = 'ar';
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    };
    restart();
  };

  const itemLanguage = (select: boolean, title: string, image: string | any, onPress: () => void) => {
    return (
      <TouchableOpacity
        style={styles.itemLangContainer}
        onPress={onPress}
      >
        <View style={styles.itemLangView}>
          <Image source={select ? IMAGES.selectActive : IMAGES.selectUnActive} style={styles.itemLangIcon}/>
          <AppText
            title={title}
            fontFamily={FONTS.bold}
            fontSize={calcFont(16)}
            textAlign={'left'}
            color={select ? COLORS.textDark : COLORS.textLight}
          />
        </View>
        <Image source={image} style={styles.itemLangImage}/>
      </TouchableOpacity>
    )
  };

  return (
    <Modal
      style={{ margin: 0, justifyContent: 'flex-end', }}
      hasBackdrop propagateSwipe={true}
      animationIn= 'slideInUp'
      animationInTiming= {600}
      animationOutTiming= {600}
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      deviceHeight={Dimensions.get('screen').height}
      statusBarTranslucent
    >
      <View style={styles.container}>
        <AppText
          title={Trans('selectLanguage')}
          fontFamily={FONTS.bold}
          fontSize={calcFont(18)}
          textAlign={'left'}
          color={COLORS.textDark}
          width={calcWidth(343)}
          lineHeight={calcHeight(28)}
        />
        <View style={styles.listView}>
          {itemLanguage(selectLang == 1, 'العربية', IMAGES.languageAr, () => setSelectLang(1))}
          {itemLanguage(selectLang == 2, 'English', IMAGES.languageEn, () => setSelectLang(2))}
        </View>
        <AppButtonDefault
          title={Trans('save')}
          onPress={() => {onClose; updateLanguage()}}
          colorStart={COLORS.primaryGradient}
          colorEnd={COLORS.secondGradient}
          buttonStyle={{width: calcWidth(343)}}
        />
      </View>
    </Modal>
  );
};

export default AppModalLanguage;
