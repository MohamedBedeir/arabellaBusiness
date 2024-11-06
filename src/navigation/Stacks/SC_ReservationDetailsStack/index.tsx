import * as React from 'react';
import { SC_ReservationDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReservationDetails from '../../../screens/users/sports_clubScreens/reservationsScreens/ReservationDetails';

const SC_ReservationDetails_Stack = createNativeStackNavigator<SC_ReservationDetailsStackParam>();
const SC_ReservationDetailsStack: React.FC = (route: any) => (
  <SC_ReservationDetails_Stack.Navigator
    initialRouteName="SC_ReservationDetails"
    screenOptions={{
      headerShown: false,
    }}
  >
    <SC_ReservationDetails_Stack.Screen name="SC_ReservationDetails" component={ReservationDetails} initialParams={route.route.params}/>
  </SC_ReservationDetails_Stack.Navigator>
);

export default SC_ReservationDetailsStack;
