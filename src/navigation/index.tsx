import React, { useEffect } from 'react';

import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import IntroductionStack from './Stacks/IntroductionStack';
import AuthenticationStack from './Stacks/AuthenticationStack';
import MA_Tabs from './Tabs/MA_Tabs';
import MA_MoreDetailsStack from './Stacks/MA_MoreDetailsStack';
import MA_MoreStack from './Stacks/MA_MoreStack';
import MA_ReservationDetailsStack from './Stacks/MA_ReservationDetailsStack';
import MA_HomeDetailsStack from './Stacks/MA_HomeDetailsStack';
import MA_HomeStack from './Stacks/MA_HomeStack';
import MA_ReservationsStack from './Stacks/MA_ReservationsStack';
import SA_Tabs from './Tabs/SA_Tabs';
import SA_HomeStack from './Stacks/SA_HomeStack';
import SA_MoreStack from './Stacks/SA_MoreStack';
import SA_MoreDetailsStack from './Stacks/SA_MoreDetailsStack';
import SA_HomeDetailsStack from './Stacks/SA_HomeDetailsStack';
import SA_ReservationsStack from './Stacks/SA_ReservationsStack';
import SA_ReservationDetailsStack from './Stacks/SA_ReservationDetailsStack';
import HS_HomeStack from './Stacks/HS_HomeStack';
import HS_HomeDetailsStack from './Stacks/HS_HomeDetailsStack';
import HS_MoreStack from './Stacks/HS_MoreStack';
import HS_MoreDetailsStack from './Stacks/HS_MoreDetailsStack';
import HS_ReservationsStack from './Stacks/HS_ReservationsStack';
import HS_ReservationDetailsStack from './Stacks/HS_ReservationDetailsStack';
import HS_Tabs from './Tabs/HS_Tabs';
import TR_Tabs from './Tabs/TR_Tabs';
import TR_HomeStack from './Stacks/TR_HomeStack';
import TR_MoreStack from './Stacks/TR_MoreStack';
import TR_MoreDetailsStack from './Stacks/TR_MoreDetailsStack';
import TR_HomeDetailsStack from './Stacks/TR_HomeDetailsStack';
import TR_ReservationsStack from './Stacks/TR_ReservationsStack';
import TR_ReservationDetailsStack from './Stacks/TR_ReservationDetailsStack';
import SC_HomeStack from './Stacks/SC_HomeStack';
import SC_HomeDetailsStack from './Stacks/SC_HomeDetailsStack';
import SC_MoreStack from './Stacks/SC_MoreStack';
import SC_MoreDetailsStack from './Stacks/SC_MoreDetailsStack';
import SC_ReservationsStack from './Stacks/SC_ReservationsStack';
import SC_ReservationDetailsStack from './Stacks/SC_ReservationDetailsStack';
import SC_Tabs from './Tabs/SC_Tabs';
import SM_Tabs from './Tabs/SM_Tabs';
import SM_HomeStack from './Stacks/SM_HomeStack';
import SM_HomeDetailsStack from './Stacks/SM_HomeDetailsStack';
import SM_MoreStack from './Stacks/SM_MoreStack';
import SM_MoreDetailsStack from './Stacks/SM_MoreDetailsStack';
import SM_OrderDetailsStack from './Stacks/SM_OrderDetailsStack';
import SM_OrdersStack from './Stacks/SM_OrdersStack';

export const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();

const RootStack = createStackNavigator();

const RootNavigation = () => {
  
  return (
    <RootStack.Navigator
      initialRouteName={'IntroductionStack'}
      screenOptions={{headerShown: false}}
    >
      <RootStack.Screen name="IntroductionStack" component={IntroductionStack} />
      <RootStack.Screen name="AuthenticationStack" component={AuthenticationStack} />
      
      <RootStack.Screen name="SA_Tabs" component={SA_Tabs}/>
      <RootStack.Screen name="SA_HomeStack" component={SA_HomeStack} />
      <RootStack.Screen name="SA_HomeDetailsStack" component={SA_HomeDetailsStack} />
      <RootStack.Screen name="SA_MoreStack" component={SA_MoreStack} />
      <RootStack.Screen name="SA_MoreDetailsStack" component={SA_MoreDetailsStack} />
      <RootStack.Screen name="SA_ReservationsStack" component={SA_ReservationsStack} />
      <RootStack.Screen name="SA_ReservationDetailsStack" component={SA_ReservationDetailsStack} />

      <RootStack.Screen name="MA_Tabs" component={MA_Tabs}/>
      <RootStack.Screen name="MA_HomeStack" component={MA_HomeStack} />
      <RootStack.Screen name="MA_HomeDetailsStack" component={MA_HomeDetailsStack} />
      <RootStack.Screen name="MA_MoreStack" component={MA_MoreStack} />
      <RootStack.Screen name="MA_MoreDetailsStack" component={MA_MoreDetailsStack} />
      <RootStack.Screen name="MA_ReservationsStack" component={MA_ReservationsStack} />
      <RootStack.Screen name="MA_ReservationDetailsStack" component={MA_ReservationDetailsStack} />

      <RootStack.Screen name="HS_Tabs" component={HS_Tabs}/>
      <RootStack.Screen name="HS_HomeStack" component={HS_HomeStack} />
      <RootStack.Screen name="HS_HomeDetailsStack" component={HS_HomeDetailsStack} />
      <RootStack.Screen name="HS_MoreStack" component={HS_MoreStack} />
      <RootStack.Screen name="HS_MoreDetailsStack" component={HS_MoreDetailsStack} />
      <RootStack.Screen name="HS_ReservationsStack" component={HS_ReservationsStack} />
      <RootStack.Screen name="HS_ReservationDetailsStack" component={HS_ReservationDetailsStack} />

      <RootStack.Screen name="TR_Tabs" component={TR_Tabs}/>
      <RootStack.Screen name="TR_HomeStack" component={TR_HomeStack} />
      <RootStack.Screen name="TR_HomeDetailsStack" component={TR_HomeDetailsStack} />
      <RootStack.Screen name="TR_MoreStack" component={TR_MoreStack} />
      <RootStack.Screen name="TR_MoreDetailsStack" component={TR_MoreDetailsStack} />
      <RootStack.Screen name="TR_ReservationsStack" component={TR_ReservationsStack} />
      <RootStack.Screen name="TR_ReservationDetailsStack" component={TR_ReservationDetailsStack} />

      <RootStack.Screen name="SC_Tabs" component={SC_Tabs}/>
      <RootStack.Screen name="SC_HomeStack" component={SC_HomeStack} />
      <RootStack.Screen name="SC_HomeDetailsStack" component={SC_HomeDetailsStack} />
      <RootStack.Screen name="SC_MoreStack" component={SC_MoreStack} />
      <RootStack.Screen name="SC_MoreDetailsStack" component={SC_MoreDetailsStack} />
      <RootStack.Screen name="SC_ReservationsStack" component={SC_ReservationsStack} />
      <RootStack.Screen name="SC_ReservationDetailsStack" component={SC_ReservationDetailsStack} />

      <RootStack.Screen name="SM_Tabs" component={SM_Tabs}/>
      <RootStack.Screen name="SM_HomeStack" component={SM_HomeStack} />
      <RootStack.Screen name="SM_HomeDetailsStack" component={SM_HomeDetailsStack} />
      <RootStack.Screen name="SM_MoreStack" component={SM_MoreStack} />
      <RootStack.Screen name="SM_MoreDetailsStack" component={SM_MoreDetailsStack} />
      <RootStack.Screen name="SM_OrdersStack" component={SM_OrdersStack} />
      <RootStack.Screen name="SM_OrderDetailsStack" component={SM_OrderDetailsStack} />
    </RootStack.Navigator>
  );
};

const Navigation: React.FC = () => (
  <NavigationContainer ref={navigationRef}>
    <RootNavigation />
  </NavigationContainer>
);
export default Navigation;

export const navigate = (name: any, params: object | undefined) => {
  navigationRef.current ? navigationRef.current.navigate(name, params) : undefined;
};
