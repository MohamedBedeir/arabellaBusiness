import * as React from 'react';
import { MA_ReservationDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reservations from '../../../screens/users/makeup_artistScreens/reservationsScreens/Reservations';
import ReservationDetails from '../../../screens/users/makeup_artistScreens/reservationsScreens/ReservationDetails';

const MA_ReservationDetails_Stack = createNativeStackNavigator<MA_ReservationDetailsStackParam>();
const MA_ReservationDetailsStack: React.FC = () => (
  <MA_ReservationDetails_Stack.Navigator
    initialRouteName="MA_ReservationDetails"
    screenOptions={{
      headerShown: false,
    }}
    >
    <MA_ReservationDetails_Stack.Screen name="MA_ReservationDetails" component={ReservationDetails} />
  </MA_ReservationDetails_Stack.Navigator>
);

export default MA_ReservationDetailsStack;
