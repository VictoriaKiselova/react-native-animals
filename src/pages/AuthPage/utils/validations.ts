import * as Yup from 'yup';

let authShema = Yup.object().shape({
  email: Yup.string().email('Not valid email').required(),
  password: Yup.string()
    .min(8, 'Password must be more then 8 symbols')
    .matches(/[a-zA-Z]/, 'The password must contain at least one letter')
    .matches(/[0-9]/, 'The password must contain at least one number')
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});
export default authShema;
