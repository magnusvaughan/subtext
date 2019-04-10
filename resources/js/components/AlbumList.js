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
      var orderedAlbums = response.data.sort((a, b) => parseFloat(a.year) - parseFloat(b.year));
      this.setState({
        albums: orderedAlbums
      })
    })
  }

  render () {
    let { albums } = this.state;
    return (
      <div className='container py-2'>
        <div className="row align-items-center justify-content-center">
        {albums.map(album => (
          <div className="col-md-3">
            <Link
              className='list-group-item list-group-item-action d-flex justify-content-between align-items-center song-list-item'
              to={`/albums/${album.id}`}
              key={album.id}
            >
            <img class="album-cover" src={'images/'+album.cover_image} alt=""/>
            {/* {album.album_name} - {album.year} */}
            </Link>
          </div>
        ))}
        </div>
      </div>
    )
  }
}

export default AlbumList