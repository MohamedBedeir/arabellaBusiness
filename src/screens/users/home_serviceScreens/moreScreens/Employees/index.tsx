import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Trans } from '../../../../../translation';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import AppButtonDefault from '../../../../../components/AppButtonDefault';
import { COLORS, FONTS } from '../../../../../utils/theme';
import { calcFont, calcHeight, calcWidth } from '../../../../../utils/sizes';
import EmployeeItem from '../../../../../components/EmployeeItem';
import { DUMMY_DATA } from '../../../../../utils/dummyData';
import Modal from 'react-native-modal';
import Modal_Warning from '../../../../../components/Modal_Warning';
import AppTextGradient from '../../../../../components/AppTextGradient';
import AppInput from '../../../../../components/AppInput';
import AppPickerSelect from '../../../../../components/AppPickerSelect';
import AppText from '../../../../../components/AppText';
import AppTextViewGradient from '../../../../../components/AppTextViewGradient';
import AppModalSelectItem from '../../../../../components/AppModalSelectItem';
import AppInputPhone from '../../../../../components/AppInputPhone';
import AppLoading from '../../../../../components/AppLoading';
import { RootState, useAppDispatch } from '../../../../../redux/store/store';
import { useSelector } from 'react-redux';
import { employee_add, employee_data, employee_edit } from '../../../../../middleware/employees/employees';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setEmployeeAddState, setEmployeeEditState } from '../../../../../redux/store/employees/employeesSlice';

const Employees: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<any>();
  // const { categoriesData } = useSelector((store: RootState) => store?.categories);
  const { employeesLoader, employeeData, employeeCount, employeeAddState, employeeEditState, employeeDeleteState } = useSelector((store: RootState) => store?.employees);
  const [selectEmployee, setSelectEmployee] = useState<any>({});
  const [employeeEditId, setEmployeeEditId] = useState<any>();
  const [page, setPage] = useState<number>(1);


  const [name, setName] = useState<string>('');
  const [selectBranch, setSelectBranch] = useState<any>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  const [systemAccess, setSystemAccess] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>('');
  const [position, setposition] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [inHouseServices, setInHouseServices] = useState<boolean>(false);
  const [inApp, setInApp] = useState<boolean>(false);
  const [inReservation, setInReservation] = useState<boolean>(false);
  const [salary, setSalary] = useState<string>('');
  const [minimumService, setMinimumService] = useState<string>('');
  const [commissionService, setCommissionService] = useState<string>('');
  const [commissionOvertime, setCommissionOvertime] = useState<string>('');
  const [minimumProducts, setMinimumProducts] = useState<string>('');
  const [commissionProducts, setCommissionProducts] = useState<string>('');
  const [dayOff, setDayOff] = useState<string>('');
  const [restStart, setRestStart] = useState<string>('');
  const [restEnd, setRestEnd] = useState<string>('');
  const [workStart, setWorkStart] = useState<string>('');
  const [workEnd, setWorkEnd] = useState<string>('');
  const [servicesIds, setServicesIds] = useState<any>([]);
  const [isActive, setIsActive] = useState<boolean>(true);

  const [nameError, setNameError] = useState<boolean>(false);
  const [selectBranchError, setSelectBranchError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [mobileError, setMobileError] = useState<boolean>(false);
  const [nationalityError, setNationalityError] = useState<boolean>(false);
  const [systemAccessError, setSystemAccessError] = useState<boolean>(false);
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [positionError, setpositionError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [inHouseServicesError, setInHouseServicesError] = useState<boolean>(false);
  const [inAppError, setInAppError] = useState<boolean>(false);
  const [inReservationError, setInReservationError] = useState<boolean>(false);
  const [salaryError, setSalaryError] = useState<boolean>(false);
  const [minimumServiceError, setMinimumServiceError] = useState<boolean>(false);
  const [commissionServiceError, setCommissionServiceError] = useState<boolean>(false);
  const [commissionOvertimeError, setCommissionOvertimeError] = useState<boolean>(false);
  const [minimumProductsError, setMinimumProductsError] = useState<boolean>(false);
  const [commissionProductsError, setCommissionProductsError] = useState<boolean>(false);
  const [dayOffError, setDayOffError] = useState<boolean>(false);
  const [restStartError, setRestStartError] = useState<boolean>(false);
  const [restEndError, setRestEndError] = useState<boolean>(false);
  const [workStartError, setWorkStartError] = useState<boolean>(false);
  const [workEndError, setWorkEndError] = useState<boolean>(false);
  const [servicesIdsError, setServicesIdsError] = useState<boolean>(false);
  const [isActiveError, setIsActiveError] = useState<boolean>(false);
  
  const [visibleFillter, setVisibleFillter] = useState<boolean>(false);
  const [visibleAddNewEmployee, setVisibleAddNewEmployee] = useState<boolean>(false);
  const [visibleEditEmployee, setVisibleEditEmployee] = useState<boolean>(false);
  const [visibleSaveData, setVisibleSaveData] = useState<boolean>(false);
  const [visibleDeleteEmployee, setVisibleDeleteEmployee] = useState<boolean>(false);
  const [visibleUpdateEmployeeState, setVisibleUpdateEmployeeState] = useState<boolean>(false);
  const [selectEmployeeState, setSelectEmployeeState] = useState<any>({});

  const getEmployees = (page: number) => {
    dispatch(employee_data({page}));
  };

  const getUser = async () => {
    const user: any = await AsyncStorage.getItem('user');
    setUserData(JSON.parse(user));
  };

  useEffect(() => {
    getUser();
    // dispatch(branches({}));
    getEmployees(1);
  }, []);

  const setData = (item?: any) => {
    setNameError(false);
    setSelectBranchError(false);
    setEmailError(false);
    setMobileError(false);
    setNationalityError(false);
    setSystemAccessError(false);
    setUserNameError(false);
    setpositionError(false);
    setPasswordError(false);
    setInHouseServicesError(false);
    setInAppError(false);
    setInReservationError(false);
    setSalaryError(false);
    setMinimumServiceError(false);
    setCommissionServiceError(false);
    setCommissionOvertimeError(false);
    setMinimumProductsError(false);
    setCommissionProductsError(false);
    setDayOffError(false);
    setRestStartError(false);
    setRestEndError(false);
    setWorkStartError(false);
    setWorkEndError(false);
    setServicesIdsError(false);
    setIsActiveError(false);
    if (item) {
      setName('');
      setSelectBranch('');
      setEmail('');
      setMobile('');
      setNationality('');
      setSystemAccess(true);
      setUserName('');
      setposition('');
      setPassword('');
      setInHouseServices(false);
      setInApp(false);
      setInReservation(false);
      setSalary('');
      setMinimumService('');
      setCommissionService('');
      setCommissionOvertime('');
      setMinimumProducts('');
      setCommissionProducts('');
      setDayOff('');
      setRestStart('');
      setRestEnd('');
      setWorkStart('');
      setWorkEnd('');
      setServicesIds('');
      setIsActive(true);
    } else {
      setName('');
      setSelectBranch('');
      setEmail('');
      setMobile('');
      setNationality('');
      setSystemAccess(true);
      setUserName('');
      setposition('');
      setPassword('');
      setInHouseServices(false);
      setInApp(false);
      setInReservation(false);
      setSalary('');
      setMinimumService('');
      setCommissionService('');
      setCommissionOvertime('');
      setMinimumProducts('');
      setCommissionProducts('');
      setDayOff('');
      setRestStart('');
      setRestEnd('');
      setWorkStart('');
      setWorkEnd('');
      setServicesIds('');
      setIsActive(true);
    }
  };

  console.log('userData--------', userData);
  
  useEffect(() => {
    if (employeeAddState == 'done') {
      setVisibleAddNewEmployee(false);
      setData();
      // setVisibleSaveData(true);
      dispatch(setEmployeeAddState(''));
    }
  }, [employeeAddState]);

  useEffect(() => {
    if (employeeEditState == 'done') {
      setVisibleEditEmployee(false);
      setData();
      // setVisibleSaveData(true);
      dispatch(setEmployeeEditState(''));
    }
  }, [employeeEditState]);

  const _onRefresh_Employees = () => {
    getEmployees(1);
    setPage(1);
  };
  const _loadMore_Employees = () => {
    if((employeeData.length < employeeCount)) {
      getEmployees(page + 1);
      setPage(page + 1);
    }
  };

  const onAdd = () => {
    // setVisibleAddNewEmployee(false);
    if (name == '') {
      setNameError(true);
    }/*  else if (selectBranch == '') {
      setNameError(false);
      setSelectBranchError(true);
    }  */else if (mobile == '') {
      setNameError(false);
      // setSelectBranchError(false);
      setMobileError(true);
    } else if (email == '') {
      setMobileError(false);
      setEmailError(true);
    } else if (nationality == '') {
      setEmailError(false);
      setNationalityError(true);
    } else if (servicesIds.length == 0) {
      setNationalityError(false);
      setServicesIdsError(true);
    } else if (userName == '') {
      setServicesIdsError(false);
      setUserNameError(true);
    } else if (password == '') {
      setUserNameError(false);
      setPasswordError(true);
    } else if (position == '') {
      setPasswordError(false);
      setpositionError(true);
    } else if (salary == '') {
      setpositionError(false);
      setSalaryError(true);
    } else if (minimumService == '') {
      setSalaryError(false);
      setMinimumServiceError(true);
    } else if (commissionService == '') {
      setMinimumServiceError(false);
      setCommissionServiceError(true);
    } else if (commissionOvertime == '') {
      setCommissionServiceError(false);
      setCommissionOvertimeError(true);
    } else if (minimumProducts == '') {
      setCommissionOvertimeError(false);
      setMinimumProductsError(true);
    } else if (commissionProducts == '') {
      setMinimumProductsError(false);
      setCommissionProductsError(true);
    } else if (dayOff == '') {
      setCommissionProductsError(false);
      setDayOffError(true);
    } else if (workStart == '') {
      setDayOffError(false);
      setWorkStartError(true);
    } else if (workEnd == '') {
      setWorkStartError(false);
      setWorkEndError(true);
    } else if (restStart == '') {
      setWorkEndError(false);
      setRestStartError(true);
    } else if (restEnd == '') {
      setRestStartError(false);
      setRestEndError(true);
    } else {
      const data = {
        serviceProviderId: userData.serviceProviderId,
        branchId: selectBranch?.id,
        name,
        email,
        mobile: `+966${mobile}`,
        nationality,
        systemAccess,
        userName,
        position,
        password,
        visibility: {
          inHouseServices,
          inApp,
          inReservation,
        },
        salary: {
          salary: parseInt(salary, 10),
          minimumService: parseInt(minimumService, 10),
          commissionService: parseInt(commissionService, 10),
          commissionOvertime: parseInt(commissionOvertime, 10),
          minimumProducts: parseInt(minimumProducts, 10),
          commissionProducts: parseInt(commissionProducts, 10)
        },
        schedule: {
          dayOff,
          restStart,
          restEnd,
          workStart,
          workEnd,
        },
        servicesIds,
        isActive,
      };
      dispatch(employee_add({data}));
    }
  };

  const onState = (item: any) => {
    setVisibleUpdateEmployeeState(true);
    setSelectEmployee(item);
    if (item.isActive) {
      setSelectEmployeeState(DUMMY_DATA.SERVICESTATUES[0]);
    } else {
      setSelectEmployeeState(DUMMY_DATA.SERVICESTATUES[1]);
    }
  };

  const onEditEmployee = (item: any) => {
    setVisibleEditEmployee(true);
    setData(item);
  };

  // const onEdit = (item?: any, type?: string) => {
  //   if (type == 'state') {
  //     console.log('type == state---------------', item);
  //     const data = {
  //       isActive: item.id == 1,
  //       name: nameAr,
  //       nameEn: nameEn,
  //       description: descriptioneAr,
  //       descriptionEn: descriptionEn,
  //       price: parseInt(price, 10),
  //       estimatedTime: parseInt(time, 10),
  //       isHomeService: true,
  //       serviceProviderId: userData.serviceProviderId,
  //       taxId: 1,
  //       isTaxIncluded: false,
  //     };
  //     const id: number = employeeEditId;
  //     dispatch(employee_edit({id, data, image: base64 ? imageFile : ''}));
  //   } else {
  //     if (nameAr == '') {
  //       setNameArError(true);
  //     } else if (nameEn == '') {
  //       setNameArError(false);
  //       setNameEnError(true);
  //     } else if (descriptioneAr == '') {
  //       setNameEnError(false);
  //       setDescriptionArError(true);
  //     } else if (descriptionEn == '') {
  //       setDescriptionArError(false);
  //       setDescriptionEnError(true);
  //     } else if (price == '') {
  //       setDescriptionEnError(false);
  //       setPriceError(true);
  //     } else if (time == '') {
  //       setPriceError(false);
  //       setTimeError(true);
  //     } else if (selectCategories == '') {
  //       setTimeError(false);
  //       setSelectCategoriesError(true);
  //     } else {
  //       const data = {
  //         name: nameAr,
  //         nameEn: nameEn,
  //         description: descriptioneAr,
  //         descriptionEn: descriptionEn,
  //         price: parseInt(price, 10),
  //         estimatedTime: parseInt(time, 10),
  //         isActive: item  || condition,
  //         isHomeService: true,
  //         serviceProviderId: userData.serviceProviderId,
  //         taxId: 1,
  //         isTaxIncluded: false,
  //       };
  //       const id: number = employeeEditId;
  //       dispatch(employee_edit({id, data, image: base64 ? imageFile : ''}));
  //     }
  //   }
  // };

  // const onFillter = () => {
  //   setVisibleFillter(false);
  //   const data = {
  //     name: nameAr,
  //     nameEn: nameEn,
  //     price: parseInt(price, 10),
  //     estimatedTime: parseInt(time, 10),
  //     isActive: condition,
  //   };
  //   const id: number = employeeEditId;
  //   dispatch(employee_data({data, page: 1}));
  // };

  const headerSection = () => {
    return (
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('employees')}
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
          onPress={() => setVisibleAddNewEmployee(true)}
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
        <EmployeeItem
          item={item}
          onPressDelete={() => setVisibleDeleteEmployee(true)}
          onPressEdit={() => setVisibleEditEmployee(true)}
          onUpdateState={() => setVisibleUpdateEmployeeState(true)}
        />
      )
    };
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={employeeData}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          refreshing={employeesLoader && page == 1}
          onRefresh={_onRefresh_Employees}
          onEndReached={() => {
            _loadMore_Employees();
          }}
          onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.2}
          ListFooterComponent={() => {
            return (
              <>
                {employeeData.length == 0 ? (
                  <>
                    {/* <WarningScreen
                      image={IMAGES.emptySearch}
                      title={Trans('dontHaveSearchResultsTitle')}
                      description={Trans('dontHaveSearchResultsDescription')}
                    /> */}
                  </>
                ) : (
                  <View style={{backgroundColor: COLORS.backgroundLight, width: '100%', paddingVertical: calcHeight(4), justifyContent: 'center', paddingBottom: calcHeight(32)}}>
                    {(employeesLoader && page > 1) && <ActivityIndicator color={COLORS.primaryGradient} size={'large'}/>}
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
            {/* <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('nameOfSalon')}
              placeholder={Trans('nameOfSalon')}
              icon={IMAGES.dropDown}
            /> */}
            {/* <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('branchName')}
              placeholder={Trans('branchName')}
              icon={IMAGES.dropDown}
            /> */}
            <AppInput
              title={Trans('email')}
              value={email}
              placeholder={Trans('email')}
              onChangeText={(text: string) => setEmail(text)}
              inputContainer={{borderColor: emailError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInputPhone
              containerStyle={{marginTop: calcHeight(20)}}
              title={Trans('mobileNumber')}
              image={IMAGES.authPhone}
              placeholder={Trans('mobileNumber')}
              value={mobile}
              keyboardType={'number-pad'}
              onChangeText={(text: string) => setMobile(text)}
              inputContainer={{borderColor: mobileError ? COLORS.red : COLORS.lightPrimary}}
              // _textAligne={}
              // error={}
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
                  onPress={() => setIsActive(true)}
                >
                  <Image source={isActive ? IMAGES.selectActive : IMAGES.selectUnActive} style={styles.conditionIcon}/>
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
                  onPress={() => setIsActive(false)}
                >
                  <Image source={isActive ? IMAGES.selectUnActive : IMAGES.selectActive} style={styles.conditionIcon}/>
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

  const addNewEmployeeSection = () => {
    return (
      <Modal
        style={{ margin: 0, justifyContent: 'flex-end', }}
        hasBackdrop propagateSwipe={true}
        animationIn= 'slideInUp'
        animationInTiming= {600}
        animationOutTiming= {600}
        isVisible={visibleAddNewEmployee}
        onBackdropPress={() => setVisibleAddNewEmployee(false)}
        onBackButtonPress={() => setVisibleAddNewEmployee(false)}
        deviceHeight={Dimensions.get('screen').height}
        statusBarTranslucent
      >
        <View style={styles.modalAddContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppTextGradient
              title={Trans('addEmployee')}
              fontSize={calcFont(17)}
              fontFamily={FONTS.bold}
              colorStart={COLORS.secondGradient}
              colorEnd={COLORS.primaryGradient}
              textAlign={'left'}
            />
            <AppInput
              title={Trans('name')}
              value={name}
              placeholder={Trans('name')}
              onChangeText={(text: string) => setName(text)}
              inputContainer={{borderColor: nameError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(8)}}
            />
            {/* <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('nameOfSalon')}
              placeholder={Trans('nameOfSalon')}
              icon={IMAGES.dropDown}
            /> */}
            {/* <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343), borderWidth: 0.6, borderColor: selectBranchError ? COLORS.red : COLORS.lightPrimary}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('branch')}
              placeholder={Trans('branch')}
              icon={IMAGES.dropDown}
            /> */}
            <AppInputPhone
              containerStyle={{marginTop: calcHeight(20)}}
              title={Trans('mobileNumber')}
              image={IMAGES.authPhone}
              placeholder={Trans('mobileNumber')}
              value={mobile}
              keyboardType={'number-pad'}
              onChangeText={(text: string) => setMobile(text)}
              inputContainer={{borderColor: mobileError ? COLORS.red : COLORS.lightPrimary}}
              // _textAligne={}
              // error={}
            />
            <AppInput
              title={Trans('email')}
              value={email}
              placeholder={Trans('email')}
              onChangeText={(text: string) => setEmail(text)}
              inputContainer={{borderColor: emailError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343), borderWidth: 0.6, borderColor: nationalityError ? COLORS.red : COLORS.lightPrimary}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('nationality')}
              placeholder={Trans('nationality')}
              icon={IMAGES.dropDown}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('service')}
              placeholder={Trans('service')}
              icon={IMAGES.dropDown}
            />
            <View style={{marginTop: calcHeight(16)}}>
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
                  onPress={() => setIsActive(true)}
                >
                  <Image source={isActive ? IMAGES.selectActive : IMAGES.selectUnActive} style={styles.conditionIcon}/>
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
                  onPress={() => setIsActive(false)}
                >
                  <Image source={isActive ? IMAGES.selectUnActive : IMAGES.selectActive} style={styles.conditionIcon}/>
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
            <View style={{marginVertical: calcHeight(16)}}>
              <AppText
                title={Trans('accessToSystem')}
                fontFamily={FONTS.medium}
                fontSize={calcFont(14)}
                textAlign={'left'}
                color={COLORS.textDark}
              />
              <View style={styles.conditionContainer}>
                <TouchableOpacity
                  style={styles.conditionView}
                  onPress={() => setSystemAccess(true)}
                >
                  <Image source={systemAccess ? IMAGES.selectActive : IMAGES.selectUnActive} style={styles.conditionIcon}/>
                  <AppTextViewGradient
                    containerStyle={styles.conditionTextView}
                    colorStart={'rgba(92, 190, 67, 0.2)'}
                    colorEnd={'rgba(92, 190, 67, 0.2)'}
                    title={Trans('yes')}
                    fontFamily={FONTS.bold}
                    fontSize={calcFont(14)}
                    textAlign={'center'}
                    textColorStart={COLORS.green2}
                    textColorEnd={COLORS.green2}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.conditionView}
                  onPress={() => setSystemAccess(false)}
                >
                  <Image source={systemAccess ? IMAGES.selectUnActive : IMAGES.selectActive} style={styles.conditionIcon}/>
                  <AppTextViewGradient
                    containerStyle={styles.conditionTextView}
                    colorStart={'rgba(239, 68, 68, 0.2)'}
                    colorEnd={'rgba(239, 68, 68, 0.2)'}
                    title={Trans('no')}
                    fontFamily={FONTS.bold}
                    fontSize={calcFont(14)}
                    textAlign={'center'}
                    textColorStart={COLORS.red}
                    textColorEnd={COLORS.red}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <AppTextGradient
              title={Trans('loginInformation')}
              fontSize={calcFont(17)}
              fontFamily={FONTS.bold}
              colorStart={COLORS.secondGradient}
              colorEnd={COLORS.primaryGradient}
              textAlign={'left'}
            />
            <AppInput
              title={Trans('userName')}
              value={userName}
              placeholder={Trans('userName')}
              onChangeText={(text: string) => setUserName(text)}
              inputContainer={{borderColor: userNameError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('password')}
              value={password}
              placeholder={Trans('password')}
              onChangeText={(text: string) => setPassword(text)}
              inputContainer={{borderColor: passwordError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginVertical: calcHeight(16)}}
              touchContainerStyle={{width: calcWidth(343), borderWidth: 0.6, borderColor: positionError ? COLORS.red : COLORS.lightPrimary}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('position')}
              placeholder={Trans('choosePosition')}
              icon={IMAGES.dropDown}
            />
            <AppTextGradient
              title={Trans('workData')}
              fontSize={calcFont(17)}
              fontFamily={FONTS.bold}
              colorStart={COLORS.secondGradient}
              colorEnd={COLORS.primaryGradient}
              textAlign={'left'}
            />
            <AppInput
              title={Trans('salary')}
              value={salary}
              placeholder={'0'}
              onChangeText={(text: string) => setSalary(text)}
              inputContainer={{borderColor: salaryError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('minimumNumberServices')}
              value={minimumService}
              placeholder={'0'}
              onChangeText={(text: string) => setMinimumService(text)}
              inputContainer={{borderColor: minimumServiceError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('serviceCommission')}
              value={commissionService}
              placeholder={'0'}
              onChangeText={(text: string) => setCommissionService(text)}
              inputContainer={{borderColor: commissionServiceError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('extraCommission')}
              value={commissionOvertime}
              placeholder={'0'}
              onChangeText={(text: string) => setCommissionOvertime(text)}
              inputContainer={{borderColor: commissionOvertimeError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('minimumNumberProducts')}
              value={minimumProducts}
              placeholder={'0'}
              onChangeText={(text: string) => setMinimumProducts(text)}
              inputContainer={{borderColor: minimumProductsError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('productCommission')}
              value={commissionProducts}
              placeholder={'0'}
              onChangeText={(text: string) => setCommissionProducts(text)}
              inputContainer={{borderColor: commissionProductsError ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginVertical: calcHeight(16)}}
            />
            <AppTextGradient
              title={Trans('vacationAndRestData')}
              fontSize={calcFont(17)}
              fontFamily={FONTS.bold}
              colorStart={COLORS.secondGradient}
              colorEnd={COLORS.primaryGradient}
              textAlign={'left'}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(16)}}
              touchContainerStyle={{width: calcWidth(343), borderWidth: 0.6, borderColor: positionError ? COLORS.red : COLORS.lightPrimary}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('holiday')}
              placeholder={Trans('holiday')}
              icon={IMAGES.dropDown}
            />
            <View style={{width: calcWidth(343), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <AppPickerSelect
                containerStyle={{width: calcWidth(160), marginTop: calcHeight(16)}}
                touchContainerStyle={{width: calcWidth(160), borderWidth: 0.6, borderColor: positionError ? COLORS.red : COLORS.lightPrimary}}
                styleTitle={{}}
                textWidth={calcWidth(110)}
                onPress={() => {}}
                title={Trans('beginningOfWork')}
                placeholder={Trans('beginningOfWork')}
                icon={IMAGES.dropDown}
              />
              <AppPickerSelect
                containerStyle={{width: calcWidth(160), marginTop: calcHeight(16)}}
                touchContainerStyle={{width: calcWidth(160), borderWidth: 0.6, borderColor: positionError ? COLORS.red : COLORS.lightPrimary}}
                styleTitle={{}}
                textWidth={calcWidth(110)}
                onPress={() => {}}
                title={Trans('endOfWork')}
                placeholder={Trans('endOfWork')}
                icon={IMAGES.dropDown}
              />
            </View>
            <View style={{width: calcWidth(343), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <AppPickerSelect
                containerStyle={{width: calcWidth(160), marginTop: calcHeight(16)}}
                touchContainerStyle={{width: calcWidth(160), borderWidth: 0.6, borderColor: positionError ? COLORS.red : COLORS.lightPrimary}}
                styleTitle={{}}
                textWidth={calcWidth(110)}
                onPress={() => {}}
                title={Trans('beginningOfRest')}
                placeholder={Trans('endOfRest')}
                icon={IMAGES.dropDown}
              />
              <AppPickerSelect
                containerStyle={{width: calcWidth(160), marginTop: calcHeight(16)}}
                touchContainerStyle={{width: calcWidth(160), borderWidth: 0.6, borderColor: positionError ? COLORS.red : COLORS.lightPrimary}}
                styleTitle={{}}
                textWidth={calcWidth(110)}
                onPress={() => {}}
                title={Trans('endOfRest')}
                placeholder={Trans('endOfRest')}
                icon={IMAGES.dropDown}
              />
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
              onPress={() => setVisibleAddNewEmployee(false)}
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

  const editEmployeeSection = () => {
    return (
      <Modal
        style={{ margin: 0, justifyContent: 'flex-end', }}
        hasBackdrop propagateSwipe={true}
        animationIn= 'slideInUp'
        animationInTiming= {600}
        animationOutTiming= {600}
        isVisible={visibleEditEmployee}
        onBackdropPress={() => setVisibleEditEmployee(false)}
        onBackButtonPress={() => setVisibleEditEmployee(false)}
        deviceHeight={Dimensions.get('screen').height}
        statusBarTranslucent
      >
        <View style={styles.modalAddContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppTextGradient
              title={Trans('editEmployee')}
              fontSize={calcFont(17)}
              fontFamily={FONTS.bold}
              colorStart={COLORS.secondGradient}
              colorEnd={COLORS.primaryGradient}
            />
            <AppInput
              title={Trans('name')}
              value={nameAr}
              placeholder={Trans('name')}
              onChangeText={(text: string) => setNameAr(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(8)}}
            />
            {/* <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('nameOfSalon')}
              placeholder={Trans('nameOfSalon')}
              icon={IMAGES.dropDown}
            /> */}
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('branch')}
              placeholder={Trans('branch')}
              icon={IMAGES.dropDown}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(12)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('service')}
              placeholder={Trans('service')}
              icon={IMAGES.dropDown}
            />
            <AppInput
              title={Trans('email')}
              value={time}
              placeholder={Trans('email')}
              onChangeText={(text: string) => setTime(text)}
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
              title={Trans('nationality')}
              placeholder={Trans('nationality')}
              icon={IMAGES.dropDown}
            />
            <View style={{marginTop: calcHeight(16)}}>
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
            <View style={{marginVertical: calcHeight(16)}}>
              <AppText
                title={Trans('accessToSystem')}
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
                    title={Trans('yes')}
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
                    title={Trans('no')}
                    fontFamily={FONTS.bold}
                    fontSize={calcFont(14)}
                    textAlign={'center'}
                    textColorStart={COLORS.red}
                    textColorEnd={COLORS.red}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <AppTextGradient
              title={Trans('loginInformation')}
              fontSize={calcFont(17)}
              fontFamily={FONTS.bold}
              colorStart={COLORS.secondGradient}
              colorEnd={COLORS.primaryGradient}
            />
            <AppInput
              title={Trans('userName')}
              value={time}
              placeholder={Trans('userName')}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('password')}
              value={time}
              placeholder={Trans('password')}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginVertical: calcHeight(16)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('position')}
              placeholder={Trans('choosePosition')}
              icon={IMAGES.dropDown}
            />
            <AppTextGradient
              title={Trans('workData')}
              fontSize={calcFont(17)}
              fontFamily={FONTS.bold}
              colorStart={COLORS.secondGradient}
              colorEnd={COLORS.primaryGradient}
            />
            <AppInput
              title={Trans('salary')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('minimumNumberServices')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('serviceCommission')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('extraCommission')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('minimumNumberProducts')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('productCommission')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? COLORS.red : COLORS.lightPrimary}}
              containerStyle={{marginVertical: calcHeight(16)}}
            />
            <AppTextGradient
              title={Trans('vacationAndRestData')}
              fontSize={calcFont(17)}
              fontFamily={FONTS.bold}
              colorStart={COLORS.secondGradient}
              colorEnd={COLORS.primaryGradient}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(16)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('holiday')}
              placeholder={Trans('holiday')}
              icon={IMAGES.dropDown}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(16)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('beginningOfRest')}
              placeholder={Trans('endOfRest')}
              icon={IMAGES.dropDown}
            />
            <AppPickerSelect
              containerStyle={{width: calcWidth(343), marginTop: calcHeight(16)}}
              touchContainerStyle={{width: calcWidth(343)}}
              styleTitle={{}}
              onPress={() => {}}
              title={Trans('endOfRest')}
              placeholder={Trans('endOfRest')}
              icon={IMAGES.dropDown}
            />
          </ScrollView>
          <View style={styles.modalActionContainer}>
            <AppButtonDefault
              title={Trans('save')}
              onPress={() => {setVisibleSaveData(true); setVisibleEditEmployee(false)}}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(164), height: calcHeight(48)}}
            />
            <AppButtonDefault
              title={Trans('cancellation')}
              onPress={() => setVisibleEditEmployee(false)}
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
    getEmployees(1);
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
  
  const modalDeleteSection = () => {
    return (
      <Modal_Warning
        visible={visibleDeleteEmployee}
        onClose={() => setVisibleDeleteEmployee(false)}
        onPress1={() => setVisibleDeleteEmployee(false)}
        onPress2={() => setVisibleDeleteEmployee(false)}
        image={IMAGES.modalCancel}
        title={Trans('doDeleteEmployeeFromEmployeesList')}
        button1Title={Trans('yes')}
        button2Title={Trans('no')}
      />
    )
  };

  const modalEmployeeStateSection = () => {
    return (
      <AppModalSelectItem
        visible={visibleUpdateEmployeeState}
        onClose={() => {setVisibleUpdateEmployeeState(false)}}
        onSelectItem={(item: any) => {setSelectEmployeeState(item)}}
        title={Trans('chooseEmployeeState')}
        data={DUMMY_DATA.SERVICESTATUES}
        itemSelected={selectEmployeeState}
        multiSelect={false}
      />
    )
  };

  const loadingSection = () => {
    return (
      <AppLoading
        margin_top={calcHeight(440)}
        size={'large'}
        visible={employeesLoader && page == 1}
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
      {addNewEmployeeSection()}
      {/* {editEmployeeSection()} */}
      {modalSaveSection()}
      {modalDeleteSection()}
      {modalEmployeeStateSection()}
    </View>
  );
};

export default Employees;