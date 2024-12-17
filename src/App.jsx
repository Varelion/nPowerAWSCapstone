import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Router, Route, and Link
import './App.css';
import Home from './components/Home';
import Letter from './components/Letter';
import Tracker from './components/Tracker';

function App() {
	return (
		<Router>
			{' '}
			<div className="min-h-[120vh] -mt-20 min-w-screen bg-gradient-to-r from-[#1a2238] via-[#0f1422] to-[#1a2238] flex flex-col justify-between p-6 text-white">
				{/* Navigation Bar */}
				<nav className="absolute min-h-30 top-0 left-1/2 transform -translate-x-1/2 w-full  z-10">
					<ul className="flex flex-row justify-around w-full h-full">
						<li className="p-4 text-3xl font-extrabold ">
							<Link
								className="hover:text-[#00ffff] ease-in-out duration-300 relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto"
								to="/"
							>
								「Home」
								<span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl box-content font-extrabold text-transparent text-center select-none hover:text-[#00ffff] ease-in-out duration-300 hover:blur-3xl">
									「Home」
								</span>
							</Link>{' '}
							{/* Links to each route */}
						</li>
						<li className="p-4 text-3xl font-extrabold ">
							<Link
								className="hover:text-[#00ffff] ease-in-out duration-300 relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto"
								to="/Letter"
							>
								「Letter」
								<span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl box-content font-extrabold text-transparent text-center select-none hover:text-[#00ffff] ease-in-out duration-300 hover:blur-3xl">
									「Letter」
								</span>
							</Link>
						</li>
						<li className="p-4 text-3xl font-extrabold ">
							<Link
								className="hover:hover:text-[#00ffff]  relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto"
								to="/tracker"
							>
								「Tracker」
								<span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl box-content font-extrabold text-transparent text-center select-none hover:text-[#00ffff] ease-in-out duration-300 hover:blur-3xl">
									「Tracker」
								</span>
							</Link>
						</li>
					</ul>
				</nav>

				<div className="w-full max-w-4xl mx-auto mt-24">
					{' '}
					{/* Routes */}
					<Routes>
						{' '}
						<Route path="/" element={<Home />} />{' '}
						<Route path="/Letter" element={<Letter />} />
						<Route path="/tracker" element={<Tracker />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
