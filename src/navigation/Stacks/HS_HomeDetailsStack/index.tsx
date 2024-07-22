import * as React from 'react';
import { HS_HomeDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notifications from '../../../screens/users/home_serviceScreens/homeScreens/Notifications';

const HS_HomeDetails_Stack = createNativeStackNavigator<HS_HomeDetailsStackParam>();
const HS_HomeDetailsStack: React.FC = () => (
  <HS_HomeDetails_Stack.Navigator
    initialRouteName="HS_Notifications"
    screenOptions={{
      headerShown: false,
    }}
  >
    <HS_HomeDetails_Stack.Screen name="HS_Notifications" component={Notifications} />
  </HS_HomeDetails_Stack.Navigator>
);

export default HS_HomeDetailsStack;
