import React from 'react';
import { Image, StatusBar } from 'react-native';
import { IMAGES } from '../../assets/Images';
import { Trans } from '../../translation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SA_TabsParam } from '../Types';
import styles from './styles';
import { calcHeight } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';
import SA_HomeStack from '../Stacks/SA_HomeStack';
import SA_ReservationsStack from '../Stacks/SA_ReservationsStack';
import SA_MoreStack from '../Stacks/SA_MoreStack';

const ThemeScreen = (params: any) => {

  // StatusBar.setBarStyle('dark-content');
  const SA_TabStack = createBottomTabNavigator<SA_TabsParam>();
  return (
    <SA_TabStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let shipmentsIcon = false;
          switch (route.name) {
            case 'SA_HomeStack':
              iconName = focused ? IMAGES.tabHomeActive : IMAGES.tabHomeUnActive;
              break;
            case 'SA_ReservationsStack':
              iconName = focused ? IMAGES.tabReservationActive : IMAGES.tabReservationUnActive;
              shipmentsIcon = false;
              break;
            case 'SA_MoreStack':
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
      <SA_TabStack.Screen
        name="SA_HomeStack"
        component={SA_HomeStack}
        options={{ tabBarLabel: Trans('main') }}
      />
      <SA_TabStack.Screen
        name="SA_ReservationsStack"
        component={SA_ReservationsStack}
        options={{ tabBarLabel: Trans('reservations') }}
      />
      <SA_TabStack.Screen
        name="SA_MoreStack"
        component={SA_MoreStack}
        options={{ tabBarLabel: Trans('more') }}
      />
    </SA_TabStack.Navigator>
  );
};

const SA_Tabs = (params: any) => {
  return (
    <ThemeScreen params={params} screenOptions={{headerShown: false}}/>
  );
};

export default SA_Tabs;