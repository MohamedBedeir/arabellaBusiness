import * as React from 'react';
import { SA_MoreDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../../screens/users/salonScreens/moreScreens/Profile';
import Branches from '../../../screens/users/salonScreens/moreScreens/Branches';
import Employees from '../../../screens/users/salonScreens/moreScreens/Employees';
import Services from '../../../screens/users/salonScreens/moreScreens/Services';
import Offers from '../../../screens/users/salonScreens/moreScreens/Offers';
import Coupons from '../../../screens/users/salonScreens/moreScreens/Coupons';
import Tickets from '../../../screens/users/salonScreens/moreScreens/Tickets';
import BlockAppointments from '../../../screens/users/salonScreens/moreScreens/BlockAppointments';
import Accounts from '../../../screens/users/salonScreens/moreScreens/Accounts';
import Ratings from '../../../screens/users/salonScreens/moreScreens/Ratings';
import Language from '../../../screens/users/salonScreens/moreScreens/Language';
import TermsAndConditions from '../../../screens/users/salonScreens/moreScreens/TermsAndConditions';

const SA_MoreDetails_Stack = createNativeStackNavigator<SA_MoreDetailsStackParam>();
const SA_MoreDetailsStack: React.FC = () => (
  <SA_MoreDetails_Stack.Navigator
    initialRouteName="SA_Profile"
    screenOptions={{
      headerShown: false,
    }}
  >
    <SA_MoreDetails_Stack.Screen name="SA_Profile" component={Profile} />
    <SA_MoreDetails_Stack.Screen name="SA_Branches" component={Branches}/>
    <SA_MoreDetails_Stack.Screen name="SA_Employees" component={Employees} />
    <SA_MoreDetails_Stack.Screen name="SA_Services" component={Services} />
    <SA_MoreDetails_Stack.Screen name="SA_Offers" component={Offers} />
    <SA_MoreDetails_Stack.Screen name="SA_Coupons" component={Coupons} />
    <SA_MoreDetails_Stack.Screen name="SA_Tickets" component={Tickets} />
    <SA_MoreDetails_Stack.Screen name="SA_BlockAppointments" component={BlockAppointments} />
    <SA_MoreDetails_Stack.Screen name="SA_Accounts" component={Accounts} />
    <SA_MoreDetails_Stack.Screen name="SA_Language" component={Language} />
    <SA_MoreDetails_Stack.Screen name="SA_Ratings" component={Ratings} />
    <SA_MoreDetails_Stack.Screen name="SA_TermsAndConditions" component={TermsAndConditions} />
  </SA_MoreDetails_Stack.Navigator>
);

export default SA_MoreDetailsStack;
