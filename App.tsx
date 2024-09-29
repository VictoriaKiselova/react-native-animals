import {DevSettings, NativeModules, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import AuthPage from './src/pages/AuthPage/AuthPage';

function App(): React.JSX.Element {
  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Debugging With debugger', () => {
        NativeModules.DevSettings.setIsDebuggingRemotely(true);
      });
      DevSettings.addMenuItem('Stop Debugging With debugger', () => {
        NativeModules.DevSettings.setIsDebuggingRemotely(false);
      });
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <AuthPage />
    </SafeAreaView>
  );
}

export default App;
