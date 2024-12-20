import React, { useEffect, useRef, useState } from 'react';
import { I18nManager, Image, Keyboard, Linking, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../../../components/AppText';
import { Trans } from '../../../../../translation';
import { COLORS, FONTS } from '../../../../../utils/theme';
import { calcFont, calcHeight, calcWidth } from '../../../../../utils/sizes';
import AppHeaderDefault from '../../../../../components/AppHeaderDefault';
import { IMAGES } from '../../../../../assets/Images';
import LinearGradient from 'react-native-linear-gradient';
import AppDataLine from '../../../../../components/AppDataLine';
import AppTextGradient from '../../../../../components/AppTextGradient';
import AppButtonDefault from '../../../../../components/AppButtonDefault';
import CircularProgress from 'react-native-circular-progress-indicator';
import CountDownTimer from "react-native-countdown-timer-hooks";
import ReservationStepData from '../../../../../components/ReservationStepData';
import ReservationStepLine from '../../../../../components/ReservationStepLine';
import AppTextViewGradient from '../../../../../components/AppTextViewGradient';
import OtpInputs from 'react-native-otp-inputs';
import Modal_Warning from '../../../../../components/Modal_Warning';
import MapView, { Marker } from 'react-native-maps';
import { RootState, useAppDispatch } from '../../../../../redux/store/store';
import { appointment_details } from '../../../../../middleware/appointments/details/details';
import { useSelector } from 'react-redux';
import AppLoading from '../../../../../components/AppLoading';
import moment from 'moment';
import { appointment_otp, appointment_update } from '../../../../../middleware/appointments/update/update';
import { setAppointmentTimer } from '../../../../../redux/store/appointment_timer/appointment_timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReservationDetails: React.FC = (params: any) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { appointmentDetailsLoader, appointmentDetailsData } : { appointmentDetailsLoader: boolean, appointmentDetailsData: any } = useSelector((store: RootState) => store?.appointment_details);
  const { appointmentTimer } = useSelector((store: RootState) => store?.appointment_timer);
  const item: any = appointmentDetailsData;
  const status = item?.nextServiceBooking?.status;
  const refTimer = useRef();
  const [costTransfer, setCostTransfer] = useState<any>(0);
  const [costTransferState, setCostTransferState] = useState<boolean>(false);
  const [count, setCount] = useState<any>(appointmentTimer || (20 * 60));
  const [step, setStep] = useState<number>(1);
  const [OTPCode, setOTPCode] = useState<string>('');
  const [errors, setErrors] = useState<any>();
  const [focused, setFocused] = useState<boolean>(false);
  const [visibleRejection, setVisibleRejection] = useState<boolean>(false);
  const [visibleCancellation, setVisibleCancellation] = useState<boolean>(false);
  const [isKeyboardShow, setIsKeyboardShow] = useState<boolean>(false);

  const getReservationDetails = () => {
    dispatch(appointment_details({id: params.route.params.id}))
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('appointmentTimer-------------', appointmentTimer);
      setCount(appointmentTimer);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getReservationDetails();
    const showKeyboardSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardShow(true);
    });
    const hideKeyboardSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardShow(false);
    });

    return () => {
      showKeyboardSubscription.remove();
      hideKeyboardSubscription.remove();
    }
  }, []);
  
  const headerSection = () => {
    return (
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('reservationDetails')}
        // logo={IMAGES.logoColors}
      />
    )
  };

  const bodySection = () => {
    const date = item?.serviceBookings ? `${moment(item?.serviceBookings[0]?.scheduledAt).format('DD/MM/YYYY')}  -  ${moment(item?.serviceBookings[0]?.scheduledAt).format('LT')}` : '';
    const line = (title?: string | any, description?: string | any, icon?: string | any, option?: string | any) => {
      return (
        <View style={styles.lineContainer}>
          <View style={styles.lineView}>
            {title && (
              <AppText
                title={`${title}`}
                fontSize={calcFont(16)}
                fontFamily={FONTS.bold}
                color={COLORS.textDark}
                textAlign={'left'}
              />
            )}
            {description && (
              <AppText
                title={description}
                fontSize={calcFont(16)}
                fontFamily={FONTS.regular}
                color={COLORS.textDark}
                textAlign={'left'}
                width={calcWidth(190)}
              />
            )}
            {icon && (
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${item?.customer?.phoneNumber}`)}>
                <Image source={icon} style={styles.lineIcon}/>
              </TouchableOpacity>
            )}
          </View>
          {option && (
            <AppTextGradient
              title={option}
              fontSize={calcFont(16)}
              fontFamily={FONTS.bold}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              textAlign={'left'}
            />
          )}
        </View>
      )
    };

    const mainDataSection = () => {
      return (
        <LinearGradient
          style={styles.mainDataContainer}
          colors={[COLORS.primaryGradient, COLORS.secondGradient]}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.mainDataItemContainer}>
            <AppText
              title={`${Trans('reserveNumber')} ${item?.id}`}
              fontSize={calcFont(16)}
              fontFamily={FONTS.bold}
              color={COLORS.white}
              textAlign={'left'}
            />
            <AppText
              title={date}
              fontSize={calcFont(14)}
              fontFamily={FONTS.regular}
              color={COLORS.white}
              textAlign={'left'}
            />
          </View>
          <View style={styles.mainDataItemContainer}>
            <AppText
              title={Trans('costService')}
              fontSize={calcFont(16)}
              fontFamily={FONTS.regular}
              color={COLORS.white}
              textAlign={'left'}
            />
            <AppText
              title={`${item?.priceAfterDiscount} ${Trans('rs')}`}
              fontSize={calcFont(16)}
              fontFamily={FONTS.bold}
              color={COLORS.white}
              textAlign={'left'}
            />
          </View>
          {status == 'accepted_by_service_provider' && <View style={[styles.mainDataItemContainer, {borderBottomWidth: 0}]}>
            <AppText
              title={Trans('costTransfer')}
              fontSize={calcFont(16)}
              fontFamily={FONTS.regular}
              color={COLORS.white}
              textAlign={'left'}
            />
            <AppText
              title={`${costTransfer || item?.priceAfterDiscount} ${Trans('rs')}`}
              fontSize={calcFont(16)}
              fontFamily={FONTS.bold}
              color={COLORS.white}
              textAlign={'left'}
            />
          </View>}
            {appointmentDetailsData?.type != 'in_branch' &&  <View style={styles.mainDataItemOptionContainer}>
              {/* {(status == 'scheduled' || status == 'en_route' || status == 'arrived' || status == 'started' || status == 'completed') && (
                <View style={styles.mainDataItemOptionApprovedContainer}>
                  <Image source={IMAGES.notificationsOpen} style={styles.mainDataItemOptionIcon}/>
                  <AppText
                    title={Trans('costTransportationApprovedByClient')}
                    fontSize={calcFont(16)}
                    fontFamily={FONTS.regular}
                    color={COLORS.white}
                    textAlign={'left'}
                  />
                </View>
              )} */}
              {status == 'reviewing' && (
                <View style={styles.mainDataItemOptionApprovedContainer}>
                  <TextInput
                    value={costTransfer}
                    placeholder={'00'}
                    keyboardType={'decimal-pad'}
                    onChangeText={(text: any) => setCostTransfer(text)}
                    placeholderTextColor={COLORS.gray}
                    numberOfLines={1}
                    style={[styles.input, {borderWidth: 2, borderColor: costTransferState ? COLORS.red : COLORS.borderLight}]}
                  />
                </View>
              )}
            </View>}
            <View style={styles.mainDataItemContainer}>
              <AppText
                title={`${Trans('total')} ${item?.order?.id ? Trans('costSharedTransfers') : ''}`}
                fontSize={calcFont(16)}
                fontFamily={FONTS.regular}
                color={COLORS.white}
                textAlign={'left'}
              />
              <AppText
                title={`${costTransfer > 0 ? (parseFloat(costTransfer) + item?.priceAfterDiscount) : (item?.priceAfterDiscount + item?.transportationFee)} ${Trans('rs')}`}
                // title={`${ costTransfer > 0 ? (parseFloat(costTransfer) + parseFloat(item?.invoice?.totalPriceAfterDiscount)) : parseFloat(item?.invoice?.totalPriceAfterDiscount)} ${Trans('rs')}`}
                fontSize={calcFont(16)}
                fontFamily={FONTS.bold}
                color={COLORS.white}
                textAlign={'left'}
              />
            </View>
        </LinearGradient>
      );
    };

    const customerNameSection = () => {
      return (
        <View style={styles.customerNameContainer}>
          <AppDataLine
            containerStyle={{}}
            image={IMAGES.moreAccount2}
            title={Trans('customerNameData')}
            fontSize={calcFont(16)}
            fontFamily={FONTS.medium}
            textColor={''}
            textAlign={'left'}
          />
          {line(`${Trans('name')}:  `, item?.customer?.name, null, null)}
          {(status == 'scheduled' || status == 'en_route' || status == 'arrived' || status == 'started' || status == 'completed') && line(`${Trans('phone')}:  `, item?.customer?.phoneNumber, IMAGES.callCircle, null)}
        </View>
      )
    };

    
    const servicesDetailsSection = () => {
      return (
        <View style={styles.servicesDetailsContainer}>
          <AppDataLine
            containerStyle={{}}
            image={IMAGES.moreService}
            title={Trans('sessionsDetails')}
            fontSize={calcFont(16)}
            fontFamily={FONTS.medium}
            textColor={''}
            textAlign={'left'}
          />
          {item?.serviceBookings?.map((item: any) => {
            console.log('==============>>>>>>>>>>>>', item);
            const backgroundColor = item?.id == appointmentDetailsData?.nextServiceBooking?.id ? 'rgba(242, 166, 19, 0.2)' : item?.status == 'completed' ? 'rgba(92, 190, 67, 0.2)' : item?.status == 'cancelled' ? 'rgba(239, 68, 68, 0.2)' : COLORS.white
            return (
              <View style={{width: calcWidth(319 + 16), alignItems: 'center', borderRadius: calcWidth(6), paddingTop: calcHeight(10), backgroundColor: backgroundColor}}>
                {line(``, `${I18nManager.isRTL ? item?.service?.name : item?.service?.nameEn} :   ${moment(item?.scheduledAt).format('DD/MM/YYYY')} - ${moment(item?.scheduledAt).format('LT')}`, null, `${item?.service?.estimatedTime} ${Trans('minute')}`)}
              </View>
            )
          })}
          {/* {line(`${Trans('serviceName')} 1: `, 'تصفيف شعر', null, `30 ${Trans('minute')}`)}
          {line(`${Trans('serviceName')} 2: `, 'ميكب كامل', null, `20 ${Trans('minute')}`)}
          {line(`${Trans('serviceName')} 3: `, 'تصفيف شعر', null, `15 ${Trans('minute')}`)} */}
        </View>
      )
    };

    const dateSection = () => {
      return (
        <View style={styles.dateContainer}>
          <AppDataLine
            containerStyle={{}}
            image={IMAGES.moreDate}
            title={Trans('sessionDate')}
            fontSize={calcFont(16)}
            fontFamily={FONTS.medium}
            textColor={''}
            textAlign={'left'}
          />
          {line(`${Trans('date')}:  `, item?.serviceBookings ? `${moment(item?.nextServiceBooking?.scheduledAt).format('DD/MM/YYYY')}  -  ${Trans('time')}: ${moment(item?.nextServiceBooking?.scheduledAt).format('LT')}` : '', null, null)}
        </View>
      )
    };

    const timerSection = () => {
      const timerOnProgressFunc = async (remainingTimeInSecs: any) => {
        console.log("On Progress tracker :", remainingTimeInSecs);
        dispatch(setAppointmentTimer(remainingTimeInSecs));
        await AsyncStorage.setItem('timer', `${remainingTimeInSecs}`);
      };
    
      const timerCallbackFunc = (timerFlag: any) => {
        setCount(0);
        console.warn("Alert the user when timer runs out...");
      };

      return (
        <View style={styles.addressContainer}>
          <CircularProgress
            circleBackgroundColor={COLORS.primaryGradient}
            inActiveStrokeColor={COLORS.primaryGradient}
            activeStrokeWidth={calcWidth(54)}
            inActiveStrokeWidth={54}
            value={20}
            maxValue={20}
            radius={calcWidth(100)}
            inActiveStrokeOpacity={0.7}
            activeStrokeColor={COLORS.borderLight}
            activeStrokeSecondaryColor={COLORS.borderLight}
            strokeLinecap={'butt'}
            duration={count * 1000}
            dashedStrokeConfig={{
              count: 20,
              width: calcWidth(36),
            }}
            showProgressValue={false}
          />
          <View style={styles.countDownContainer}>
            <CountDownTimer
              ref={refTimer}
              timestamp={count}
              timerOnProgress={timerOnProgressFunc}
              timerCallback={timerCallbackFunc}
              containerStyle={styles.countDownView}
              textStyle={styles.countDownText}
            />
  
          </View>
          <AppText
            title={Trans('ifCustomerDoesnotRespond')}
            fontSize={calcFont(14)}
            fontFamily={FONTS.medium}
            color={COLORS.textLight}
            textAlign={'center'}
          />
        </View>
      )
    };

    const addressSection = () => {
      return (
        <View style={styles.addressContainer}>
          <AppDataLine
            containerStyle={{}}
            image={IMAGES.moreAddress}
            title={Trans('addres')}
            fontSize={calcFont(16)}
            fontFamily={FONTS.medium}
            textColor={''}
            textAlign={'left'}
          />
          {line(null, item?.address, null, null)}
          {(appointmentDetailsData?.type != 'in_branch' && (item?.lat && item?.lng)) && <TouchableOpacity
            onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${Number(item?.lat)},${Number(item?.lng)}`)}
          >
            <MapView
              style={styles.addressMapTest}
              region={{
                latitude: Number(item?.lat),
                longitude: Number(item?.lng),
                latitudeDelta: 0.222,
                longitudeDelta: 0.221,
              }}
            >
              <Marker
                key={1}
                coordinate={{latitude: Number(item?.lat), longitude: Number(item?.lng)}}
                // title={'title'}
                // description={'description'}
              >
                <Image source={IMAGES.mapMarker} style={{width: calcWidth(24), height: calcWidth(24)}}/>
              </Marker>
            </MapView>
          </TouchableOpacity>}
          {/* <Image source={IMAGES.mapTest} style={styles.addressMapTest}/> */}
          {appointmentDetailsData?.type != 'in_branch' ? (
            <>
              {(status == 'scheduled' || status == 'en_route' || status == 'arrived' || status == 'started' || status == 'completed') && (
                <View style={styles.stepsContainer}>
                  <ReservationStepData
                    title={Trans('onWayPlaceDetention')}
                    active={(status == 'en_route' || status == 'arrived' || status == 'started' || status == 'completed')}
                  />
                  <ReservationStepLine
                    active={(status == 'en_route' || status == 'arrived' || status == 'started' || status == 'completed')}
                  />
                  <ReservationStepData
                    title={Trans('availablePlaceReservation')}
                    active={(status == 'arrived' || status == 'started' || status == 'completed')}
                  />
                  <ReservationStepLine
                    active={(status == 'arrived' || status == 'started' || status == 'completed')}
                  />
                  <ReservationStepData
                    title={Trans('startService')}
                    active={status == 'started' || status == 'completed'}
                  />
                  <ReservationStepLine
                    active={step == 2 && status == 'started' || status == 'completed'}
                  />
                  <ReservationStepData
                    title={Trans('serviceCompleted')}
                    active={status == 'completed'}
                  />
                </View>
              )}
            </>
          ) : (
            <>
              {(status == 'scheduled' || status == 'started' || status == 'completed') && (
                <View style={styles.stepsContainer}>
                  {/* <ReservationStepData
                    title={Trans('onWayPlaceDetention')}
                    active={(status == 'en_route' || status == 'arrived' || status == 'started' || status == 'completed')}
                  />
                  <ReservationStepLine
                    active={(status == 'en_route' || status == 'arrived' || status == 'started' || status == 'completed')}
                  />
                  <ReservationStepData
                    title={Trans('availablePlaceReservation')}
                    active={(status == 'arrived' || status == 'started' || status == 'completed')}
                  />
                  <ReservationStepLine
                    active={(status == 'arrived' || status == 'started' || status == 'completed')}
                  />
                  <ReservationStepData
                    title={Trans('startService')}
                    active={status == 'started' || status == 'completed'}
                  />
                  <ReservationStepLine
                    active={step == 2 && status == 'started' || status == 'completed'}
                  /> */}
                  <ReservationStepData
                    title={Trans('serviceCompleted')}
                    active={status == 'completed'}
                  />
                </View>
              )}
            </>
          )}
        </View>
      )
    };

    const actionSection = () => {
      const onNext = async () => {
        if (appointmentDetailsData?.type != 'in_branch') {
          if (status == 'reviewing') {
            if (costTransfer == 0) {
              setCostTransferState(true);
            } else {
              setCostTransferState(false);
              dispatch(appointment_update({id: item?.id, serviceBookId: item?.nextServiceBooking?.id, status: 'accepted_by_service_provider', fees: parseFloat(costTransfer), feeId: 1}));
            };
          } else if (status == 'scheduled') {
            dispatch(appointment_update({id: item?.id, serviceBookId: item?.nextServiceBooking?.id, status: 'en_route', fees: parseFloat(item?.appointmentFees[0]?.amount), feeId: 1}));
          } else if (status == 'en_route') {
            dispatch(appointment_update({id: item?.id, serviceBookId: item?.nextServiceBooking?.id, status: 'arrived', fees: parseFloat(item?.appointmentFees[0]?.amount), feeId: 1}));
          } else if (status == 'arrived') {
            console.log('dispatch(setAppointmentTimer(20 * 60));');
            dispatch(setAppointmentTimer(20 * 60));
            await AsyncStorage.setItem('timer', `${20 * 60}`);
            dispatch(appointment_update({id: item?.id, serviceBookId: item?.nextServiceBooking?.id, status: 'started', fees: parseFloat(item?.appointmentFees[0]?.amount), feeId: 1}));
          } else if (status == 'started') {
            if (step == 1) {
              setStep(2);
              dispatch(appointment_otp({id: item?.id}));
            } else if (step == 2) {
              dispatch(appointment_update({id: item?.id, serviceBookId: item?.nextServiceBooking?.id, otp: OTPCode, status: 'completed', fees: parseFloat(item?.appointmentFees[0]?.amount), feeId: 1}));
            }
          } else {
            null;
          }
        } else {
          if (status == 'scheduled') {
            if (step == 1) {
              setStep(2);
              dispatch(appointment_otp({id: item?.id}));
            } else if (step == 2) {
              dispatch(appointment_update({id: item?.id, serviceBookId: item?.nextServiceBooking?.id, otp: OTPCode, status: 'completed'}));
            }
          } else {
            null;
          }
        }
      };
    
      const onAction = async () => {
        if (status == 'reviewing') {
          dispatch(appointment_update({id: item?.id, serviceBookId: item?.nextServiceBooking?.id, status: 'rejected_by_service_provider', fees: 0}));
        } else if (status == 'arrived') {
          console.log('dispatch(setAppointmentTimer(20 * 60));');
          dispatch(setAppointmentTimer(20 * 60));
          await AsyncStorage.setItem('timer', `${20 * 60}`);
          dispatch(appointment_update({id: item?.id, serviceBookId: item?.nextServiceBooking?.id, status: 'cancelled', fees: 0}));
        }
      };

      var title1: string = '';
      var title2: string = '';
      if (appointmentDetailsData?.type != 'in_branch') {
        switch (status) {
          case 'reviewing':
            title1 = Trans('sendOffer');
            title2 = Trans('reservationRefused');
            break;
          case 'accepted_by_service_provider':
            title1 = '';
            title2 = '';
            break;
          case 'confirmed_by_customer':
            title1 = Trans('onWayPlaceDetention');
            title2 = '';
            break;
          case 'scheduled':
            title1 = Trans('onWayPlaceDetention');
            title2 = '';
            break;
          case 'en_route':
            title1 = Trans('availablePlaceReservation');
            title2 = '';
            break;
          case 'arrived':
            title1 = Trans('startService');
            title2 = Trans('reservationCanceled');
            break;
          case 'started':
            title1 = step == 1 ? Trans('requestCompletionCode') : Trans('serviceCompleted');
            title2 = '';
            break;
          case 'cancelled':
            title1 = '';
            title2 = '';
            break;
          case 'rejected_by_service_provider':
            title1 = '';
            title2 = '';
            break;
        };
      } else {
        switch (status) {
          case 'scheduled':
            title1 = step == 1 ? Trans('requestCompletionCode') : Trans('serviceCompleted');
            title2 = '';
            break;
          case 'cancelled':
            title1 = '';
            title2 = '';
            break;
          case 'rejected_by_service_provider':
            title1 = '';
            title2 = '';
            break;
        };
      }
      return (
        <View style={[styles.actionContainer, {paddingBottom: (status == 'reviewing' || (step == 2 && status == 'started') && isKeyboardShow) ? calcHeight(280) : calcHeight(16)}]}>
          {appointmentDetailsData?.type != 'in_branch' ? (
            <>
              {step == 2 && status == 'started' && (
                <View style={styles.otpContainer}>
                  <OtpInputs
                    autofillFromClipboard
                    handleChange={code => {
                      setErrors('');
                      setOTPCode(code);
                    }}
                    style={{
                      flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
                      justifyContent: 'space-between',
                    }}
                    numberOfInputs={5}
                    inputStyles={
                      !errors
                        ? [styles.otpInput, {borderColor: focused ? COLORS.primaryGradient : COLORS.borderLight}]
                        : [styles.otpInput, {borderColor: 'red'}]
                    }
                  />
                </View>
              )}
            </>
          ) : (
            <>
              {step == 2 && status == 'scheduled' && (
                <View style={styles.otpContainer}>
                  <OtpInputs
                    autofillFromClipboard
                    handleChange={code => {
                      setErrors('');
                      setOTPCode(code);
                    }}
                    style={{
                      flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
                      justifyContent: 'space-between',
                    }}
                    numberOfInputs={5}
                    inputStyles={
                      !errors
                        ? [styles.otpInput, {borderColor: focused ? COLORS.primaryGradient : COLORS.borderLight}]
                        : [styles.otpInput, {borderColor: 'red'}]
                    }
                  />
                </View>
              )}
            </>
          )}
          {status == 'accepted_by_service_provider' && (
            <AppTextViewGradient
              containerStyle={styles.waitingContainer}
              colorStart={COLORS.white}
              colorEnd={COLORS.white}
              title={Trans('waitingForResponseFromClient')}
              fontFamily={FONTS.bold}
              fontSize={calcFont(20)}
              textAlign={'center'}
              textColorStart={COLORS.secondGradient}
              textColorEnd={COLORS.primaryGradient}
            />
          )}
          {(status == 'reviewing' || status == 'scheduled' || status == 'en_route' || status == 'arrived' || status == 'started') && (
            <AppButtonDefault
              title={title1}
              onPress={() => onNext()}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{marginTop: calcHeight(8)}}
            />
          )}
          {(status == 'reviewing' || (status == 'arrived' && count == 0)) && (
            <AppButtonDefault
              title={title2}
              onPress={() => onAction()}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{marginTop: calcHeight(8)}}
              border
            />
          )}
        </View>
      )
    };

    return (
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{width: calcWidth(375), alignItems: 'center'}}>
            {mainDataSection()}
            {customerNameSection()}
            {servicesDetailsSection()}
            {dateSection()}
            {appointmentDetailsData?.type != 'in_branch' && status == 'arrived' && timerSection()}
            {appointmentDetailsData?.type != 'in_branch' && addressSection()}
          </View>
          {appointmentDetailsData?.type != 'in_branch' ? (
            <>
              {step == 2 && status == 'started' && actionSection()}
            </>
          ) : (
            <>
              {step == 2 && status == 'scheduled' && actionSection()}
            </>
          )}
        </ScrollView>
        {step == 1 && actionSection()}
      </>
    )
  };

  const modalCompletedSection = () => {
    return (
      <Modal_Warning
        visible={step == 2 && status == 'completed'}
        onClose={() => navigation.goBack()}
        onPress={() => navigation.goBack()}
        image={IMAGES.modalDone}
        title={Trans('reservationCompleted')}
        buttonTitle={Trans('returnToReservationsPage')}
      />
    )
  };

  const modalRejectSection = () => {
    return (
      <Modal_Warning
        visible={visibleRejection}
        onClose={() => setVisibleRejection(false)}
        onPress1={() => setVisibleRejection(false)}
        onPress2={() => setVisibleRejection(false)}
        image={IMAGES.modalCancel}
        title={Trans('areSureReservationRejected')}
        button1Title={Trans('yes')}
        button2Title={Trans('no')}
      />
    )
  };

  const modalCancleSection = () => {
    return (
      <Modal_Warning
        visible={visibleCancellation}
        onClose={() => setVisibleCancellation(false)}
        onPress1={() => setVisibleCancellation(false)}
        onPress2={() => setVisibleCancellation(false)}
        image={IMAGES.modalCancel}
        title={Trans('areSureCanCancelReservation')}
        button1Title={Trans('yes')}
        button2Title={Trans('no')}
      />
    )
  };

  const loadingSection = () => {
    return (
      <AppLoading
        margin_top={calcHeight(440)}
        size={'large'}
        visible={appointmentDetailsLoader}
      />
    )
  };

  return (
    <View style={styles.container}>
      {loadingSection()}
      {headerSection()}
      {bodySection()}
      {modalCompletedSection()}
      {modalRejectSection()}
      {modalCancleSection()}
    </View>
  );
};

export default ReservationDetails;


