import * as React from 'react';
import { HS_ReservationsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reservations from '../../../screens/users/home_serviceScreens/reservationsScreens/Reservations';

const HS_Reservations_Stack = createNativeStackNavigator<HS_ReservationsStackParam>();
const HS_ReservationsStack: React.FC = () => (
  <HS_Reservations_Stack.Navigator
    initialRouteName="HS_Reservations"
    screenOptions={{
      headerShown: false,
    }}
  >
    <HS_Reservations_Stack.Screen name="HS_Reservations" component={Reservations} />
  </HS_Reservations_Stack.Navigator>
);

export default HS_ReservationsStack;
