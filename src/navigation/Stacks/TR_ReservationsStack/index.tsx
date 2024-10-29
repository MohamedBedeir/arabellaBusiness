import * as React from 'react';
import { TR_ReservationsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reservations from '../../../screens/users/trainingScreens/reservationsScreens/Reservations';

const TR_Reservations_Stack = createNativeStackNavigator<TR_ReservationsStackParam>();
const TR_ReservationsStack: React.FC = () => (
  <TR_Reservations_Stack.Navigator
    initialRouteName="TR_Reservations"
    screenOptions={{
      headerShown: false,
    }}
    >
    <TR_Reservations_Stack.Screen name="TR_Reservations" component={Reservations} />
  </TR_Reservations_Stack.Navigator>
);

export default TR_ReservationsStack;
