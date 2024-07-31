import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import authSlice from './auth/authenticationSlice';
import servicesSlice from './services/servicesSlice';
import slotsSlice from './slots/slotsSlice';
import appointments_upcomingSlice from './appointments_upcoming/appointments_upcomingSlice';
import appointments_PerviousSlice from './appointments_pervious/appointments_perviousSlice';
import appointment_detailsSlice from './appointment_details/appointment_detailsSlice';
import statisticsSlice from './statistics/statisticsSlice';
import profileSlice from './profile/profileSlice';
import categoriesSlice from './general/categories';
import notificationsSlice from './notifications/notificationsSlice';
import employeesSlice from './employees/employeesSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    categories: categoriesSlice,
    services: servicesSlice,
    slots: slotsSlice,
    appointments_upcoming: appointments_upcomingSlice,
    appointments_pervious: appointments_PerviousSlice,
    appointment_details: appointment_detailsSlice,
    statistics: statisticsSlice,
    notifications: notificationsSlice,
    employees: employeesSlice,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
