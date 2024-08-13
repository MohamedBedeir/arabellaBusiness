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
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppEmptyScreen from '../../../../../components/AppEmptyScreen/AppEmptyScreen';

const Services: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<any>();
  const { categoriesData } = useSelector((store: RootState) => store?.categories);
  const { servicesLoader, serviceData, serviceCount, serviceAddState, serviceEditState, serviceDeleteState } = useSelector((store: RootState) => store?.services);
  const [selectService, setSelectService] = useState<any>({});
  const [serviceEditId, setServiceEditId] = useState<any>();
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
  const [selectCategories, setSelectCategories] = useState<any>('');

  const [nameArError, setNameArError] = useState<boolean>(false);
  const [nameEnError, setNameEnError] = useState<boolean>(false);
  const [descriptioneArError, setDescriptionArError] = useState<boolean>(false);
  const [descriptionEnError, setDescriptionEnError] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<boolean>(false);
  const [timeError, setTimeError] = useState<boolean>(false);
  const [selectCategoriesError, setSelectCategoriesError] = useState<boolean>(false);
  const [imageFileError, setImageFileError] = useState<boolean>(false);

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

  const getUser = async () => {
    const user: any = await AsyncStorage.getItem('user');
    setUserData(JSON.parse(user));
  };

  useEffect(() => {
    getUser();
    dispatch(categories({}));
    getServices(1);
  }, []);

  const setData = (item?: any) => {
    setNameArError(false);
    setNameEnError(false);
    setDescriptionArError(false);
    setDescriptionEnError(false);
    setPriceError(false);
    setTimeError(false);
    setSelectCategoriesError(false);
    setImageFileError(false);
    if (item) {
      setServiceEditId(item?.id);
      setNameAr(item?.name);
      setNameEn(item?.nameEn);
      setDescriptionAr(item?.description);
      setDescriptionEn(item?.descriptionEn);
      setPrice(item.price);
      setTime(item.estimatedTime.toString());
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
  console.log('userData--------', userData);
  
  useEffect(() => {
    if (serviceAddState == 'done') {
      setVisibleAddNewService(false);
      setData();
      // setVisibleSaveData(true);
      dispatch(setServiceAddState(''));
    }
  }, [serviceAddState]);

  useEffect(() => {
    if (serviceEditState == 'done') {
      setVisibleEditService(false);
      setData();
      // setVisibleSaveData(true);
      dispatch(setServiceEditState(''));
    }
  }, [serviceEditState]);

  // useEffect(() => {
  //   if (serviceDeleteState == 'done') {
  //     setVisibleDeleteService(false);
  //     setVisibleSaveData(true);
  //     dispatch(setServiceDeleteState(''));
  //   }
  // }, [serviceDeleteState]);

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
    if (nameAr == '') {
      setNameArError(true);
    } else if (nameEn == '') {
      setNameArError(false);
      setNameEnError(true);
    } else if (descriptioneAr == '') {
      setNameEnError(false);
      setDescriptionArError(true);
    } else if (descriptionEn == '') {
      setDescriptionArError(false);
      setDescriptionEnError(true);
    } else if (price == '') {
      setDescriptionEnError(false);
      setPriceError(true);
    } else if (time == '') {
      setPriceError(false);
      setTimeError(true);
    } else if (selectCategories == '') {
      setTimeError(false);
      setSelectCategoriesError(true);
    } else if (base64 == '') {
      setSelectCategoriesError(false);
      setImageFileError(true);
    } else {
      setImageFileError(false);
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
        serviceProviderId: userData.serviceProviderId,
        taxId: 1,
        isTaxIncluded: false,
      };
      dispatch(service_add({data, image: imageFile}));
    }
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
          onPress={() => {setVisibleAddNewService(true); setData()}}
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
    setSelectService(item);
    setData(item);
  };

  const onEdit = (item?: any, type?: string) => {
    if (type == 'state') {
      const data = {
        isActive: item.id == 1,
        name: nameAr,
        nameEn: nameEn,
        description: descriptioneAr,
        descriptionEn: descriptionEn,
        price: parseInt(price, 10),
        estimatedTime: parseInt(time, 10),
        isHomeService: true,
        categoryId: selectCategories?.id,
        serviceProviderId: userData.serviceProviderId,
        taxId: 1,
        isTaxIncluded: false,
      };
      const id: number = serviceEditId;
      dispatch(service_edit({id, data, image: base64 ? imageFile : ''}));
    } else {
      if (nameAr == '') {
        setNameArError(true);
      } else if (nameEn == '') {
        setNameArError(false);
        setNameEnError(true);
      } else if (descriptioneAr == '') {
        setNameEnError(false);
        setDescriptionArError(true);
      } else if (descriptionEn == '') {
        setDescriptionArError(false);
        setDescriptionEnError(true);
      } else if (price == '') {
        setDescriptionEnError(false);
        setPriceError(true);
      } else if (time == '') {
        setPriceError(false);
        setTimeError(true);
      } else if (selectCategories == '') {
        setTimeError(false);
        setSelectCategoriesError(true);
      } else {
        const data = {
          name: nameAr,
          nameEn: nameEn,
          description: descriptioneAr,
          descriptionEn: descriptionEn,
          price: parseInt(price, 10),
          estimatedTime: parseInt(time, 10),
          isActive: item  || condition,
          isHomeService: true,
          categoryId: selectCategories?.id,
          serviceProviderId: userData.serviceProviderId,
          taxId: 1,
          isTaxIncluded: false,
        };
        const id: number = serviceEditId;
        dispatch(service_edit({id, data, image: base64 ? imageFile : ''}));
      }
    }
  };

  const onFillter = () => {
    setVisibleFillter(false);
    const data = {
      name: nameAr,
      nameEn: nameEn,
      price: parseInt(price, 10),
      estimatedTime: parseInt(time, 10),
      categoryId: selectCategories?.id,
      isActive: condition,
    };
    const id: number = serviceEditId;
    dispatch(service_data({data, page: 1}));
  };
  
  const listSection = () => {
    const renderItem = ({item, index} : {item: any, index: number}) => {
      return (
        <ServicesItem
          item={item}
          onPressDelete={() => {setVisibleDeleteService(true); setSelectService(item)}}
          onPressEdit={() => onEditService(item)}
          onUpdateState={() => {onState(item); setData(item)}}
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
        animationIn= 'fadeIn'
        animationInTiming= {600}
        animationOutTiming= {600}
        isVisible={visibleFillter}
        onBackdropPress={() => {setVisibleFillter(false); setData()}}
        onBackButtonPress={() => {setVisibleFillter(false); setData()}}
        deviceHeight={Dimensions.get('screen').height}
        statusBarTranslucent
      >
        <View style={styles.modalFillterContainer}>
          {modalCategoriesSection()}
          <AppTextGradient
            title={Trans('filter')}
            fontSize={calcFont(17)}
            fontFamily={FONTS.bold}
            colorStart={COLORS.secondGradient}
            colorEnd={COLORS.primaryGradient}
            textAlign={'left'}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppInput
              title={Trans('nameArabic')}
              value={nameAr}
              placeholder={Trans('nameArabic')}
              onChangeText={(text: string) => setNameAr(text)}
              inputContainer={{borderColor: COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(8)}}
            />
            <AppInput
              title={Trans('nameEnglish')}
              value={nameEn}
              placeholder={Trans('nameEnglish')}
              onChangeText={(text: string) => setNameEn(text)}
              inputContainer={{borderColor: COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('price')}
              keyboardType={'number-pad'}
              value={price}
              placeholder={'0'}
              onChangeText={(text: string) => setPrice(text)}
              inputContainer={{borderColor: COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('estimatedTime')}
              keyboardType={'number-pad'}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: COLORS.lightPrimary}}
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
            {/* <View style={{marginTop: calcHeight(12)}}>
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
            </View> */}
            
          </ScrollView>
          <View style={styles.modalActionContainer}>
            <AppButtonDefault
              title={Trans('research')}
              onPress={() => onFillter()}
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
        animationIn= 'fadeIn'
        animationInTiming= {600}
        animationOutTiming= {600}
        isVisible={visibleAddNewService}
        onBackdropPress={() => {setVisibleAddNewService(false); setData()}}
        onBackButtonPress={() => {setVisibleAddNewService(false); setData()}}
        deviceHeight={Dimensions.get('screen').height}
        statusBarTranslucent
      >
        <View style={styles.modalAddContainer}>
          {modalCategoriesSection()}
          <AppTextGradient
            title={Trans('addService')}
            fontSize={calcFont(17)}
            fontFamily={FONTS.bold}
            colorStart={COLORS.secondGradient}
            colorEnd={COLORS.primaryGradient}
            textAlign={'left'}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppInput
              title={Trans('nameArabic')}
              value={nameAr}
              placeholder={Trans('nameArabic')}
              onChangeText={(text: string) => setNameAr(text)}
              inputContainer={{borderColor: nameArError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(8)}}
            />
            <AppInput
              title={Trans('nameEnglish')}
              value={nameEn}
              placeholder={Trans('nameEnglish')}
              onChangeText={(text: string) => setNameEn(text)}
              inputContainer={{borderColor: nameEnError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('descriptionArabic')}
              value={descriptioneAr}
              placeholder={Trans('descriptionArabic')}
              onChangeText={(text: string) => setDescriptionAr(text)}
              inputContainer={{borderColor: descriptioneArError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('descriptionEnglish')}
              value={descriptionEn}
              placeholder={Trans('descriptionEnglish')}
              onChangeText={(text: string) => setDescriptionEn(text)}
              inputContainer={{borderColor: descriptionEnError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('price')}
              keyboardType={'number-pad'}
              value={price}
              placeholder={'0'}
              onChangeText={(text: string) => setPrice(text)}
              inputContainer={{borderColor: priceError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('estimatedTime')}
              keyboardType={'number-pad'}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: timeError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343), borderWidth: 0.6, borderColor: selectCategoriesError ? COLORS.red : COLORS.lightPrimary}}
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
                <ImageBackground source={image} style={[styles.conditionAddImageImage, {borderWidth: 0.6, borderColor: imageFileError ? COLORS.red : COLORS.lightPrimary}]} imageStyle={[styles.conditionAddImageContainer, {borderWidth: 0.6, borderColor: imageFileError ? COLORS.red : COLORS.lightPrimary}]}>
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
              onPress={() => {setVisibleAddNewService(false); setData()}}
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
    console.log('selectService-------------', selectService);
    
    const image = base64 != '' ? { uri: `data:image/png;base64,${base64}` } : selectService?.featuredImage ? {uri: `${endpoints.imageUrl}${selectService?.featuredImage}`} : IMAGES.uploadImage;
    return (
      <Modal
        style={{ margin: 0, justifyContent: 'flex-end', }}
        hasBackdrop propagateSwipe={true}
        animationIn= 'slideInUp'
        animationInTiming= {600}
        animationOutTiming= {600}
        isVisible={visibleEditService}
        onBackdropPress={() => {setVisibleEditService(false); setData()}}
        onBackButtonPress={() => {setVisibleEditService(false); setData()}}
        deviceHeight={Dimensions.get('screen').height}
        statusBarTranslucent
      >
        <View style={styles.modalAddContainer}>
          {modalCategoriesSection()}
          <AppTextGradient
            title={Trans('editService')}
            fontSize={calcFont(17)}
            fontFamily={FONTS.bold}
            colorStart={COLORS.secondGradient}
            colorEnd={COLORS.primaryGradient}
            textAlign={'left'}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppInput
              title={Trans('nameArabic')}
              value={nameAr}
              placeholder={Trans('nameArabic')}
              onChangeText={(text: string) => setNameAr(text)}
              inputContainer={{borderColor: nameArError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(8)}}
            />
            <AppInput
              title={Trans('nameEnglish')}
              value={nameEn}
              placeholder={Trans('nameEnglish')}
              onChangeText={(text: string) => setNameEn(text)}
              inputContainer={{borderColor: nameEnError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('descriptionArabic')}
              value={descriptioneAr}
              placeholder={Trans('descriptionArabic')}
              onChangeText={(text: string) => setDescriptionAr(text)}
              inputContainer={{borderColor: descriptioneArError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('descriptionEnglish')}
              value={descriptionEn}
              placeholder={Trans('descriptionEnglish')}
              onChangeText={(text: string) => setDescriptionEn(text)}
              inputContainer={{borderColor: descriptionEnError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('price')}
              keyboardType={'number-pad'}
              value={price}
              placeholder={'0'}
              onChangeText={(text: string) => setPrice(text)}
              inputContainer={{borderColor: priceError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('estimatedTime')}
              keyboardType={'number-pad'}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: timeError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343), borderWidth: 0.6, borderColor: selectCategoriesError ? COLORS.red : COLORS.lightPrimary}}
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
                <ImageBackground source={image} style={[styles.conditionAddImageImage, {borderWidth: 0.6, borderColor: imageFileError ? COLORS.red : COLORS.lightPrimary}]} imageStyle={[styles.conditionAddImageContainer, {borderWidth: 0.6, borderColor: imageFileError ? COLORS.red : COLORS.lightPrimary}]}>
                  <Image source={IMAGES.imageAdd} style={styles.conditionAddImage}/>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.modalActionContainer}>
            <AppButtonDefault
              title={Trans('save')}
              onPress={() => onEdit()}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(164), height: calcHeight(48)}}
            />
            <AppButtonDefault
              title={Trans('cancellation')}
              onPress={() => {setVisibleEditService(false); setData()}}
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
    ;
    // const data = {
    //   name: selectService.name,
    //   nameEn: selectService.nameEn,
    //   description: selectService.description,
    //   descriptionEn: selectService.descriptionEn,
    //   price: parseInt(selectService.price, 10),
    //   estimatedTime: parseInt(selectService.estimatedTime, 10),
    //   isHomeService: true,
    //   state: 'pending',
    //   categoryId: selectService.categoryId,
    //   serviceProviderId: userData.serviceProviderId,
    //   taxId: 1,
    //   isTaxIncluded: false,
    //   isActive: item.id == 1,
    // };
    // dispatch(service_edit({id: item.id, data, image: ''}));
  };

  const modalServiceStateSection = () => {
    return (
      <AppModalSelectItem
        visible={visibleUpdateServiceState}
        onClose={() => {setVisibleUpdateServiceState(false)}}
        onSelectItem={(item: any) => onEdit(item, 'state')}
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

  const emptySection = () => {
    return (
      <AppEmptyScreen
        image={IMAGES.empty_service}
        title={Trans('haveNotAddedAnyServicesYet')}
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
      {(!servicesLoader && serviceData.length == 0) && emptySection()}
      {listSection()}
      {fillterSection()}
      {addNewServiceSection()}
      {editServiceSection()}
      {modalSaveSection()}
      {modalDeleteSection()}
      {modalServiceStateSection()}
    </View>
  );
};

export default Services;

