// src/App.jsx
import './App.css';
import Welcome from './components/Welcome';
import Counter from './components/Counter';
import Greeting from './components/Greeting';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>React Props & State 🚀</h1>
                <p>Learning how components communicate</p>

                <div style={{ width: '100%', maxWidth: '600px' }}>
                    <h2>📦 Props Example</h2>
                    <Welcome name="Michael" age={27} />
                    <Welcome name="Alice" age={25} />
                    <Welcome name="Bob" />

                    <h2>📊 State Example (Counter)</h2>
                    <Counter />

                    <h2>🎯 Props + State Example</h2>
                    <Greeting />
                </div>
            </header>
        </div>
    );
}

export default App;