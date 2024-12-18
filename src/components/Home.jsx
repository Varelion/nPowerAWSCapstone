import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExampleData } from '../store/slices/exampleSlice'; // Import slice actions
import { format } from 'date-fns';

function Home() {
	const count = useSelector((state) => state.example.value); // Get the value from Redux state
	const allLetters = useSelector((state) => state.example.letters); // Get the value from Redux state
	const dispatch = useDispatch(); // Access the dispatch function
	const [loading, setLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [items, setItems] = useState([])

	// Function to localize the combined count
	const localizedInteger = () => {
		let theLocalizedInt = count + 0;
		let toReturn = theLocalizedInt.toLocaleString(); // Localize the number
		return toReturn;
	};

	const dateGetter = (x) => {
		const date = new Date(x);

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');

		const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		return formattedDate;
	};

	const handleClick = () => {
		isOpen ? setIsOpen(false) : setIsOpen(true);
	}

	const handleDelete = (key) =>{
		setItems(items.filter(item => item.id!=key))
	}

	useEffect(() => {
		dispatch(fetchExampleData());
	}, [count, dispatch]);

	useEffect(() => {
		count > 0 ? setLoading(false) : null;
	}, [count]);
	useEffect(() => {
		const x = allLetters.map((letter)=>{
			const formatedLetter = {
				"id": letter.Letter_ID,
				"text": letter.Letter_Content,
				"date": dateGetter(letter.DATE_STAMP)
			}
			return formatedLetter;
		});
		setItems(x)
	}, [allLetters]);

	// Commented out because I decided to use the store for this.
	// useEffect(() => {
	//     const fetchCount = async () => {
	//         try {
	//             const response = await fetch(
	// 				'https://en8wzmrqp0.execute-api.us-east-1.amazonaws.com/status/status',
	// 				{
	// 					method: 'GET'
	// 				}
	// 			);

	//             if (!response.ok) {
	//                 throw new Error(`HTTP error! status: ${response.status}`);
	//             }

	//             const data = await response.json();

	//             setAPICount(data);

	//             // If you want to update the DOM element
	//             let x = document.getElementById('box-holder');
	//             if (x) {
	//                 x.textContent = JSON.stringify(data);
	//             }
	//         } catch (error) {
	//             console.error('Error fetching count:', error);
	//             setAPICount(0); // Set a default value on error
	//         } finally {
	//             setLoading(false);
	//         }
	//     };

	//     fetchCount();
	// }, []);

	return (
		<>
			<div className="card mt-40">
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
			<div className=" flex items-center justify-center flex-col text-3xl">
				<h2 className="mb-10">
					<b>
						<i>Anyway... </i>
					</b>
					Would you like to...
				</h2>
				<ul className="flex flex-row justify-around flex-nowrap p-6">
					<li className="">
						<a
							href="/letter"
							className=" transition duration-300 from m-8 p-4 bg-slate-600 text-white rounded-lg ease-in-out hover:bg-slate-900 hover:text-[#00ffff] hover:underline hover:scale:180 shadow-md shadow-white hover:shadow-inner hover:shadow-[#00FF99]"
						>
							Send Letter
						</a>
					</li>
					<li>
						<button
							onMouseUp={loading ? null : () => handleClick()}
							className={
								loading
									? ' transition duration-1000 from m-8 p-4 bg-slate-600 text-white rounded-lg ease-in-out hover:bg-slate-900 hover:text-[#00ffff] hover:underline hover:scale:180 shadow-md shadow-white hover:shadow-inner hover:shadow-[#00FF99]'
									: ' transition duration-1000 from m-8 p-4 bg-red-600 text-black rounded-lg ease-in-out hover:bg-red-900 hover:text-[#000000] hover:underline hover:scale:180 shadow-md shadow-black hover:shadow-inner hover:shadow-[#000000]'
							}
						>
							{loading ? 'Loading...' : 'Read All Letters'}
						</button>
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
				<div
					id="box-holder"
					className=" bg-red- text-white text-left overflow-auto relative"
				>
					{' '}
					{isOpen ? (
						<div className="flex justify-end ">
							<button
								className=" right-0   py-4 px-1 m-6 text-3xl rounded-xl  transition duration-300 from m-8 p-4 bg-slate-600 text-white rounded-lg ease-in-out hover:bg-slate-900 hover:text-[#00ffff] hover:underline hover:scale:180 shadow-md shadow-white hover:shadow-inner hover:shadow-[#00FF99]"
								onMouseUp={() => handleClick()}
							>
								「X」
							</button>
						</div>
					) : null}
					{/* <AllLetters open={isOpen} onClose={() => setIsOpen(false)}>
						"TEST"
					</AllLetters> */}
					{isOpen
						? items.map((letter, key) => {
								return (
									<div className="mb-8" key={letter['id']}>
										<ul className='relative'>
											<li>
												{' '}
												{key == 0 ? <hr /> : null}
												{key == 0 ? (
													<p className="mt-8" />
												) : null}
												<strong>
													Letter Was Sent On:{' '}
												</strong>{' '}
												<button
													className="mx-0 my-0 py-0 px-3 transition duration-300 from m-8 p-4 bg-slate-600 text-white rounded-full ease-in-out hover:bg-slate-900 hover:text-[#00ffff] hover:underline hover:scale:180 shadow-md shadow-white hover:shadow-inner hover:shadow-[#00FF99] absolute right-5 "
													onMouseUp={() =>
														handleDelete(letter.id)
													}
												>
													x
												</button>
												<p className="pl-[4em] pb-4">
													{letter['date']}
												</p>
											</li>
											<li>
												<strong>Letter ID: </strong>{' '}
												<p className="pl-[4em] pb-4">
													{letter['id']}
												</p>
											</li>
											<li>
												<strong>Letter Content:</strong>
												<p className="mb-8 pl-[4em] ">
													{letter['text']}
												</p>
												<hr />
											</li>
										</ul>
									</div>
								);
						  })
						: null}
				</div>
			</div>
		</>
	);
}

export default Home;
