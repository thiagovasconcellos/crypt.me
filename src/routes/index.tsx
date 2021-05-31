import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';

import I18n from '../utils/i18n';

import Crypt from '../pages/Crypt';
import Decrypt from '../pages/Decrypt';

const Tab = createBottomTabNavigator();

const Tabs: React.FC = () => {
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color}) => {
          let iconName;

          if (route.name === 'Crypt') {
            iconName = focused
              ? 'lock-closed'
              : 'lock-closed-outline';
          } else if (route.name === 'Decrypt') {
            iconName = focused ? 'lock-open' : 'lock-open-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName ? iconName : 'lock-closed'} size={32} color={color}/>;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#00FF1E',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#312e38',
        inactiveBackgroundColor: '#312e38',
        adaptive: true,
      }}
        >
        <Tab.Screen name={I18n.t('menuCrypt')} component={Crypt} />
        <Tab.Screen name={I18n.t('menuDecrypt')} component={Decrypt} />
      </Tab.Navigator>
  )
}

export default Tabs;