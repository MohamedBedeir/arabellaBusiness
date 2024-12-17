import * as React from 'react';
import { SM_MoreStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import More from '../../../screens/users/stock_managerScreens/moreScreens/More';

const SM_More_Stack = createNativeStackNavigator<SM_MoreStackParam>();
const SM_MoreStack: React.FC = () => (
  <SM_More_Stack.Navigator
    initialRouteName="SM_More"
    screenOptions={{
      headerShown: false,
    }}
    >
    <SM_More_Stack.Screen name="SM_More" component={More} />
  </SM_More_Stack.Navigator>
);

export default SM_MoreStack;
