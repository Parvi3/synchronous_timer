import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import './App.css';

const App = () => {
	const [start, setStart] = useState(JSON.parse(localStorage.getItem('start')));
	const [totalSeconds, setTotalSeconds] = useState(JSON.parse(localStorage.getItem('total')));

	useEffect(() => {
		const handleStorageChange = (event) => {
			if (event.key === 'start') {
				setStart(JSON.parse(event.newValue));
			}
			if (event.key === 'total') {
				setTotalSeconds(JSON.parse(event.newValue));
			}
		};

		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	useEffect(() => {
		let timer;
		if (start) {
			timer = setInterval(() => {
				setTotalSeconds(prev => prev + 1);
				localStorage.setItem('total', JSON.stringify(totalSeconds + 1));
			}, 1000);
		}

		return () => {
			clearInterval(timer);
			if (start) {
				localStorage.setItem('total', JSON.stringify(totalSeconds + 1));
			}
		};
	}, [start, totalSeconds]);

	const onClick = () => {
		setStart(prev => !prev);
		localStorage.setItem('start', JSON.stringify(!start));
	};


	const seconds = totalSeconds % 60;
	const minutes = Math.floor(totalSeconds / 60);
	const time = `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;

	return (
		<>
			<div className="app">
				<div
					className="timer">{time}</div>
				<div className="buttons">
					<Button disabled={start} onClick={onClick} variant="contained" sx={{width: 100}}>Start</Button>
					<Button disabled={!start} onClick={onClick} variant="contained" sx={{width: 100}}>Stop</Button>
				</div>
			</div>
		</>
	);
};

export default App;
