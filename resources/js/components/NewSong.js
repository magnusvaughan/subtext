import axios from 'axios'
    import React, { Component } from 'react'

    class NewSong extends Component {
      constructor (props) {
        super(props)
        this.state = {
          name: '',
          lyrics: '',
          artist: '',
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
          artist: this.state.artist,
          lyrics: this.state.lyrics
        }

        axios.post('/api/songs', song)
          .then(response => {
            // redirect to the homepage
            history.push('/')
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
        return (
          <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-header'>Gif up some lyrics</div>
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