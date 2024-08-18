import * as React from 'react';
import {MA_MoreDetailsStackParam} from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../../screens/users/makeup_artistScreens/moreScreens/Profile';
import Language from '../../../screens/users/makeup_artistScreens/moreScreens/Language';
import BlockAppointments from '../../../screens/users/makeup_artistScreens/moreScreens/BlockAppointments';
import Services from '../../../screens/users/makeup_artistScreens/moreScreens/Services';
import { TermsAndConditions } from '../../../screens/users/makeup_artistScreens/moreScreens/TermsAndConditions';

const MA_MoreDetails_Stack = createNativeStackNavigator<MA_MoreDetailsStackParam>();
const MA_MoreDetailsStack: React.FC = () => (
  <MA_MoreDetails_Stack.Navigator
    initialRouteName="MA_Profile"
    screenOptions={{
      headerShown: false,
    }}
  >
    <MA_MoreDetails_Stack.Screen name="MA_Profile" component={Profile} />
    <MA_MoreDetails_Stack.Screen name="MA_Services" component={Services} />
    <MA_MoreDetails_Stack.Screen name="MA_BlockAppointments" component={BlockAppointments} />
    <MA_MoreDetails_Stack.Screen name="MA_Language" component={Language} />
    <MA_MoreDetails_Stack.Screen name="MA_TermsAndConditions" component={TermsAndConditions} options={{headerShown: false}} />
  </MA_MoreDetails_Stack.Navigator>
);

export default MA_MoreDetailsStack;
