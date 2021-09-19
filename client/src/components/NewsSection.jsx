import React from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import NewsCard from "./NewsCard";
import Col from "react-bootstrap/Col";

function NewsSection({ news, children }) {
	return (
		<Col xs={12} lg={9}>
			{children}
			<Row>
				{news.map((item) => {
					return <NewsCard {...item} key={item._id} />;
				})}
			</Row>
		</Col>
	);
}

NewsSection.propTypes = {
	children: PropTypes.element,
	news: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
			heading: PropTypes.string.isRequired,
			img_src: PropTypes.string.isRequired,
			date: PropTypes.string.isRequired,
			paper: PropTypes.shape({
				_id: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
				homepage: PropTypes.string.isRequired,
			}),
		})
	),
};

export default NewsSection;
