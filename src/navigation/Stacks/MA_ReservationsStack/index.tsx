import * as React from 'react';
import {MA_ReservationsStackParam} from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reservations from '../../../screens/users/makeup_artistScreens/reservationsScreens/Reservations';

const MA_Reservations_Stack = createNativeStackNavigator<MA_ReservationsStackParam>();
const MA_ReservationsStack: React.FC = () => (
  <MA_Reservations_Stack.Navigator
    initialRouteName="MA_Reservations"
    screenOptions={{
      headerShown: false,
    }}
    >
    <MA_Reservations_Stack.Screen name="MA_Reservations" component={Reservations} />
  </MA_Reservations_Stack.Navigator>
);

export default MA_ReservationsStack;
