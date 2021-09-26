import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import RegisterForm from "./components/RegisterForm";
import Navbar from "./common/Navbar";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

export default class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	render() {
		return (
			<React.Fragment>
				<Navbar user={this.state.user} />
				<Switch>
					<Route path="/register" component={RegisterForm} />
					<Route path="/login" component={LoginForm} />
					<Route path="/logout" component={Logout} />
					<Route path="/news" component={News} />
					<Route path="/not-found" component={NotFound} />
					<Redirect from="/" to="/news" exact />
					<Redirect to="/not-found" />
				</Switch>
				<ToastContainer />
			</React.Fragment>
		);
	}
}
