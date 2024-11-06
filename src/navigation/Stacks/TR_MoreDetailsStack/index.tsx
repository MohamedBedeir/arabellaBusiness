import * as React from 'react';
import { TR_MoreDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../../screens/users/trainingScreens/moreScreens/Profile';
import Services from '../../../screens/users/trainingScreens/moreScreens/Services';
import BlockAppointments from '../../../screens/users/trainingScreens/moreScreens/BlockAppointments';
import Language from '../../../screens/users/trainingScreens/moreScreens/Language';
import { TermsAndConditions } from '../../../screens/users/trainingScreens/moreScreens/TermsAndConditions';

const TR_MoreDetails_Stack = createNativeStackNavigator<TR_MoreDetailsStackParam>();
const TR_MoreDetailsStack: React.FC = () => (
  <TR_MoreDetails_Stack.Navigator
    initialRouteName="TR_Profile"
    screenOptions={{
      headerShown: false,
    }}
  >
    <TR_MoreDetails_Stack.Screen name="TR_Profile" component={Profile} />
    <TR_MoreDetails_Stack.Screen name="TR_Services" component={Services} />
    <TR_MoreDetails_Stack.Screen name="TR_BlockAppointments" component={BlockAppointments} />
    <TR_MoreDetails_Stack.Screen name="TR_Language" component={Language} />
    <TR_MoreDetails_Stack.Screen name="TR_TermsAndConditions" component={TermsAndConditions} />
  </TR_MoreDetails_Stack.Navigator>
);

export default TR_MoreDetailsStack;
