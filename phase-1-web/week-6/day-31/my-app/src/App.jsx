// src/App.jsx
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Welcome from './components/Welcome';
import Counter from './components/Counter';
import Greeting from './components/Greeting';
import ThemeToggle from './components/ThemeToggle';
import ThemedCard from './components/ThemedCard';
import { useTheme } from './context/ThemeContext';

// Inner component that uses the theme
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
                    React Context API 🚀
                </h1>
                <p>Theme toggle with Context API</p>

                <ThemeToggle />

                <div style={{ width: '100%', maxWidth: '600px', marginTop: '20px' }}>
                    <ThemedCard title="📦 Props Example">
                        <Welcome name="Michael" age={27} />
                        <Welcome name="Alice" age={25} />
                    </ThemedCard>

                    <ThemedCard title="📊 State Example (Counter)">
                        <Counter />
                    </ThemedCard>

                    <ThemedCard title="🎯 Props + State Example">
                        <Greeting />
                    </ThemedCard>
                </div>
            </header>
        </div>
    );
}

// Main App component with ThemeProvider
function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;