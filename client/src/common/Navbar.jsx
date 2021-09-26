import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function navbar({ user }) {
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Link to="/" className="navbar-brand">
					Paper Boy
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<NavLink to="/news" className="nav-link">
							News
						</NavLink>
						{!user && (
							<React.Fragment>
								<NavLink to="/register" className="nav-link">
									Registrati
								</NavLink>
								<NavLink to="/login" className="nav-link">
									Login
								</NavLink>
							</React.Fragment>
						)}
						{user && (
							<React.Fragment>
								<NavLink to="/profile" className="nav-link">
									{user.email}
								</NavLink>
								<NavLink to="/logout" className="nav-link">
									Logout
								</NavLink>
							</React.Fragment>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default navbar;
