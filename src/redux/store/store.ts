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
import orders_upcomingSlice from './orders_upcoming/orders_upcomingSlice';
import orders_perviousSlice from './orders_pervious/orders_perviousSlice';
import orders_cancelledSlice from './orders_cancelled/orders_cancelledSlice';
import order_detailsSlice from './order_details/order_detailsSlice';
import order_updateSlice from './order_update/order_update';

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
    orders_upcoming: orders_upcomingSlice,
    orders_pervious: orders_perviousSlice,
    orders_cancelled: orders_cancelledSlice,
    order_details: order_detailsSlice,
    order_update: order_updateSlice,
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
