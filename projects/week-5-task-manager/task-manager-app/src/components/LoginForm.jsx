// src/components/LoginForm.jsx
import { useState } from 'react';
import useForm from '../hooks/useForm';

const validateLogin = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    return errors;
};

function LoginForm({ onLogin, switchToRegister, serverError, setServerError }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useForm(
        { email: '', password: '' },
        validateLogin
    );

    const onSubmit = async (formData) => {
        setIsSubmitting(true);
        setServerError('');
        const result = await onLogin(formData);
        setIsSubmitting(false);
        if (!result.success) {
            setServerError(result.error);
        }
    };

    return (
        <div style={styles.container}>
            <h2>🔐 Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                {serverError && (
                    <div style={styles.serverError}>
                        ❌ {serverError}
                    </div>
                )}

                <div style={styles.field}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                            ...styles.input,
                            borderColor: touched.email && errors.email ? '#e74c3c' : '#3a4050'
                        }}
                    />
                    {touched.email && errors.email && (
                        <p style={styles.error}>{errors.email}</p>
                    )}
                </div>

                <div style={styles.field}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password (min 6 characters)"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                            ...styles.input,
                            borderColor: touched.password && errors.password ? '#e74c3c' : '#3a4050'
                        }}
                    />
                    {touched.password && errors.password && (
                        <p style={styles.error}>{errors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    style={styles.button}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p style={styles.switch}>
                Don't have an account?{' '}
                <button onClick={switchToRegister} style={styles.linkButton}>
                    Register
                </button>
            </p>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#1e2636',
        borderRadius: '8px',
        border: '2px solid #61dafb',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    input: {
        padding: '12px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '2px solid #3a4050',
        backgroundColor: '#282c34',
        color: 'white',
        transition: 'border-color 0.2s',
    },
    error: {
        color: '#e74c3c',
        fontSize: '14px',
        margin: '0',
        textAlign: 'left',
    },
    serverError: {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '10px',
        borderRadius: '4px',
        fontSize: '14px',
        textAlign: 'center',
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#61dafb',
        color: '#282c34',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    switch: {
        marginTop: '15px',
        textAlign: 'center',
    },
    linkButton: {
        background: 'none',
        border: 'none',
        color: '#61dafb',
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: '16px',
    },
};

export default LoginForm;