import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./common/Navbar";
import News from "./pages/News";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<React.Fragment>
			<Navbar />
			<Switch>
				<Route path="/news" component={News} />
				<Route path="/not-found" component={NotFound} />
				<Redirect from="/" to="/news" exact />
				<Redirect to="/not-found" />
			</Switch>
		</React.Fragment>
	);
}

export default App;
