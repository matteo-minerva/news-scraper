import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Pagination from "react-bootstrap/Pagination";

function NewsPagination({ itemsCount, pageSize, currentPage, onPageChange }) {
	const pagesCount = Math.ceil(itemsCount / pageSize);
	if (pagesCount === 1) return null;
	const pages = _.range(1, pagesCount + 1);

	return (
		<Pagination className="justify-content-center mt-4" size={"lg"}>
			{pages.map((page) => {
				return (
					<Pagination.Item
						key={page}
						active={page === currentPage}
						onClick={() => onPageChange(page)}
					>
						{page}
					</Pagination.Item>
				);
			})}
		</Pagination>
	);
}

NewsPagination.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default NewsPagination;
