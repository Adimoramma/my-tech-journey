// src/App.jsx
import './App.css';
import Welcome from './components/Welcome';
import Counter from './components/Counter';
import Greeting from './components/Greeting';
import PostList from './components/PostList';
import UserProfile from './components/UserProfile';
import { useState } from 'react';

function App() {
    const [userId, setUserId] = useState(1);

    return (
        <div className="App">
            <header className="App-header">
                <h1>React useEffect & Fetching Data 🚀</h1>
                <p>Learning how to fetch data from APIs</p>

                <div style={{ width: '100%', maxWidth: '600px' }}>
                    {/* Props Example */}
                    <h2>📦 Props Example</h2>
                    <Welcome name="Michael" age={27} />
                    <Welcome name="Alice" age={25} />

                    {/* State Example */}
                    <h2>📊 State Example (Counter)</h2>
                    <Counter />

                    {/* Props + State Example */}
                    <h2>🎯 Props + State Example</h2>
                    <Greeting />

                    {/* useEffect + Fetching Data */}
                    <h2>🌐 Fetching Data with useEffect</h2>
                    <PostList />

                    {/* Fetching Data with dynamic userId */}
                    <h2>🔄 Fetching with Dynamic ID</h2>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ marginRight: '10px' }}>
                            User ID:
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={userId}
                                onChange={(e) => setUserId(Number(e.target.value))}
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
                        <button
                            onClick={() => setUserId(userId)}
                            style={{
                                padding: '5px 15px',
                                marginLeft: '10px',
                                backgroundColor: '#61dafb',
                                color: '#282c34',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Load User
                        </button>
                    </div>
                    <UserProfile userId={userId} />
                </div>
            </header>
        </div>
    );
}

export default App;