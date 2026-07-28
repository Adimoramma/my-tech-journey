// src/components/Welcome.jsx

// This is a child component that receives props from its parent
function Welcome({ name, age }) {
    return (
        <div style={{
            border: '2px solid #61dafb',
            borderRadius: '8px',
            padding: '20px',
            margin: '10px',
            backgroundColor: '#1e2636'
        }}>
            <h2>Hello, {name}! 👋</h2>
            <p>Welcome to React, {name}!</p>
            {age && <p>You are {age} years old.</p>}
        </div>
    );
}

export default Welcome;