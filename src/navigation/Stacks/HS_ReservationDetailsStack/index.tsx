import * as React from 'react';
import { HS_ReservationDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reservations from '../../../screens/users/makeup_artistScreens/reservationsScreens/Reservations';
import ReservationDetails from '../../../screens/users/makeup_artistScreens/reservationsScreens/ReservationDetails';

const HS_ReservationDetails_Stack = createNativeStackNavigator<HS_ReservationDetailsStackParam>();
const HS_ReservationDetailsStack: React.FC = (route: any) => (
  <HS_ReservationDetails_Stack.Navigator
    initialRouteName="HS_ReservationDetails"
    screenOptions={{
      headerShown: false,
    }}
    >
    <HS_ReservationDetails_Stack.Screen name="HS_ReservationDetails" component={ReservationDetails} initialParams={route.route.params}/>
  </HS_ReservationDetails_Stack.Navigator>
);

export default HS_ReservationDetailsStack;
