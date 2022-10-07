import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from "./components/store";
import { Provider } from 'react-redux';

function AppWithCallBackAfterRender() {
	return(
		<Provider store={store}>
			{/* <SignInSide /> */}
			<App />
		</Provider>
	)
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AppWithCallBackAfterRender />);