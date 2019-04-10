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

    const { id } = this.props.match.params

    axios.get(`/api/albums/${id}`).then(response => {
      console.log(response);
      this.setState({
        songs: response.data.songs
      })
    })
  }

  render () {
    let { songs } = this.state;
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>Radiohead - OK Computer</div>
              <div className='card-header'>In GIFs - This is the songlist</div>
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