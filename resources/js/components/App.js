import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import NewSong from './NewSong'
import SingleSong from './SingleSong'
import MainMenu from './MainMenu'
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
                <Route exact path='/songs' component={SongList} />
                <Route exact path='/create/song' component={NewSong} />
                <Route path='/:id' component={SingleSong} />
            </Switch>
        </div>
        </BrowserRouter>
    )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))