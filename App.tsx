import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { ONE_SIGNAL_ID } from '@env'

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { tagUserInfoCreate } from './src/notifications/notificationsTags'

import { CartContextProvider } from './src/contexts/CartContext';

OneSignal.Debug.setLogLevel(LogLevel.Verbose)
OneSignal.initialize(ONE_SIGNAL_ID)

OneSignal.User.addEmail('rafael@email.com')

OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate()

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener('click', (event) => {
      const response = event.result.actionId

      console.log(response)
    })

    return () => unsubscribe
  },[])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

      
    </NativeBaseProvider>
  );
}