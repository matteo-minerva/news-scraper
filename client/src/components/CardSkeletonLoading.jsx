import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import Col from "react-bootstrap/Col";

const CardSkeletonLoading = () => {
	return (
		<Row>
			{[...Array(6)].map((card) => {
				return (
					<Col xs={12} md={6} lg={4} className="my-3">
						<Card>
							<Placeholder
								bg="secondary"
								as={Card.Img}
								className="w-100"
								style={{ height: "160px" }}
							/>
							<Card.Body>
								<Placeholder as={Card.Text} animation="glow">
									<Placeholder xs={4} style={{ height: "1rem" }} />{" "}
									<Placeholder xs={6} style={{ height: "1rem" }} />
									<Placeholder xs={7} style={{ height: "1rem" }} />{" "}
									<Placeholder xs={4} style={{ height: "1rem" }} />
									<Placeholder xs={4} style={{ height: "1rem" }} />{" "}
									<Placeholder xs={6} style={{ height: "1rem" }} />
									<Placeholder xs={8} style={{ height: "1rem" }} />
								</Placeholder>
								<Placeholder
									as={Card.Text}
									animation="wave"
									className="d-flex justify-content-center mt-4"
								>
									<Placeholder bg="secondary" xs={6} />
								</Placeholder>
							</Card.Body>
						</Card>
					</Col>
				);
			})}
		</Row>
		// <Row
		// 	style={{ minHeight: "75vh", fontSize: "2rem" }}
		// 	className="align-items-center justify-content-center"
		// >
		// 	{text}
		// </Row>
	);
};

export default CardSkeletonLoading;
