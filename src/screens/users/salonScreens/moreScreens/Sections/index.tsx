import React, { useState } from 'react';
import { Alert, Dimensions, FlatList, Image, ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Trans } from '../../../../../translation';
import { calcFont, calcHeight, calcWidth } from '../../../../../utils/sizes';
import { COLORS, FONTS } from '../../../../../utils/theme';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import AppButtonDefault from '../../../../../components/AppButtonDefault';
import Modal from 'react-native-modal';
import Modal_Warning from '../../../../../components/Modal_Warning';
import AppTextGradient from '../../../../../components/AppTextGradient';
import AppText from '../../../../../components/AppText';
import AppInput from '../../../../../components/AppInput';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import SectionItem from '../../../../../components/SectionItem';

const Sections: React.FC = () => {
  const navigation = useNavigation<any>();
  const [nameAr, setNameAr] = useState<string>('');
  const [nameEn, setNameEn] = useState<string>('');
  const [descriptioneAr, setDescriptionAr] = useState<string>('');
  const [descriptionEn, setDescriptionEn] = useState<string>('');
  const [base64, setBase64] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);

  const [visibleFillter, setVisibleFillter] = useState<boolean>(false);
  const [visibleAddNewService, setVisibleAddNewService] = useState<boolean>(false);
  const [visibleEditService, setVisibleEditService] = useState<boolean>(false);
  const [visibleSaveData, setVisibleSaveData] = useState<boolean>(false);
  const [visibleDeleteService, setVisibleDeleteService] = useState<boolean>(false);

  const headerSection = () => {
    return (
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('sections')}
        logo={IMAGES.logoColors}
      />
    )
  };

  const addSection = () => {
    return (
      <View style={styles.headerContainer}>
        <AppButtonDefault
          colorStart={COLORS.primaryGradient}
          colorEnd={COLORS.secondGradient}
          border={false}
          onPress={() => setVisibleAddNewService(true)}
          title={Trans('addition')}
          icon={IMAGES.plusCircleWhite}
          buttonStyle={{width: calcWidth(253), height: calcHeight(48)}}
        />
        <AppButtonDefault
          colorStart={COLORS.primaryGradient}
          colorEnd={COLORS.secondGradient}
          border
          onPress={() => setVisibleFillter(true)}
          icon={IMAGES.filter}
          buttonStyle={{width: calcWidth(74), height: calcHeight(48)}}
        />
      </View>
    )
  };

  const listSection = () => {
    const renderItem = ({item, index} : {item: any, index: number}) => {
      return (
        <SectionItem
          item={item}
          onPressDelete={() => setVisibleDeleteService(true)}
          onPressEdit={() => setVisibleEditService(true)}
        />
      )
    };
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[1,2,3,4,5]}
          renderItem={renderItem}
          keyExtractor={item => `${item}`}
        />
      </View>
    )
  };

  // const selectImage = async () => {
  //   try {
  //     DocumentPicker.pick({
  //       type: [DocumentPicker.types.images],
  //     }).then(image => {
  //       setImageFile(JSON.stringify(image));
  //       RNFS.readFile(image[0].uri, 'base64').then((result: any) => {
  //         setBase64(result);
  //       });
  //     });
  //   } catch (error) {
  //     setImageFile('');
  //   }
  // };
  const selectImage = async () => {
    try {
      DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      }).then((image: any) => {
        const maxSize = 2 * 1024 * 1024;
        if (image[0].size > maxSize) {
          Alert.alert(Trans('imageSizeLarge'));
          return;
        } else {
          setImageFile(JSON.stringify(image));
          RNFS.readFile(image[0].uri, 'base64').then((result: any) => {
            setBase64(result);
          });
        }
      });
    } catch (error) {
      setImageFile('');
    }
  };
  
  const fillterSection = () => {
    return (
      <Modal
        style={{ margin: 0, justifyContent: 'flex-end', }}
        hasBackdrop propagateSwipe={true}
        animationIn= 'slideInUp'
        animationInTiming= {600}
        animationOutTiming= {600}
        isVisible={visibleFillter}
        onBackdropPress={() => setVisibleFillter(false)}
        onBackButtonPress={() => setVisibleFillter(false)}
        deviceHeight={Dimensions.get('screen').height}
        statusBarTranslucent
      >
        <View style={styles.modalFillterContainer}>
          <AppTextGradient
            title={Trans('filter')}
            fontSize={calcFont(17)}
            fontFamily={FONTS.bold}
            colorStart={COLORS.secondGradient}
            colorEnd={COLORS.primaryGradient}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppInput
              title={Trans('nameArabic')}
              value={nameAr}
              placeholder={Trans('nameArabic')}
              onChangeText={(text: string) => setNameAr(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(8)}}
            />
            <AppInput
              title={Trans('nameEnglish')}
              value={nameEn}
              placeholder={Trans('nameEnglish')}
              onChangeText={(text: string) => setNameEn(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
          </ScrollView>
          <View style={styles.modalActionContainer}>
            <AppButtonDefault
              title={Trans('research')}
              onPress={() => {setVisibleFillter(false)}}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(343), height: calcHeight(48)}}
            />
          </View>
        </View>
      </Modal>
    )
  };

  const addNewServiceSection = () => {
    const image = base64 != '' ? { uri: `data:image/png;base64,${base64}` } : IMAGES.uploadImage;
    return (
      <Modal
        style={{ margin: 0, justifyContent: 'flex-end', }}
        hasBackdrop propagateSwipe={true}
        animationIn= 'slideInUp'
        animationInTiming= {600}
        animationOutTiming= {600}
        isVisible={visibleAddNewService}
        onBackdropPress={() => setVisibleAddNewService(false)}
        onBackButtonPress={() => setVisibleAddNewService(false)}
        deviceHeight={Dimensions.get('screen').height}
        statusBarTranslucent
      >
        <View style={styles.modalAddContainer}>
          <AppTextGradient
            title={Trans('addNewSection')}
            fontSize={calcFont(17)}
            fontFamily={FONTS.bold}
            colorStart={COLORS.secondGradient}
            colorEnd={COLORS.primaryGradient}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppInput
              title={Trans('nameArabic')}
              value={nameAr}
              placeholder={Trans('nameArabic')}
              onChangeText={(text: string) => setNameAr(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(8)}}
            />
            <AppInput
              title={Trans('nameEnglish')}
              value={nameEn}
              placeholder={Trans('nameEnglish')}
              onChangeText={(text: string) => setNameEn(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('descriptionArabic')}
              value={descriptioneAr}
              placeholder={Trans('descriptionArabic')}
              onChangeText={(text: string) => setDescriptionAr(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('descriptionEnglish')}
              value={descriptionEn}
              placeholder={Trans('descriptionEnglish')}
              onChangeText={(text: string) => setDescriptionEn(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <View style={{marginTop: calcHeight(12)}}>
              <AppText
                title={Trans('addImage')}
                fontFamily={FONTS.medium}
                fontSize={calcFont(14)}
                textAlign={'left'}
                color={COLORS.textDark}
              />
              <TouchableOpacity onPress={() => selectImage()}>
                <ImageBackground source={image} style={styles.conditionAddImageImage} imageStyle={styles.conditionAddImageContainer}>
                  <Image source={IMAGES.imageAdd} style={styles.conditionAddImage}/>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.modalActionContainer}>
            <AppButtonDefault
              title={Trans('save')}
              onPress={() => {setVisibleSaveData(true); setVisibleAddNewService(false)}}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(164), height: calcHeight(48)}}
            />
            <AppButtonDefault
              title={Trans('cancellation')}
              onPress={() => setVisibleAddNewService(false)}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(164), height: calcHeight(48)}}
              border
            />
          </View>
        </View>
      </Modal>
    )
  };

  const editServiceSection = () => {
    const image = base64 != '' ? { uri: `data:image/png;base64,${base64}` } : IMAGES.uploadImage;
    return (
      <Modal
        style={{ margin: 0, justifyContent: 'flex-end', }}
        hasBackdrop propagateSwipe={true}
        animationIn= 'slideInUp'
        animationInTiming= {600}
        animationOutTiming= {600}
        isVisible={visibleEditService}
        onBackdropPress={() => setVisibleEditService(false)}
        onBackButtonPress={() => setVisibleEditService(false)}
        deviceHeight={Dimensions.get('screen').height}
        statusBarTranslucent
      >
        <View style={styles.modalAddContainer}>
          <AppTextGradient
            title={Trans('editSection')}
            fontSize={calcFont(17)}
            fontFamily={FONTS.bold}
            colorStart={COLORS.secondGradient}
            colorEnd={COLORS.primaryGradient}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppInput
              title={Trans('nameArabic')}
              value={nameAr}
              placeholder={Trans('nameArabic')}
              onChangeText={(text: string) => setNameAr(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(8)}}
            />
            <AppInput
              title={Trans('nameEnglish')}
              value={nameEn}
              placeholder={Trans('nameEnglish')}
              onChangeText={(text: string) => setNameEn(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('descriptionArabic')}
              value={descriptioneAr}
              placeholder={Trans('descriptionArabic')}
              onChangeText={(text: string) => setDescriptionAr(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('descriptionEnglish')}
              value={descriptionEn}
              placeholder={Trans('descriptionEnglish')}
              onChangeText={(text: string) => setDescriptionEn(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <View style={{marginTop: calcHeight(12)}}>
              <AppText
                title={Trans('addImage')}
                fontFamily={FONTS.medium}
                fontSize={calcFont(14)}
                textAlign={'left'}
                color={COLORS.textDark}
              />
              <TouchableOpacity onPress={() => selectImage()}>
                <ImageBackground source={image} style={styles.conditionAddImageImage} imageStyle={styles.conditionAddImageContainer}>
                  <Image source={IMAGES.imageAdd} style={styles.conditionAddImage}/>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.modalActionContainer}>
            <AppButtonDefault
              title={Trans('save')}
              onPress={() => {setVisibleSaveData(true); setVisibleEditService(false)}}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(164), height: calcHeight(48)}}
            />
            <AppButtonDefault
              title={Trans('cancellation')}
              onPress={() => setVisibleEditService(false)}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(164), height: calcHeight(48)}}
              border
            />
          </View>
        </View>
      </Modal>
    )
  };

  const modalSaveSection = () => {
    return (
      <Modal_Warning
        visible={visibleSaveData}
        onClose={() => setVisibleSaveData(false)}
        onPress={() => setVisibleSaveData(false)}
        image={IMAGES.modalDone}
        title={Trans('dataSavedSuccessfully')}
        buttonTitle={Trans('done')}
      />
    )
  };

  const modalDeleteSection = () => {
    return (
      <Modal_Warning
        visible={visibleDeleteService}
        onClose={() => setVisibleDeleteService(false)}
        onPress1={() => setVisibleDeleteService(false)}
        onPress2={() => setVisibleDeleteService(false)}
        image={IMAGES.modalCancel}
        title={Trans('doDeleteSectionFromSectionsList')}
        button1Title={Trans('yes')}
        button2Title={Trans('no')}
      />
    )
  };

  return (
    <View style={styles.container}>
      {headerSection()}
      {addSection()}
      {listSection()}
      {fillterSection()}
      {addNewServiceSection()}
      {editServiceSection()}
      {modalSaveSection()}
      {modalDeleteSection()}
    </View>
  );
};

export default Sections;


