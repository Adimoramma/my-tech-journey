// src/components/RegisterForm.jsx
import { useState } from 'react';
import useForm from '../hooks/useForm';

const validateRegister = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Name is required';
    } else if (values.name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }

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

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
};

function RegisterForm({ onRegister, switchToLogin, serverError, setServerError }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useForm(
        {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validateRegister
    );

    const onSubmit = async (formData) => {
        setIsSubmitting(true);
        setServerError('');
        const { name, email, password } = formData;
        const result = await onRegister({ name, email, password });
        setIsSubmitting(false);
        if (!result.success) {
            setServerError(result.error);
        }
    };

    return (
        <div style={styles.container}>
            <h2>📝 Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                {serverError && (
                    <div style={styles.serverError}>
                        ❌ {serverError}
                    </div>
                )}

                <div style={styles.field}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                            ...styles.input,
                            borderColor: touched.name && errors.name ? '#e74c3c' : '#3a4050'
                        }}
                    />
                    {touched.name && errors.name && (
                        <p style={styles.error}>{errors.name}</p>
                    )}
                </div>

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

                <div style={styles.field}>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                            ...styles.input,
                            borderColor: touched.confirmPassword && errors.confirmPassword ? '#e74c3c' : '#3a4050'
                        }}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                        <p style={styles.error}>{errors.confirmPassword}</p>
                    )}
                </div>

                <button
                    type="submit"
                    style={styles.button}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p style={styles.switch}>
                Already have an account?{' '}
                <button onClick={switchToLogin} style={styles.linkButton}>
                    Login
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

export default RegisterForm;