import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login/Login';
import ArmenMarTable from './ArmenMartirosyan/ArmenMarTable';
import Table from "./Armengh/Table";
import Hasmiktable from './Hasmik/Hasmiktable';
import BellaTable from './Bella/BellaTable';

function App() {
	return (

		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/ArmenMartirosyan" element={<ArmenMarTable />} />
				<Route path="/Armengh" element={<Table />} />
				<Route path="/Bella" element={<BellaTable />} />
				<Route path="/Hasmik" element={< Hasmiktable />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;