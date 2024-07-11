import React from 'react';
import { Image, StatusBar } from 'react-native';
import { IMAGES } from '../../assets/Images';
import { Trans } from '../../translation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MA_TabsParam } from '../Types';
import styles from './styles';
import { calcHeight } from '../../utils/sizes';
import MA_HomeStack from '../Stacks/MA_HomeStack';
import MA_ReservationsStack from '../Stacks/MA_ReservationsStack';
import MA_MoreStack from '../Stacks/MA_MoreStack';
import { COLORS } from '../../utils/theme';

const ThemeScreen = (params: any) => {

  // StatusBar.setBarStyle('dark-content');
  const TabStack = createBottomTabNavigator<MA_TabsParam>();
  return (
    <TabStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let shipmentsIcon = false;
          switch (route.name) {
            case 'MA_HomeStack':
              iconName = focused ? IMAGES.tabHomeActive : IMAGES.tabHomeUnActive;
              break;
            case 'MA_ReservationsStack':
              iconName = focused ? IMAGES.tabReservationActive : IMAGES.tabReservationUnActive;
              shipmentsIcon = false;
              break;
            case 'MA_MoreStack':
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
        name="MA_HomeStack"
        component={MA_HomeStack}
        options={{ tabBarLabel: Trans('main') }}
      />
      <TabStack.Screen
        name="MA_ReservationsStack"
        component={MA_ReservationsStack}
        options={{ tabBarLabel: Trans('reservations') }}
      />
      <TabStack.Screen
        name="MA_MoreStack"
        component={MA_MoreStack}
        options={{ tabBarLabel: Trans('more') }}
      />
    </TabStack.Navigator>
  );
};

const MA_Tabs = (params: any) => {
  return (
    <ThemeScreen params={params} screenOptions={{headerShown: false}}/>
  );
};

export default MA_Tabs;