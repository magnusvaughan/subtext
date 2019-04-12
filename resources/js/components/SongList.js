import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SongList extends Component {
  constructor () {
    super()
    this.state = {
      songs: [],
      album_name:'',
      'artist_name':''
    }
  }

  componentDidMount () {

    const { id } = this.props.match.params

    axios.get(`/api/albums/${id}`).then(response => {
      var orderedSongs = response.data.songs.sort((a, b) => parseFloat(a.track_number) - parseFloat(b.track_number));
      this.setState({
        songs: response.data.songs,
        album_name: response.data.album_name,
        artist_name: response.data.artist_name,
      })
    })
  }

  render () {
    let { songs, album_name, artist_name } = this.state;
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>{artist_name} - {album_name}</div>
              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3' to='/create/song'>
                  Create new song
                </Link>
                <ul className='list-group list-group-flush song-list'>
                  {songs.map(song => (
                    <Link
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center song-list-item'
                      to={`/songs/${song.id}`}
                      key={song.id}
                    >{song.track_number}. {song.name}
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