import {SafeAreaView} from 'react-native';
import React from 'react';
import LoginPage from './src/screen/Auth/Login/index';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <LoginPage />
    </SafeAreaView>
  );
}

export default App;
