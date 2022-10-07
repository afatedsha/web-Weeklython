import './App.css';
import { Routes, Route, BrowserRouter, Navigate  } from 'react-router-dom';
import ListCities from './components/ListCities';
import SignInSide from './components/SignInSide';


function App() {
  return (
	<BrowserRouter>
		<Routes>
			<Route path='/panel' element={<ListCities />} />
			<Route path='/sign' element={<SignInSide />} />
			<Route path="/" element={<Navigate replace to="/sign" />} />
		</Routes>
	</BrowserRouter>
  )
}

export default App;
