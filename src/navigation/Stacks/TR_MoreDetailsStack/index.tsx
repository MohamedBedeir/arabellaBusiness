import * as React from 'react';
import { TR_MoreDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../../screens/users/trainingScreens/moreScreens/Profile';
import Branches from '../../../screens/users/trainingScreens/moreScreens/Branches';
import Employees from '../../../screens/users/trainingScreens/moreScreens/Employees';
import Services from '../../../screens/users/trainingScreens/moreScreens/Services';
import Offers from '../../../screens/users/trainingScreens/moreScreens/Offers';
import Coupons from '../../../screens/users/trainingScreens/moreScreens/Coupons';
import Tickets from '../../../screens/users/trainingScreens/moreScreens/Tickets';
import BlockAppointments from '../../../screens/users/trainingScreens/moreScreens/BlockAppointments';
import Accounts from '../../../screens/users/trainingScreens/moreScreens/Accounts';
import Ratings from '../../../screens/users/trainingScreens/moreScreens/Ratings';
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
    <TR_MoreDetails_Stack.Screen name="TR_Branches" component={Branches}/>
    <TR_MoreDetails_Stack.Screen name="TR_Employees" component={Employees} />
    <TR_MoreDetails_Stack.Screen name="TR_Services" component={Services} />
    <TR_MoreDetails_Stack.Screen name="TR_Offers" component={Offers} />
    <TR_MoreDetails_Stack.Screen name="TR_Coupons" component={Coupons} />
    <TR_MoreDetails_Stack.Screen name="TR_Tickets" component={Tickets} />
    <TR_MoreDetails_Stack.Screen name="TR_BlockAppointments" component={BlockAppointments} />
    <TR_MoreDetails_Stack.Screen name="TR_Accounts" component={Accounts} />
    <TR_MoreDetails_Stack.Screen name="TR_Language" component={Language} />
    <TR_MoreDetails_Stack.Screen name="TR_Ratings" component={Ratings} />
    <TR_MoreDetails_Stack.Screen name="TR_TermsAndConditions" component={TermsAndConditions} />
  </TR_MoreDetails_Stack.Navigator>
);

export default TR_MoreDetailsStack;
