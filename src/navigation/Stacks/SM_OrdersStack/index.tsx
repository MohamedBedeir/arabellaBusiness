import * as React from 'react';
import { SM_OrdersStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orders from '../../../screens/users/stock_managerScreens/ordersScreens/Orders';

const SM_Orders_Stack = createNativeStackNavigator<SM_OrdersStackParam>();
const SM_OrdersStack: React.FC = () => (
  <SM_Orders_Stack.Navigator
    initialRouteName="SM_Orders"
    screenOptions={{
      headerShown: false,
    }}
    >
    <SM_Orders_Stack.Screen name="SM_Orders" component={Orders} />
  </SM_Orders_Stack.Navigator>
);

export default SM_OrdersStack;
