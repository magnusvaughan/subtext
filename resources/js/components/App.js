import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import NewStory from './NewStory'
import NewSong from './NewSong'
import StoryList from './StoryList'
import SingleStory from './SingleStory'
import SingleSong from './SingleSong'
import MainMenu from './MainMenu'
import LyricsList from './LyricsList'
import SongList from './SongList'
import ReactGA from 'react-ga';

ReactGA.initialize('UA-137553389-1');
ReactGA.pageview('/home');

class App extends Component {

    render () {
    return (
        <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={SongList} />
                <Route exact path='/stories' component={StoryList} />
                <Route exact path='/lyrics' component={LyricsList} />
                <Route exact path='/songs' component={SongList} />
                <Route path='/create/story' component={NewStory} />
                <Route path='/create/song' component={NewSong} />
                {/* <Route path='/story/:id' component={SingleStory} /> */}
                <Route path='/:id' component={SingleSong} />
            </Switch>
        </div>
        </BrowserRouter>
    )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))