import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SongList extends Component {
  constructor () {
    super()
    this.state = {
      songs: []
    }
  }

  componentDidMount () {
    axios.get('/api/songs').then(response => {
      this.setState({
        songs: response.data
      })
    })
  }

  render () {
    let { songs } = this.state;
    songs = songs.sort(function(a, b) {
      let numberA = parseInt(a.name.split('.')[0]);
      let numberB = parseInt(b.name.split('.')[0]);
      console.log('Number A', numberA);
      console.log('Number B', numberB);
      if(numberA < numberB) { return -1; }
      if(numberA > numberB) { return 1; }
      return 0;
    });
    console.log(songs);
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>Radiohead - Okay Computer</div>
              <div className='card-header'>In GIFs</div>
              <div className='card-body'>
                {/* <Link className='btn btn-primary btn-sm mb-3' to='/create/song'>
                  Create new song
                </Link> */}
                <ul className='list-group list-group-flush song-list'>
                  {songs.map(song => (
                    <Link
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center song-list-item'
                      to={`/${song.id}`}
                      key={song.id}
                    >{song.name}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SongList