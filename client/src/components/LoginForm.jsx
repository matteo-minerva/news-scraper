import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Joi from "joi-browser";
import CustomForm from "../common/CustomForm";
import auth from "../services/authService";

class LoginForm extends CustomForm {
	state = {
		data: { email: "", password: "" },
		errors: {},
	};

	schema = {
		email: Joi.string().required().label("Email"),
		password: Joi.string().required().label("Password"),
	};

	doSubmit = async () => {
		try {
			const { data } = this.state;
			await auth.login(data.email, data.password);
			window.location = "/";
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.email = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		return (
			<Container>
				<Row
					className="align-items-center justify-content-center"
					style={{ minHeight: "calc(100vh - 64px)" }}
				>
					<Col className="auth-form">
						<h1 className="text-center">Login</h1>

						<Form onSubmit={this.handleSubmit}>
							{this.renderInput("email", "Email", "email")}
							{this.renderInput("password", "Password", "password")}
							{this.renderButton("Login")}
						</Form>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default LoginForm;
