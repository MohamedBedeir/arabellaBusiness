import * as React from 'react';
import { SM_HomeDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notifications from '../../../screens/users/stock_managerScreens/homeScreens/Notifications';

const SM_HomeDetails_Stack = createNativeStackNavigator<SM_HomeDetailsStackParam>();
const SM_HomeDetailsStack: React.FC = () => (
  <SM_HomeDetails_Stack.Navigator
    initialRouteName="SM_Notifications"
    screenOptions={{
      headerShown: false,
    }}
  >
    <SM_HomeDetails_Stack.Screen name="SM_Notifications" component={Notifications} />
  </SM_HomeDetails_Stack.Navigator>
);

export default SM_HomeDetailsStack;
