import * as React from 'react';
import { MA_HomeDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notifications from '../../../screens/users/makeup_artistScreens/homeScreens/Notifications';

const MA_HomeDetails_Stack = createNativeStackNavigator<MA_HomeDetailsStackParam>();
const MA_HomeDetailsStack: React.FC = () => (
  <MA_HomeDetails_Stack.Navigator
    initialRouteName="MA_Notifications"
    screenOptions={{
      headerShown: false,
    }}
  >
    <MA_HomeDetails_Stack.Screen name="MA_Notifications" component={Notifications} />
  </MA_HomeDetails_Stack.Navigator>
);

export default MA_HomeDetailsStack;
