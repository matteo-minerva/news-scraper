import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

function SearchBar({ value, onChange }) {
	return (
		<Form className="mt-3">
			<Form.Group className="mb-3" controlId="searchBar">
				<Form.Control
					type="text"
					placeholder="Cerca..."
					value={value}
					name="searchBar"
					onChange={(e) => onChange(e.currentTarget.value)}
					autoComplete="off"
				/>
			</Form.Group>
		</Form>
	);
}

SearchBar.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default SearchBar;
