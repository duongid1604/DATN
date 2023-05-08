import React, { FC } from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { persistor, store } from './src/redux/store';
import AppNavigation from '@src/navigation';
import { Colors, Metrics } from '@src/assets';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      style={{ top: 64, borderLeftColor: 'green' }}
      text1Style={{ fontFamily: 'NotoSans-SemiBold', fontSize: 14.5 }}
      text2Style={{ fontFamily: 'NotoSans-Medium', fontSize: 12 }}
      {...props}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      style={{ top: 56, borderLeftColor: 'red' }}
      text1Style={{ fontFamily: 'NotoSans-SemiBold', fontSize: 14.5 }}
      text2Style={{ fontFamily: 'NotoSans-Medium', fontSize: 12 }}
      {...props}
    />
  ),
};

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
};

export default App;
