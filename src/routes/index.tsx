import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { OSNotification, OneSignal } from 'react-native-onesignal';

import { AppRoutes } from './app.routes';

import { Notification } from '../components/Notification'
import { useState, useEffect } from 'react';

const linking = {
  prefixes: ['igniteshoesapp://', 'rafael.igniteshoesapp://', 'exp+igniteshoesapp://'],
  config: {
    screens: {
      details: { 
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}

export function Routes() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<OSNotification>()

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
      event.preventDefault()

      const response = event.getNotification()
      setNotification(response)

      return () => unsubscribe
    })

  },[])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      { notification?.title &&
        <Notification 
        data={notification}
        onClose={() => setNotification(undefined)}
      />
      }
    </NavigationContainer>
  );
}