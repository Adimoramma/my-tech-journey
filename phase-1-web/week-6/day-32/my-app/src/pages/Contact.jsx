// src/pages/Contact.jsx
import { useState } from 'react';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would send this data to your API
        console.log('Form submitted:', { name, email, message });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div>
            <h2>📧 Contact Us</h2>
            <p>Fill out the form below and we'll get back to you!</p>

            {submitted ? (
                <div style={styles.success}>
                    ✅ Thank you! Your message has been sent.
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={styles.textarea}
                        rows="5"
                        required
                    />
                    <button type="submit" style={styles.button}>
                        Send Message
                    </button>
                </form>
            )}
        </div>
    );
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '500px',
        margin: '0 auto',
    },
    input: {
        padding: '12px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #3a4050',
        backgroundColor: '#282c34',
        color: 'white',
    },
    textarea: {
        padding: '12px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #3a4050',
        backgroundColor: '#282c34',
        color: 'white',
        fontFamily: 'inherit',
        resize: 'vertical',
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#61dafb',
        color: '#282c34',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    success: {
        padding: '20px',
        backgroundColor: '#2ecc71',
        color: '#282c34',
        borderRadius: '4px',
        fontSize: '18px',
        fontWeight: 'bold',
    },
};

export default Contact;