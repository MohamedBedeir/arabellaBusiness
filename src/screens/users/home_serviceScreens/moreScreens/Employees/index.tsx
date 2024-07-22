import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Trans } from '../../../../../translation';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import LanguageItem from '../../../../../components/LanguageItem';
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

const Employees: React.FC = () => {
  const navigation = useNavigation<any>();
  const [nameAr, setNameAr] = useState<string>('');
  const [nameEn, setNameEn] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [descriptionEn, setDescriptionEn] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [base64, setBase64] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);
  const [condition, setCondition] = useState<boolean>(true);

  const [visibleFillter, setVisibleFillter] = useState<boolean>(false);
  const [visibleAddNewEmployee, setVisibleAddNewEmployee] = useState<boolean>(false);
  const [visibleEditEmployee, setVisibleEditEmployee] = useState<boolean>(false);
  const [visibleSaveData, setVisibleSaveData] = useState<boolean>(false);
  const [visibleDeleteEmployee, setVisibleDeleteEmployee] = useState<boolean>(false);
  const [visibleUpdateEmployeeState, setVisibleUpdateEmployeeState] = useState<boolean>(false);
  const [selectEmployeeState, setSelectEmployeeState] = useState<any>({});

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
          data={DUMMY_DATA.EMPLOYEES}
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
              title={Trans('branchName')}
              placeholder={Trans('branchName')}
              icon={IMAGES.dropDown}
            />
            <AppInput
              title={Trans('email')}
              value={time}
              placeholder={Trans('email')}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
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
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
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

  const addNewEmployeeSection = () => {
    const image = base64 != '' ? { uri: `data:image/png;base64,${base64}` } : IMAGES.uploadImage;
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
            />
            <AppInput
              title={Trans('name')}
              value={nameAr}
              placeholder={Trans('name')}
              onChangeText={(text: string) => setNameAr(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
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
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
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
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
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
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('password')}
              value={time}
              placeholder={Trans('password')}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
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
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('minimumNumberServices')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('serviceCommission')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('extraCommission')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('minimumNumberProducts')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('productCommission')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
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
              onPress={() => {setVisibleSaveData(true); setVisibleAddNewEmployee(false)}}
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
    const image = base64 != '' ? { uri: `data:image/png;base64,${base64}` } : IMAGES.uploadImage;
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
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
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
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
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
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
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
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('password')}
              value={time}
              placeholder={Trans('password')}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
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
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('minimumNumberServices')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('serviceCommission')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('extraCommission')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('minimumNumberProducts')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
              containerStyle={{marginTop: calcHeight(12)}}
            />
            <AppInput
              title={Trans('productCommission')}
              value={time}
              placeholder={'0'}
              onChangeText={(text: string) => setTime(text)}
              inputContainer={{borderColor: 1 ? '#CC3300' : COLORS.lightPrimary}}
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

  return (
    <View style={styles.container}>
      {headerSection()}
      {addSection()}
      {listSection()}
      {fillterSection()}
      {addNewEmployeeSection()}
      {editEmployeeSection()}
      {modalSaveSection()}
      {modalDeleteSection()}
      {modalEmployeeStateSection()}
    </View>
  );
};

export default Employees;