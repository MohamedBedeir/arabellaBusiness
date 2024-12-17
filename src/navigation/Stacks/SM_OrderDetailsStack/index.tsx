import * as React from 'react';
import { SM_OrderDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderDetails from '../../../screens/users/stock_managerScreens/ordersScreens/OrderDetails';

const SM_OrderDetails_Stack = createNativeStackNavigator<SM_OrderDetailsStackParam>();
const SM_OrderDetailsStack: React.FC = (route: any) => (
  <SM_OrderDetails_Stack.Navigator
    initialRouteName="SM_OrderDetails"
    screenOptions={{
      headerShown: false,
    }}
  >
    <SM_OrderDetails_Stack.Screen name="SM_OrderDetails" component={OrderDetails} initialParams={route.route.params}/>
  </SM_OrderDetails_Stack.Navigator>
);

export default SM_OrderDetailsStack;
