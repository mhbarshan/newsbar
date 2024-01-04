import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div>
        <div className="card">
          <div>
          <span
            className="badge bg-danger"
            style={{display:"flex", justifyContent:"flex-end", position:"absolute",right:"0" }}
          >
            {source}
          </span>
          </div>
          <img className="card-img-top" src={imageUrl} alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">
              Read more...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
