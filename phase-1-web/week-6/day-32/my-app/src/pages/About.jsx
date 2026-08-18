// src/pages/About.jsx
function About() {
    return (
        <div>
            <h2>📖 About This App</h2>
            <p>This is a demo React app built with React Router.</p>
            <p>It demonstrates:</p>
            <ul style={styles.list}>
                <li>✅ Client-side routing with React Router</li>
                <li>✅ Dynamic routes with parameters</li>
                <li>✅ Navigation with Links</li>
                <li>✅ Nested pages</li>
            </ul>
            <p>Built by Michael 🚀</p>
        </div>
    );
}

const styles = {
    list: {
        textAlign: 'left',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '10px 20px',
        color: '#b0b0b0',
        lineHeight: '1.8',
    },
};

export default About;