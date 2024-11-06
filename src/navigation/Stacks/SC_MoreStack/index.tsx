import * as React from 'react';
import { SC_MoreStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import More from '../../../screens/users/sports_clubScreens/moreScreens/More';

const SC_More_Stack = createNativeStackNavigator<SC_MoreStackParam>();
const SC_MoreStack: React.FC = () => (
  <SC_More_Stack.Navigator
    initialRouteName="SC_More"
    screenOptions={{
      headerShown: false,
    }}
    >
    <SC_More_Stack.Screen name="SC_More" component={More} />
  </SC_More_Stack.Navigator>
);

export default SC_MoreStack;
