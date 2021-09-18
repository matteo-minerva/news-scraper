import React, { Component } from "react";
import { getNews } from "../services/newsService";
import { getPapers } from "../services/papersService";
import GroupListPaperFiltering from "../components/GroupListPaperFiltering";
import NewsSection from "../components/NewsSection";
import NewsPagination from "../components/NewsPagination";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { paginate } from "../utils/paginate";
import SearchBar from "../common/SearchBar";

export class News extends Component {
	state = {
		news: [],
		papers: [],
		selectedPaper: null,
		currentPage: 1,
		pageSize: 12,
		searchQuery: "",
	};

	async componentDidMount() {
		const { data } = await getPapers();
		const { data: news } = await getNews();
		const papers = [
			{
				_id: "",
				name: "Tutti i giornali",
				homepage: "",
				url_to_scrape: "",
			},
			...data,
		];

		this.setState({ papers, news, selectedPaper: papers[0] });
	}

	handlePaperSelect = (paper) => {
		this.setState({ selectedPaper: paper, searchQuery: "", currentPage: 1 });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
		window.scrollTo(0, 0);
	};

	handleSearch = (query) => {
		this.setState({
			searchQuery: query,
			selectedPaper: this.state.papers[0],
			currentPage: 1,
		});
	};

	getPagedData = () => {
		const {
			selectedPaper,
			news: allNews,
			currentPage,
			pageSize,
			searchQuery,
		} = this.state;
		let filtered = allNews;
		if (searchQuery)
			filtered = allNews.filter((n) =>
				n.heading.toLowerCase().includes(searchQuery.toLowerCase())
			);
		else if (selectedPaper && selectedPaper._id)
			filtered = allNews.filter((n) => n.paper._id === selectedPaper._id);

		const news = paginate(filtered, currentPage, pageSize);
		return {
			news,
			totalCount: filtered.length,
		};
	};

	render() {
		const { news, totalCount } = this.getPagedData();
		const { pageSize, currentPage, searchQuery } = this.state;

		return (
			<Container>
				<Row className="mt-5">
					<h1 className="fw-bold">Le ultime notizie dal mondo</h1>
					<span className="fs-4 fw-light">Aggiornate ogni quarto d'ora</span>
				</Row>
				<Row className="mt-3">
					<NewsSection news={news}>
						<SearchBar value={searchQuery} onChange={this.handleSearch} />
					</NewsSection>
					<GroupListPaperFiltering
						papers={this.state.papers}
						selectedPaper={this.state.selectedPaper}
						onPaperSelect={this.handlePaperSelect}
					/>
				</Row>
				{news.length === 0 ? (
					<p>
						Si è verificato un problema: sembra che non sia presente alcuna
						notizia! Riprova più tardi.
					</p>
				) : (
					<NewsPagination
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				)}
			</Container>
		);
	}
}

export default News;
