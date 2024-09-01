import * as React from 'react';
import { MA_ReservationDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReservationDetails from '../../../screens/users/makeup_artistScreens/reservationsScreens/ReservationDetails';

const MA_ReservationDetails_Stack = createNativeStackNavigator<MA_ReservationDetailsStackParam>();
const MA_ReservationDetailsStack: React.FC = (route: any) => (
  <MA_ReservationDetails_Stack.Navigator
    initialRouteName="MA_ReservationDetails"
    screenOptions={{
      headerShown: false,
    }}
    >
    <MA_ReservationDetails_Stack.Screen name="MA_ReservationDetails" component={ReservationDetails} initialParams={route.route.params}/>
  </MA_ReservationDetails_Stack.Navigator>
);

export default MA_ReservationDetailsStack;
