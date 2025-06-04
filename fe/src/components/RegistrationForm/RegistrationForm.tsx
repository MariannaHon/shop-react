import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import type { AppDispatch } from '@/redux/store';
import { register } from '../../redux/auth/operations';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import css from './RegistrationForm.module.scss';

import { RegisterRequestBody } from '@/models/auth';
import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { nameRegex, passwordRegex } from '../../regex/index';

export const RegistrationForm = () => {
    const Validator = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too short!')
            .max(10, 'Too long!')
            .matches(nameRegex, 'Only letters are allowed!')
            .required('Required!'),
        lastName: Yup.string()
            .min(3, 'Too short!')
            .max(15, 'Too long!')
            .matches(nameRegex, 'Only letters are allowed!')
            .required('Required!'),
        email: Yup.string()
            .email('Invalid email address!')
            .min(12, 'Email length must be at least 12 characters long')
            .matches(
                /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                'Email must contain at least two letters after the dot'
            )
            .required('Required!'),
        password: Yup.string()
            .min(6, 'Must be at least 6 characters')
            .matches(passwordRegex.lowercase, 'At least one lowercase letter')
            .matches(passwordRegex.uppercase, 'At least one uppercase letter')
            .matches(passwordRegex.digit, 'At least one number')
            .matches(
                passwordRegex.specialChar,
                'At least one special character'
            )
            .required('Required!'),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Required!'),
    });

    const initialValues = {
        name: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    };

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const handleSubmit = (
        values: RegisterRequestBody,
        actions: FormikHelpers<RegisterRequestBody>
    ) => {
        dispatch(register(values));
        actions.resetForm();
    };

    useEffect(() => {
        if (isLoggedIn) {
            const timeout = setTimeout(() => {
                navigate('/');
            }, 500);

            return () => clearTimeout(timeout);
        }
    }, [isLoggedIn, navigate]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Validator}
            onSubmit={handleSubmit}
        >
            <Form className={css.form}>
                <div className={css.top}>
                    <h2 className={css.title}>Create an account</h2>
                    <p className={css.required}>*Required</p>
                </div>
                <span className={css.line}></span>
                <div className={css.container}>
                    <div className={css.field}>
                        <label className={css.label} htmlFor="name">
                            First Name*
                        </label>
                        <Field
                            className={css.input}
                            type="text"
                            name="name"
                            autoComplete="true"
                        />
                        <ErrorMessage
                            className={css.error}
                            name="name"
                            component="div"
                        />
                    </div>
                    <div className={css.field}>
                        <label className={css.label} htmlFor="lastName">
                            Last Name*
                        </label>
                        <Field
                            className={css.input}
                            type="text"
                            name="lastName"
                            autoComplete="true"
                        />
                        <ErrorMessage
                            className={css.error}
                            name="lastName"
                            component="div"
                        />
                    </div>
                    <div className={css.field}>
                        <label className={css.label} htmlFor="email">
                            Email*
                        </label>
                        <Field
                            className={css.input}
                            type="text"
                            name="email"
                            autoComplete="true"
                        />
                        <ErrorMessage
                            className={css.error}
                            name="email"
                            component="div"
                        />
                    </div>
                    <div className={css.field}>
                        <label className={css.label} htmlFor="password">
                            Password*
                        </label>
                        <Field
                            className={css.input}
                            type="text"
                            name="password"
                            autoComplete="true"
                        />
                        <ErrorMessage
                            className={css.error}
                            name="password"
                            component="div"
                        />
                    </div>
                    <div className={css.field}>
                        <label className={css.label} htmlFor="passwordConfirm">
                            Confirm Password*
                        </label>
                        <Field
                            className={css.input}
                            type="text"
                            name="passwordConfirm"
                            autoComplete="true"
                        />
                        <ErrorMessage
                            className={css.error}
                            name="passwordConfirm"
                            component="div"
                        />
                    </div>
                </div>
                <button className={css.btn} type="submit">
                    Create an account
                </button>
                <a className={css.link} href="/login">
                    Back to login
                </a>
            </Form>
        </Formik>
    );
};
