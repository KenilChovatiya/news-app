import { Component } from "react";

export class NewsItem extends Component {
    render() {
        let {title,desc,imgUrl,url,publishedAt,author,source} = this.props;
        return (
            <div className="card my-3">
                <span className="badge badge-danger" style={{position: "absolute",right:"0"}}>{source?source:"unknown"}</span>
                <img className="card-img-top" src={imgUrl ? imgUrl : "https://www.megaimports.ca/img/no-image.jpg"} alt="News" />
                <span className="mx-4 mt-2 text-muted" style={{fontSize: "14px"}}>{new Date(publishedAt).toDateString() + " " + new Date(publishedAt).toLocaleTimeString()}</span>
                <p className="mx-4 text-muted mb-0">Authour: {author ? author : "unknown"}</p>
                <div className="card-body pt-2">
                    <h5 className="card-title">{title ? title : " "}</h5>
                    <p className="card-text">{desc ? desc : " "}</p>
                    <a href={url} rel="noreferrer" target="_blank" className="btn btn-outline-success">Read More</a>
                </div>
            </div>
        )
    }
}