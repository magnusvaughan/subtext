import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AlbumList extends Component {
  constructor () {
    super()
    this.state = {
      albums: []
    }
  }

  componentDidMount () {
    axios.get('/api/albums').then(response => {
      console.log(response);
      this.setState({
        albums: response.data
      })
    })
  }

  render () {
    let { albums } = this.state;
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>Radiohead - Albums</div>
              <div className='card-header'>In GIFs</div>
              <div className='card-body'>
                <ul className='list-group list-group-flush song-list'>
                  {albums.map(album => (
                    <Link
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center song-list-item'
                      to={`/albums/${album.id}`}
                      key={album.id}
                    >{album.album_name}
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

export default AlbumList