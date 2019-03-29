import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import NewStory from './NewStory'
import StoryList from './StoryList'
import SingleStory from './SingleStory'

class App extends Component {
    render () {
    return (
        <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={StoryList} />
                <Route path='/create' component={NewStory} />
                <Route path='/:id' component={SingleStory} />
            </Switch>
        </div>
        </BrowserRouter>
    )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))