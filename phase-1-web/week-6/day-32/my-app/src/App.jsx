// src/App.jsx
import './App.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Settings from './components/Settings';

function AppContent() {
    const { isDark } = useTheme();

    return (
        <div className="App" style={{
            backgroundColor: isDark ? '#282c34' : '#f0f4f8',
            color: isDark ? '#e0e0e0' : '#333',
            minHeight: '100vh',
            transition: 'all 0.3s',
            padding: '20px'
        }}>
            <header className="App-header">
                <h1 style={{ color: isDark ? '#61dafb' : '#2c3e50' }}>
                    React Custom Hooks 🪝
                </h1>
                <p>Reusable logic with custom hooks</p>

                <div style={{ width: '100%', maxWidth: '700px', marginTop: '20px' }}>
                    <Settings />
                </div>
            </header>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;