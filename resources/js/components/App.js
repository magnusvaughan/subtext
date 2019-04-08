import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import NewSong from './NewSong'
import SingleSong from './SingleSong'
import LyricsList from './LyricsList'
import SongList from './SongList'
import AlbumList from './AlbumList'
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
                <Route exact path='/' component={AlbumList} />
                <Route path='/albums/:id' component={SongList} />
                <Route exact path='/lyrics' component={LyricsList} />
                <Route exact path='/songs' component={SongList} />
                <Route path='/create/song' component={NewSong} />
                <Route path='/songs/:id' component={SongList} />
            </Switch>
        </div>
        </BrowserRouter>
    )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))