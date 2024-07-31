import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Trans } from '../../../../../translation';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import AppButtonDefault from '../../../../../components/AppButtonDefault';
import { COLORS, FONTS } from '../../../../../utils/theme';
import { calcFont, calcHeight, calcWidth } from '../../../../../utils/sizes';
import BrancheItem from '../../../../../components/BrancheItem';
import Modal from 'react-native-modal';
import AppTextGradient from '../../../../../components/AppTextGradient';
import AppInput from '../../../../../components/AppInput';
import AppPickerSelect from '../../../../../components/AppPickerSelect';
import AppText from '../../../../../components/AppText';
import AppTextViewGradient from '../../../../../components/AppTextViewGradient';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import AppInputPhone from '../../../../../components/AppInputPhone';
import Modal_Warning from '../../../../../components/Modal_Warning';

const Branches: React.FC = () => {
  const navigation = useNavigation<any>();
  const [nameAr, setNameAr] = useState<string>('');
  const [nameEn, setNameEn] = useState<string>('');
  const [descriptioneAr, setDescriptionAr] = useState<string>('');
  const [descriptionEn, setDescriptionEn] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [addressArabic, setAddressArabic] = useState<string>('');
  const [addressEnglish, setAddressEnglish] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [base64, setBase64] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);
  const [condition, setCondition] = useState<boolean>(true);

  const [visibleFillter, setVisibleFillter] = useState<boolean>(false);
  const [visibleAddNewBranch, setVisibleAddNewBranch] = useState<boolean>(false);
  const [visibleEditBranch, setVisibleEditBranch] = useState<boolean>(false);
  const [visibleSaveData, setVisibleSaveData] = useState<boolean>(false);
  const [visibleDeleteBranch, setVisibleDeleteBranch] = useState<boolean>(false);

  const headerSection = () => {
    return (
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('branches')}
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
          onPress={() => setVisibleAddNewBranch(true)}
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
        <BrancheItem
          item={item}
          onPressDelete={() => setVisibleDeleteBranch(true)}
          onPressEdit={() => setVisibleEditBranch(true)}
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
            <View style={{marginTop: calcHeight(12)}}>
              <AppText
                title={Trans('condition')}
                fontFamily={FONTS.medium}
                fontSize={calcFont(14)}
                textAlign={'left'}
                color={COLORS.textDark}
              />
              <View style={styles.conditionContainer}>
                <TouchableOpacity
                  style={styles.conditionView}
                  onPress={() => setCondition(true)}
                >
                  <Image source={condition ? IMAGES.selectActive : IMAGES.selectUnActive} style={styles.conditionIcon}/>
                  <AppTextViewGradient
                    containerStyle={styles.conditionTextView}
                    colorStart={'rgba(92, 190, 67, 0.2)'}
                    colorEnd={'rgba(92, 190, 67, 0.2)'}
                    title={Trans('activated')}
                    fontFamily={FONTS.bold}
                    fontSize={calcFont(14)}
                    textAlign={'center'}
                    textColorStart={COLORS.green2}
                    textColorEnd={COLORS.green2}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.conditionView}
                  onPress={() => setCondition(false)}
                >
                  <Image source={condition ? IMAGES.selectUnActive : IMAGES.selectActive} style={styles.conditionIcon}/>
                  <AppTextViewGradient
                    containerStyle={styles.conditionTextView}
                    colorStart={'rgba(239, 68, 68, 0.2)'}
                    colorEnd={'rgba(239, 68, 68, 0.2)'}
                    title={Trans('deactivated')}
                    fontFamily={FONTS.bold}
                    fontSize={calcFont(14)}
                    textAlign={'center'}
                    textColorStart={COLORS.red}
                    textColorEnd={COLORS.red}
                  />
                </TouchableOpacity>
              </View>
            </View>
            
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

  const selectImage = async () => {
    try {
      DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      }).then(image => {
        setImageFile(JSON.stringify(image));
        RNFS.readFile(image[0].uri, 'base64').then((result: any) => {
          setBase64(result);
        });
      });
    } catch (error) {
      setImageFile('');
    }
  };

  const addNewBranchSection = () => {
    const image = base64 != '' ? { uri: `data:image/png;base64,${base64}` } : IMAGES.uploadImage;
    return (
      <Modal
        style={{ margin: 0, justifyContent: 'flex-end', }}
        hasBackdrop propagateSwipe={true}
        animationIn= 'slideInUp'
        animationInTiming= {600}
        animationOutTiming= {600}
        isVisible={visibleAddNewBranch}
        onBackdropPress={() => setVisibleAddNewBranch(false)}
        onBackButtonPress={() => setVisibleAddNewBranch(false)}
        deviceHeight={Dimensions.get('screen').height}
        statusBarTranslucent
      >
        <View style={styles.modalAddContainer}>
          <AppTextGradient
            title={Trans('addBranch')}
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
            <AppInputPhone
              containerStyle={{marginTop: calcHeight(20)}}
              title={Trans('mobileNumber')}
              image={IMAGES.authPhone}
              placeholder={Trans('mobileNumber')}
              value={phone}
              keyboardType={'number-pad'}
              onChangeText={(text: string) => setPhone(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              // _textAligne={}
              // error={}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('country')}
              placeholder={Trans('nameOfCountry')}
              icon={IMAGES.dropDown}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('city')}
              placeholder={Trans('cityName')}
              icon={IMAGES.dropDown}
            />
            <AppInput
              title={Trans('addressArabic')}
              value={addressArabic}
              placeholder={'0'}
              onChangeText={(text: string) => setAddressArabic(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('addressEnglish')}
              value={addressEnglish}
              placeholder={'0'}
              onChangeText={(text: string) => setAddressEnglish(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('longitude')}
              value={longitude}
              placeholder={'0'}
              onChangeText={(text: string) => setLongitude(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('latitude')}
              value={latitude}
              placeholder={'0'}
              onChangeText={(text: string) => setLatitude(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            
            <View style={{marginTop: calcHeight(12)}}>
              <AppText
                title={Trans('condition')}
                fontFamily={FONTS.medium}
                fontSize={calcFont(14)}
                textAlign={'left'}
                color={COLORS.textDark}
              />
              <View style={styles.conditionContainer}>
                <TouchableOpacity
                  style={styles.conditionView}
                  onPress={() => setCondition(true)}
                >
                  <Image source={condition ? IMAGES.selectActive : IMAGES.selectUnActive} style={styles.conditionIcon}/>
                  <AppTextViewGradient
                    containerStyle={styles.conditionTextView}
                    colorStart={'rgba(92, 190, 67, 0.2)'}
                    colorEnd={'rgba(92, 190, 67, 0.2)'}
                    title={Trans('activated')}
                    fontFamily={FONTS.bold}
                    fontSize={calcFont(14)}
                    textAlign={'center'}
                    textColorStart={COLORS.green2}
                    textColorEnd={COLORS.green2}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.conditionView}
                  onPress={() => setCondition(false)}
                >
                  <Image source={condition ? IMAGES.selectUnActive : IMAGES.selectActive} style={styles.conditionIcon}/>
                  <AppTextViewGradient
                    containerStyle={styles.conditionTextView}
                    colorStart={'rgba(239, 68, 68, 0.2)'}
                    colorEnd={'rgba(239, 68, 68, 0.2)'}
                    title={Trans('deactivated')}
                    fontFamily={FONTS.bold}
                    fontSize={calcFont(14)}
                    textAlign={'center'}
                    textColorStart={COLORS.red}
                    textColorEnd={COLORS.red}
                  />
                </TouchableOpacity>
              </View>
            </View>
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
              onPress={() => {setVisibleSaveData(true); setVisibleAddNewBranch(false)}}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(164), height: calcHeight(48)}}
            />
            <AppButtonDefault
              title={Trans('cancellation')}
              onPress={() => setVisibleAddNewBranch(false)}
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

  const editBranchSection = () => {
    const image = base64 != '' ? { uri: `data:image/png;base64,${base64}` } : IMAGES.uploadImage;
    return (
      <Modal
        style={{ margin: 0, justifyContent: 'flex-end', }}
        hasBackdrop propagateSwipe={true}
        animationIn= 'slideInUp'
        animationInTiming= {600}
        animationOutTiming= {600}
        isVisible={visibleEditBranch}
        onBackdropPress={() => setVisibleEditBranch(false)}
        onBackButtonPress={() => setVisibleEditBranch(false)}
        deviceHeight={Dimensions.get('screen').height}
        statusBarTranslucent
      >
        <View style={styles.modalAddContainer}>
          <AppTextGradient
            title={Trans('editBranch')}
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
            <AppInputPhone
            containerStyle={{marginTop: calcHeight(20)}}
            title={Trans('mobileNumber')}
            image={IMAGES.authPhone}
            placeholder={Trans('mobileNumber')}
            value={phone}
            keyboardType={'number-pad'}
            onChangeText={(text: string) => setPhone(text)}
            inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
            // _textAligne={}
            // error={}
          />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('country')}
              placeholder={Trans('nameOfCountry')}
              icon={IMAGES.dropDown}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('city')}
              placeholder={Trans('cityName')}
              icon={IMAGES.dropDown}
            />
            <AppInput
              title={Trans('addressArabic')}
              value={addressArabic}
              placeholder={'0'}
              onChangeText={(text: string) => setAddressArabic(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('addressEnglish')}
              value={addressEnglish}
              placeholder={'0'}
              onChangeText={(text: string) => setAddressEnglish(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('longitude')}
              value={longitude}
              placeholder={'0'}
              onChangeText={(text: string) => setLongitude(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('latitude')}
              value={latitude}
              placeholder={'0'}
              onChangeText={(text: string) => setLatitude(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            
            <View style={{marginTop: calcHeight(12)}}>
              <AppText
                title={Trans('condition')}
                fontFamily={FONTS.medium}
                fontSize={calcFont(14)}
                textAlign={'left'}
                color={COLORS.textDark}
              />
              <View style={styles.conditionContainer}>
                <TouchableOpacity
                  style={styles.conditionView}
                  onPress={() => setCondition(true)}
                >
                  <Image source={condition ? IMAGES.selectActive : IMAGES.selectUnActive} style={styles.conditionIcon}/>
                  <AppTextViewGradient
                    containerStyle={styles.conditionTextView}
                    colorStart={'rgba(92, 190, 67, 0.2)'}
                    colorEnd={'rgba(92, 190, 67, 0.2)'}
                    title={Trans('activated')}
                    fontFamily={FONTS.bold}
                    fontSize={calcFont(14)}
                    textAlign={'center'}
                    textColorStart={COLORS.green2}
                    textColorEnd={COLORS.green2}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.conditionView}
                  onPress={() => setCondition(false)}
                >
                  <Image source={condition ? IMAGES.selectUnActive : IMAGES.selectActive} style={styles.conditionIcon}/>
                  <AppTextViewGradient
                    containerStyle={styles.conditionTextView}
                    colorStart={'rgba(239, 68, 68, 0.2)'}
                    colorEnd={'rgba(239, 68, 68, 0.2)'}
                    title={Trans('deactivated')}
                    fontFamily={FONTS.bold}
                    fontSize={calcFont(14)}
                    textAlign={'center'}
                    textColorStart={COLORS.red}
                    textColorEnd={COLORS.red}
                  />
                </TouchableOpacity>
              </View>
            </View>
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
              onPress={() => {setVisibleSaveData(true); setVisibleEditBranch(false)}}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(164), height: calcHeight(48)}}
            />
            <AppButtonDefault
              title={Trans('cancellation')}
              onPress={() => setVisibleEditBranch(false)}
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
        visible={visibleDeleteBranch}
        onClose={() => setVisibleDeleteBranch(false)}
        onPress1={() => setVisibleDeleteBranch(false)}
        onPress2={() => setVisibleDeleteBranch(false)}
        image={IMAGES.modalCancel}
        title={Trans('doDeleteBranchFromBranchesList')}
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
      {addNewBranchSection()}
      {editBranchSection()}
      {modalSaveSection()}
      {modalDeleteSection()}
    </View>
  );
};

export default Branches;