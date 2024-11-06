import * as React from 'react';
import { SC_HomeDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notifications from '../../../screens/users/trainingScreens/homeScreens/Notifications';

const SC_HomeDetails_Stack = createNativeStackNavigator<SC_HomeDetailsStackParam>();
const SC_HomeDetailsStack: React.FC = () => (
  <SC_HomeDetails_Stack.Navigator
    initialRouteName="SC_Notifications"
    screenOptions={{
      headerShown: false,
    }}
  >
    <SC_HomeDetails_Stack.Screen name="SC_Notifications" component={Notifications} />
  </SC_HomeDetails_Stack.Navigator>
);

export default SC_HomeDetailsStack;
