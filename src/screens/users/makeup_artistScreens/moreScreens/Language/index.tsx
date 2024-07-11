import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../../../components/AppText';
import { Trans } from '../../../../../translation';
import { calcFont, calcWidth } from '../../../../../utils/sizes';
import { COLORS, FONTS } from '../../../../../utils/theme';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import MoreItem from '../../../../../components/MoreItem';
import LogOutItem from '../../../../../components/LogOutItem';
import LanguageItem from '../../../../../components/LanguageItem';

const Language: React.FC = () => {
  const navigation = useNavigation<any>();
  const [language, setLanguage] = useState<string>('ar');

  return (
    <View style={styles.container}>
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('language')}
        logo={IMAGES.logoColors}
      />
      <View style={styles.body}>
        <LanguageItem
          containerStyle={{}}
          onPress={() => setLanguage('en')}
          select={language == 'en'}
          title={'English'}
          code={'EN'}
        />
        <LanguageItem
           containerStyle={{}}
           onPress={() => setLanguage('ar')}
           select={language == 'ar'}
           title={'عربي'}
           code={'AR'}
        />
      </View>
    </View>
  );
};

export default Language;


