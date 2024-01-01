'use client';
import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../../graphql/mutations.ts';
import { setToken } from '../../auth-utils';

interface FormValues {
    username: string;
    password: string;
}

const validationSchema: Yup.Schema<FormValues> = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
    const [loginMutation, { error }] = useMutation(LOGIN);
    const router = useNavigate();

    useEffect(() => {
        if (error?.message) {
            toast.error(error.message);
        }
    }, [error?.message]);

    async function login(formValues: FormValues) {
        const { username, password } = formValues;
        try {
            const { data } = await loginMutation({
                variables: { username, password },
            });
            if (data?.login?.token) {
                setToken(data.login.token);
                router('/dashboard');
            }
        } catch {}
    }
    const handleSubmit = (values: FormValues) => {
        login(values);
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
                    <div className="flex flex-col gap-4 dark:bg-red-600">
                        <div>
                            <label htmlFor="username">Username</label>
                            <Field type="text" name="username" />
                            <ErrorMessage
                                name="username"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Login;
