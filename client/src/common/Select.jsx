import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";

const Select = ({ name, label, options, error, ...rest }) => {
	return (
		<Form.Group className="mb-3" htmlFor={name} controlId={name}>
			<FloatingLabel controlId="floatingSelect" label={label}>
				<Form.Select name={name} id={name} {...rest}>
					<option value="" hidden>
						Seleziona un'opzione
					</option>
					<option value={null} defaultValue>
						N/A
					</option>
					{options.map((option) => (
						<option key={option._id} value={option._id}>
							{option.name}
						</option>
					))}
				</Form.Select>
			</FloatingLabel>
			{error && <Alert variant="danger">{error}</Alert>}
		</Form.Group>
	);
};

export default Select;
