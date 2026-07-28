// src/App.jsx
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <h1>React Router Demo 🚀</h1>
                    <p>Client-side routing with React Router</p>

                    {/* Navigation */}
                    <nav style={styles.nav}>
                        <Link to="/" style={styles.navLink}>🏠 Home</Link>
                        <Link to="/posts" style={styles.navLink}>📝 Posts</Link>
                        <Link to="/about" style={styles.navLink}>📖 About</Link>
                        <Link to="/contact" style={styles.navLink}>📧 Contact</Link>
                    </nav>
                </header>

                {/* Page Content */}
                <main style={styles.main}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/posts" element={<Posts />} />
                        <Route path="/posts/:id" element={<PostDetail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

const styles = {
    nav: {
        display: 'flex',
        gap: '20px',
        marginTop: '15px',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    navLink: {
        color: '#61dafb',
        textDecoration: 'none',
        fontSize: '16px',
        padding: '8px 16px',
        borderRadius: '4px',
        transition: 'background-color 0.2s',
        backgroundColor: 'rgba(97, 218, 251, 0.1)',
    },
    main: {
        width: '100%',
        maxWidth: '700px',
        padding: '20px',
        marginTop: '20px',
        backgroundColor: '#1e2636',
        borderRadius: '8px',
        border: '2px solid #61dafb',
        minHeight: '300px',
    },
};

export default App;