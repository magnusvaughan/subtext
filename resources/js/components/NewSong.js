import axios from 'axios'
    import React, { Component } from 'react'

    class NewSong extends Component {
      constructor (props) {
        super(props)
        this.state = {
          name: '',
          track_number: '',
          lyrics: '',
          artist: '',
          album: '',
          year: '',
          errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewsong = this.handleCreateNewsong.bind(this)
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
          track_number: this.state.track_number,
          lyrics: this.state.lyrics,
          artist: this.state.artist,
          album: this.state.album,
          year: this.state.year
        }

        console.log(song);

        axios.post('/api/songs', song)
          .then(response => {
            // redirect to the homepage
            console.log('Response data', response.data);
            history.push(`/songs/${response.data.id}`)
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
                    <form onSubmit={this.handleCreateNewsong}>
                      <div className='form-group'>
                        <label htmlFor='name'>Song Name</label>
                        <input
                          id='name'
                          type='text'
                          className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                          name='name'
                          value={this.state.name}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('name')}
                      </div>
                      <div className='form-group'>
                        <label htmlFor='track_number'>Track Number</label>
                        <input
                          id='track_number'
                          type='integer'
                          className={`form-control ${this.hasErrorFor('track_number') ? 'is-invalid' : ''}`}
                          name='track_number'
                          value={this.state.track_number}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('track_number')}
                      </div>
                      <div className="form-group">
                      <label htmlFor='artist'>Artist</label>
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
                      <div className="form-group">
                      <label htmlFor='album'>Album</label>
                        <input
                          id='album'
                          type='text'
                          className={`form-control ${this.hasErrorFor('album') ? 'is-invalid' : ''}`}
                          name='album'
                          value={this.state.album}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('album')}
                      </div>
                      <div className="form-group">
                      <label htmlFor='year'>Year</label>
                        <input
                          id='year'
                          type='text'
                          className={`form-control ${this.hasErrorFor('year') ? 'is-invalid' : ''}`}
                          name='year'
                          value={this.state.year}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('year')}
                      </div>
                      <div className='form-group'>
                        <label htmlFor='lyrics'>Song lyrics</label>
                        <textarea
                          id='lyrics'
                          className={`form-control ${this.hasErrorFor('lyrics') ? 'is-invalid' : ''}`}
                          name='lyrics'
                          rows='10'
                          value={this.state.lyrics}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('lyrics')}
                      </div>
                      <button className='btn btn-primary'>Create</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

    export default NewSong