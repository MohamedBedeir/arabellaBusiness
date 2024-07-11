import React from 'react';
import { Image, ScrollView, StatusBar, Text, View } from 'react-native';
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
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import AppDataLine from '../../../../../components/AppDataLine';

const Home: React.FC = () => {
  const navigation = useNavigation<any>();

  const searchSection = () => {
    return (
      <View style={styles.searchContainer}>
        <SearchByDate
          onPress={() => console.log('--- from')}
          containerStyle={{}}
          title={Trans('from')}
          dateColor={COLORS.textLight}
        />
        <SearchByDate
          onPress={() => console.log('--- to')}
          containerStyle={{}}
          title={Trans('to')}
          dateColor={COLORS.textLight}
        />
        <AppButtonDefault
          onPress={() => console.log('---')}
          colorStart={COLORS.primaryGradient}
          colorEnd={COLORS.secondGradient}
          icon={IMAGES.search}
          buttonStyle={styles.searchButton}
        />
      </View>
    )
  };
  
  const chart1Section = () => {
    const data = [
      {value: 80, frontColor: COLORS.secondGradient, gradientColor: COLORS.primaryGradient, spacing: 6, label: Trans('saturday')},
      {value: 30, frontColor: COLORS.borderLight, gradientColor: COLORS.borderLight},
  
      {value: 70, frontColor: COLORS.secondGradient, gradientColor: COLORS.primaryGradient, spacing: 6, label: Trans('sunday')},
      {value: 40, frontColor: COLORS.borderLight, gradientColor: COLORS.borderLight},
  
      {value: 95, frontColor: COLORS.secondGradient, gradientColor: COLORS.primaryGradient, spacing: 6, label: Trans('monday')},
      {value: 20, frontColor: COLORS.borderLight, gradientColor: COLORS.borderLight},
  
      {value: 82, frontColor: COLORS.secondGradient, gradientColor: COLORS.primaryGradient, spacing: 6, label: Trans('tuesday')},
      {value: 49, frontColor: COLORS.borderLight, gradientColor: COLORS.borderLight},
  
      {value: 60, frontColor: COLORS.secondGradient, gradientColor: COLORS.primaryGradient, spacing: 6, label: Trans('wednesday')},
      {value: 38, frontColor: COLORS.borderLight, gradientColor: COLORS.borderLight},
  
      {value: 87, frontColor: COLORS.secondGradient, gradientColor: COLORS.primaryGradient, spacing: 6, label: Trans('thursday')},
      {value: 29, frontColor: COLORS.borderLight, gradientColor: COLORS.borderLight},
  
      {value: 77, frontColor: COLORS.secondGradient, gradientColor: COLORS.primaryGradient, spacing: 6, label: Trans('friday')},
      {value: 38, frontColor: COLORS.borderLight, gradientColor: COLORS.borderLight},
    ];

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
          <AppButtonDefault
            title={Trans('daily')}
            onPress={() => console.log('---')}
            colorStart={COLORS.primaryGradient}
            colorEnd={COLORS.secondGradient}
            icon={IMAGES.openCircleWhite}
            buttonStyle={{width: calcWidth(105), height: calcHeight(40)}}
          />
        </View>
        <View style={styles.chart1ChartContainer}>
          {/* <Image source={IMAGES.chartImage} style={styles.chartImage}/> */}
          <BarChart
            data={data}
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
            stepValue={20}
            maxValue={100}
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
              title={Trans('totalConfirmedReservations')}
              fontSize={calcFont(14)}
              fontFamily={FONTS.medium}
              textColor={COLORS.textDark}
              textAlign={'left'}
              
            />
            <AppDataLine
              containerStyle={{width: calcWidth(343 / 2)}}
              image={IMAGES.chartTypeS}
              imageStyle={{width: calcWidth(18), height: calcWidth(18)}}
              title={Trans('totalCancelled')}
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
    const d1 = [
      {value: 630, label: Trans('saturday'), showXAxisIndex: true},
      {value: 330, label: Trans('sunday'), showXAxisIndex: true},
      {value: 800, label: Trans('monday'), showXAxisIndex: true},
      {value: 350, label: Trans('tuesday'), showXAxisIndex: true},
      {value: 200, label: Trans('wednesday'), showXAxisIndex: true},
      {value: 790, label: Trans('thursday'), showXAxisIndex: true},
      {value: 280, label: Trans('friday'), showXAxisIndex: true},
    ];
    const d3 = [
      {value: 550, label: Trans('saturday'), showXAxisIndex: true},
      {value: 450, label: Trans('sunday'), showXAxisIndex: true},
      {value: 250, label: Trans('monday'), showXAxisIndex: true},
      {value: 470, label: Trans('tuesday'), showXAxisIndex: true},
      {value: 930, label: Trans('wednesday'), showXAxisIndex: true},
      {value: 470, label: Trans('thursday'), showXAxisIndex: true},
      {value: 350, label: Trans('friday'), showXAxisIndex: true},
    ];
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
          <AppButtonDefault
            title={Trans('daily')}
            onPress={() => console.log('---')}
            colorStart={COLORS.primaryGradient}
            colorEnd={COLORS.secondGradient}
            icon={IMAGES.openCircleWhite}
            buttonStyle={{width: calcWidth(105), height: calcHeight(40)}}
          />
        </View>
        <View style={styles.chart1ChartContainer}>
          <LineChart
            data={d1}
            data2={d3}
            maxValue={1000}
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
              title={Trans('totalAmountsReceived')}
              fontSize={calcFont(14)}
              fontFamily={FONTS.medium}
              textColor={COLORS.textDark}
              textAlign={'left'}
              
            />
            <AppDataLine
              containerStyle={{width: calcWidth(343 / 2)}}
              image={IMAGES.chartTypeS}
              imageStyle={{width: calcWidth(18), height: calcWidth(18)}}
              title={Trans('totalAmountsOutstanding')}
              fontSize={calcFont(14)}
              fontFamily={FONTS.medium}
              textColor={COLORS.textDark}
              textAlign={'left'}
              
            />
        </View>
      </View>
    )
  };

  const calculationSection = () => {
    return (
      <View>
        <ReservationsReport
          title={Trans('totalBookings')}
          image={IMAGES.reservationTotal}
          count={330}
          duration={Trans('lastWeekAgo')}
          percent={4.5}
          indicatorIcon={IMAGES.reservationTop}
          indicatorColor={COLORS.green}
        />
        <ReservationsReport
          title={Trans('totalPaid')}
          image={IMAGES.reservationPaidUp}
          count={330}
          duration={Trans('lastWeekAgo')}
          percent={4.5}
          indicatorIcon={IMAGES.reservationDown}
          indicatorColor={COLORS.red}
        />
        <ReservationsReport
          title={Trans('totalUnpaid')}
          image={IMAGES.reservationUnpaid}
          count={330}
          duration={Trans('lastWeekAgo')}
          percent={4.5}
          indicatorIcon={IMAGES.reservationDown}
          indicatorColor={COLORS.red}
        />
        <ReservationsReport
          title={Trans('totalCancelled')}
          image={IMAGES.reservationCanceled}
          count={330}
          duration={Trans('lastWeekAgo')}
          percent={4.5}
          indicatorIcon={IMAGES.reservationTop}
          indicatorColor={COLORS.green}
        />
      </View>
    )
  };

  // const data=[ {value:50}, {value:80}, {value:90}, {value:70}, {value:90} ]
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'}/>
      <AppHeaderAdvanced
        onPress={() => navigation.navigate('MA_HomeDetailsStack', {screen: 'MA_Notifications'})}
      />
      {searchSection()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {calculationSection()}
        {chart1Section()}
        {chart2Section()}
      </ScrollView>
      {/* <LineChart data = {data} /> */}
      {/* <LineChart data = {data} /> */}
      {/* <PieChart data = {data} /> */}
      {/* <PopulationPyramid data = {[{left:10,right:12}, {left:9,right:8}]} /> */}



      {/* <BarChart data = {data} horizontal /> */}



      {/* <LineChart data = {data} areaChart /> */}



      {/* <PieChart data = {data} donut /> */}

    </View>
  );
};

export default Home;