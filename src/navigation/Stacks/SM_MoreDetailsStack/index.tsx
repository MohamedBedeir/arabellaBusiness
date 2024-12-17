import * as React from 'react';
import { SM_MoreDetailsStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../../screens/users/stock_managerScreens/moreScreens/Profile';
import Language from '../../../screens/users/stock_managerScreens/moreScreens/Language';
import { TermsAndConditions } from '../../../screens/users/stock_managerScreens/moreScreens/TermsAndConditions';

const SM_MoreDetails_Stack = createNativeStackNavigator<SM_MoreDetailsStackParam>();
const SM_MoreDetailsStack: React.FC = () => (
  <SM_MoreDetails_Stack.Navigator
    initialRouteName="SM_Profile"
    screenOptions={{
      headerShown: false,
    }}
  >
    <SM_MoreDetails_Stack.Screen name="SM_Profile" component={Profile} />
    <SM_MoreDetails_Stack.Screen name="SM_Language" component={Language} />
    <SM_MoreDetails_Stack.Screen name="SM_TermsAndConditions" component={TermsAndConditions} />
  </SM_MoreDetails_Stack.Navigator>
);

export default SM_MoreDetailsStack;
