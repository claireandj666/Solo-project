import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './fortune.css'; 

function App() {
	const [mbti, setMbti] = useState('INTJ');
	const [zodiac, setZodiac] = useState('Aries');
	const [fortune, setFortune] = useState(null);

	// function handleMbtiChange(e) {
	// 	setMbti(e.target.value);
	// }

	// function handleZodiacChange(e) {
	// 	setZodiac(e.target.value);
	// }

	// const fetchFortune = async () => {
  //   const response = await fetch(`http://localhost:3000/api/fortune?mbti=${mbti}&zodiac=${zodiac}`);
  //   const data = await response.json();
  //   setFortune(data);
  // };

	const fetchFortune = async () => {
		fetch(`http://localhost:3000/api/fortune?mbti=${mbti}&zodiac=${zodiac}`)
		.then((response) => {
			if (!response.ok) throw new Error('Failed to fetch fortune');
			return response.json();
		})
		.then((data) => {
			console.log(data); // Handle response data
			setFortune(data); 
		})
		.catch((error) => {
			console.error(error);
		});

	}

  return( 
		<div>
			<h1>Welcome to the MBTI-Zodiac Fortune Teller App!</h1>
			<div className="selection-container">
				<div className="input-group">
					<label>Choose your MBTI Type: </label>
					<select onChange={(e) => setMbti(e.target.value)}>
						<option value="INTJ">INTJ</option>
						<option value="ISFP">ISFP</option>
						<option value="ENTJ">ENTJ</option>
						<option value="ESFP">ESFP</option>
						{/* Add all 16 MBTI types */}
					</select>
				</div>
				<div className="input-group">
					<label>Choose your Zodiac Sign: </label>
					<select onChange={(e) => setZodiac(e.target.value)}>
						<option value="Pisces">Pisces</option>
						<option value="Aries">Aries</option>
						<option value="Cancer">Cancer</option>
						<option value="Leo">Leo</option>
						{/* Add all 16 MBTI types */}
					</select>
				</div>
			</div>
			<div className="button-container">
				<button onClick={fetchFortune}>Reveal Your Fotune</button>
			</div>

			{fortune && (
        <div className="fortune-display">
          <h2>Overview</h2>
          <p>{fortune.overview}</p>

          <h2>Emotional vs Logical</h2>
          <p><strong>{fortune.emotional_logical.type}:</strong> {fortune.emotional_logical.message}</p>

          <h2>Static vs Dynamic</h2>
          <p><strong>{fortune.static_dynamic.type}:</strong> {fortune.static_dynamic.message}</p>

          <h2>Passive vs Aggressive</h2>
          <p><strong>{fortune.passive_aggressive.type}:</strong> {fortune.passive_aggressive.message}</p>
        </div>
      )}
		</div>
	)
}

// Find the root element
const rootElement = document.getElementById('root');

// Create a root for React 18
const root = createRoot(rootElement);

// Render the App component
root.render(<App />);

export default App;