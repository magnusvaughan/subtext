import axios from 'axios'
    import React, { Component } from 'react'

    class NewSong extends Component {
      constructor (props) {
        super(props)
        this.state = {
          name: '',
          lyrics: '',
          artist: '',
          errors: [],
          results: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewsong = this.handleCreateNewsong.bind(this)
        this.handleSearchArtist = this.handleSearchArtist.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
      }

      handleFieldChange (event) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      handleCreateNewsong (event) {
        event.preventDefault()

        const { history } = this.props

        const song = {
          name: this.state.name,
          artist: this.state.artist,
          lyrics: this.state.lyrics
        }

        axios.post('/api/songs', song)
          .then(response => {
            // redirect to the homepage 
            history.push(`/${response.data.id}`)
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
            })
          })
      }

      handleSearchArtist(event) {

        const { history } = this.props

        event.preventDefault()
        const artist = {
          artist: this.state.artist
        }

        axios.post('/api/artist', artist)
          .then(response => {
            console.log(response);
            this.setState({
              results: response.data
            })
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
            })
          })
      }

      hasErrorFor (field) {
        return !!this.state.errors[field]
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
        let { results } = this.state;
        return (
          <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-header'>Reveal the subtext</div>
                  <div className='card-body'>

                    <form onSubmit={this.handleSearchArtist}>

                      <div className="form-group">
                      <label htmlFor='artist'>Search for an artist</label>
                        <input
                          id='artist'
                          type='text'
                          className={`form-control ${this.hasErrorFor('artist') ? 'is-invalid' : ''}`}
                          name='artist'
                          value={this.state.artist}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('artist')}
                      </div>
                      <button className='btn btn-primary'>Search</button>
                    </form>
                  </div>
                </div>
                <div className='card-header'></div>
                  <div className='card-body'>
                    <ul className='list-group mt-3'>
                      {results.map(result => (
                        <li
                          className='list-group-item d-flex align-items-center turn'
                          key={result.key}
                        > 
                        <a href={result.href}>{result.text}</a>
                        </li>
                      ))}
                    </ul>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

    export default NewSong