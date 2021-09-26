import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";

const Input = ({ name, label, error, ...rest }) => {
	return (
		<Form.Group className="mt-4">
			<FloatingLabel
				htmlFor={name}
				controlId={name}
				label={label}
				className="mb-3"
			>
				<Form.Control {...rest} name={name} placeholder={label} />
			</FloatingLabel>
			{error && (
				<Alert className="mt-2" variant="danger">
					{error}
				</Alert>
			)}
		</Form.Group>
	);
};

export default Input;
