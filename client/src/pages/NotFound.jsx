import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const NotFound = () => {
	return (
		<Container className="not-found">
			<Row>
				<Col>
					<h1>Not found</h1>
				</Col>
			</Row>
		</Container>
	);
};

export default NotFound;
