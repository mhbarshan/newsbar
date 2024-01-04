import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 15,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  uppercase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    // console.log("object")
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.uppercase(this.props.category)}-NewsBar`;
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb0228abc5124295857a33d6fadf2229&pagesize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false,
    // });
    this.updateNews();
    // console.log(this.articles);
  }

  //  handleNextClick = async ()=>{
  //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb0228abc5124295857a33d6fadf2229&page=${this.state.page+1}&pagesize=${this.props.pageSize}`
  //     // this.setState({loading:true})
  //     // let data = await fetch(url);
  //     // let parseData = await data.json()
  //     // this.setState({
  //     //     articles: parseData.articles,
  //     //     page: this.state.page+1,
  //     //     loading:false
  //     // })

  //     this.setState({
  //         page:this.state.page+1

  //     });
  //     this.updateNews()
  // }
  // handlePrevClick = async ()=>{
  //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb0228abc5124295857a33d6fadf2229&page=${this.state.page-1}&pagesize=${this.props.pageSize}`
  //     // this.setState({loading:true})
  //     // let data = await fetch(url);
  //     // let parseData = await data.json()
  //     // this.setState({
  //     //     articles: parseData.articles,
  //     //     page: this.state.page-1,
  //     //     loading:false
  //     // })

  //     this.setState({
  //         page:this.state.page-1

  //     });
  //     this.updateNews()
  // }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pagesize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h2 className="pb-3 text-center">
          NewsBar - Top Headlines on {this.uppercase(this.props.category)}
        </h2>
        {this.state.loading&&<Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* !this.state.loading && */}
              {this.state.articles.map((e) => {
                return (
                  <div key={e.url} className="col-md-4 my-3">
                    <NewsItem
                      title={e.title ? e.title.slice(0, 45) : " "}
                      description={
                        e.description ? e.description.slice(0, 85) : " "
                      }
                      imageUrl={
                        e.urlToImage
                          ? e.urlToImage
                          : "https://talksport.com/wp-content/uploads/sites/5/2023/12/Kane_Postecoglou-Comp.png?strip=all&quality=100&w=1500&h=1000&crop=1"
                      }
                      newsUrl={e.url}
                      author={e.author ? e.author : "Unknown"}
                      date={e.publishedAt}
                      source={e.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="my-3">
            <div className="row">
                <div className="col d-flex flex-row">
                <button type="button"style={this.state.page<=1?{display:"none"}:{display:"block"}} className="btn btn-dark"  onClick={this.handlePrevClick}> &larr; Previous</button>
                </div>
                <div className="col d-flex flex-row-reverse">
                <button type="button" style={this.state.page===Math.ceil(this.state.totalResults/this.props.pageSize)?{display:"none"}:{display:"block"}} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        
       
        </div> */}
      </>
    );
  }
}

export default News;
