import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import LoginForm from "./components/loginForm";
import RegisterForm from "./components/RegisterForm";
import Navbar from "./common/Navbar";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<React.Fragment>
			<Navbar />
			<Switch>
				<Route path="/register" component={RegisterForm} />
				{/* <Route path="/login" component={LoginForm} /> */}
				<Route path="/news" component={News} />
				<Route path="/not-found" component={NotFound} />
				<Redirect from="/" to="/news" exact />
				<Redirect to="/not-found" />
			</Switch>
			<ToastContainer />
		</React.Fragment>
	);
}

export default App;
