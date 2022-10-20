import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login/Login';
import Hasmiktable from './Hasmik/Hasmiktable';

function App() {
	return (

		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Hasmik" element={< Hasmiktable />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;