import React from 'react';
import ReactDOM from 'react-dom/client'; // Make sure you're using React 18 or later
import { Provider } from 'react-redux';
import store from './store/store'; // Your store configuration
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Get the root element

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
