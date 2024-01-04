import './App.css';
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom";
import Navbar from './component/Navbar';
import News from './component/News'


export default class App extends Component {

  country = "in"
  pageSize= 15

  state = {
    progress:0,
  };

  apiKey = process.env.REACT_APP_NEWS_API

  
  setProgress = (progress)=>{
    this.setState({
      progress: progress  
    })
  }

  render() {
    return (
      <div>
         <LoadingBar
         height={3}
        color='#00A36C'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Router>
        
       
      <Navbar/>
        <Routes>
          <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={"general"} pageSize={this.pageSize} country={this.country} category="general"/>}/>
          <Route path="/Business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={"business"} pageSize={this.pageSize} country={this.country} category="business"/>}/>
          <Route path="/Entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={"entertainment"} pageSize={this.pageSize} country={this.country} category="entertainment"/>}/>
          <Route path="/General"element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={"general"} pageSize={this.pageSize} country={this.country} category="general"/>}/>
          <Route path="/Health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={"health"} pageSize={this.pageSize} country={this.country} category="health"/>}/>
          <Route path="/Science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={"science"} pageSize={this.pageSize} country={this.country} category="science"/>}/>
          <Route path="/Sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={"sports"} pageSize={this.pageSize} country={this.country} category="sports"/>}/>
          <Route path="/Technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={"technology"} pageSize={this.pageSize} country={this.country} category="technology"/>}/>
          </Routes>
          </Router>
      </div>
    )
  }
}