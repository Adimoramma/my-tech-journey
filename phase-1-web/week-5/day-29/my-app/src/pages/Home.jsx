// src/pages/Home.jsx
import Welcome from '../components/Welcome';
import Counter from '../components/Counter';
import Greeting from '../components/Greeting';

function Home() {
    return (
        <div>
            <h2>🏠 Home Page</h2>
            <p>Welcome to my React Router demo!</p>

            <h3>📦 Props Example</h3>
            <Welcome name="Michael" age={27} />
            <Welcome name="Alice" age={25} />

            <h3>📊 State Example (Counter)</h3>
            <Counter />

            <h3>🎯 Props + State Example</h3>
            <Greeting />
        </div>
    );
}

export default Home;