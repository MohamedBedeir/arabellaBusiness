import * as React from 'react';
import { SA_HomeStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../../screens/users/salonScreens/homeScreens/Home';

const SA_Home_Stack = createNativeStackNavigator<SA_HomeStackParam>();
const SA_HomeStack: React.FC = () => (
  <SA_Home_Stack.Navigator
    initialRouteName="SA_Home"
    screenOptions={{
      headerShown: false,
    }}
    >
    <SA_Home_Stack.Screen name="SA_Home" component={Home} />
  </SA_Home_Stack.Navigator>
);

export default SA_HomeStack;
