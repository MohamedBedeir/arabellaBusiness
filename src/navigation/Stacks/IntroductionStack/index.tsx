import * as React from 'react';
import {IntroductionStackParam} from '../../Types';
import Splash from '../../../screens/introductionScreens/Splash';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Definition from '../../../screens/introductionScreens/Definition';
import LetsStart from '../../../screens/introductionScreens/LetsStart';

const Introduction_Stack = createNativeStackNavigator<IntroductionStackParam>();
const IntroductionStack: React.FC = () => (
  <Introduction_Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{
      headerShown: false,
    }}
    >
    <Introduction_Stack.Screen name="Splash" component={Splash} />
    <Introduction_Stack.Screen name="Definition" component={Definition} />
    <Introduction_Stack.Screen name="LetsStart" component={LetsStart} />
  </Introduction_Stack.Navigator>
);

export default IntroductionStack;
