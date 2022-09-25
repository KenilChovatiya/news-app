import React, { Component } from 'react';
import './App.css';
import { Navbar } from './component/Navbar';
import { News } from './component/News';  
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

class App extends Component {
  pageSize = 20;
  state={
    progress: 0
  }
  setProgress = (progress) =>{
    this.setState({progress: progress})
  }

  render() {

    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="home" category='general' country="in" pageSize={this.pageSize} />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" category='business' country="in" pageSize={this.pageSize} />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" category='entertainment' country="in" pageSize={this.pageSize} />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" category='general' country="in" pageSize={this.pageSize} />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="helth" category='health' country="in" pageSize={this.pageSize} />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" category='science' country="in" pageSize={this.pageSize} />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sport" category='sport' country="in" pageSize={this.pageSize} />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" category='technology' country="in" pageSize={this.pageSize} />} />
          </Routes>

        </Router>
      </>
    );
  }
}

export default App;
