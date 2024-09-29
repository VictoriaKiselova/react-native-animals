import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from '../../styles';
import Login from '../../components/Login/Login';
import Registration from '../../components/Registration/Registration';

interface IInputValue {
  email: string;
  password: string;
  errorEmail: null | string;
  errorPassword: null | string;
}
interface Auth {
  activeTab: 'login' | 'registration';
}

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<Auth['activeTab']>('login');
  const [isPassHidden, setIsPassHidden] = useState(true);
  const [inputValues, setInputValues] = useState<IInputValue>({
    email: '',
    password: '',
    errorEmail: null,
    errorPassword: null,
  });
  const handleChangeInput = (
    key: 'email' | 'password' | 'errorEmail' | 'errorPassword',
    value: string | null,
  ) => {
    setInputValues(prevState => ({...prevState, [key]: value}));
  };

  const checkEmail = email => {
    const emailValidator = new RegExp(
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    );
    if (!emailValidator.test(email)) {
      handleChangeInput('errorEmail', 'Not valid email');
    } else {
      handleChangeInput('errorEmail', null);
    }
  };

  const checkPassword = text => {
    if (text.length < 8) {
      handleChangeInput(
        'errorPassword',
        'Password must be more then 8 symbols',
      );
    } else {
      handleChangeInput('errorPassword', null);
    }
  };

  const isDisabledLoginButton = Boolean(
    inputValues.errorEmail ||
      inputValues.errorPassword ||
      !inputValues.email ||
      !inputValues.password,
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.mainWrapper]}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.select({android: 20, ios: 90})}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={[styles.titleContainer]}>
            <Text style={styles.title}>Раді тебе вітати!</Text>
            <Text style={styles.welcomeText}>
              Кожен пухнастик заслуговує на дбайливих господарів. Ми допоможемо
              тобі знайти друга.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.activeTab,
                activeTab === 'login' ? styles.activeTab : styles.disabledTab,
              ]}
              onPress={() => setActiveTab('login')}>
              <Text style={styles.authText}>Вхід</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.activeTab,
                activeTab === 'registration'
                  ? styles.activeTab
                  : styles.disabledTab,
              ]}
              onPress={() => setActiveTab('registration')}>
              <Text style={styles.authText}>Реєстрація</Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'login' ? (
            <Login
              inputValues={inputValues}
              isPassHidden={isPassHidden}
              setIsPassHidden={setIsPassHidden}
              checkEmail={checkEmail}
              checkPassword={checkPassword}
              handleChangeInput={handleChangeInput}
              isDisabledLoginButton={isDisabledLoginButton}
            />
          ) : (
            <Registration
              isPassHidden={isPassHidden}
              setIsPassHidden={setIsPassHidden}
            />
          )}
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
