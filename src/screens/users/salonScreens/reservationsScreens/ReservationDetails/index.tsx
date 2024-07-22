import React, { useRef, useState } from 'react';
import { I18nManager, Image, Linking, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
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

const ReservationDetails: React.FC = () => {
  const navigation = useNavigation<any>();
  const refTimer = useRef();
  const [costService, setCostService] = useState<any>(1520);
  const [costTransfer, setCostTransfer] = useState<any>(0);
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [OTPCode, setOTPCode] = useState<string>('');
  const [errors, setErrors] = useState<any>();
  const [focused, setFocused] = useState<boolean>(false);
  const [visibleRejection, setVisibleRejection] = useState<boolean>(false);
  const [visibleCancellation, setVisibleCancellation] = useState<boolean>(false);

  const headerSection = () => {
    return (
      <AppHeaderDefault
        onPress={() => navigation.goBack()}
        icon={IMAGES.back}
        title={Trans('reservationDetails')}
        logo={IMAGES.logoColors}
      />
    )
  };

  const bodySection = () => {
    const line = (title?: string | any, description?: string | any, icon?: string | any, option?: string | any) => {
      return (
        <View style={styles.lineContainer}>
          <View style={styles.lineView}>
            {title && (
                <AppText
                title={title}
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
              />
            )}
            {icon && (
              <TouchableOpacity>
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
              title={`${Trans('reserveNumber')} 1234`}
              fontSize={calcFont(16)}
              fontFamily={FONTS.bold}
              color={COLORS.white}
              textAlign={'left'}
            />
            <AppText
              title={'15/10/2024'}
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
              title={`1520 ${Trans('rs')}`}
              fontSize={calcFont(16)}
              fontFamily={FONTS.bold}
              color={COLORS.white}
              textAlign={'left'}
            />
          </View>
          <View style={[styles.mainDataItemContainer, {borderBottomWidth: 0}]}>
            <AppText
              title={Trans('costTransfer')}
              fontSize={calcFont(16)}
              fontFamily={FONTS.regular}
              color={COLORS.white}
              textAlign={'left'}
            />
            {step > 1 && (
              <AppText
                title={`${costTransfer} ${Trans('rs')}`}
                fontSize={calcFont(16)}
                fontFamily={FONTS.bold}
                color={COLORS.white}
                textAlign={'left'}
              />
            )}
          </View>
            <View style={styles.mainDataItemOptionContainer}>
              {step > 2 && (
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
              )}
              {step == 1 && (
                <View style={styles.mainDataItemOptionApprovedContainer}>
                  <TextInput
                    value={costTransfer}
                    placeholder={'00'}
                    keyboardType={'decimal-pad'}
                    onChangeText={(text: any) => setCostTransfer(text)}
                    placeholderTextColor={COLORS.gray}
                    numberOfLines={1}
                    style={styles.input}
                  />
                </View>
              )}
            </View>
            <View style={styles.mainDataItemContainer}>
              <AppText
                title={Trans('total')}
                fontSize={calcFont(16)}
                fontFamily={FONTS.regular}
                color={COLORS.white}
                textAlign={'left'}
              />
              <AppText
                title={`${ costTransfer > 0 ? parseInt(costTransfer, 10) + parseInt(costService, 10) : parseInt(costService, 10)} ${Trans('rs')}`}
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
          {line(`${Trans('name')}: `, 'جنا محمد سالم البراوى', null, null)}
          {line(`${Trans('phone')}: `, '+96640802488', IMAGES.callCircle, null)}
        </View>
      )
    };

    const servicesDetailsSection = () => {
      return (
        <View style={styles.servicesDetailsContainer}>
          <AppDataLine
            containerStyle={{}}
            image={IMAGES.moreService}
            title={Trans('servicesDetails')}
            fontSize={calcFont(16)}
            fontFamily={FONTS.medium}
            textColor={''}
            textAlign={'left'}
          />
          {line(`${Trans('serviceName')} 1: `, 'تصفيف شعر', null, `30 ${Trans('minute')}`)}
          {line(`${Trans('serviceName')} 2: `, 'ميكب كامل', null, `20 ${Trans('minute')}`)}
          {line(`${Trans('serviceName')} 3: `, 'تصفيف شعر', null, `15 ${Trans('minute')}`)}
        </View>
      )
    };

    const dateSection = () => {
      return (
        <View style={styles.dateContainer}>
          <AppDataLine
            containerStyle={{}}
            image={IMAGES.moreDate}
            title={Trans('serviceDate')}
            fontSize={calcFont(16)}
            fontFamily={FONTS.medium}
            textColor={''}
            textAlign={'left'}
          />
          {line(`${Trans('serviceDate')}: `, '15/10/2024', null, null)}
        </View>
      )
    };

    const timerSection = () => {
      const timerOnProgressFunc = (remainingTimeInSecs: any) => {
        console.log("On Progress tracker :", remainingTimeInSecs);
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
          {line(null, 'الرياض , 48 شارع عبدالحميد احمد', null, null)}
          <TouchableOpacity
            onPress={() =>  Linking.openURL(`https://www.google.com/maps/search/?api=1&query=24.7377507,46.6015283`)}
          >
            <MapView
              style={styles.addressMapTest}
              region={{
                latitude: 24.7377507,
                longitude: 46.6015283,
                latitudeDelta: 4.0222,
                longitudeDelta: 4.0221,
              }}
            >
              <Marker
                key={1}
                coordinate={{latitude: 24.7377507, longitude: 46.6015283}}
                title={'title'}
                description={'description'}
              >
                <Image source={IMAGES.mapView} style={{width: calcWidth(24), height: calcWidth(24)}}/>
              </Marker>
            </MapView>
          </TouchableOpacity>
          {/* <Image source={IMAGES.mapTest} style={styles.addressMapTest}/> */}
          {step >= 3 && (
            <View style={styles.stepsContainer}>
              <ReservationStepData
                title={Trans('onWayPlaceDetention')}
                active={step >= 4}
              />
              <ReservationStepLine
                active={step >= 4}
              />
              <ReservationStepData
                title={Trans('availablePlaceReservation')}
                active={step >= 5}
              />
              <ReservationStepLine
                active={step >= 5}
              />
              <ReservationStepData
                title={Trans('startService')}
                active={step >= 6}
              />
              <ReservationStepLine
                active={step >= 7}
              />
              <ReservationStepData
                title={Trans('serviceCompleted')}
                active={step >= 8}
              />
            </View>
          )}
        </View>
      )
    };

    const actionSection = () => {
      const onNext = () => {
        if (step == 1) {
          if (costTransfer) {
            setStep(step + 1);
          } else {
            null;
          }
        } else if (step == 4) {
          setCount(12);
          setStep(step + 1);
        } else {
          setStep(step + 1);
        }
      };
    
      const onAction = () => {
        if (step == 1) {
          setVisibleRejection(true);
        } else {
          setVisibleCancellation(true);
        }
      };

      const title1 = step == 1 ? Trans('sendOffer') : step == 3 ? Trans('onWayPlaceDetention') : step == 4 ? Trans('availablePlaceReservation') : step == 5 ? Trans('startService') : step == 6 ? Trans('requestCompletionCode') : Trans('serviceCompleted');
      const title2 = step == 1 ? Trans('reservationRefused') : step == 5 ? Trans('reservationCanceled') : '';
      
      return (
        <View style={styles.actionContainer}>
          {step == 7 && (
            <View style={styles.otpContainer}>
              <OtpInputs
                autofillFromClipboard
                // onFocus={() => setFocused(true)}
                // ref={otpRef}
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
                    ? [styles.otpInput, {borderColor: focused ? COLORS.primaryGradient : COLORS.gray}]
                    : [styles.otpInput, {borderColor: 'red'}]
                }
              />
            </View>
          )}
          {step == 2 && (
              <TouchableOpacity onPress={() => onNext()}>
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
              </TouchableOpacity>
          )}
          {(step != 2 && step < 8) && (
            <AppButtonDefault
              title={title1}
              onPress={() => onNext()}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{marginTop: calcHeight(8)}}
            />
          )}
          {(step == 1 || (step == 5 && count <= 0)) && (
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
          {mainDataSection()}
          {customerNameSection()}
          {servicesDetailsSection()}
          {dateSection()}
          {step == 5 && timerSection()}
          {addressSection()}
        </ScrollView>
        {actionSection()}
      </>
    )
  };

  const modalCompletedSection = () => {
    return (
      <Modal_Warning
        visible={step == 8}
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

  return (
    <View style={styles.container}>
      {headerSection()}
      {bodySection()}
      {modalCompletedSection()}
      {modalRejectSection()}
      {modalCancleSection()}
    </View>
  );
};

export default ReservationDetails;


