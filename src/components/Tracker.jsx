import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Tracker = () => {
	const [cityName, setCityName] = useState('');
	const [cityLon, setCityLon] = useState(0);
	const [cityLat, setCityLat] = useState(0);

	const landCoordinates = [
		// North America
		{ lat: 37.7749, lon: -122.4194, name: 'San Francisco, USA' }, //
		{ lat: 40.7128, lon: -74.006, name: 'New York City, USA' }, //
		{ lat: 45.4215, lon: -75.6972, name: 'Ottawa, Canada' }, //
		{ lat: 19.4326, lon: -99.1332, name: 'Mexico City, Mexico' }, //
		{ lat: 39.7392, lon: -104.9903, name: 'Denver, USA' }, //

		// South America
		{ lat: -34.6037, lon: -58.3816, name: 'Buenos Aires, Argentina' }, //
		{ lat: -22.9068, lon: -43.1729, name: 'Rio de Janeiro, Brazil' }, //
		{ lat: -12.0464, lon: -77.0428, name: 'Lima, Peru' }, //
		{ lat: -0.1807, lon: -78.4678, name: 'Quito, Ecuador' }, //
		{ lat: -3.119, lon: -60.0217, name: 'Manaus, Brazil' }, //

		// Europe
		{ lat: 48.8566, lon: 2.3522, name: 'Paris, France' }, //
		{ lat: 51.5074, lon: -0.1278, name: 'London, UK' }, //
		{ lat: 55.7558, lon: 37.6173, name: 'Moscow, Russia' }, //
		{ lat: 41.9028, lon: 12.4964, name: 'Rome, Italy' }, //
		{ lat: 60.1699, lon: 24.9384, name: 'Helsinki, Finland' }, //

		// Africa
		{ lat: -1.286389, lon: 36.817223, name: 'Nairobi, Kenya' }, //
		{ lat: 30.0444, lon: 31.2357, name: 'Cairo, Egypt' }, //
		{ lat: -26.2041, lon: 28.0473, name: 'Johannesburg, South Africa' }, //
		{ lat: 15.5007, lon: 32.5599, name: 'Khartoum, Sudan' }, //
		{ lat: 5.6037, lon: -0.187, name: 'Accra, Ghana' }, //

		// Asia
		{ lat: 35.6895, lon: 139.6917, name: 'Tokyo, Japan' }, //
		{ lat: 28.6139, lon: 77.209, name: 'New Delhi, India' }, //
		{ lat: 39.9042, lon: 116.4074, name: 'Beijing, China' }, //
		{ lat: 21.0278, lon: 105.8342, name: 'Hanoi, Vietnam' }, //
		{ lat: 13.7563, lon: 100.5018, name: 'Bangkok, Thailand' }, //

		// Australia & Oceania
		{ lat: -33.8688, lon: 151.2093, name: 'Sydney, Australia' }, //
		{ lat: -37.8136, lon: 144.9631, name: 'Melbourne, Australia' }, //
		{ lat: -41.2865, lon: 174.7762, name: 'Wellington, New Zealand' }, //
		{ lat: -17.7134, lon: 178.065, name: 'Suva, Fiji' }, //
		{ lat: -9.4438, lon: 147.1803, name: 'Port Moresby, Papua New Guinea' }, //

		// Middle East
		{ lat: 25.276987, lon: 55.296249, name: 'Dubai, UAE' }, //
		{ lat: 31.7683, lon: 35.2137, name: 'Jerusalem, Israel' }, //
		{ lat: 29.3759, lon: 47.9774, name: 'Kuwait City, Kuwait' }, //
		{ lat: 33.5138, lon: 36.2765, name: 'Damascus, Syria' }, //
		{ lat: 24.7136, lon: 46.6753, name: 'Riyadh, Saudi Arabia' }, //

		// Additional Points
		{ lat: 64.1355, lon: -21.8954, name: 'Reykjavik, Iceland' }, //
		{ lat: 59.9139, lon: 10.7522, name: 'Oslo, Norway' }, //
		{ lat: 43.6532, lon: -79.3832, name: 'Toronto, Canada' }, //
		{ lat: -8.4095, lon: 115.1889, name: 'Bali, Indonesia' }, //
		{ lat: -25.7461, lon: 28.1881, name: 'Pretoria, South Africa' }, //
		{ lat: 55.8642, lon: -4.2518, name: 'Glasgow, Scotland' }, //
		{ lat: 52.52, lon: 13.405, name: 'Berlin, Germany' }, //
		{ lat: 37.9838, lon: 23.7275, name: 'Athens, Greece' }, //
		{ lat: 34.6937, lon: 135.5022, name: 'Osaka, Japan' }, //
		{ lat: 53.3498, lon: -6.2603, name: 'Dublin, Ireland' }, //
		{ lat: 35.0116, lon: 135.7681, name: 'Kyoto, Japan' }, //
		{ lat: -6.2088, lon: 106.8456, name: 'Jakarta, Indonesia' }, //
		{ lat: -15.7942, lon: -47.8822, name: 'Brasília, Brazil' }, //
		{ lat: 52.3676, lon: 4.9041, name: 'Amsterdam, Netherlands' }, //
		{ lat: 34.0522, lon: -118.2437, name: 'Los Angeles, USA' }, //
		{ lat: 1.3521, lon: 103.8198, name: 'Singapore' }, //
		{ lat: 23.1291, lon: 113.2644, name: 'Guangzhou, China' }, //
		{ lat: 50.8503, lon: 4.3517, name: 'Brussels, Belgium' }, //
		{ lat: 41.0082, lon: 28.9784, name: 'Istanbul, Turkey' }, //
		{ lat: 59.3293, lon: 18.0686, name: 'Stockholm, Sweden' }, //
		{ lat: -33.4489, lon: -70.6693, name: 'Santiago, Chile' }, //
		{ lat: 35.8896, lon: 14.5189, name: 'Valletta, Malta' }, //
		{ lat: 27.7172, lon: 85.324, name: 'Kathmandu, Nepal' }, //
		{ lat: 18.5204, lon: 73.8567, name: 'Pune, India' }, //
		{ lat: 32.7767, lon: -96.797, name: 'Dallas, USA' }, //
		{ lat: -29.8597, lon: 31.0218, name: 'Durban, South Africa' }, //
		{ lat: 6.5244, lon: 3.3792, name: 'Lagos, Nigeria' }, //
		{ lat: 53.5511, lon: 9.9937, name: 'Hamburg, Germany' }, //
		{ lat: -20.1639, lon: 57.4991, name: 'Port Louis, Mauritius' }, //
		{ lat: -35.282, lon: 149.1287, name: 'Canberra, Australia' }, //
		{ lat: 55.9533, lon: -3.1883, name: 'Edinburgh, Scotland' }, //
		// North America
		{ lat: 36.1627, lon: -86.7816, name: 'Nashville, USA' }, //
		{ lat: 34.0522, lon: -118.2437, name: 'Los Angeles, USA' }, //
		{ lat: 43.65107, lon: -79.347015, name: 'Toronto, Canada' }, //
		{ lat: 49.2827, lon: -123.1207, name: 'Vancouver, Canada' }, //
		{ lat: 20.6597, lon: -103.3496, name: 'Guadalajara, Mexico' }, //
		{ lat: 29.4241, lon: -98.4936, name: 'San Antonio, USA' }, //
		{ lat: 35.0844, lon: -106.6504, name: 'Albuquerque, USA' }, //
		{ lat: 61.2181, lon: -149.9003, name: 'Anchorage, USA' }, //
		{ lat: 44.9537, lon: -93.09, name: 'Saint Paul, USA' }, //
		{ lat: 41.8781, lon: -87.6298, name: 'Chicago, USA' }, //

		// South America
		{ lat: -33.4489, lon: -70.6693, name: 'Santiago, Chile' }, //
		{ lat: -23.5505, lon: -46.6333, name: 'São Paulo, Brazil' }, //
		{ lat: -2.1962, lon: -79.8862, name: 'Guayaquil, Ecuador' }, //
		{ lat: -16.4897, lon: -68.1193, name: 'La Paz, Bolivia' }, //
		{ lat: -25.2637, lon: -57.5759, name: 'Asunción, Paraguay' }, //
		{ lat: -19.9208, lon: -43.9378, name: 'Belo Horizonte, Brazil' }, //
		{ lat: -10.951, lon: -37.0718, name: 'Aracaju, Brazil' }, //
		{ lat: 4.711, lon: -74.0721, name: 'Bogotá, Colombia' }, //
		{ lat: -15.7754, lon: -47.7972, name: 'Brasília, Brazil' }, //
		{ lat: -8.112, lon: -35.0162, name: 'Recife, Brazil' }, //

		// Europe
		{ lat: 50.9375, lon: 6.9603, name: 'Cologne, Germany' }, //
		{ lat: 48.1351, lon: 11.582, name: 'Munich, Germany' }, //
		{ lat: 47.4979, lon: 19.0402, name: 'Budapest, Hungary' }, //
		{ lat: 40.4168, lon: -3.7038, name: 'Madrid, Spain' }, //
		{ lat: 45.815, lon: 15.9819, name: 'Zagreb, Croatia' }, //
		{ lat: 59.4369, lon: 24.7536, name: 'Tallinn, Estonia' }, //
		{ lat: 54.6872, lon: 25.2797, name: 'Vilnius, Lithuania' }, //
		{ lat: 41.3851, lon: 2.1734, name: 'Barcelona, Spain' }, //
		{ lat: 53.4285, lon: 14.5528, name: 'Szczecin, Poland' }, //
		{ lat: 38.7223, lon: -9.1393, name: 'Lisbon, Portugal' }, //

		// Africa
		{ lat: 14.6937, lon: -17.4441, name: 'Dakar, Senegal' }, //
		{ lat: 4.8156, lon: 7.0498, name: 'Port Harcourt, Nigeria' }, //
		{ lat: 35.6892, lon: -0.6308, name: 'Oran, Algeria' }, //
		{ lat: 6.4291, lon: -3.4372, name: 'San Pedro, Ivory Coast' }, //
		{ lat: -1.9499, lon: 30.0588, name: 'Kigali, Rwanda' }, //
		{ lat: 31.6325, lon: -8.0092, name: 'Marrakesh, Morocco' }, //
		{ lat: -11.682, lon: 27.478, name: 'Lubumbashi, DR Congo' }, //
		{ lat: 36.8065, lon: 10.1815, name: 'Tunis, Tunisia' }, //
		{ lat: -33.9249, lon: 18.4241, name: 'Cape Town, South Africa' }, //
		{ lat: -4.2709, lon: 15.2807, name: 'Kinshasa, DR Congo' }, //

		// Asia
		{ lat: 1.29027, lon: 103.851959, name: 'Singapore' }, //
		{ lat: 13.0827, lon: 80.2707, name: 'Chennai, India' }, //
		{ lat: 37.5665, lon: 126.978, name: 'Seoul, South Korea' }, //
		{ lat: 22.3964, lon: 114.1095, name: 'Hong Kong, China' }, //
		{ lat: 31.2304, lon: 121.4737, name: 'Shanghai, China' }, //
		{ lat: 23.8103, lon: 90.4125, name: 'Dhaka, Bangladesh' }, //
		{ lat: 35.6762, lon: 139.6503, name: 'Tokyo, Japan' }, //
		{ lat: 24.8615, lon: 67.0099, name: 'Karachi, Pakistan' }, //
		{ lat: 33.6844, lon: 73.0479, name: 'Islamabad, Pakistan' }, //
		{ lat: 13.7563, lon: 100.5018, name: 'Bangkok, Thailand' }, //

		// Australia & Oceania
		{ lat: -27.4698, lon: 153.0251, name: 'Brisbane, Australia' }, //
		{ lat: -31.9505, lon: 115.8605, name: 'Perth, Australia' }, //
		{ lat: -35.2809, lon: 149.13, name: 'Canberra, Australia' }, //
		{ lat: -29.7854, lon: 151.1138, name: 'Armidale, Australia' }, //
		{ lat: -36.8509, lon: 174.7645, name: 'Auckland, New Zealand' }, //
		{ lat: -21.141, lon: 149.1867, name: 'Mackay, Australia' }, //
		{ lat: -16.9186, lon: 145.7781, name: 'Cairns, Australia' }, //
		{ lat: -43.5321, lon: 172.6362, name: 'Christchurch, New Zealand' }, //
		{ lat: -22.2775, lon: 166.4572, name: 'Nouméa, New Caledonia' }, //
		{ lat: -8.5568, lon: 125.5603, name: 'Dili, East Timor' }, //

		// Middle East
		{ lat: 33.8946, lon: 35.5018, name: 'Beirut, Lebanon' }, //
		{ lat: 35.9392, lon: 39.3302, name: 'Aleppo, Syria' }, //
		{ lat: 32.0853, lon: 34.7818, name: 'Tel Aviv, Israel' }, //
		{ lat: 24.7743, lon: 46.7386, name: 'Riyadh, Saudi Arabia' }, //
		{ lat: 25.276987, lon: 55.296249, name: 'Dubai, UAE' }, //
		{ lat: 36.2309, lon: 37.1706, name: 'Aleppo, Syria' }, //
		{ lat: 29.3117, lon: 47.4818, name: 'Kuwait City, Kuwait' }, //
		{ lat: 35.6892, lon: 51.389, name: 'Tehran, Iran' }, //
		{ lat: 31.7683, lon: 35.2137, name: 'Jerusalem, Israel' }, //
		{ lat: 29.3759, lon: 47.9774, name: 'Kuwait City, Kuwait' }, //

		// Additional Points
		{ lat: 64.9631, lon: -19.0208, name: 'Akureyri, Iceland' }, //
		{ lat: 45.5017, lon: -73.5673, name: 'Montreal, Canada' }, //
		{ lat: 41.3888, lon: 2.159, name: 'Valencia, Spain' }, //
		{ lat: -22.9707, lon: -43.1823, name: 'Niterói, Brazil' }, //
		{ lat: 31.5497, lon: -110.2778, name: 'Nogales, Mexico' }, //
		{ lat: -21.2068, lon: 174.89, name: 'Suva, Fiji' } // Suva, Fiji
	];
	function roundingCord(num) {
		return Number(num.toFixed(4));
	}

	function ranBoolGen() {
		return Math.random() < 0.5;
	}

	function modifyVal(landCoordinates) {
		for (let i = 0; i < 2; i++) {
			switch (i) {
				case 0:
					if (ranBoolGen()) {
						landCoordinates.lat =
							landCoordinates.lat + Math.random() * 0.1;
					} else {
						landCoordinates.lat =
							landCoordinates.lat - Math.random() * 0.1;
					}
					break;

				default:
					if (ranBoolGen()) {
						landCoordinates.lon =
							landCoordinates.lon + Math.random() * 0.1;
					} else {
						landCoordinates.lon =
							landCoordinates.lon - Math.random() * 0.1;
					}
					break;
			}
		}

		return landCoordinates;
	}

	useEffect(() => {
		const coord =
			landCoordinates[
				Math.floor(Math.random() * landCoordinates.length - 1)
			];

		setTimeout(() => {
			setCityName(coord.name);
			setCityLat(coord.lat);
			setCityLon(coord.lon);
		}, 2500);

		modifyVal(coord);

		// Creating map options
		const mapOptions = {
			center: [coord.lat, coord.lon],
			zoom: 300
		};

		// Creating a map object
		const map = L.map('map', mapOptions);

		var circle = L.marker([coord.lat, coord.lon]).addTo(map);

		// Creating a Tile Layer object
		const tileLayer = L.tileLayer(
			'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
		);

		// Adding the Tile Layer to the map
		map.addLayer(tileLayer);
	}, []);

	return (
		<div className="mt-40">
			<div className="relative z-10 w-full max-w-4xl">
				<h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2ecc71] to-[#3498db] text-center mb-6">
					🎄 Santa Tracker ❄️
				</h2>
				<p className="text-lg text-center text-gray-300 italic mb-8">
					Tracking Saint Nicholas' quantum-wave-collapse-like trek
					through the globe. Sometimes he's here; sometimes he's way
					over there—but he's never nowhere.
				</p>

				<div className="flex flex-col md:flex-row bg-[#222b45] rounded-3xl shadow-2xl overflow-hidden">
					<div className="md:w-3/4 h-96">
						<div id="map" className="w-full h-full"></div>
					</div>
					<div className="md:w-1/4 p-6 flex flex-col justify-center">
						<h3 className="text-xl text-left text-[#2ecc71] mb-2">
							Nearest City:
						</h3>
						<p className="text-lg text-left mb-4 ml-6">
							{cityName || 'Loading...'}
						</p>
						<h3 className="text-xl text-left text-[#2ecc71] mb-2">
							Coordinates:
						</h3>
						<p className="text-lg text-left ml-6">
							Latitude: {roundingCord(cityLat) || 'Loading...'}
						</p>
						<p className="text-lg text-left mb-4 ml-6">
							Longitude: {roundingCord(cityLon) || 'Loading...'}
						</p>
					</div>
				</div>

				<div className="mt-8  rounded-3xl p-6">
					<p className="text-3xl text-[#3498db] text-center mb-6">
						F.A.Q:
					</p>
					<div className="space-y-4">
						<div>
							<p>
								<span className="text-[#2ecc71] font-bold">
									Q:{' '}
								</span>
								When will he get to my home?
							</p>
							<p>
								<span className="text-[#3498db] font-bold">
									A:{' '}
								</span>
								Sometime between when you sleep, and before you
								wake up.
							</p>
						</div>
						<div>
							<p>
								<span className="text-[#2ecc71] font-bold">
									Q:{' '}
								</span>
								Santa's pathing doesn't make sense... Is he
								drunk?
							</p>
							<p>
								<span className="text-[#3498db] font-bold">
									A:{' '}
								</span>
								Santa does not drink and navigate. However, his
								GPS was designed by Werner Heisenberg.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tracker;
