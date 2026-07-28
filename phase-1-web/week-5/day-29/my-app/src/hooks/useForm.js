// src/hooks/useForm.js
import { useState } from 'react';

// Custom hook for form handling with validation
function useForm(initialValues, validate) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        setValues({
            ...values,
            [name]: val
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Handle blur (field lost focus)
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });

        // Validate field on blur
        if (validate) {
            const validationErrors = validate(values);
            setErrors(validationErrors);
        }
    };

    // Handle form submission
    const handleSubmit = (callback) => {
        return async (e) => {
            e.preventDefault();

            // Mark all fields as touched
            const allTouched = {};
            Object.keys(values).forEach(key => {
                allTouched[key] = true;
            });
            setTouched(allTouched);

            // Validate all fields
            if (validate) {
                const validationErrors = validate(values);
                setErrors(validationErrors);

                // If there are errors, don't submit
                if (Object.keys(validationErrors).length > 0) {
                    return;
                }
            }

            setIsSubmitting(true);
            try {
                await callback(values);
            } catch (error) {
                console.error('Form submission error:', error);
            } finally {
                setIsSubmitting(false);
            }
        };
    };

    // Reset form
    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    };

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        setValues,
        setErrors
    };
}

export default useForm;