import * as React from 'react';
import { HS_MoreStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import More from '../../../screens/users/home_serviceScreens/moreScreens/More';

const HS_More_Stack = createNativeStackNavigator<HS_MoreStackParam>();
const HS_MoreStack: React.FC = () => (
  <HS_More_Stack.Navigator
    initialRouteName="HS_More"
    screenOptions={{
      headerShown: false,
    }}
    >
    <HS_More_Stack.Screen name="HS_More" component={More} />
  </HS_More_Stack.Navigator>
);

export default HS_MoreStack;
