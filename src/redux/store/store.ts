import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import authSlice from './auth/authenticationSlice';
import servicesSlice from './services/servicesSlice';
import slotsSlice from './slots/slotsSlice';
import appointments_upcomingSlice from './appointments_upcoming/appointments_upcomingSlice';
import appointments_PerviousSlice from './appointments_pervious/appointments_perviousSlice';
import appointment_detailsSlice from './appointment_details/appointment_detailsSlice';
import appointment_timerSlice from './appointment_timer/appointment_timer';
import statisticsSlice from './statistics/statisticsSlice';
import profileSlice from './profile/profileSlice';
import categoriesSlice from './general/categories';
import notificationsSlice from './notifications/notificationsSlice';
import employeesSlice from './employees/employeesSlice';
import citiesSlice from './general/cities';
import branchesSlice from './branches/branchesSlice';
import appVersionsSlice from './general/appVersions';

export const store = configureStore({
  reducer: {
    appVersion: appVersionsSlice,
    auth: authSlice,
    profile: profileSlice,
    categories: categoriesSlice,
    services: servicesSlice,
    slots: slotsSlice,
    appointments_upcoming: appointments_upcomingSlice,
    appointments_pervious: appointments_PerviousSlice,
    appointment_details: appointment_detailsSlice,
    appointment_timer: appointment_timerSlice,
    statistics: statisticsSlice,
    notifications: notificationsSlice,
    employees: employeesSlice,
    cities: citiesSlice,
    branches: branchesSlice,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
