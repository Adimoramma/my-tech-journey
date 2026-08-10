// src/components/Counter.jsx
import { useState } from 'react';

// This component uses state to track a count
function Counter() {
    // useState returns [current value, function to update it]
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);

    const increment = () => {
        setCount(count + step);
    };

    const decrement = () => {
        setCount(count - step);
    };

    const reset = () => {
        setCount(0);
    };

    return (
        <div style={{
            border: '2px solid #61dafb',
            borderRadius: '8px',
            padding: '20px',
            margin: '10px',
            backgroundColor: '#1e2636'
        }}>
            <h2>Counter 🧮</h2>
            <p style={{ fontSize: '48px', fontWeight: 'bold', color: '#61dafb' }}>
                {count}
            </p>
            <div>
                <button onClick={increment} style={buttonStyle}>+{step}</button>
                <button onClick={decrement} style={buttonStyle}>-{step}</button>
                <button onClick={reset} style={{ ...buttonStyle, backgroundColor: '#e74c3c' }}>Reset</button>
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>
                    Step size:
                    <input
                        type="number"
                        value={step}
                        onChange={(e) => setStep(Number(e.target.value))}
                        style={{
                            marginLeft: '10px',
                            padding: '5px',
                            borderRadius: '4px',
                            border: '1px solid #61dafb',
                            backgroundColor: '#1e2636',
                            color: 'white',
                            width: '60px'
                        }}
                    />
                </label>
            </div>
        </div>
    );
}

const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    fontSize: '16px',
    backgroundColor: '#61dafb',
    color: '#282c34',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

export default Counter;