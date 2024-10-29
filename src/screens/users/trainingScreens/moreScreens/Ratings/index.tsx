import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Trans } from '../../../../../translation';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import LanguageItem from '../../../../../components/LanguageItem';
import AppButtonDefault from '../../../../../components/AppButtonDefault';
import { COLORS } from '../../../../../utils/theme';
import { calcHeight } from '../../../../../utils/sizes';

const Ratings: React.FC = () => {
  const navigation = useNavigation<any>();
  const [language, setLanguage] = useState<string>('ar');

  const headerSection = () => {
    return (
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('ratings')}
        logo={IMAGES.logoColors}
      />
    )
  };

  const bodySection = () => {
    return (
      <View style={styles.body}>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      {headerSection()}
      {bodySection()}
    </View>
  );
};

export default Ratings;


