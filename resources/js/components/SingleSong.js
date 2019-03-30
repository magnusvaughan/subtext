import axios from 'axios'
import React, { Component } from 'react'

class SingleSong extends Component {
  constructor (props) {
    super(props)
    this.state = {
      song: {},
      artist: '',
      lyrics: [],
      errors: {}
    }

  }

  componentDidMount () {
    const songId = this.props.match.params.id

    axios.get(`/api/songs/${songId}`).then(response => {
    console.log('response here', response);
      this.setState({
        song: response.data,
        artist: response.data.artist,
        lyrics: response.data.lyrics
      })
    })
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }

  render () {
    const { song, lyrics } = this.state

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>{song.name}</div>
              <div className='card-body'>
                <p>{song.description}</p>

                <ul className='list-group mt-3'>
                  {lyrics.map(lyric => (
                    <li
                      className='list-group-item d-flex align-items-center turn'
                      key={lyric.id}
                    >
                      <span>{lyric.lyric_text}</span>

                      <img src={lyric.image_url} alt=""/>

                    </li>
                  ))}
                </ul>

                <hr />


              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SingleSong