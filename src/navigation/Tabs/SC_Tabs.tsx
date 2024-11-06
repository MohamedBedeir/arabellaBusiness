import React from 'react';
import { Image, StatusBar } from 'react-native';
import { IMAGES } from '../../assets/Images';
import { Trans } from '../../translation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SC_TabsParam } from '../Types';
import styles from './styles';
import { calcHeight } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';
import SC_HomeStack from '../Stacks/SC_HomeStack';
import SC_ReservationsStack from '../Stacks/SC_ReservationsStack';
import SC_MoreStack from '../Stacks/SC_MoreStack';

const ThemeScreen = (params: any) => {

  // StatusBar.setBarStyle('dark-content');
  const SC_TabStack = createBottomTabNavigator<SC_TabsParam>();
  return (
    <SC_TabStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let shipmentsIcon = false;
          switch (route.name) {
            case 'SC_HomeStack':
              iconName = focused ? IMAGES.tabHomeActive : IMAGES.tabHomeUnActive;
              break;
            case 'SC_ReservationsStack':
              iconName = focused ? IMAGES.tabReservationActive : IMAGES.tabReservationUnActive;
              shipmentsIcon = false;
              break;
            case 'SC_MoreStack':
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
      <SC_TabStack.Screen
        name="SC_HomeStack"
        component={SC_HomeStack}
        options={{ tabBarLabel: Trans('main') }}
      />
      <SC_TabStack.Screen
        name="SC_ReservationsStack"
        component={SC_ReservationsStack}
        options={{ tabBarLabel: Trans('reservations') }}
      />
      <SC_TabStack.Screen
        name="SC_MoreStack"
        component={SC_MoreStack}
        options={{ tabBarLabel: Trans('more') }}
      />
    </SC_TabStack.Navigator>
  );
};

const SC_Tabs = (params: any) => {
  return (
    <ThemeScreen params={params} screenOptions={{headerShown: false}}/>
  );
};

export default SC_Tabs;