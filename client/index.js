import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './fortune.css'; 

function App() {
	const [mbti, setMbti] = useState('');
	const [zodiac, setZodiac] = useState('');
	const [fortune, setFortune] = useState(null);

	const [friendName, setFriendName] = useState('');
  const [friendMbti, setFriendMbti] = useState('');
  const [friendZodiac, setFriendZodiac] = useState('');
  const [compatibilityResult, setCompatibilityResult] = useState(null);
	const [showFriendForm, setShowFriendForm] = useState(false);

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

	const toggleFriendForm = () => {
    setShowFriendForm(!showFriendForm);
  };

  // Check compatibility based on MBTI and Zodiac
  const checkCompatibility = () => {
    if (mbti === friendMbti && zodiac === friendZodiac) {
      setCompatibilityResult('You and your friend are highly compatible!');
    } else {
      setCompatibilityResult('Score: 88%. \n' +
				'Your compatibility could be better. But you can still be great friends! \n' +
				'You have a different style of communication from this person, and you’ll need to make some accommodations if this relationship is to reach its full potential. \n' +
				'You both get overstimulated by too much activity and both enjoy spending quiet time alone. You and your partner might often find yourself at home with takeout and Netflix, or even in the same room without actually talking to each other, and you’re both okay with that. You likely both have small but intimate circles of friends and there may be no great urgency to work your way into each other’s friendship circles as a way of deepening your own bond. Personal boundaries are important to you, and you respect each other’s personal space by default.');
    }
  };

  return( 
		<div>
			<h1>The Future is in Your Hands</h1>
			<div className="selection-container">
				<div className="input-group">
					<label>Choose your MBTI Type: </label>
					<select onChange={(e) => setMbti(e.target.value)}>
						<option value="INTJ">INTJ</option>
						<option value="ISFP">ISFP</option>
						<option value="ISTP">ISTP</option>
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
						<option value="Aquarius">Aquarius</option>
						<option value="Leo">Leo</option>
						<option value="Libra">Libra</option>
						{/* Add all 16 MBTI types */}
					</select>
				</div>
			</div>
			<div className="button-container">
				<button onClick={fetchFortune}>Explore Your Potential</button>
				<button onClick={toggleFriendForm}>+ Add Record</button>
			</div>

			{showFriendForm && (
        <div className="friend-form">
          <h2>Enter Information</h2>
          <label>Name: </label>
          <input
            type="text"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
          />

					<label>MBTI: </label>
          <select
            value={friendMbti}
            onChange={(e) => setFriendMbti(e.target.value)}
          >
            <option value="INTJ">INTJ</option>
            <option value="ISFP">ISFP</option>
						<option value="ISTP">ISTP</option>
            <option value="ENTJ">ENTJ</option>
            <option value="ESFP">ESFP</option>
            {/* Add all 16 MBTI types */}
          </select>

          <label>Zodiac Sign: </label>
          <select
            value={friendZodiac}
            onChange={(e) => setFriendZodiac(e.target.value)}
          >
            <option value="Aries">Aries</option>
            <option value="Leo">Leo</option>
						<option value="Libra">Libra</option>
            <option value="Pisces">Pisces</option>
            <option value="Cancer">Cancer</option>
            {/* Add all Zodiac signs */}
          </select>

          <button onClick={checkCompatibility}>Check Compatibility</button>
        </div>
      )}

			{compatibilityResult && (
        <div className="compatibility-result">
          <h2>Compatibility Result</h2>
          <p>{compatibilityResult}</p>
        </div>
      )}

			{fortune && (
        <div className="fortune-display">
          <h2>Snapshot</h2>
          <p>{fortune.snapshot}</p>

          <h2>Intuitive vs Analytical</h2>
          <p><strong>{fortune.heart_mind.type}:</strong> {fortune.heart_mind.message}</p>

          <h2>Consistent vs Vibrant</h2>
          <p><strong>{fortune.rhythm_of_being.type}:</strong> {fortune.rhythm_of_being.message}</p>

          <h2>Receptive vs Assertive</h2>
          <p><strong>{fortune.inner_drive.type}:</strong> {fortune.inner_drive.message}</p>
        </div>
      )}
		</div>
	)
}

// Find the root element
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render the App component
root.render(<App />);

export default App;