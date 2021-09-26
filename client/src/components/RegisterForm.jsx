import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Joi from "joi-browser";
import CustomForm from "../common/CustomForm";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends CustomForm {
	state = {
		data: {
			email: "",
			password: "",
			age: "",
			gender: "",
		},
		errors: {},
	};

	schema = {
		email: Joi.string().required().email().label("Email"),
		password: Joi.string().required().min(8).label("Password"),
		age: Joi.number().min(14).max(150).allow("").label("Età"),
		gender: Joi.string().allow(null).label("Sesso"),
	};

	doSubmit = async () => {
		try {
			const response = await userService.register(this.state.data);
			auth.loginWithJwt(response.headers["x-auth-token"]);
			window.location = "/";
		} catch (error) {
			if (error.response && error.response.status === 400) {
				let errors = { ...this.state.errors };
				errors.email = error.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		return (
			<Container>
				<Row
					className="align-items-center"
					style={{ minHeight: "calc(100vh - 64px)" }}
				>
					<Col
						style={{
							margin: "1rem",
							padding: "2rem 1rem",
						}}
					>
						<h1 className="text-center">Registrati</h1>
						<Form onSubmit={this.handleSubmit}>
							{this.renderInput("email", "Email *", "email")}
							{this.renderInput("password", "Password *", "password")}
							{this.renderInput("age", "Età", "number")}
							{this.renderSelect("gender", "Genere", [
								{ _id: "F", name: "Donna" },
								{ _id: "M", name: "Uomo" },
							])}
							{this.renderHelpText("* Campi obbligatori")}
							{this.renderButton("Register")}
						</Form>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default RegisterForm;
