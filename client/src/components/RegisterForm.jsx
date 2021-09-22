import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Joi from "joi-browser";
import CustomForm from "../common/Form";

class RegisterForm extends CustomForm {
	state = {
		data: {
			email: "",
			password: "",
			age: null,
			// sex: { _id: null, name: "N/A" },
			sex: {},
		},
		errors: {},
	};

	schema = {
		email: Joi.string().required().email().label("Email"),
		password: Joi.string().required().min(8).label("Password"),
		age: Joi.number().min(14).max(150).allow(null).label("Età"),
		sex: Joi.string().label("Sesso"),
	};

	doSubmit = () => {
		// Call the server
		console.log("Submitted");
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
							backgroundColor: "red",
							margin: "1rem",
							padding: "2rem 1rem",
						}}
					>
						<h1>Registrati</h1>
						<Form onSubmit={this.handleSubmit}>
							{this.renderInput("email", "Email *", "email")}
							{this.renderInput("password", "Password *", "password")}
							{this.renderInput("age", "Età", "number")}
							{this.renderSelect("sex", "Sesso", [
								{ _id: "F", name: "Donna" },
								{ _id: "M", name: "Uomo" },
							])}
							{this.renderButton("Register")}
						</Form>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default RegisterForm;
