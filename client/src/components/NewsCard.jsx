import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

function NewsCard({ heading, paper, img_src, date, url }) {
	return (
		<Col xs={12} md={6} lg={4} className="my-3">
			<Link
				to={url}
				target="_blank"
				className="text-decoration-none text-body"
				rel="noreferrer"
			>
				<Card className="p-0 position-relative shadow h-100">
					<div className="ratio ratio-16x9">
						<Card.Img variant="top" src={img_src} />
					</div>
					<span className="position-absolute top-0 start-0 m-2 p-2 badge rounded-pill bg-light text-muted fw-light">
						{date}
					</span>
					<Card.Body>
						<Card.Title className="fst-normal">{heading}</Card.Title>
					</Card.Body>
					<Card.Footer className="text-muted text-center">
						Fonte: {paper.name}
					</Card.Footer>
				</Card>
			</Link>
		</Col>
	);
}

NewsCard.propTypes = {
	heading: PropTypes.string.isRequired,
	paper: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		homepage: PropTypes.string.isRequired,
	}),
	img_src: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

export default NewsCard;
