import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Appbar(props) {
	const { onChange } = props;
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Button
							className="mainButtons"
							variant="contained"
							onClick={() => onChange("login")}
						>
							Zaloguj
						</Button>
						<Button
							className="mainButtons"
							variant="contained"
							onClick={() => onChange("register")}
						>
							Zarejestruj
						</Button>
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
