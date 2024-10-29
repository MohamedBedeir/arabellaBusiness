import * as React from 'react';
import { TR_HomeDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notifications from '../../../screens/users/trainingScreens/homeScreens/Notifications';

const TR_HomeDetails_Stack = createNativeStackNavigator<TR_HomeDetailsStackParam>();
const TR_HomeDetailsStack: React.FC = () => (
  <TR_HomeDetails_Stack.Navigator
    initialRouteName="TR_Notifications"
    screenOptions={{
      headerShown: false,
    }}
  >
    <TR_HomeDetails_Stack.Screen name="TR_Notifications" component={Notifications} />
  </TR_HomeDetails_Stack.Navigator>
);

export default TR_HomeDetailsStack;
