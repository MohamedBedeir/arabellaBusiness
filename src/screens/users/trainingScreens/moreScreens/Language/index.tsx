import React, { useEffect, useState } from 'react';
import { I18nManager, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import I18n, { Trans } from '../../../../../translation';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import LanguageItem from '../../../../../components/LanguageItem';
import AppButtonDefault from '../../../../../components/AppButtonDefault';
import { COLORS } from '../../../../../utils/theme';
import { calcHeight } from '../../../../../utils/sizes';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { init_lang } from '../../../../../network';
import AppLoading from '../../../../../components/AppLoading';

const Language: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectLang, setSelectLang] = useState<number>();
  const [loader, setLoader] = useState<boolean>(false);

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
    // setLoader(false);
    setTimeout(() => {
      RNRestart.Restart();
    }, 500);
  };

  const updateLanguage = async () => {
    setLoader(true);
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

  const headerSection = () => {
    return (
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('language')}
        logo={IMAGES.logoColors}
      />
    )
  };

  const bodySection = () => {
    return (
      <View style={styles.body}>
        <LanguageItem
           containerStyle={{}}
           onPress={() => setSelectLang(1)}
           select={selectLang == 1}
           title={'عربي'}
           code={'AR'}
        />
        <LanguageItem
          containerStyle={{}}
          onPress={() => setSelectLang(2)}
          select={selectLang == 2}
          title={'English'}
          code={'EN'}
        />
        <AppButtonDefault
          colorStart={COLORS.primaryGradient}
          colorEnd={COLORS.secondGradient}
          border={false}
          onPress={() => updateLanguage()}
          title={Trans('save')}
          buttonStyle={{marginTop: calcHeight(164)}}
        />
      </View>
    )
  };

  const loadingSection = () => {
    return (
      <AppLoading
        margin_top={calcHeight(440)}
        size={'large'}
        visible={loader}
      />
    )
  };

  return (
    <View style={styles.container}>
      {loadingSection()}
      {headerSection()}
      {bodySection()}
    </View>
  );
};

export default Language;


