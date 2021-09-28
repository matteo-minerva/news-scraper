import React from "react";
import Container from "react-bootstrap/Container";
const NotFound = () => {
	return (
		<Container className="not-found">
			<p className="title"> pagina inesistente </p>

			<div className="tipsiz">
				<div className="tipsiz-body">
					<div className="arm-left arm"></div>
					<div className="face">
						<div className="face-upper">
							<div className="element">4</div>
							<div className="element">0</div>
							<div className="element">4</div>
						</div>
						<div className="mouth"></div>
					</div>
					<div className="arm-right arm"></div>
				</div>
			</div>
		</Container>
	);
};

export default NotFound;
