// src/hooks/useToggle.jsx
import { useState, useCallback } from 'react';

// Custom hook for toggling boolean values
function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
        setValue(prev => !prev);
    }, []);

    const setTrue = useCallback(() => {
        setValue(true);
    }, []);

    const setFalse = useCallback(() => {
        setValue(false);
    }, []);

    return {
        value,
        toggle,
        setTrue,
        setFalse,
        isOn: value,
        isOff: !value
    };
}

export default useToggle;