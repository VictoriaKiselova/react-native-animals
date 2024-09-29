import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ViewPassIcon, HidePassIcon} from '../../asstes/icons/index';
import {Formik} from 'formik';
import * as Yup from 'yup';
import authShema from '../../pages/AuthPage/utils/validations';
import styles from '../../styles';

export default function Registration({isPassHidden, setIsPassHidden}) {
  return (
    <View style={styles.formContainer}>
      <Formik
        initialValues={{email: '', password: '', confirmPassword: ''}}
        validationSchema={authShema}
        onSubmit={values => {
          console.log(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => {
          const isFormValid =
            !errors.email && !errors.password && !errors.confirmPassword;

          return (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  placeholderTextColor={'#838383'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </View>
              {touched.email && errors.email && <Text>{errors.email}</Text>}

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Password"
                  style={styles.input}
                  placeholderTextColor={'#838383'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
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
              {touched.password && errors.password && (
                <Text>{errors.password}</Text>
              )}

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Confirm password"
                  style={styles.input}
                  placeholderTextColor={'#838383'}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={isPassHidden}
                />
              </View>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text>{errors.confirmPassword}</Text>
              )}

              <TouchableOpacity
                onPress={handleSubmit}
                style={[
                  styles.loginBtnContainer,
                  isFormValid ? {} : {opacity: 0.5},
                ]}
                disabled={!isFormValid}>
                <Text style={styles.loginText}>Зареєструватись</Text>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
    </View>
  );
}
