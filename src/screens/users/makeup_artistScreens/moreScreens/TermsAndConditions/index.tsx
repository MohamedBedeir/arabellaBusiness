import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import { Trans } from '../../../../../translation';

const TermsAndConditions: React.FC = () => {
  const navigation = useNavigation<any>();
  
  const headerSection = () => {
    return (
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('arabellaPolicies')}
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

export default TermsAndConditions;


