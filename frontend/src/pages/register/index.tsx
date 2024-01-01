'use client';
import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { REGISTER } from '../../graphql/mutations.ts';
import { setToken } from '../../auth-utils';

interface FormValues {
    username: string;
    password: string;
}

const validationSchema: Yup.Schema<FormValues> = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters long'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password')],
        'Passwords must match'
    ),
});

const Register: React.FC = () => {
    const [registerMutation, { error, loading }] = useMutation(REGISTER);
    const navigate = useNavigate();

    useEffect(() => {
        if (error?.message) {
            toast.error(error.message);
        }
    }, [error?.message]);

    async function register(formValues: FormValues) {
        const { username, password } = formValues;
        try {
            const { data } = await registerMutation({
                variables: { username, password },
            });
            if (data?.register?.token) {
                setToken(data.register.token);
                navigate('/dashboard');
            }
        } catch {}
    }

    const handleSubmit = (values: FormValues) => {
        register(values);
    };

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form>
                    <div>
                        <label htmlFor="username">Username</label>
                        <Field type="text" name="username" />
                        <ErrorMessage
                            name="username"
                            component="div"
                            className="error"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="error"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Password</label>
                        <Field type="password" name="confirmPassword" />
                        <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="error"
                        />
                    </div>
                    <div>
                        <button type="submit">
                            {loading ? 'Loading...' : 'Register'}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Register;
