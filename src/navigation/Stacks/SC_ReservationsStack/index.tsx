import * as React from 'react';
import { SC_ReservationsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reservations from '../../../screens/users/sports_clubScreens/reservationsScreens/Reservations';


const SC_Reservations_Stack = createNativeStackNavigator<SC_ReservationsStackParam>();
const SC_ReservationsStack: React.FC = () => (
  <SC_Reservations_Stack.Navigator
    initialRouteName="SC_Reservations"
    screenOptions={{
      headerShown: false,
    }}
    >
    <SC_Reservations_Stack.Screen name="SC_Reservations" component={Reservations} />
  </SC_Reservations_Stack.Navigator>
);

export default SC_ReservationsStack;
