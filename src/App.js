import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import Appbar from "./components/Appbar";
import User from "./components/User";

function App() {
	const [pageType, setPageType] = React.useState();
	React.useEffect(() => {
		// z localstorage wyciągasz czy pole "USER" jest zalogowane, przy logowaniu to ustawiasz sobie
		const userLocalStorage = localStorage.getItem("USER");
		const userData = userLocalStorage
			? JSON.parse(userLocalStorage)
			: undefined;
		// userData ma info o userze jeśli jest zalogowany jak nie jest zalogowany to jest undefined

		// jak userData ma coś w sobie to wtedy nie ustawiasz ani login ani register
		setPageType(userData ? undefined : "login");
	}, []); // puste [] oznacza, że tylko na init aplikacji się ma wykonać

	return (
		<div className="App">
			{/* tutaj dajesz props żeby ustawić jaki jest typ strony */}
			<Appbar onChange={setPageType} />
			{/* tutaj przekazujesz jaki jest typ strony i możesz go zmienić z widoku user (przy zalogowaniu) */}
			<User type={pageType} onChange={setPageType} />
		</div>
	);
}
export default App;
