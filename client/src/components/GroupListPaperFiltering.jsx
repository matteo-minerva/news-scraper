import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

function GroupListPaperFiltering({ papers, selectedPaper, onPaperSelect }) {
	return (
		<Col
			xs={{ span: 12, order: "first" }}
			lg={{ span: 3, order: "last" }}
			className="mt-3"
		>
			<ListGroup>
				{papers.map((paper) => (
					<ListGroup.Item
						action
						key={paper._id}
						onClick={() => onPaperSelect(paper)}
						active={paper === selectedPaper}
					>
						{paper.name}
					</ListGroup.Item>
				))}
			</ListGroup>
		</Col>
	);
}

GroupListPaperFiltering.propTypes = {
	papers: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			homepage: PropTypes.string.isRequired,
			url_to_scrape: PropTypes.string.isRequired,
		})
	),
	selectedPaper: PropTypes.func.isRequired,
	onPaperSelect: PropTypes.func.isRequired,
};

export default GroupListPaperFiltering;
