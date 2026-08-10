// src/components/LoadingSpinner.jsx
function LoadingSpinner({ message = 'Loading...' }) {
    return (
        <div style={styles.container}>
            <div style={styles.spinner}></div>
            <p>{message}</p>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '40px 0',
    },
    spinner: {
        border: '4px solid #3a4050',
        borderTop: '4px solid #61dafb',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 15px',
    },
};

export default LoadingSpinner;