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
    const { songs } = this.state
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>All songs</div>
              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3' to='/create/song'>
                  Create new song
                </Link>
                <ul className='list-group list-group-flush'>
                  {songs.map(song => (
                    <Link
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                      to={`/${song.id}`}
                      key={song.id}
                    >
                      <p>{song.name} - {song.artist}</p>

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