import * as React from 'react';
import { SA_MoreStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import More from '../../../screens/users/salonScreens/moreScreens/More';

const SA_More_Stack = createNativeStackNavigator<SA_MoreStackParam>();
const SA_MoreStack: React.FC = () => (
  <SA_More_Stack.Navigator
    initialRouteName="SA_More"
    screenOptions={{
      headerShown: false,
    }}
    >
    <SA_More_Stack.Screen name="SA_More" component={More} />
  </SA_More_Stack.Navigator>
);

export default SA_MoreStack;
