import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, width } from "@mui/system";
import { Paper, Button } from "@mui/material";
import "./App.css";

export default function BasicTextFields(props) {
	// destrukturyzacja
	const { type, onChange } = props;
	const paperStyle = {
		padding: "50px 50px 30px 50px",
		width: 500,
		margin: "20px auto",
	};
	const [login, setLogin] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [username, setUsername] = React.useState("");
	const [surname, setSurname] = React.useState("");
	const [address, setAddress] = React.useState("");
	const [date, setDate] = React.useState("");
	const [time, setTime] = React.useState("");
	const [user, setUser] = React.useState([]);

	React.useEffect(() => {
		fetch("http://localhost:8080/user/getAll")
			.then((res) => res.json())
			.then((result) => {
				setUser(result);
			});
	}, []);

	const AddLesson = (e) => {
		e.preventDefault();
		const user = { login, password };
		console.log(user);
		fetch("http://localhost:8080/user/add", {
			method: "Post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		}).then(() => {
			console.log("new user added");
		});
	};

	const logIn = (e) => {
		e.preventDefault();
		const user = { login, password };
		console.log(user);
		fetch("http://localhost:8080/user/add", {
			method: "Post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		}).then(() => {
			// jak zalogowany to zmień na login, żeby można było robić co chcesz
			onChange(undefined);
			//  to niżej wrzuca do localstorage tą wartość do user, wartość masz po przecinku, trzeba obiekt wrzucić do JSON.stringify(obiekt)
			//  tylko z takimi wartościami jak potrzebujesz, czyli jak zalogowany to np nazwa użytkownika czy jest nauczycielem czy nie
			//  i możesz wyciągnąć czy jest np nauczycielem i wykorzystać to później do tego niżej tak samo jak ja zrobiłem to dla typu w
			//  linijkach niżej
			localStorage.setItem("USER", JSON.stringify(user));
			console.log("new user added");
		});
	};

	const signIn = (e) => {
		e.preventDefault();
		const user = { login, password, username, surname, address };
		console.log(user);
		fetch("http://localhost:8080/user/add", {
			method: "Post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		}).then(() => {
			// jak zarejestrowany to zmień na login, żeby można było się zalogować
			onChange("login");
			console.log("new user added");
		});
	};

	const ShowSignIn = () => {
		return (
			<Paper elevation={3} style={paperStyle}>
				<h1 style={{ color: "black" }}>Rejestracja</h1>
				<Box
					component="form"
					sx={{
						"& > :not(style)": { m: 1 },
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="outlined-basic"
						label="Login"
						variant="outlined"
						fullWidth
						value={login}
						onChange={(e) => setLogin(e.target.value)}
					/>
					<TextField
						id="outlined-basic"
						type="password"
						label="Hasło"
						variant="outlined"
						fullWidth
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<TextField
						id="outlined-basic"
						label="Imie"
						variant="outlined"
						fullWidth
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
						id="outlined-basic"
						label="Nazwisko"
						type="password"
						variant="outlined"
						fullWidth
						value={surname}
						onChange={(e) => setSurname(e.target.value)}
					/>
					<TextField
						id="outlined-basic"
						label="Adres"
						variant="outlined"
						fullWidth
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<Button variant="contained" onClick={signIn}>
						Zarejestruj
					</Button>
				</Box>
			</Paper>
		);
	};

	const ShowLogIn = () => {
		return (
			<Paper elevation={3} style={paperStyle}>
				<h1 style={{ color: "black" }}>Logowanie</h1>
				<Box
					component="form"
					sx={{
						"& > :not(style)": { m: 1 },
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="outlined-basic"
						label="Login"
						variant="outlined"
						fullWidth
						value={login}
						onChange={(e) => setLogin(e.target.value)}
					/>
					<TextField
						id="outlined-basic"
						type="password"
						label="Hasło"
						variant="outlined"
						fullWidth
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button variant="contained" onClick={logIn}>
						Zaloguj
					</Button>
				</Box>
			</Paper>
		);
	};

	const ShowAddLesson = () => {
		return (
			<Paper elevation={3} style={paperStyle}>
				<h1 style={{ color: "black" }}>Dodaj Lekcje</h1>
				<Box
					component="form"
					sx={{
						"& > :not(style)": { m: 1 },
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="outlined-basic"
						type="date"
						variant="outlined"
						fullWidth
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
					<TextField
						id="outlined-basic"
						type="time"
						variant="outlined"
						fullWidth
						value={time}
						onChange={(e) => setTime(e.target.value)}
					/>
					<Button variant="contained" onClick={AddLesson}>
						Dodaj
					</Button>
				</Box>
			</Paper>
		);
	};

	return (
		<Container>
			{type === "register" && <ShowSignIn />}
			{type === "login" && <ShowLogIn />}
			{/* 
      jeśli się nie zalogujesz i nie wrzucisz tego usera to nie będziesz widzieć ani lekcji ani tego dodawania tylko samo logowanie 
      także musisz tutaj później dorobić, że 
      {nauczyciel && <ShowAddLesson />}
      */}
			{!type && (
				<>
					<ShowAddLesson />
					<Paper elevation={3} style={paperStyle}>
						{user.map((user) => (
							<Paper
								elevation={6}
								style={{ margin: "10px", padding: "15px", textAlign: "left" }}
								key={user.id}
							>
								<table>
									<tr>
										<th>Imie</th>
										<th>Nazwisko</th>
										<th>Adres</th>
										<th>Data</th>
										<th>Godzina</th>
										<th></th>
									</tr>
									<tr>
										<td>{user.username}</td>
										<td>{user.surrname}</td>
										<td>{user.address}</td>
										<td>{user.date}</td>
										<td>{user.time}</td>
										<td>
											<Button variant="outlined" color="error">
												Delete
											</Button>
										</td>
									</tr>
								</table>
							</Paper>
						))}
					</Paper>
				</>
			)}
		</Container>
	);
}
