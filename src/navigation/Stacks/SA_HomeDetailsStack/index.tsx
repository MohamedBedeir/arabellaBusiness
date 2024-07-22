import * as React from 'react';
import { SA_HomeDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notifications from '../../../screens/users/salonScreens/homeScreens/Notifications';

const SA_HomeDetails_Stack = createNativeStackNavigator<SA_HomeDetailsStackParam>();
const SA_HomeDetailsStack: React.FC = () => (
  <SA_HomeDetails_Stack.Navigator
    initialRouteName="SA_Notifications"
    screenOptions={{
      headerShown: false,
    }}
  >
    <SA_HomeDetails_Stack.Screen name="SA_Notifications" component={Notifications} />
  </SA_HomeDetails_Stack.Navigator>
);

export default SA_HomeDetailsStack;
