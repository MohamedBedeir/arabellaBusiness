import React, { useRef, useState } from 'react';
import { I18nManager, Image, ImageBackground, ImageSourcePropType, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import AppText from '../../../components/AppText';
import { Trans } from '../../../translation';
import { IMAGES } from '../../../assets/Images';
import { COLORS, FONTS } from '../../../utils/theme';
import PagerView from 'react-native-pager-view';
import { calcFont, calcHeight } from '../../../utils/sizes';
import { useNavigation } from '@react-navigation/native';
import AppModalLanguage from '../../../components/AppModalLanguage';

const Definition: React.FC = () => {
  const navigation = useNavigation<any>();
  const viewPagerRef: any = useRef<PagerView>(null);
  const [viewPagerIndex, setViewPagerIndex] = useState<number>(0);
  const [visibleLanguage, setVisibleLanguage] = useState<boolean>(false);

  const page = () => {
    const item = (image: ImageSourcePropType, title: string, description: string): React.ReactNode => {
      const messageSection = (title: string, description: string) => {
        return (
          <View style={styles.messageContainer}>
            <AppText
              title={title}
              fontFamily={FONTS.extra_bold}
              fontSize={calcFont(28)}
              color={COLORS.white}
              lineHeight={calcHeight(32)}
              marginBottom={calcHeight(8)}
              numberOfLines={2}
              textAlign={'left'}
            />
            <AppText
              title={description}
              fontFamily={FONTS.light}
              fontSize={calcFont(20)}
              color={COLORS.white}
              lineHeight={calcHeight(20)}
              numberOfLines={2}
              textAlign={'left'}
            />
          </View>
        )
      };
    
      return (
        <ImageBackground source={image}  style={styles.item_container} imageStyle={styles.item_container}>
          {messageSection(title, description)}
        </ImageBackground>
      )
    };

    return (
      <PagerView
        layoutDirection={I18nManager.isRTL ? 'ltr' : 'ltr'}
        style={styles.page_container}
        scrollEnabled={true}
        ref={viewPagerRef}
        initialPage={viewPagerIndex}
        onPageSelected={(event) => setViewPagerIndex(event.nativeEvent.position)} useNext={false}
      >
        {item(IMAGES.definition1, Trans('weHelpReachNewCustomers'), Trans('notOnlyOrganizeReservations'))}
        {item(IMAGES.definition2, Trans('weDealWithAllSpecialtie'), Trans('notOnlyOrganizeReservations'))}
        {item(IMAGES.definition3, Trans('weHappyToCooperate'), Trans('notOnlyOrganizeReservations'))}
      </PagerView>
    )
  };

  const dataSection = () => {
    const languageSection = () => {
      return (
        <View style={styles.languageLangContainer}>
          <TouchableOpacity
            style={styles.languageSkipView}
            onPress={() => navigation.navigate('LetsStart')}
          >
            <AppText
              title={Trans('skip')}
              fontFamily={FONTS.medium}
              fontSize={calcFont(16)}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.languageLangView}
            onPress={() => setVisibleLanguage(true)}
          >
            <AppText
              title={Trans('switchLanguage')}
              fontFamily={FONTS.medium}
              fontSize={calcFont(16)}
              color={COLORS.white}
            />
            <Image source={I18nManager.isRTL ? IMAGES.languageAr : IMAGES.languageEn} style={styles.languageLangImage}/>
          </TouchableOpacity>
        </View>
      )
    };

    const nextSection = () => {
      const onNext = () => {
        if (viewPagerIndex < 2) {
          setViewPagerIndex(viewPagerIndex + 1);
          viewPagerRef.current.setPage(viewPagerIndex + 1);
        } else {
          navigation.navigate('LetsStart');
        }
      };

      return (
        <View style={styles.nextContainer}>
          <View style={styles.nextView}>
            {[1,2,3].map((item: any) => {
              return (
                <View style={(viewPagerIndex + 1) >= item ? styles.nextStapActive : styles.nextStapUnActive}/>
              )
            })}
          </View>
          <TouchableOpacity onPress={() => onNext()}>
            <Image source={IMAGES.nextDark} style={styles.nextImage}/>
          </TouchableOpacity>
        </View>
      )
    };

    return (
      <View style={styles.dataContainer}>
        {languageSection()}
        {nextSection()}
      </View>
    );
  };

  const modalLanguageSection = () => {
    return (
      <AppModalLanguage
        visible={visibleLanguage}
        onClose={() => setVisibleLanguage(false)}
      />
    )
  };
  
  return (
    <View style={styles.container} >
      {page()}
      {dataSection()}
      {modalLanguageSection()}
    </View>
  );
};

export default Definition;


