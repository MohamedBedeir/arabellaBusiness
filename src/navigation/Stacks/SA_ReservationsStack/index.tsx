import * as React from 'react';
import { SA_ReservationsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reservations from '../../../screens/users/salonScreens/reservationsScreens/Reservations';

const SA_Reservations_Stack = createNativeStackNavigator<SA_ReservationsStackParam>();
const SA_ReservationsStack: React.FC = () => (
  <SA_Reservations_Stack.Navigator
    initialRouteName="SA_Reservations"
    screenOptions={{
      headerShown: false,
    }}
    >
    <SA_Reservations_Stack.Screen name="SA_Reservations" component={Reservations} />
  </SA_Reservations_Stack.Navigator>
);

export default SA_ReservationsStack;
