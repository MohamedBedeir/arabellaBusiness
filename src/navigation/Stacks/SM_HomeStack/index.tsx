import * as React from 'react';
import { SM_HomeStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../../screens/users/stock_managerScreens/homeScreens/Home';

const SM_Home_Stack = createNativeStackNavigator<SM_HomeStackParam>();
const SM_HomeStack: React.FC = () => (
  <SM_Home_Stack.Navigator
    initialRouteName="SM_Home"
    screenOptions={{
      headerShown: false,
    }}
    >
    <SM_Home_Stack.Screen name="SM_Home" component={Home} />
  </SM_Home_Stack.Navigator>
);

export default SM_HomeStack;
