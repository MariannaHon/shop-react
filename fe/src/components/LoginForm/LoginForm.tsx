import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { logIn } from '../../redux/auth/operations';
import type { AppDispatch } from '@/redux/store';
import { Link } from 'react-router-dom';
import css from './LoginForm.module.scss';
interface LoginFormValues {
    email: string;
    password: string;
}
export const LoginForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const initialValues: LoginFormValues = {
        email: '',
        password: '',
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address!')
            .required('Required!'),
        password: Yup.string().required('Required!'),
    });
    const handleSubmit = (
        values: LoginFormValues,
        actions: FormikHelpers<LoginFormValues>
    ) => {
        dispatch(logIn(values));
        actions.resetForm();
        navigate('/');
    };
    return (
        <div className={css.container}>
            <div className={css.loginContainer}>
                <h2 className={css.title}>User Login</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className={css.form}>
                        <div className={css.field}>
                            <label className={css.label} htmlFor="email">
                                E-MAIL*
                            </label>
                            <Field
                                className={css.input}
                                type="email"
                                name="email"
                                autoComplete="email"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className={css.error}
                            />
                        </div>
                        <div className={css.field}>
                            <label className={css.label} htmlFor="password">
                                PASSWORD*
                            </label>
                            <Field
                                className={css.input}
                                type="password"
                                name="password"
                                autoComplete="current-password"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className={css.error}
                            />
                        </div>
                        <button className={css.loginBtn} type="submit">
                            Login
                        </button>
                        <Link to="/register" className={css.link}>
                            Don't have an account? Register here
                        </Link>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
