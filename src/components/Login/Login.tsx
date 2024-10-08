import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import styles from '../../styles';
import {ViewPassIcon, HidePassIcon} from '../../asstes/icons/index';
import auth from '@react-native-firebase/auth';

export default function Login({
  inputValues,
  isPassHidden,
  setIsPassHidden,
  checkEmail,
  checkPassword,
  handleChangeInput,
  isDisabledLoginButton,
}) {
  const onLogin = async (email, password) => {
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'Email'}
            style={styles.input}
            placeholderTextColor={'#838383'}
            value={inputValues.email}
            onChangeText={text => {
              handleChangeInput('email', text);
              checkEmail(text);
            }}
          />
        </View>
        {inputValues.errorEmail && <Text>{inputValues.errorEmail}</Text>}

        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'Password'}
            style={styles.input}
            placeholderTextColor={'#838383'}
            value={inputValues.password}
            onChangeText={text => {
              handleChangeInput('password', text);
              checkPassword(text);
            }}
            secureTextEntry={isPassHidden}
          />
          <TouchableOpacity
            onPress={() => {
              setIsPassHidden(!isPassHidden);
            }}
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
            {isPassHidden ? <ViewPassIcon /> : <HidePassIcon />}
          </TouchableOpacity>
        </View>
        {inputValues.errorPassword && <Text>{inputValues.errorPassword}</Text>}

        <TouchableOpacity
          onPress={() => {
            onLogin(inputValues.email, inputValues.password);
          }}
          style={[
            styles.loginBtnContainer,
            isDisabledLoginButton && {opacity: 0.5},
          ]}
          disabled={isDisabledLoginButton}>
          <Text style={styles.loginText}>Увійти</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
