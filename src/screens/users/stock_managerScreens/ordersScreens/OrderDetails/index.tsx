import React, { useEffect, useRef, useState } from 'react';
import { I18nManager, Image, Keyboard, Linking, ScrollView, TouchableOpacity, View } from 'react-native';
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
import AppTextViewGradient from '../../../../../components/AppTextViewGradient';
import OtpInputs from 'react-native-otp-inputs';
import Modal_Warning from '../../../../../components/Modal_Warning';
import MapView, { Marker } from 'react-native-maps';
import { RootState, useAppDispatch } from '../../../../../redux/store/store';
import { useSelector } from 'react-redux';
import AppLoading from '../../../../../components/AppLoading';
import moment from 'moment';
import { appointment_otp, appointment_update } from '../../../../../middleware/appointments/update/update';
import { setAppointmentTimer } from '../../../../../redux/store/appointment_timer/appointment_timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { order_details } from '../../../../../middleware/orders/details/details';
import { DUMMY_DATA } from '../../../../../utils/dummyData';
import { order_update } from '../../../../../middleware/orders/update/update';

const OrderDetails: React.FC = (params: any) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { appointmentTimer } = useSelector((store: RootState) => store?.appointment_timer);
  const { orderDetailsLoader, orderDetailsData } : { orderDetailsLoader: boolean, orderDetailsData: any } = useSelector((store: RootState) => store?.order_details);
  const item: any = orderDetailsData;
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
    dispatch(order_details({id: params.route.params.id}))
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
        title={Trans('orderDetails')}
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
              title={`${Trans('orderNumber')} ${item?.id}`}
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
              title={Trans('costOrder')}
              fontSize={calcFont(16)}
              fontFamily={FONTS.regular}
              color={COLORS.white}
              textAlign={'left'}
            />
            <AppText
              title={`${item?.priceBeforeDiscount} ${Trans('rs')}`}
              fontSize={calcFont(16)}
              fontFamily={FONTS.bold}
              color={COLORS.white}
              textAlign={'left'}
            />
          </View>
          {!item?.discount && <View style={styles.mainDataItemContainer}>
            <AppText
              title={Trans('discound')}
              fontSize={calcFont(16)}
              fontFamily={FONTS.regular}
              color={COLORS.white}
              textAlign={'left'}
            />
            <AppText
              title={`${item?.discount} ${Trans('rs')}`}
              fontSize={calcFont(16)}
              fontFamily={FONTS.bold}
              color={COLORS.white}
              textAlign={'left'}
            />
          </View>}
          <View style={styles.mainDataItemContainer}>
            <AppText
              title={Trans('total')}
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
          {line(`${Trans('name')}:  `, item?.customerName, null, null)}
        </View>
      )
    };

    const stepLine = (isCompleted?: boolean, title?: string, description?: string) => {
      return (
        <View style={styles.stepLineContainer}>
          {title && (
            <AppText
              title={`${title}`}
              fontSize={calcFont(18)}
              fontFamily={FONTS.medium}
              color={COLORS.textDark}
              textAlign={'left'}
            />
          )}
          {description && (
            <AppText
              title={description}
              fontSize={calcFont(16)}
              fontFamily={isCompleted ? FONTS.medium : FONTS.regular}
              color={isCompleted ? COLORS.primaryGradient : COLORS.textLight}
              textAlign={'right'}
            />
          )}
        </View>
      )
    };
    const productsDetailsSection = () => {
      return (
        <View style={styles.servicesDetailsContainer}>
          <AppDataLine
            containerStyle={{}}
            image={IMAGES.moreService}
            title={Trans('productsDetails')}
            fontSize={calcFont(16)}
            fontFamily={FONTS.medium}
            textColor={''}
            textAlign={'left'}
          />
          {item?.productOrderProducts?.map((item: any) => {
            
            const name: string = I18nManager.isRTL ? item?.productAttribute?.product?.name : item?.productAttribute?.product?.nameEn;
            const count: string = `${item?.quantity} ${Trans('piece')}`;
            return (
              stepLine(false, name, count)
            )
          })}
        </View>
      )
    };

    const dateSection = () => {
      return (
        <View style={styles.dateContainer}>
          <AppDataLine
            containerStyle={{}}
            image={IMAGES.moreDate}
            title={Trans('deliveryDetails')}
            fontSize={calcFont(16)}
            fontFamily={FONTS.medium}
            textColor={''}
            textAlign={'left'}
          />
          {item?.productOrderSteps?.map((item: any, index: number) => {
            const _status: any = DUMMY_DATA.APPOINTMENT_STATUS;
            var stateName: string = '';
            for (let i = 0; i < _status.length; i++) {
              if (item?.status == _status[i]?.key) {
                stateName = I18nManager.isRTL ? _status[i].name : _status[i].nameEn;
              }
            };
            return (
              stepLine(item?.isCompleted, stateName, `${item?.createdAt ? moment(item?.createdAt).format('LLL') : Trans('notSpecified')}`)
            )
          })}
        </View>
      )
    };

    const addressSection = () => {
      return (
        <View style={styles.addressContainer}>
          <AppDataLine
            containerStyle={{}}
            image={IMAGES.moreAddress}
            title={Trans('addresCustomer')}
            fontSize={calcFont(16)}
            fontFamily={FONTS.medium}
            textColor={''}
            textAlign={'left'}
          />
          {line(null, item?.address, null, null)}
          <TouchableOpacity
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
              >
                <Image source={IMAGES.mapMarker} style={{width: calcWidth(24), height: calcWidth(24)}}/>
              </Marker>
            </MapView>
          </TouchableOpacity>
        </View>
      )
    };

    const actionSection = () => {
      const onNext = async () => {
        console.log('item_status----------------', item?.status);
        
        if (item?.status == 'scheduled') {
          dispatch(order_update({id: item?.id, status: 'preparing'}));
        } else if (item?.status == 'preparing') {
          dispatch(order_update({id: item?.id, status: 'ready'}));
        } else {
          null;
        }
      };
    
      var title1: string = '';
      switch (item?.status) {
        case 'scheduled':
          title1 = Trans('preparing');
          break;
        case 'preparing':
          title1 = Trans('ready');
          break;
      };
      
      return (
        <View style={[styles.actionContainer, {paddingBottom: calcHeight(16)}]}>
          <AppButtonDefault
            title={title1}
            onPress={() => onNext()}
            colorStart={COLORS.primaryGradient}
            colorEnd={COLORS.secondGradient}
            buttonStyle={{marginTop: calcHeight(8)}}
          />
        </View>
      )
    };

    return (
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{width: calcWidth(375), alignItems: 'center'}}>
            {mainDataSection()}
            {customerNameSection()}
            {productsDetailsSection()}
            {dateSection()}
            {(item?.lat && item?.lng) && addressSection()}
          </View>
          {(item?.status == 'scheduled' || item?.status == 'preparing') && actionSection()}
        </ScrollView>
      </>
    )
  };

  const loadingSection = () => {
    return (
      <AppLoading
        margin_top={calcHeight(440)}
        size={'large'}
        visible={orderDetailsLoader}
      />
    )
  };

  return (
    <View style={styles.container}>
      {loadingSection()}
      {headerSection()}
      {bodySection()}
    </View>
  );
};

export default OrderDetails;


