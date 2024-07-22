import React from 'react';
import { Image, StatusBar } from 'react-native';
import { IMAGES } from '../../assets/Images';
import { Trans } from '../../translation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HS_TabsParam } from '../Types';
import styles from './styles';
import { calcHeight } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';
import HS_HomeStack from '../Stacks/HS_HomeStack';
import HS_ReservationsStack from '../Stacks/HS_ReservationsStack';
import HS_MoreStack from '../Stacks/HS_MoreStack';

const ThemeScreen = (params: any) => {

  // StatusBar.setBarStyle('dark-content');
  const TabStack = createBottomTabNavigator<HS_TabsParam>();
  return (
    <TabStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let shipmentsIcon = false;
          switch (route.name) {
            case 'HS_HomeStack':
              iconName = focused ? IMAGES.tabHomeActive : IMAGES.tabHomeUnActive;
              break;
            case 'HS_ReservationsStack':
              iconName = focused ? IMAGES.tabReservationActive : IMAGES.tabReservationUnActive;
              shipmentsIcon = false;
              break;
            case 'HS_MoreStack':
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
      <TabStack.Screen
        name="HS_HomeStack"
        component={HS_HomeStack}
        options={{ tabBarLabel: Trans('main') }}
      />
      <TabStack.Screen
        name="HS_ReservationsStack"
        component={HS_ReservationsStack}
        options={{ tabBarLabel: Trans('reservations') }}
      />
      <TabStack.Screen
        name="HS_MoreStack"
        component={HS_MoreStack}
        options={{ tabBarLabel: Trans('more') }}
      />
    </TabStack.Navigator>
  );
};

const HS_Tabs = (params: any) => {
  return (
    <ThemeScreen params={params} screenOptions={{headerShown: false}}/>
  );
};

export default HS_Tabs;