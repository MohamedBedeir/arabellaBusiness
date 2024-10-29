import React from 'react';
import { Image, StatusBar } from 'react-native';
import { IMAGES } from '../../assets/Images';
import { Trans } from '../../translation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TR_TabsParam } from '../Types';
import styles from './styles';
import { calcHeight } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';
import TR_HomeStack from '../Stacks/TR_HomeStack';
import TR_ReservationsStack from '../Stacks/TR_ReservationsStack';
import TR_MoreStack from '../Stacks/TR_MoreStack';

const ThemeScreen = (params: any) => {

  // StatusBar.setBarStyle('dark-content');
  const TR_TabStack = createBottomTabNavigator<TR_TabsParam>();
  return (
    <TR_TabStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let shipmentsIcon = false;
          switch (route.name) {
            case 'TR_HomeStack':
              iconName = focused ? IMAGES.tabHomeActive : IMAGES.tabHomeUnActive;
              break;
            case 'TR_ReservationsStack':
              iconName = focused ? IMAGES.tabReservationActive : IMAGES.tabReservationUnActive;
              shipmentsIcon = false;
              break;
            case 'TR_MoreStack':
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
      <TR_TabStack.Screen
        name="TR_HomeStack"
        component={TR_HomeStack}
        options={{ tabBarLabel: Trans('main') }}
      />
      <TR_TabStack.Screen
        name="TR_ReservationsStack"
        component={TR_ReservationsStack}
        options={{ tabBarLabel: Trans('reservations') }}
      />
      <TR_TabStack.Screen
        name="TR_MoreStack"
        component={TR_MoreStack}
        options={{ tabBarLabel: Trans('more') }}
      />
    </TR_TabStack.Navigator>
  );
};

const TR_Tabs = (params: any) => {
  return (
    <ThemeScreen params={params} screenOptions={{headerShown: false}}/>
  );
};

export default TR_Tabs;