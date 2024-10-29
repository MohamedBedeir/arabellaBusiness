import * as React from 'react';
import { TR_MoreStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import More from '../../../screens/users/trainingScreens/moreScreens/More';

const TR_More_Stack = createNativeStackNavigator<TR_MoreStackParam>();
const TR_MoreStack: React.FC = () => (
  <TR_More_Stack.Navigator
    initialRouteName="TR_More"
    screenOptions={{
      headerShown: false,
    }}
    >
    <TR_More_Stack.Screen name="TR_More" component={More} />
  </TR_More_Stack.Navigator>
);

export default TR_MoreStack;
