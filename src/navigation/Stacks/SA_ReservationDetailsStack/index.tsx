import * as React from 'react';
import { SA_ReservationDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReservationDetails from '../../../screens/users/salonScreens/reservationsScreens/ReservationDetails';

const SA_ReservationDetails_Stack = createNativeStackNavigator<SA_ReservationDetailsStackParam>();
const SA_ReservationDetailsStack: React.FC = (route: any) => (
  <SA_ReservationDetails_Stack.Navigator
    initialRouteName="SA_ReservationDetails"
    screenOptions={{
      headerShown: false,
    }}
  >
    <SA_ReservationDetails_Stack.Screen name="SA_ReservationDetails" component={ReservationDetails} initialParams={route.route.params}/>
  </SA_ReservationDetails_Stack.Navigator>
);

export default SA_ReservationDetailsStack;
