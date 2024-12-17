import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../store/slices/exampleSlice'; // Import slice actions

function Home() {
	const count = useSelector((state) => state.example.value); // Get the value from Redux state
	const [APICount, setAPICount] = useState(0); // Default value set to 0
	const dispatch = useDispatch(); // Access the dispatch function
	const [loading, setLoading] = useState(true);

	// Function to localize the combined count
	const localizedInteger = () => {
		let theLocalizedInt = count + APICount;
		let toReturn = theLocalizedInt.toLocaleString(); // Localize the number
		return toReturn;
	};

	useEffect(() => {
		const fetchCount = async () => {
			try {
				const response = await fetch(
					'https://www.random.org/integers/?num=1&min=100&max=1000&col=1&base=10&format=plain&rnd=new'
				); // API for random number

				const data = await response.text();
				setAPICount(Number(data.trim())); // Parse the response to a number and update state
			} catch (error) {
				console.error('Error fetching count:', error);
			} finally {
				setLoading(false); // Set loading to false after data fetch
			}
		};

		fetchCount();
	}, []);

	return (
		<>
			<div className="card mt-40">
				{/* Uncomment below to enable increment and decrement */}
				{/* <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button> */}
				<p className="absolute top-40 left-1/2 transform -translate-x-1/2">
					Letters Delivered:{' '}
					{loading ? 'Loading...' : localizedInteger()}
				</p>
			</div>
			<div className="h-full w-full mt-2">
				<h1 className="m-8 -mt-20 mb-10 udnerline">
					「Saint Nicholas' Webpage」
				</h1>
				<div className="hover:text-red-700 ease-in-out duration-1000">
					<h2 className="text-3xl pr-96">"H*, H*, Hold on...</h2>
					<h3 className="indent text-3xl pl-96">
						isn't this webpage an invasion of my privacy...?"
					</h3>
					<h3 className="indent text-3xl pl-96 mb-8">
						{' '}
						— Saint Nicholas
					</h3>
				</div>
				<p className="text-xl mt-4 text-wrap hover:text-green-800 ease-in-out transition-all duration-700">
					Silly santa! While you're on US-ground you don't have rights
					to privacy!
				</p>
				<p className="text-xl mt-4 text-wrap hover:text-green-800 ease-in-out transition-all duration-700">
					We can source all your information from data brokers—
					<strong>LEGALLY</strong>!
				</p>
				<p className="text-xl mt-4 text-wrap hover:text-green-800 ease-in-out transition-all duration-700">
					Who source all your information from big-tech, who sells
					your data to them—<strong>LEGALLY</strong>!
				</p>
				<p className="text-xl mt-4 text-wrap hover:text-green-800 ease-in-out transition-all duration-700">
					...Or deep-web data dumps sourced through data breaches—but
					the only illegal part is that big-tech wasn't paid for that
					now-distributed data, and if the data brokers don't disclose
					it, then it's still <em>STILL</em> done{' '}
					<strong>LEGALLY!</strong>
				</p>
				<br />
			</div>
			<div className="pt-20 flex items-center justify-center flex-col absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/4 text-3xl">
				<h2>
					<b>
						<i>Anyway... </i>
					</b>
					Would you like to...
				</h2>
				<ul className="flex flex-row justify-around flex-nowrap p-6">
					<li>
						<a
							href="/letter"
							className=" transition duration-300 from m-8 p-4 bg-slate-600 text-white rounded-lg ease-in-out hover:bg-slate-900 hover:text-[#00ffff] hover:underline hover:scale:180 shadow-md shadow-white hover:shadow-inner hover:shadow-[#00FF99]"
						>
							Send Letter
						</a>
					</li>
					<li>
						<a
							href="/tracker"
							className=" transition duration-300 from m-8 p-4 bg-slate-600 text-white rounded-lg ease-in-out hover:bg-slate-900 hover:text-[#00ffff] hover:underline hover:scale:180 shadow-md shadow-white hover:shadow-inner hover:shadow-[#00FF99]"
						>
							Track Santa
						</a>
					</li>
				</ul>
			</div>
		</>
	);
}

export default Home;
