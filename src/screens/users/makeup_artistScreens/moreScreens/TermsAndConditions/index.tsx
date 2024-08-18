import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import {styles} from './styles';
import { calcFont, calcHeight, calcWidth } from '../../../../../utils/sizes';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../../../../../assets/Images';
import { Trans } from '../../../../../translation';
import AppText from '../../../../../components/AppText';
import { COLORS, FONTS } from '../../../../../utils/theme';

export const TermsAndConditions = () => {
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
    const title = (title: string) => {
      return (
        <AppText
          title={title}
          fontSize={calcFont(20)}
          fontFamily={FONTS.extra_bold}
          color={COLORS.textDark}
          textAlign={'left'}
          width={calcWidth(343)}
          // marginBottom={calcHeight(6)}
          lineHeight={calcHeight(24)}
        />
      )
    };

    const description = (description: string) => {
      return (
        <AppText
          title={description}
          fontSize={calcFont(14)}
          fontFamily={FONTS.bold}
          color={COLORS.textDark}
          textAlign={'left'}
          width={calcWidth(343)}
          numberOfLines={10}
          lineHeight={calcHeight(18)}
          marginBottom={calcHeight(6)}
        />
      )
    };

    const point = (title?: string, description?: string) => {
      return (
        <View style={styles.pointContainer}>
          <View style={styles.pointPoint}/>
          <View style={styles.pointView}>
            <Text style={styles.pointDescription} numberOfLines={10}>
              {title && <Text style={styles.pointTitle}>
              {title}
            </Text>} {description}</Text>
          </View>
        </View>
      )
    };

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{height: calcHeight(16)}} />
        {title(Trans('ma_introduction'))}
        {description(Trans('ma_introductionDescription'))}
        <View style={{height: calcHeight(10)}} />
        {title(Trans('ma_definitions'))}
        {point(Trans('ma_definitionsKey1'), Trans('ma_definitionsValue1'))}
        {point(Trans('ma_definitionsKey2'), Trans('ma_definitionsValue2'))}
        {point(Trans('ma_definitionsKey3'), Trans('ma_definitionsValue3'))}
        {point(Trans('ma_definitionsKey4'), Trans('ma_definitionsValue4'))}
        {point(Trans('ma_definitionsKey5'), Trans('ma_definitionsValue5'))}
        {point(Trans('ma_definitionsKey6'), Trans('ma_definitionsValue6'))}
        <View style={{height: calcHeight(10)}} />
        {title(Trans('ma_definitions1'))}
        {description(Trans('ma_definitionsDescription1'))}
        {point(undefined, Trans('ma_definitions1_point1'))}
        {point(undefined, Trans('ma_definitions1_point2'))}
        {point(undefined, Trans('ma_definitions1_point3'))}
        {point(undefined, Trans('ma_definitions1_point4'))}
        {point(undefined, Trans('ma_definitions1_point5'))}
        {point(undefined, Trans('ma_definitions1_point6'))}
        {point(undefined, Trans('ma_definitions1_point7'))}
        {point(undefined, Trans('ma_definitions1_point8'))}
        {point(undefined, Trans('ma_definitions1_point9'))}
        {point(undefined, Trans('ma_definitions1_point10'))}
        {point(undefined, Trans('ma_definitions1_point11'))}
        {point(undefined, Trans('ma_definitions1_point12'))}
        {point(undefined, Trans('ma_definitions1_point13'))}
        {point(undefined, Trans('ma_definitions1_point14'))}
        {point(undefined, Trans('ma_definitions1_point15'))}
        {point(undefined, Trans('ma_definitions1_point16'))}
        <View style={{height: calcHeight(10)}} />
        {title(Trans('ma_definitions2'))}
        {point(undefined, Trans('ma_definitions2_point1'))}
        {point(undefined, Trans('ma_definitions2_point2'))}
        {point(undefined, Trans('ma_definitions2_point3'))}
        {point(undefined, Trans('ma_definitions2_point4'))}
        {point(undefined, Trans('ma_definitions2_point5'))}
        {point(undefined, Trans('ma_definitions2_point6'))}
        <View style={{height: calcHeight(10)}} />
        {title(Trans('ma_definitions3'))}
        {description(Trans('ma_definitionsDescription3'))}
        {point(undefined, Trans('ma_definitions3_point1'))}
        {point(undefined, Trans('ma_definitions3_point2'))}
        {point(undefined, Trans('ma_definitions3_point3'))}
        {point(undefined, Trans('ma_definitions3_point4'))}
        {point(undefined, Trans('ma_definitions3_point5'))}
        {point(undefined, Trans('ma_definitions3_point6'))}
        {point(undefined, Trans('ma_definitions3_point7'))}
        {point(undefined, Trans('ma_definitions3_point8'))}
        {point(undefined, Trans('ma_definitions3_point9'))}
        {point(undefined, Trans('ma_definitions3_point10'))}
        {point(undefined, Trans('ma_definitions3_point11'))}
        {point(undefined, Trans('ma_definitions3_point12'))}
        {point(undefined, Trans('ma_definitions3_point13'))}
        {point(undefined, Trans('ma_definitions3_point14'))}
        {point(undefined, Trans('ma_definitions3_point15'))}
        {point(undefined, Trans('ma_definitions3_point16'))}
        {point(undefined, Trans('ma_definitions3_point17'))}
        <View style={{height: calcHeight(10)}} />
        {title(Trans('ma_definitions4'))}
        {description(Trans('ma_definitionsDescription4'))}
        <View style={{height: calcHeight(10)}} />
        {title(Trans('ma_definitions5'))}
        {point(undefined, Trans('ma_definitions5_point1'))}
        {point(undefined, Trans('ma_definitions5_point2'))}
        <View style={{height: calcHeight(100)}} />
      </ScrollView>
    )
  };
  
  return (
    <View style={styles.container}>
      {headerSection()}
      {bodySection()}
    </View>
  );
};
