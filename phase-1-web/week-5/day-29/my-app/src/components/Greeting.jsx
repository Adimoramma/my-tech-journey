// src/components/Greeting.jsx
import { useState } from 'react';
import Welcome from './Welcome';

// This component uses state and props together
function Greeting() {
    const [name, setName] = useState('');

    return (
        <div style={{
            border: '2px solid #61dafb',
            borderRadius: '8px',
            padding: '20px',
            margin: '10px',
            backgroundColor: '#1e2636'
        }}>
            <h2>Greeting App 👋</h2>
            <input
                type="text"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #61dafb',
                    backgroundColor: '#1e2636',
                    color: 'white',
                    width: '80%',
                    maxWidth: '300px'
                }}
            />
            {name && (
                <div style={{ marginTop: '15px' }}>
                    <Welcome name={name} />
                </div>
            )}
        </div>
    );
}

export default Greeting;