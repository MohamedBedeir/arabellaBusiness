import {createAsyncThunk} from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import {client} from '../../network/apiClient';
import { setStatisticsData, setStatisticsData_Counts, setStatisticsData_TotalAppointments, setStatisticsData_TotalPaidAmount, setStatisticsData_TotalRefundAmount, setStatisticsLoader } from '../../redux/store/statistics/statisticsSlice';
import { COLORS } from '../../utils/theme';
import { I18nManager } from 'react-native';

interface StatisticsData {
  date: any;
  type: string;
};

export const statistics_data = createAsyncThunk(
  'PERVIOUS_DATA',
  async (args: StatisticsData, thunkApi) => {
      thunkApi.dispatch(setStatisticsLoader(true));
      try {
        const response: any = await client.get(`${endpoints.statistics}?fromDate=${args.date}&type=${args.type}`);
        if (response.status == 200 || response.status == 201) {
          const statisticsData = response.data.data;
          var arr1: any = [];
          var arr2: any = [];
          for (let a = 0; a < statisticsData?.series?.paidAppointment.data.length; a++) {
            arr1.push({id: a * 2, value: statisticsData?.series?.paidAppointment.data[a]});
          };
          for (let a = 0; a < statisticsData?.series?.unPaidAppointment.data.length; a++) {
            arr2.push({id: ((a * 2) + 1), value: statisticsData?.series?.unPaidAppointment.data[a]});
          };
        
          var array1: any = [];
          var array2: any = [];
          var array3: any = [];
          const labeles: any = statisticsData?.series?.labels;
          for (let i = 0; i < labeles?.length; i++) {
            array1.push({frontColor: COLORS.secondGradient, gradientColor: COLORS.primaryGradient, spacing: 6, label: I18nManager.isRTL ? labeles[i].labelAr : labeles[i].labelEn});
            array1.push({frontColor: COLORS.borderLight, gradientColor: COLORS.borderLight});
            array2.push({label: I18nManager.isRTL ? labeles[i].labelAr : labeles[i].labelEn, showXAxisIndex: true});
            array3.push({label: I18nManager.isRTL ? labeles[i].labelAr : labeles[i].labelEn, showXAxisIndex: true})
          };
        
          for (let z = 0; z < array1?.length; z++) {
            for (let x = 0; x < arr1?.length; x++) {
              if (z == arr1[x]?.id) {
                array1[z] = {value: arr1[x].value, ...array1[z]}
              }
            };
            for (let y = 0; y < arr2?.length; y++) {
              if (z == arr2[y]?.id) {
                array1[z] = {value: arr2[y].value, ...array1[z]}
              }
            }
          };
        
          for(let w = 0; w < array2?.length; w++) {
            for (let x = 0; x < statisticsData?.series?.totalPaidAmount?.data?.length; x++) {
              if (w == x) {
                array2[w] = {value: statisticsData?.series?.totalPaidAmount?.data[x], ...array2[w]};
              }
            }
          };
        
          for(let w = 0; w < array3?.length; w++) {
            for (let x = 0; x < statisticsData?.series?.totalRefundAmount?.data?.length; x++) {
              if (w == x) {
                array3[w] = {value: statisticsData?.series?.totalRefundAmount?.data[x], ...array3[w]};
              }
            }
          };
          setStatisticsData(response.data.data);
          thunkApi.dispatch(setStatisticsData_TotalAppointments(array1));
          thunkApi.dispatch(setStatisticsData_TotalPaidAmount(array2));
          thunkApi.dispatch(setStatisticsData_TotalRefundAmount(array3));
          const counts = {
            totalAppointments: statisticsData?.totalAppointments,
            totalAmount: statisticsData?.payments?.totalAmount,
            paidAppointments: statisticsData?.paidAppointments,
            totalPaidAmount: statisticsData?.payments?.totalPaidAmount,
            unpaidAppointments: statisticsData?.unpaidAppointments,
            totalRefundAmount: statisticsData?.payments?.totalRefundAmount,
          }
          thunkApi.dispatch(setStatisticsData_Counts(counts));
          thunkApi.dispatch(setStatisticsLoader(false));
        } else {
          thunkApi.dispatch(setStatisticsLoader(false));
        };
      } catch (err) {
        thunkApi.dispatch(setStatisticsLoader(false));
      };
  },
);