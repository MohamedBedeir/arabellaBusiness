import * as React from 'react';
import { SC_MoreDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TermsAndConditions } from '../../../screens/users/trainingScreens/moreScreens/TermsAndConditions';
import Language from '../../../screens/users/sports_clubScreens/moreScreens/Language';
import BlockAppointments from '../../../screens/users/sports_clubScreens/moreScreens/BlockAppointments';
import Services from '../../../screens/users/sports_clubScreens/moreScreens/Services';
import Profile from '../../../screens/users/sports_clubScreens/moreScreens/Profile';

const SC_MoreDetails_Stack = createNativeStackNavigator<SC_MoreDetailsStackParam>();
const SC_MoreDetailsStack: React.FC = () => (
  <SC_MoreDetails_Stack.Navigator
    initialRouteName="SC_Profile"
    screenOptions={{
      headerShown: false,
    }}
  >
    <SC_MoreDetails_Stack.Screen name="SC_Profile" component={Profile} />
    <SC_MoreDetails_Stack.Screen name="SC_Services" component={Services} />
    <SC_MoreDetails_Stack.Screen name="SC_BlockAppointments" component={BlockAppointments} />
    <SC_MoreDetails_Stack.Screen name="SC_Language" component={Language} />
    <SC_MoreDetails_Stack.Screen name="SC_TermsAndConditions" component={TermsAndConditions} />
  </SC_MoreDetails_Stack.Navigator>
);

export default SC_MoreDetailsStack;
