import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "./Input";
import Select from "./Select";

class CustomForm extends Component {
	state = {
		data: {},
		errors: {},
	};

	validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);
		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;

		this.setState({ data, errors });
	};

	renderButton(label) {
		return (
			<Button
				type="submit"
				disabled={this.validate()}
				variant="primary"
				className="mt-3"
			>
				{label}
			</Button>
		);
	}

	renderHelpText(content) {
		return (
			<div>
				<Form.Text muted>{content}</Form.Text>
			</div>
		);
	}

	renderSelect(name, label, options) {
		const { data, errors } = this.state;

		return (
			<Select
				name={name}
				value={data[name]}
				label={label}
				options={options}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	}

	renderInput(name, label, type = "text") {
		const { data, errors } = this.state;

		return (
			<Input
				type={type}
				name={name}
				value={data[name]}
				label={label}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	}
}

export default CustomForm;
