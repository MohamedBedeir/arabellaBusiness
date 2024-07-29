import React, { useEffect, useState } from 'react';
import { I18nManager, ScrollView, StatusBar, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../../../components/AppText';
import { Trans } from '../../../../../translation';
import { COLORS, FONTS } from '../../../../../utils/theme';
import { calcFont, calcHeight, calcWidth } from '../../../../../utils/sizes';
import AppHeaderAdvanced from '../../../../../components/AppHeaderAdvanced';
import ReservationsReport from '../../../../../components/ReservationsReport';
import { IMAGES } from '../../../../../assets/Images';
import SearchByDate from '../../../../../components/SearchByDate';
import AppButtonDefault from '../../../../../components/AppButtonDefault';
import { BarChart, LineChart } from "react-native-gifted-charts";
import AppDataLine from '../../../../../components/AppDataLine';
import { DUMMY_DATA } from '../../../../../utils/dummyData';
import AppLoading from '../../../../../components/AppLoading';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../../redux/store/store';
import { statistics_data } from '../../../../../middleware/statistics/statistics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppModalSelectItem from '../../../../../components/AppModalSelectItem';
import AppModalCalendar from '../../../../../components/AppModalCalendar';
import moment from 'moment';

const Home: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { statisticsLoader, statisticsData, statisticsData_TotalAppointments, statisticsData_TotalPaidAmount, statisticsData_TotalRefundAmount, statisticsData_Counts } : { statisticsLoader: boolean, statisticsData: any, statisticsData_TotalAppointments: any, statisticsData_TotalPaidAmount: any, statisticsData_TotalRefundAmount: any, statisticsData_Counts: any} = useSelector((store: RootState) => store?.statistics);
  const [userData, setUserData] = useState<any>();
  const [visibleTimePeriod, setVisibleTimePeriod] = useState<boolean>(false);
  const [selectTimePeriod, setSelectTimePeriod] = useState<any>('');
  const [visibleYear, setVisibleYear] = useState<boolean>(false);
  const [visibleMonth, setVisibleMonth] = useState<boolean>(false);
  const [visibleDay, setVisibleDay] = useState<boolean>(false);
  const [selectYear, setSelectYear] = useState<any>('');
  const [selectMonth, setSelectMonth] = useState<any>('');
  const [selectDay, setSelectDay] = useState<any>('');
  const [timePeriodData, setTimePeriodData] = useState<boolean>(false);
  const [timeFirstData, setTimeFirstData] = useState<boolean>(false);
  const [barChart, setBarChart] = useState<number>(100);
  const [lineChart, setLineChart] = useState<number>(20000);
  

  const getStatistics = (type?: string, date?: string) => {
    dispatch(statistics_data({type: type || 'isYear', date: date || '2024-01-01T00:00:00Z'}));
  };
  
  const getUser = async () => {
    const user: any = await AsyncStorage.getItem('user');
    setUserData(JSON.parse(user));
  };

  useEffect(() => {
    getUser();
    getStatistics();
  }, []);

  const headerSection = () => {
    const user = {
      name: userData?.name,
      image: IMAGES.userTest,
    };
    return (
      <AppHeaderAdvanced
        user={user}
        onPress={() => navigation.navigate('MA_HomeDetailsStack', {screen: 'MA_Notifications'})}
      />
    )
  };



  const onStartTime = () => {
    if (selectTimePeriod != '') {
      if (selectTimePeriod?.id == 1) {
        setVisibleYear(true);
      } else if (selectTimePeriod?.id == 2) {
        setVisibleMonth(true);
      } else if (selectTimePeriod?.id == 3) {
        setVisibleDay(true);
      }
    } else {
      null;
    }
  };
  
  const onSearch = () => {
    const date = selectYear?.date || selectMonth || selectDay || '';
    if (selectTimePeriod == '') {
      setTimePeriodData(true);
    } else if (date == '') {
      setTimePeriodData(false);
      setTimeFirstData(true);
    } else {
      if (selectTimePeriod?.id == 1) {
        setBarChart(100);
        setLineChart(20000);
      } else if (selectTimePeriod?.id == 2) {
        setBarChart(30);
        setLineChart(10000);
      } else if (selectTimePeriod?.id == 3) {
        setBarChart(10);
        setLineChart(5000);
      }
      setTimePeriodData(false);
      setTimeFirstData(false);
      getStatistics(selectTimePeriod?.key, date);
    }
  }
  const bodySection = () => {
    const searchSection = () => {
      return (
        <View style={styles.searchContainer}>
          <SearchByDate
            onPress={() => setVisibleTimePeriod(true)}
            containerStyle={{borderColor: timePeriodData ? COLORS.red : COLORS.borderLight}}
            placeholder={Trans('timePeriod')}
            title={I18nManager.isRTL ? selectTimePeriod?.name : selectTimePeriod?.nameEn}
          />
          <SearchByDate
            onPress={() => onStartTime()}
            containerStyle={{borderColor: timeFirstData ? COLORS.red : COLORS.borderLight}}
            placeholder={Trans('first')}
            title={selectTimePeriod?.id == 1 ? selectYear.name : selectTimePeriod?.id == 2 ? selectMonth && `${moment(selectMonth).format('MM/YYYY')}` : selectTimePeriod?.id == 3 ? selectDay && `${moment(selectDay).format('DD/MM/YYYY')}` : ''}
          />
          <AppButtonDefault
            onPress={() => onSearch()}
            colorStart={COLORS.primaryGradient}
            colorEnd={COLORS.secondGradient}
            icon={IMAGES.search}
            buttonStyle={styles.searchButton}
          />
        </View>
      )
    };

    const calculationSection = () => {
      return (
        <View>
          <ReservationsReport
            title={Trans('totalBookings')}
            image={IMAGES.reservationTotal}
            count={statisticsData_Counts.totalAppointments}
            duration={Trans('totalAmount')}
            percent={statisticsData_Counts.totalAmount}
            indicatorIcon={IMAGES.reservationTop}
            indicatorColor={COLORS.green}
          />
          <ReservationsReport
            title={Trans('totalPaid')}
            image={IMAGES.reservationPaidUp}
            count={statisticsData_Counts.paidAppointments}
            duration={Trans('totalAmount')}
            percent={statisticsData_Counts.totalPaidAmount}
            indicatorIcon={IMAGES.reservationTop}
            indicatorColor={COLORS.green}
          />
          <ReservationsReport
            title={Trans('totalUnpaid')}
            image={IMAGES.reservationUnpaid}
            count={statisticsData_Counts.unpaidAppointments}
            duration={Trans('totalAmount')}
            percent={statisticsData_Counts.totalRefundAmount}
            indicatorIcon={IMAGES.reservationDown}
            indicatorColor={COLORS.red}
          />
          {/* <ReservationsReport
            title={Trans('totalCancelled')}
            image={IMAGES.reservationCanceled}
            count={330}
            duration={Trans('lastWeekAgo')}
            percent={4.5}
            indicatorIcon={IMAGES.reservationTop}
            indicatorColor={COLORS.green}
          /> */}
        </View>
      )
    };

    const chart1Section = () => {
      return (
        <View style={styles.chart1Container}>
          <View style={styles.chart1TitleContainer}>
            <AppText
              title={Trans('reservationStatistics')}
              fontSize={calcFont(14)}
              fontFamily={FONTS.bold}
              color={COLORS.textDark}
              lineHeight={calcHeight(23)}
              textAlign={'left'}
            />
            {/* <AppButtonDefault
              title={Trans('daily')}
              onPress={() => console.log('---')}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              icon={IMAGES.openCircleWhite}
              buttonStyle={{width: calcWidth(105), height: calcHeight(40)}}
            /> */}
          </View>
          <View style={styles.chart1ChartContainer}>
            {/* <Image source={IMAGES.chartImage} style={styles.chartImage}/> */}
            <BarChart
              data={statisticsData_TotalAppointments}
              barWidth={calcWidth(8)}
              initialSpacing={calcWidth(22)}
              spacing={calcWidth(16)}
              barBorderRadius={calcWidth(4)}
              // showGradient
              showGradient
              yAxisThickness={0}
              xAxisType={'dashed'}
              xAxisColor={'lightgray'}
              yAxisTextStyle={{color: COLORS.textLight, fontSize: calcFont(12), fontFamily:FONTS.medium}}
              // stepValue={barChart / 10}
              // maxValue={barChart}
              noOfSections={20}
              // yAxisLabelTexts={['0', '20', '40', '60', '80', '100']}
              labelWidth={calcWidth(28)}
              xAxisLabelTextStyle={{color: COLORS.textLight, fontSize: calcFont(10), fontFamily:FONTS.medium, marginHorizontal: 4, width: calcWidth(28), marginStart: -calcWidth(2)}}
              // showLine
              lineConfig={{
                color: COLORS.secondGradient,
                spacing: calcWidth(16),
                thickness: 2,
                textShiftY: 2,
                animationDuration: 6,
                showArrow: true,
                dataPointsWidth: calcWidth(28),
                dataPointsShape: 'e',
                hideDataPoints: true,
                endIndex: 7,
                startIndex: 1,
                curvature: 4,
                // curved: true,
                // hideDataPoints: true,
                // shiftY: 20,
                shiftX: -calcWidth(62),
                // initialSpacing: 30,
              }}
            />
          </View>
          <View style={styles.chart1DetailsContainer}>
            <AppDataLine
              containerStyle={{width: calcWidth(343 / 2)}}
              image={IMAGES.chartTypeP}
              imageStyle={{width: calcWidth(18), height: calcWidth(18)}}
              title={I18nManager.isRTL ? statisticsData?.series?.paidAppointment.nameAr : statisticsData?.series?.paidAppointment.nameEn}
              fontSize={calcFont(14)}
              fontFamily={FONTS.medium}
              textColor={COLORS.textDark}
              textAlign={'left'}
            />
            <AppDataLine
              containerStyle={{width: calcWidth(343 / 2)}}
              image={IMAGES.chartTypeS}
              imageStyle={{width: calcWidth(18), height: calcWidth(18)}}
              title={I18nManager.isRTL ? statisticsData?.series?.unPaidAppointment.nameAr : statisticsData?.series?.unPaidAppointment.nameEn}
              fontSize={calcFont(14)}
              fontFamily={FONTS.medium}
              textColor={COLORS.textDark}
              textAlign={'left'}
            />
          </View>
        </View>
      )
    };

    const chart2Section = () => {
      return (
        <View style={styles.chart2Container}>
          <View style={styles.chart1TitleContainer}>
            <AppText
              title={Trans('amountsStatistics')}
              fontSize={calcFont(14)}
              fontFamily={FONTS.bold}
              color={COLORS.textDark}
              lineHeight={calcHeight(23)}
              textAlign={'left'}
            />
            {/* <AppButtonDefault
              title={Trans('daily')}
              onPress={() => console.log('---')}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              icon={IMAGES.openCircleWhite}
              buttonStyle={{width: calcWidth(105), height: calcHeight(40)}}
            /> */}
          </View>
          <View style={styles.chart1ChartContainer}>
            <LineChart
              data={statisticsData_TotalPaidAmount}
              data2={statisticsData_TotalRefundAmount}
              // maxValue={lineChart}
              noOfSections={10}
              stripWidth={3}
              curved
              dataPointsColor1='red'
              xAxisColor={COLORS.borderLight}
              xAxisIndicesColor={COLORS.borderLight}
              spacing={calcWidth(40)}
              color={COLORS.primaryGradient}
              color2={COLORS.purple}
              hideDataPoints={false}
              xAxisLabelTextStyle={{color: COLORS.textLight, fontSize: calcFont(10), fontFamily:FONTS.medium, marginHorizontal: 4, width: calcWidth(28), marginStart: calcWidth(2)}}
              xAxisIndicesHeight={10}
              xAxisIndicesWidth={2}
              xAxisLabelsHeight={calcHeight(20)}
              xAxisThickness={1}
              xAxisLabelsVerticalShift={5}
              textFontSize1={20}
              textShiftX={3}
              yAxisColor={COLORS.white}
              yAxisIndicesWidth={10}
              yAxisTextStyle={{color: COLORS.textLight, fontSize: calcFont(12), fontFamily:FONTS.medium}}
            />
          </View>
          <View style={styles.chart1DetailsContainer}>
            <AppDataLine
              containerStyle={{width: calcWidth(343 / 2)}}
              image={IMAGES.chartTypeP}
              imageStyle={{width: calcWidth(18), height: calcWidth(18)}}
              title={I18nManager.isRTL ? statisticsData?.series?.paidAppointment.nameAr : statisticsData?.series?.paidAppointment.nameEn}
              fontSize={calcFont(14)}
              fontFamily={FONTS.medium}
              textColor={COLORS.textDark}
              textAlign={'left'}
            />
            <AppDataLine
              containerStyle={{width: calcWidth(343 / 2)}}
              image={IMAGES.chartTypeS}
              imageStyle={{width: calcWidth(18), height: calcWidth(18)}}
              title={I18nManager.isRTL ? statisticsData?.series?.unPaidAppointment.nameAr : statisticsData?.series?.unPaidAppointment.nameEn}
              fontSize={calcFont(14)}
              fontFamily={FONTS.medium}
              textColor={COLORS.textDark}
              textAlign={'left'}
            />
          </View>
        </View>
      )
    };
    return (
      <>
        {searchSection()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {calculationSection()}
          {chart1Section()}
          {chart2Section()}
        </ScrollView>
      </>
    )
  };

  const modalTimePeriodSection = () => {
    return (
      <AppModalSelectItem
        visible={visibleTimePeriod}
          onClose={() => {setVisibleTimePeriod(false)}}
          onSelectItem={(item: any) => {
            setSelectTimePeriod(item);
            setSelectYear('');
            setSelectMonth('');
            setSelectDay('');
            setTimePeriodData(false);
          }}
          title={Trans('chooseTimePeriod')}
          data={DUMMY_DATA.TIMING}
          itemSelected={selectTimePeriod}
          multiSelect={false}
      />
    )
  };

  const modalYearSection = () => {
    return (
      <AppModalSelectItem
        visible={visibleYear}
          onClose={() => {setVisibleYear(false)}}
          onSelectItem={(item: any) => {setSelectYear(item); setTimeFirstData(false)}}
          title={Trans('chooseYear')}
          data={DUMMY_DATA.YEARS}
          itemSelected={selectYear}
          multiSelect={false}
      />
    )
  };

  const calendarMonthSection = () => {
    return (
      <AppModalCalendar
        visible={visibleMonth}
        onClose={() => setVisibleMonth(false)}
        onMonth={(item: any) => {setSelectMonth(item); setVisibleMonth(false); setTimeFirstData(false)}}
        initialView='months'
        buttons={false}
      />
    )
  };

  const calendarDaySection = () => {
    return (
      <AppModalCalendar
        visible={visibleDay}
        onClose={() => setVisibleDay(false)}
        onSave={(item: any) => {setSelectDay(item); setVisibleDay(false); setTimeFirstData(false)}}
        buttons={false}
      />
    )
  };

  const loadingSection = () => {
    return (
      <AppLoading
        margin_top={calcHeight(440)}
        size={'large'}
        visible={statisticsLoader}
      />
    )
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'}/>
      {loadingSection()}
      {headerSection()}
      {bodySection()}
      {modalTimePeriodSection()}
      {modalYearSection()}
      {calendarMonthSection()}
      {calendarDaySection()}
    </View>
  );
};

export default Home;