import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, I18nManager, Image, ImageBackground, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
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
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../../redux/store/store';
import AppModalSelectItem from '../../../../../components/AppModalSelectItem';
import { branch_add, branch_delete, branches_data } from '../../../../../middleware/branches/branches';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cities } from '../../../../../middleware/general/cities';
import { setBrancheAddState, setBrancheEditState } from '../../../../../redux/store/branches/branchesSlice';
import AppLoading from '../../../../../components/AppLoading';
import { Region } from 'react-native-maps';
import MapAddress from '../../../../../components/MapAddress/MapAddress';

const Branches: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<any>();
  const { citiesData } = useSelector((store: RootState) => store?.cities);
  const { branchesLoader, branchesData, branchesCount,branchAddState, branchEditState, branchDeleteState } = useSelector((store: RootState) => store?.branches);
  const [selectBranch, setSelectBranch] = useState<any>({});

  const [page, setPage] = useState<number>(1);
  const [nameAr, setNameAr] = useState<string>('');
  const [nameEn, setNameEn] = useState<string>('');
  const [descriptioneAr, setDescriptionAr] = useState<string>('');
  const [descriptionEn, setDescriptionEn] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [selectCity, setSelectCity] = useState<any>('');
  const [addressAr, setAddressAr] = useState<string>('');
  const [addressEn, setAddressEn] = useState<string>('');
  const [condition, setCondition] = useState<boolean>(true);
  const [base64, setBase64] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);

  const [modalVisible_MapAddress, setModalVisible_MapAddress] = useState(false);
  const [addressLocation, setAddressLocation] = useState<string>('');
  const [location, setLocation] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.7,
    longitudeDelta: 0.7,
  });


  const [nameArError, setNameArError] = useState<boolean>(false);
  const [nameEnError, setNameEnError] = useState<boolean>(false);
  const [descriptioneArError, setDescriptionArError] = useState<boolean>(false);
  const [descriptionEnError, setDescriptionEnError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [cityError, setCityError] = useState<boolean>(false);
  const [addressArError, setAddressArError] = useState<boolean>(false);
  const [addressEnError, setAddressEnError] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<boolean>(false);
  const [imageFileError, setImageFileError] = useState<boolean>(false);

  const [visibleFillter, setVisibleFillter] = useState<boolean>(false);
  const [visibleAddNewBranch, setVisibleAddNewBranch] = useState<boolean>(false);
  const [visibleEditBranch, setVisibleEditBranch] = useState<boolean>(false);
  const [visibleSaveData, setVisibleSaveData] = useState<boolean>(false);
  const [visibleDeleteBranch, setVisibleDeleteBranch] = useState<boolean>(false);
  const [visibleCities, setVisibleCities] = useState<boolean>(false);


  const getBranches = (page: number) => {
    dispatch(branches_data({page}));
  };

  const getUser = async () => {
    const user: any = await AsyncStorage.getItem('user');
    setUserData(JSON.parse(user));
  };

  useEffect(() => {
    getUser();
    dispatch(cities({}));
    getBranches(1);
  }, []);

  useEffect(() => {
    if (branchAddState == 'done') {
      setVisibleAddNewBranch(false);
      setData();
      setVisibleSaveData(true);
      dispatch(setBrancheAddState(''));
    }
  }, [branchAddState]);

  useEffect(() => {
    if (branchEditState == 'done') {
      setVisibleEditBranch(false);
      setData();
      setVisibleSaveData(true);
      dispatch(setBrancheEditState(''));
    }
  }, [branchEditState]);

  const setData = (item?: any) => {
    setNameArError(false);
    setNameEnError(false);
    setDescriptionArError(false);
    setDescriptionEnError(false);
    setPhoneError(false);
    setCityError(false);
    setAddressArError(false);
    setAddressEnError(false);
    setLocationError(false);
    setImageFileError(false);
    if (item) {
      // setNameAr('')
      // setNameEn('')
      // setDescriptionAr('')
      // setDescriptionEn('')
      // setPhone('')
      // setSelectCity('')
      // setAddressAr('')
      // setAddressEn('')
      // setLongitude('')
      // setLatitude('')
      // setCondition('')
      // setBase64('')
      // setImageFile('')
      
    } else {
      setNameAr('');
      setNameEn('');
      setDescriptionAr('');
      setDescriptionEn('');
      setPhone('');
      setSelectCity('');
      setAddressAr('');
      setAddressEn('');
      setLocation('');
      setCondition(true);
      setBase64('');
      setImageFile(null);
    }
  };
  // useEffect(() => {
  //   if (serviceDeleteState == 'done') {
  //     setVisibleDeleteService(false);
  //     setVisibleSaveData(true);
  //     dispatch(setServiceDeleteState(''));
  //   }
  // }, [serviceDeleteState]);

  const _onRefresh_Services = () => {
    getBranches(1);
    setPage(1);
  };
  const _loadMore_Services = () => {
    if((branchesData.length < branchesCount)) {
      getBranches(page + 1);
      setPage(page + 1);
    }
  };


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
          buttonStyle={{width: calcWidth(343)/* calcWidth(253) */, height: calcHeight(48)}}
        />
        {/* <AppButtonDefault
          colorStart={COLORS.primaryGradient}
          colorEnd={COLORS.secondGradient}
          border
          onPress={() => setVisibleFillter(true)}
          icon={IMAGES.filter}
          buttonStyle={{width: calcWidth(74), height: calcHeight(48)}}
        /> */}
      </View>
    )
  };

  const listSection = () => {
    const renderItem = ({item, index} : {item: any, index: number}) => {
      return (
        <BrancheItem
          item={item}
          onPressDelete={() => {setVisibleDeleteBranch(true); setSelectBranch(item)}}
          onPressEdit={() => setVisibleEditBranch(true)}
        />
      )
    };
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={branchesData}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          refreshing={branchesLoader && page == 1}
          onRefresh={_onRefresh_Services}
          onEndReached={() => {
            _loadMore_Services();
          }}
          onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.2}
          ListFooterComponent={() => {
            return (
              <>
                {branchesData.length == 0 ? (
                  <>
                    {/* <WarningScreen
                      image={IMAGES.emptySearch}
                      title={Trans('dontHaveSearchResultsTitle')}
                      description={Trans('dontHaveSearchResultsDescription')}
                    /> */}
                  </>
                ) : (
                  <View style={{backgroundColor: COLORS.backgroundLight, width: '100%', paddingVertical: calcHeight(4), justifyContent: 'center', paddingBottom: calcHeight(32)}}>
                    {(branchesLoader && page > 1) && <ActivityIndicator color={COLORS.primaryGradient} size={'large'}/>}
                  </View>
                )}
              </>
            )
          }}
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
    } else if (phone == '') {
      setDescriptionEnError(false);
      setPhoneError(true);
    } else if (selectCity == '') {
      setPhoneError(false);
      setCityError(true);
    } else if (addressAr == '') {
      setCityError(false);
      setAddressArError(true);
    } else if (addressEn == '') {
      setAddressArError(false);
      setAddressEnError(true);
    } /* else if (location.latitude == 0) {
      setAddressEnError(false);
      setLocationError(true);
    }  */else if (base64 == '') {
      setLocationError(false)
      setImageFileError(true);
    } else {
      setImageFileError(false);
      const data = {
        name: nameAr,
        nameEn: nameEn,
        description: descriptioneAr,
        descriptionEn: descriptionEn,
        phoneNumber: `+966${phone}`,
        address: addressAr,
        addressEn: addressEn,
        lat: location.latitude || '24.343543',
        lng: location.longitude || '36.756474',
        isActive: condition,
        countryId: selectCity.countryId,
        cityId: selectCity.id,
        serviceProviderId: userData.serviceProviderId,
        images: [],
      };
      dispatch(branch_add({data, image: imageFile}));
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
            <AppInputPhone
              containerStyle={{marginTop: calcHeight(20)}}
              title={Trans('mobileNumber')}
              image={IMAGES.authPhone}
              placeholder={Trans('mobileNumber')}
              value={phone}
              keyboardType={'number-pad'}
              onChangeText={(text: string) => setPhone(text)}
              inputContainer={{borderColor: phoneError ? COLORS.red : COLORS.lightPrimary}}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343), borderWidth: 0.6, borderColor: cityError ? COLORS.red : COLORS.lightPrimary}}
              styleTitle={{}}
              onPress={() => setVisibleCities(true)}
              title={Trans('city')}
              placeholder={selectCity ? I18nManager.isRTL ? selectCity.name : selectCity.nameEn : Trans('cityName')}
              icon={IMAGES.dropDown}
            />
            <AppInput
              title={Trans('addressArabic')}
              value={addressAr}
              placeholder={Trans('addressArabic')}
              onChangeText={(text: string) => setAddressAr(text)}
              inputContainer={{borderColor: addressArError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('addressEnglish')}
              value={addressEn}
              placeholder={Trans('addressEnglish')}
              onChangeText={(text: string) => setAddressEn(text)}
              inputContainer={{borderColor: addressEnError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343), borderWidth: 0.6, borderColor: locationError ? COLORS.red : COLORS.lightPrimary}}
              styleTitle={{}}
              onPress={() => setModalVisible_MapAddress(true)}
              title={Trans('locationOnMap')}
              placeholder={location.latitude  ? `${location?.latitude}, ${location.longitude}` : Trans('locationOnMap')}
              icon={IMAGES.dropDown}
            />
            {/* <AppInput
              title={}
              value={longitude}
              placeholder={'0'}
              onChangeText={(text: string) => setLongitude(text)}
              inputContainer={{borderColor: longitudeError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            /> */}
            {/* <AppInput
              title={Trans('latitude')}
              value={latitude}
              placeholder={'0'}
              onChangeText={(text: string) => setLatitude(text)}
              inputContainer={{borderColor: latitudeError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            /> */}
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

  const onEdit = (item?: any, type?: string) => {
    // if (type == 'state') {
    //   const data = {
    //     isActive: item.id == 1,
    //     name: nameAr,
    //     nameEn: nameEn,
    //     description: descriptioneAr,
    //     descriptionEn: descriptionEn,
    //     price: parseInt(price, 10),
    //     estimatedTime: parseInt(time, 10),
    //     isHomeService: true,
    //     categoryId: selectCategories?.id,
    //     serviceProviderId: userData.serviceProviderId,
    //     taxId: 1,
    //     isTaxIncluded: false,
    //   };
    //   const id: number = serviceEditId;
    //   dispatch(service_edit({id, data, image: base64 ? imageFile : ''}));
    // } else {
    //   if (nameAr == '') {
    //     setNameArError(true);
    //   } else if (nameEn == '') {
    //     setNameArError(false);
    //     setNameEnError(true);
    //   } else if (descriptioneAr == '') {
    //     setNameEnError(false);
    //     setDescriptionArError(true);
    //   } else if (descriptionEn == '') {
    //     setDescriptionArError(false);
    //     setDescriptionEnError(true);
    //   } else if (price == '') {
    //     setDescriptionEnError(false);
    //     setPriceError(true);
    //   } else if (time == '') {
    //     setPriceError(false);
    //     setTimeError(true);
    //   } else if (selectCategories == '') {
    //     setTimeError(false);
    //     setSelectCategoriesError(true);
    //   } else {
    //     const data = {
    //       name: nameAr,
    //       nameEn: nameEn,
    //       description: descriptioneAr,
    //       descriptionEn: descriptionEn,
    //       price: parseInt(price, 10),
    //       estimatedTime: parseInt(time, 10),
    //       isActive: item  || condition,
    //       isHomeService: true,
    //       categoryId: selectCategories?.id,
    //       serviceProviderId: userData.serviceProviderId,
    //       taxId: 1,
    //       isTaxIncluded: false,
    //     };
    //     const id: number = serviceEditId;
    //     dispatch(service_edit({id, data, image: base64 ? imageFile : ''}));
    //   }
    // }
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
              value={addressAr}
              placeholder={'0'}
              onChangeText={(text: string) => setAddressAr(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('addressEnglish')}
              value={addressEn}
              placeholder={'0'}
              onChangeText={(text: string) => setAddressEn(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343), borderWidth: 0.6, borderColor: locationError ? COLORS.red : COLORS.lightPrimary}}
              styleTitle={{}}
              onPress={() => setVisibleCities(true)}
              title={Trans('locationOnMap')}
              placeholder={selectCity ? I18nManager.isRTL ? selectCity.name : selectCity.nameEn : Trans('locationOnMap')}
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
              onPress={() => onEdit()}
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
  
  const onDelete = () => {
    setVisibleDeleteBranch(false);
    dispatch(branch_delete({id: selectBranch?.id}));
  };
  const modalDeleteSection = () => {
    return (
      <Modal_Warning
        visible={visibleDeleteBranch}
        onClose={() => setVisibleDeleteBranch(false)}
        onPress1={() => onDelete()}
        onPress2={() => setVisibleDeleteBranch(false)}
        image={IMAGES.modalCancel}
        title={Trans('doDeleteBranchFromBranchesList')}
        button1Title={Trans('yes')}
        button2Title={Trans('no')}
      />
    )
  };

  const modalCities = () => {
    return (
      <AppModalSelectItem
        visible={visibleCities}
        onClose={() => {setVisibleCities(false)}}
        onSelectItem={(item: any) => {setSelectCity(item)}}
        title={Trans('selectCity')}
        data={citiesData}
        itemSelected={selectCity}
        multiSelect={false}
      />
    )
  };

  const locationSection = () => {
    return (
      <MapAddress
        visible={modalVisible_MapAddress}
        onClose={() => setModalVisible_MapAddress(false)}
        address={addressLocation}
        onChangeAddressInput={(value: any) => {
          setAddressLocation(value);
        }}
        location={location}
        onChangeLocation={(lat: any, lng: any) => {
          setLocation({ ...location, latitude: lat, longitude: lng });
        }}
      />
    )
  };

  const loadingSection = () => {
    return (
      <AppLoading
        margin_top={calcHeight(440)}
        size={'large'}
        visible={branchesLoader && page == 1}
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
      {addNewBranchSection()}
      {editBranchSection()}
      {modalSaveSection()}
      {modalDeleteSection()}
      {modalCities()}
      {locationSection()}
    </View>
  );
};

export default Branches;