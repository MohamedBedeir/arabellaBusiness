import * as React from 'react';
import { TR_ReservationDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReservationDetails from '../../../screens/users/trainingScreens/reservationsScreens/ReservationDetails';

const TR_ReservationDetails_Stack = createNativeStackNavigator<TR_ReservationDetailsStackParam>();
const TR_ReservationDetailsStack: React.FC = (route: any) => (
  <TR_ReservationDetails_Stack.Navigator
    initialRouteName="TR_ReservationDetails"
    screenOptions={{
      headerShown: false,
    }}
  >
    <TR_ReservationDetails_Stack.Screen name="TR_ReservationDetails" component={ReservationDetails} initialParams={route.route.params}/>
  </TR_ReservationDetails_Stack.Navigator>
);

export default TR_ReservationDetailsStack;
