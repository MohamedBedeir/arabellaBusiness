import React, { useEffect } from 'react';

import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import IntroductionStack from './Stacks/IntroductionStack';
import AuthenticationStack from './Stacks/AuthenticationStack';
import MA_Tabs from './Tabs/MA_Tabs';
import I18n from '../translation';
import { I18nManager } from 'react-native';
import MA_MoreDetailsStack from './Stacks/MA_MoreDetailsStack';
import MA_MoreStack from './Stacks/MA_MoreStack';
import MA_ReservationDetailsStack from './Stacks/MA_ReservationDetailsStack';
import MA_HomeDetailsStack from './Stacks/MA_HomeDetailsStack';
import MA_HomeStack from './Stacks/MA_HomeStack';
import SA_Tabs from './Tabs/SA_Tabs';
import SA_HomeStack from './Stacks/SA_HomeStack';
import SA_MoreStack from './Stacks/SA_MoreStack';
import MA_ReservationsStack from './Stacks/MA_ReservationsStack';
import SA_MoreDetailsStack from './Stacks/SA_MoreDetailsStack';
import SA_HomeDetailsStack from './Stacks/SA_HomeDetailsStack';
import HS_HomeStack from './Stacks/HS_HomeStack';
import HS_HomeDetailsStack from './Stacks/HS_HomeDetailsStack';
import HS_MoreStack from './Stacks/HS_MoreStack';
import HS_MoreDetailsStack from './Stacks/HS_MoreDetailsStack';
import HS_ReservationsStack from './Stacks/HS_ReservationsStack';
import HS_ReservationDetailsStack from './Stacks/HS_ReservationDetailsStack';
import HS_Tabs from './Tabs/HS_Tabs';
import SA_ReservationsStack from './Stacks/SA_ReservationsStack';
import SA_ReservationDetailsStack from './Stacks/SA_ReservationDetailsStack';

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
