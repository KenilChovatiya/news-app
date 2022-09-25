import { Component } from "react";
import { NewsItem } from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 12,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            totalResults: 0,
            page: 1,
            loading: true,
        }
    }

    async newsUpdate() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d74e56f9c34429eb9bd10e46d283324&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.props.setProgress(30);
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.newsUpdate();
    }

    capitalization = (value) => {
        return (value.charAt(0).toUpperCase() + value.slice(1));
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.newsUpdate();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.newsUpdate();
    }

    fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d74e56f9c34429eb9bd10e46d283324&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({ page: this.state.page + 1 })
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })
    };

    render() {
        return (
            <div>
                <div className="my-4">
                    {this.state.loading && <div className="text-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>} 
                    <h2 className="container" style={{marginTop: "74px"}}>Top Latest News - {this.capitalization(this.props.category)}</h2>
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<h2 className="text-center">Loading.....</h2>}
                    >

                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} desc={element.description} source={element.source.name} imgUrl={element.urlToImage} url={element.url} publishedAt = {element.publishedAt} author={element.author}/>
                                </div>
                            })}
                        </div>
                    </div>
                    </InfiniteScroll>
                </div>

                {/* <div className="container">
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-primary" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>Previous</button>
                        <button className="btn btn-primary px-4" disabled={(this.state.page + 1) > (Math.ceil(this.state.totalResults / this.props.pageSize))} onClick={this.handleNextClick}>Next</button>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default News