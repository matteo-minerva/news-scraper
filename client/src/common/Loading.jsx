import React from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";

const Loading = ({ text }) => {
	return (
		<Row
			style={{ minHeight: "75vh", fontSize: "2rem" }}
			className="align-items-center justify-content-center"
		>
			{text}
		</Row>
	);
};

Loading.protoTypes = {
	text: PropTypes.string,
};

export default Loading;
