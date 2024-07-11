import * as React from 'react';
import {MA_MoreDetailsStackParam} from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import More from '../../../screens/users/makeup_artistScreens/moreScreens/More';
import Profile from '../../../screens/users/makeup_artistScreens/moreScreens/Profile';
import Language from '../../../screens/users/makeup_artistScreens/moreScreens/Language';
import BlockAppointments from '../../../screens/users/makeup_artistScreens/moreScreens/BlockAppointments';
import AvailableServices from '../../../screens/users/makeup_artistScreens/moreScreens/AvailableServices';

const MA_MoreDetails_Stack = createNativeStackNavigator<MA_MoreDetailsStackParam>();
const MA_MoreDetailsStack: React.FC = () => (
  <MA_MoreDetails_Stack.Navigator
    initialRouteName="MA_Profile"
    screenOptions={{
      headerShown: false,
    }}
  >
    <MA_MoreDetails_Stack.Screen name="MA_Profile" component={Profile} />
    <MA_MoreDetails_Stack.Screen name="MA_AvailableServices" component={AvailableServices} />
    <MA_MoreDetails_Stack.Screen name="MA_BlockAppointments" component={BlockAppointments} />
    <MA_MoreDetails_Stack.Screen name="MA_Language" component={Language} />
  </MA_MoreDetails_Stack.Navigator>
);

export default MA_MoreDetailsStack;
