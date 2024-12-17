import React from 'react';
import { Image, StatusBar } from 'react-native';
import { IMAGES } from '../../assets/Images';
import { Trans } from '../../translation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SM_TabsParam } from '../Types';
import styles from './styles';
import { calcHeight } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';
import SM_HomeStack from '../Stacks/SM_HomeStack';
import SM_MoreStack from '../Stacks/SM_MoreStack';
import SM_OrdersStack from '../Stacks/SM_OrdersStack';


const ThemeScreen = (params: any) => {

  // StatusBar.setBarStyle('dark-content');
  const SM_TabStack = createBottomTabNavigator<SM_TabsParam>();
  return (
    <SM_TabStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let shipmentsIcon = false;
          switch (route.name) {
            case 'SM_HomeStack':
              iconName = focused ? IMAGES.tabHomeActive : IMAGES.tabHomeUnActive;
              break;
            case 'SM_OrdersStack':
              iconName = focused ? IMAGES.tabReservationActive : IMAGES.tabReservationUnActive;
              shipmentsIcon = false;
              break;
            case 'SM_MoreStack':
              iconName = focused ? IMAGES.tabMoreActive : IMAGES.tabMoreUnActive;
              shipmentsIcon = false;
              break;
          };
          return (
            <Image source={iconName} style={styles.icon} />
          );
        },
        // headerStyle:{backgroundColor: 'green'},
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: COLORS.primaryGradient,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarItemStyle:{height: calcHeight(50), paddingVertical: calcHeight(12), marginTop: calcHeight(12)},
        headerShown: false,
      })}
    >
      <SM_TabStack.Screen
        name="SM_HomeStack"
        component={SM_HomeStack}
        options={{ tabBarLabel: Trans('main') }}
      />
      <SM_TabStack.Screen
        name="SM_OrdersStack"
        component={SM_OrdersStack}
        options={{ tabBarLabel: Trans('orders') }}
      />
      <SM_TabStack.Screen
        name="SM_MoreStack"
        component={SM_MoreStack}
        options={{ tabBarLabel: Trans('more') }}
      />
    </SM_TabStack.Navigator>
  );
};

const SM_Tabs = (params: any) => {
  return (
    <ThemeScreen params={params} screenOptions={{headerShown: false}}/>
  );
};

export default SM_Tabs;