import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { render } from 'react-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = () => (
  <div>
    <h2>Topic</h2>
  </div>
)

const App = () => (
  <Router basename="/admin">
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
      <hr/>
      <Route exact path="/" component={Home} /> 
      <Route exact path="/about" component={About} /> 
      <Route exact path="/topics" component={Topic} /> 
    </div>
  </Router>
)

render((
  <App />
), document.getElementById('app'))
