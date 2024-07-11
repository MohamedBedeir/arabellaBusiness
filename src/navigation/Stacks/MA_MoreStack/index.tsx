import * as React from 'react';
import {MA_MoreStackParam} from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import More from '../../../screens/users/makeup_artistScreens/moreScreens/More';

const MA_More_Stack = createNativeStackNavigator<MA_MoreStackParam>();
const MA_MoreStack: React.FC = () => (
  <MA_More_Stack.Navigator
    initialRouteName="MA_More"
    screenOptions={{
      headerShown: false,
    }}
    >
    <MA_More_Stack.Screen name="MA_More" component={More} />
  </MA_More_Stack.Navigator>
);

export default MA_MoreStack;
