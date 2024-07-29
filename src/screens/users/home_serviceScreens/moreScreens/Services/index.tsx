import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, I18nManager, Image, ImageBackground, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
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
import AppPickerSelect from '../../../../../components/AppPickerSelect';
import AppTextViewGradient from '../../../../../components/AppTextViewGradient';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import ServicesItem from '../../../../../components/ServicesItem';
import AppModalSelectItem from '../../../../../components/AppModalSelectItem';
import { DUMMY_DATA } from '../../../../../utils/dummyData';
import { RootState, useAppDispatch } from '../../../../../redux/store/store';
import { categories } from '../../../../../middleware/general/categories';
import { useSelector } from 'react-redux';
import { service_add, service_data, service_delete, service_edit } from '../../../../../middleware/services/services';
import AppLoading from '../../../../../components/AppLoading';
import { setServiceAddState, setServiceDeleteState, setServiceEditState } from '../../../../../redux/store/services/servicesSlice';
import endpoints from '../../../../../network/endpoints';

const Services: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { categoriesData } = useSelector((store: RootState) => store?.categories);
  const { servicesLoader, serviceData, serviceCount, serviceAddState, serviceEditState, serviceDeleteState } = useSelector((store: RootState) => store?.services);
  const [selectService, setSelectService] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  
  const [nameAr, setNameAr] = useState<string>('');
  const [nameEn, setNameEn] = useState<string>('');
  const [descriptioneAr, setDescriptionAr] = useState<string>('');
  const [descriptionEn, setDescriptionEn] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [base64, setBase64] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);
  const [condition, setCondition] = useState<boolean>(true);
  const [selectCategories, setSelectCategories] = useState<any>({});

  const [visibleFillter, setVisibleFillter] = useState<boolean>(false);
  const [visibleAddNewService, setVisibleAddNewService] = useState<boolean>(false);
  const [visibleEditService, setVisibleEditService] = useState<boolean>(false);
  const [visibleSaveData, setVisibleSaveData] = useState<boolean>(false);
  const [visibleDeleteService, setVisibleDeleteService] = useState<boolean>(false);
  const [visibleUpdateServiceState, setVisibleUpdateServiceState] = useState<boolean>(false);
  const [selectServiceState, setSelectServiceState] = useState<any>({});
  const [visibleCategories, setVisibleCategories] = useState<boolean>(false);

  const getServices = (page: number) => {
    dispatch(service_data({page}));
  };
  useEffect(() => {
    dispatch(categories({}));
    getServices(1);
  }, []);

  const setData = (item?: any) => {
    if (item) {
      setNameAr(item?.name);
      setNameEn(item?.nameEn);
      setDescriptionAr(item?.description);
      setDescriptionEn(item?.descriptionEn);
      setPrice(item.price);
      setTime(item.estimatedTime.toString());
      // setTime(item?.estimatedTime);
      setBase64('');
      setImageFile(`${endpoints.imageUrl}${item?.featuredImage}`);
      setCondition(item?.isActive);
      setSelectCategories(item?.category);
    } else {
      setNameAr('');
      setNameEn('');
      setDescriptionAr('');
      setDescriptionEn('');
      setPrice('');
      setTime('');
      setBase64('');
      setImageFile(null);
      setCondition(true);
      setSelectCategories({});
    }
  };
  useEffect(() => {
    if (serviceAddState == 'done') {
      setVisibleAddNewService(false);
      setData();
      setVisibleSaveData(true);
      dispatch(setServiceAddState(''));
    }
  }, [serviceAddState]);

  useEffect(() => {
    if (serviceEditState == 'done') {
      setVisibleEditService(false);
      setData();
      setVisibleSaveData(true);
      dispatch(setServiceEditState(''));
    }
  }, [serviceEditState]);

  useEffect(() => {
    if (serviceDeleteState == 'done') {
      setVisibleDeleteService(false);
      setVisibleSaveData(true);
      dispatch(setServiceDeleteState(''));
    }
  }, [serviceDeleteState]);

  const _onRefresh_Services = () => {
    getServices(1);
    setPage(1);
  };
  const _loadMore_Services = () => {
    if((serviceData.length < serviceCount)) {
      getServices(page + 1);
      setPage(page + 1);
    }
  };

  const onAdd = () => {
    const data = {
      name: nameAr,
      nameEn: nameEn,
      description: descriptioneAr,
      descriptionEn: descriptionEn,
      price: parseInt(price, 10),
      estimatedTime: parseInt(time, 10),
      isActive: condition,
      isHomeService: true,
      state: 'pending',
      categoryId: selectCategories?.id,
      // serviceProviderId: 5,
      taxId: 1,
      isTaxIncluded: false,
    };
    dispatch(service_add({data, image: imageFile}));
  };

  const headerSection = () => {
    return (
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('services')}
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
  
  const onState = (item: any) => {
    setVisibleUpdateServiceState(true);
    setSelectService(item);
    if (item.isActive) {
      setSelectServiceState(DUMMY_DATA.SERVICESTATUES[0]);
    } else {
      setSelectServiceState(DUMMY_DATA.SERVICESTATUES[1]);
    }
  };

  const onEditService = (item: any) => {
    setVisibleEditService(true);
    setData(item);

  }
  const listSection = () => {
    const renderItem = ({item, index} : {item: any, index: number}) => {
      return (
        <ServicesItem
          item={item}
          onPressDelete={() => {setVisibleDeleteService(true); setSelectService(item)}}
          onPressEdit={() => onEditService(item)}
          onUpdateState={() => onState(item)}
        />
      )
    };
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={serviceData}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          refreshing={servicesLoader && page == 1}
          onRefresh={_onRefresh_Services}
          onEndReached={() => {
            _loadMore_Services();
          }}
          onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.2}
          ListFooterComponent={() => {
            return (
              <>
                {serviceData.length == 0 ? (
                  <>
                    {/* <WarningScreen
                      image={IMAGES.emptySearch}
                      title={Trans('dontHaveSearchResultsTitle')}
                      description={Trans('dontHaveSearchResultsDescription')}
                    /> */}
                  </>
                ) : (
                  <View style={{backgroundColor: COLORS.backgroundLight, width: '100%', paddingVertical: calcHeight(4), justifyContent: 'center', paddingBottom: calcHeight(32)}}>
                    {(servicesLoader && page > 1) && <ActivityIndicator color={COLORS.primaryGradient} size={'large'}/>}
                  </View>
                )}
              </>
            )
          }}
        />
      </View>
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
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(8)}}
            />
            <AppInput
              title={Trans('nameEnglish')}
              value={nameEn}
              placeholder={Trans('nameEnglish')}
              onChangeText={(text: string) => setNameEn(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('price')}
              keyboardType={'number-pad'}
              value={price}
              placeholder={'0'}
              onChangeText={(text: string) => setPrice(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('estimatedTime')}
              keyboardType={'number-pad'}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => setVisibleCategories(true)}
              title={Trans('category')}
              placeholder={selectCategories ? I18nManager.isRTL ? selectCategories.nameAr : selectCategories.nameEn : Trans('selectCategory')}
              icon={IMAGES.dropDown}
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
            title={Trans('addService')}
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
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(8)}}
            />
            <AppInput
              title={Trans('nameEnglish')}
              value={nameEn}
              placeholder={Trans('nameEnglish')}
              onChangeText={(text: string) => setNameEn(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('descriptionArabic')}
              value={descriptioneAr}
              placeholder={Trans('descriptionArabic')}
              onChangeText={(text: string) => setDescriptionAr(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('descriptionEnglish')}
              value={descriptionEn}
              placeholder={Trans('descriptionEnglish')}
              onChangeText={(text: string) => setDescriptionEn(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('price')}
              keyboardType={'number-pad'}
              value={price}
              placeholder={'0'}
              onChangeText={(text: string) => setPrice(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('estimatedTime')}
              keyboardType={'number-pad'}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => setVisibleCategories(true)}
              title={Trans('category')}
              placeholder={selectCategories ? I18nManager.isRTL ? selectCategories.name : selectCategories.nameEn : Trans('selectCategory')}
              icon={IMAGES.dropDown}
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
              onPress={() => onAdd()}
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
            title={Trans('editService')}
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
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(8)}}
            />
            <AppInput
              title={Trans('nameEnglish')}
              value={nameEn}
              placeholder={Trans('nameEnglish')}
              onChangeText={(text: string) => setNameEn(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('descriptionArabic')}
              value={descriptioneAr}
              placeholder={Trans('descriptionArabic')}
              onChangeText={(text: string) => setDescriptionAr(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('descriptionEnglish')}
              value={descriptionEn}
              placeholder={Trans('descriptionEnglish')}
              onChangeText={(text: string) => setDescriptionEn(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('price')}
              keyboardType={'number-pad'}
              value={price}
              placeholder={'0'}
              onChangeText={(text: string) => setPrice(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('estimatedTime')}
              keyboardType={'number-pad'}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => setVisibleCategories(true)}
              title={Trans('category')}
              placeholder={selectCategories ? I18nManager.isRTL ? selectCategories.name : selectCategories.nameEn : Trans('selectCategory')}
              icon={IMAGES.dropDown}
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

  const onDoneSave = () => {
    setVisibleSaveData(false);
    getServices(1);
    setPage(1);
  };

  const modalSaveSection = () => {
    return (
      <Modal_Warning
        visible={visibleSaveData}
        onClose={() => onDoneSave()}
        onPress={() => onDoneSave()}
        image={IMAGES.modalDone}
        title={Trans('dataSavedSuccessfully')}
        buttonTitle={Trans('done')}
      />
    )
  };
  
  const onDelete = () => {
    setVisibleDeleteService(false);
    dispatch(service_delete({id: selectService?.id}));
  };
  const modalDeleteSection = () => {
    return (
      <Modal_Warning
        visible={visibleDeleteService}
        onClose={() => setVisibleDeleteService(false)}
        onPress1={() => onDelete()}
        onPress2={() => setVisibleDeleteService(false)}
        image={IMAGES.modalCancel}
        title={Trans('doDeleteServiceFromServicesList')}
        button1Title={Trans('yes')}
        button2Title={Trans('no')}
      />
    )
  };

  const onUpdateState = (item: any) => {
    
    const data = {
      name: selectService.name,
      nameEn: selectService.nameEn,
      description: selectService.description,
      descriptionEn: selectService.descriptionEn,
      price: parseInt(selectService.price, 10),
      estimatedTime: parseInt(selectService.estimatedTime, 10),
      isHomeService: true,
      state: 'pending',
      categoryId: selectService.categoryId,
      // serviceProviderId: 5,
      taxId: 1,
      isTaxIncluded: false,
      isActive: item.id == 1,
    };
    dispatch(service_edit({id: item.id, data, image: ''}));
  };

  const modalServiceStateSection = () => {
    return (
      <AppModalSelectItem
        visible={visibleUpdateServiceState}
          onClose={() => {setVisibleUpdateServiceState(false)}}
          onSelectItem={(item: any) => onUpdateState(item)}
          title={Trans('chooseServiveState')}
          data={DUMMY_DATA.SERVICESTATUES}
          itemSelected={selectServiceState}
          multiSelect={false}
      />
    )
  };

  const modalCategoriesSection = () => {
    return (
      <AppModalSelectItem
        visible={visibleCategories}
        onClose={() => {setVisibleCategories(false)}}
        onSelectItem={(item: any) => {setSelectCategories(item)}}
        title={Trans('selectCategory')}
        data={categoriesData}
        itemSelected={selectCategories}
        multiSelect={false}
      />
    )
  };

  const loadingSection = () => {
    return (
      <AppLoading
        margin_top={calcHeight(440)}
        size={'large'}
        visible={servicesLoader && page == 1}
      />
    )
  };

  return (
    <View style={styles.container}>
      {loadingSection()}
      {headerSection()}
      {addSection()}
      {listSection()}
      {fillterSection()}
      {addNewServiceSection()}
      {editServiceSection()}
      {modalSaveSection()}
      {modalDeleteSection()}
      {modalServiceStateSection()}
      {modalCategoriesSection()}
    </View>
  );
};

export default Services;


