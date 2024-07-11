import * as React from 'react';
import {AuthenticationStackParam} from '../../Types';
// import Login from '../../../Containers/LoginScreens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../../screens/authenticationScreens/Login';
import ForgotPassword from '../../../screens/authenticationScreens/ForgotPassword';
import SignUp from '../../../screens/authenticationScreens/SignUp';
import VerficationOTP from '../../../screens/authenticationScreens/VerficationOTP';
// import Register from '../../../screens/authenticationScreens/register';

const Authentication_Stack = createNativeStackNavigator<AuthenticationStackParam>();
const AuthenticationStack: React.FC = () => (
  <Authentication_Stack.Navigator 
    initialRouteName='VerficationOTP'
    screenOptions={{ headerShown: false }}
  >
    <Authentication_Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
    <Authentication_Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
    <Authentication_Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}/>
    <Authentication_Stack.Screen name="VerficationOTP" component={VerficationOTP} options={{headerShown: false}}/>
  </Authentication_Stack.Navigator>
);
export default AuthenticationStack;
