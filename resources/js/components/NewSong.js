import axios from 'axios'
    import React, { Component } from 'react'

    class NewSong extends Component {
      constructor (props) {
        super(props)
        this.state = {
          name: '',
          lyrics: '',
          song: '',
          errors: [],
          results: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewsong = this.handleCreateNewsong.bind(this)
        this.handleSearchSong = this.handleSearchSong.bind(this)
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

      handleSearchSong(event) {

        const { history } = this.props

        event.preventDefault()
        const song = {
          song: this.state.song
        }

        console.log(song);

        axios.post('/api/songs/search', song)
          .then(response => {
            console.log(response);
            if(response.data = {}) {
              this.setState({
                results: [{href:"#", song_name: "No results found - please search again"}]
              })
            }
            else {
              this.setState({
                results: response.data
              })
            }
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

                    <form onSubmit={this.handleSearchSong}>

                      <div className="form-group">
                      <label htmlFor='song'>Search for a song</label>
                        <input
                          id='song'
                          type='text'
                          className={`form-control ${this.hasErrorFor('song') ? 'is-invalid' : ''}`}
                          name='song'
                          value={this.state.song}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('song')}
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
                        <a href={result.href}>{result.song_name} by {result.artist_name}</a>
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