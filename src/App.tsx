import 'react-native-gesture-handler'
import SplashScreen from 'react-native-splash-screen'

import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

const App: React.FC = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return ( 
    <NavigationContainer>
       <StatusBar barStyle="light-content" backgroundColor="#000" translucent />
       <View style={{ flex: 1, backgroundColor: '#312e38' }}>
         <Routes />
       </View>
     </NavigationContainer>
  )
};

export default App;