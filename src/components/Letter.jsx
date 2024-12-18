import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Tracker() {
	const [formData, setFormData] = useState({
		Letter_ID: '',
		Letter_Content: '',
		DATE_STAMP: Date.now()
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [focused, setFocused] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));
		// Ensure it stays focused once initially focused
		if (!focused) {
			setFocused(true);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Basic validation
		if (!formData.Letter_Content.trim()) {
			setError('Please write a letter before submitting');
			return;
		}

		setLoading(true);
		setError(null);

		try {
			formData.Letter_ID = uuidv4();
			const response = await fetch(
				'https://en8wzmrqp0.execute-api.us-east-1.amazonaws.com/DELETE/SantaLetter',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				}
			);

			console.log(response);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to submit data');
			}

			const result = await response.json();
			console.log('Success:', result);
			// Optional: Reset form or show success message
			setFormData({
				Letter_ID: uuidv4(),
				Letter_Content: '',
				DATE_STAMP: Date.now()
			});
			let subBut = document.getElementById('submit-letter-button');
			subBut.textContent = 'LETTER SENT!';
			setTimeout(() => {
				subBut.textContent = 'Send another?';
			}, 3000);
			setFocused(false);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-[50vh] min-w-screen flex items-center justify-center p-6 text-white">
			<div className="w-full min-h-[20vh] flex flex-col justify-center max-w-2xl bg-[#222b45] shadow-2xl rounded-3xl border-4 border-[#2df5ff] p-8 relative overflow-hidden">
				<div className="text-center mb-8 relative z-10">
					<h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2ecc71] to-[#34b1db] mb-4">
						🎄 Santa's Secret Mailbox ❄️
					</h1>
					<p className="text-lg text-gray-300 italic">
						Whisper your holiday magic into the night...
					</p>
				</div>
				<form
					onSubmit={handleSubmit}
					className="space-y-6 relative z-10"
				>
					<div>
						<textarea
							id="letter_content"
							name="Letter_Content"
							value={formData.Letter_Content}
							onChange={handleInputChange}
							onFocus={() => setFocused(true)}
							required
							placeholder="Dear Santa..."
							className={`
                                w-full
                                p-4
                                rounded-2xl
                                transition-all
                                duration-500
                                ease-in-out
                                bg-[#2c3e50]
                                border-2
                                ${
									focused
										? 'border-[#2ecc71] ring-4 ring-[#27ae60] text-white h-72'
										: 'border-[#34495e] h-24 hover:border-[#3498db]'
								}
                                text-lg
                                focus:outline-none
                                resize-none
                                shadow-lg
                            `}
							style={{
								fontFamily: "'Caveat', cursive, sans-serif",
								backgroundImage:
									'linear-gradient(to right, transparent 0px, transparent 21px, #ff6f6f1a 21px, transparent 22px)',
								backgroundSize: '22px 100%',
								lineHeight: '1.7'
							}}
						/>
					</div>
					<div className="flex justify-center">
						<button
							id="submit-letter-button"
							type="submit"
							disabled={loading}
							className="
                                px-8
                                py-3
                                bg-gradient-to-r
                                from-[#2ecc71]
                                to-[#3498db]
                                text-white
                                font-bold
                                rounded-full
                                hover:from-[#27ae60]
                                hover:to-[#2980b9]
                                transition-all
                                duration-300
                                disabled:opacity-50
                            "
						>
							{loading
								? 'Sending to North Pole...'
								: 'Send to Santa'}
						</button>
					</div>
					{error && (
						<p className="text-red-400 text-center mt-2 animate-bounce">
							{error}
						</p>
					)}
				</form>
				<div className="text-center text-xs text-gray-300 mt-4 relative z-10">
					Your letter is encrypted with festive magic! 🎄❄️
				</div>
			</div>
		</div>
	);
}

export default Tracker;
