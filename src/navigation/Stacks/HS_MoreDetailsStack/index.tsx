import * as React from 'react';
import { HS_MoreDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../../screens/users/home_serviceScreens/moreScreens/Profile';
import Services from '../../../screens/users/home_serviceScreens/moreScreens/Services';
import BlockAppointments from '../../../screens/users/home_serviceScreens/moreScreens/BlockAppointments';
import Language from '../../../screens/users/home_serviceScreens/moreScreens/Language';
import TermsAndConditions from '../../../screens/users/home_serviceScreens/moreScreens/TermsAndConditions';
import Employees from '../../../screens/users/home_serviceScreens/moreScreens/Employees';


const HS_MoreDetails_Stack = createNativeStackNavigator<HS_MoreDetailsStackParam>();
const HS_MoreDetailsStack: React.FC = () => (
  <HS_MoreDetails_Stack.Navigator
    initialRouteName="HS_Profile"
    screenOptions={{
      headerShown: false,
    }}
  >
    <HS_MoreDetails_Stack.Screen name="HS_Profile" component={Profile} />
    <HS_MoreDetails_Stack.Screen name="HS_Employees" component={Employees} />
    <HS_MoreDetails_Stack.Screen name="HS_Services" component={Services} />
    <HS_MoreDetails_Stack.Screen name="HS_BlockAppointments" component={BlockAppointments} />
    <HS_MoreDetails_Stack.Screen name="HS_Language" component={Language} />
    <HS_MoreDetails_Stack.Screen name="HS_TermsAndConditions" component={TermsAndConditions} />
  </HS_MoreDetails_Stack.Navigator>
);

export default HS_MoreDetailsStack;
