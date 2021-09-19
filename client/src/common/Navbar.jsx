import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function navbar() {
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
						<NavLink to="/auth" className="nav-link">
							Login
						</NavLink>
						{/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown> */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default navbar;
