import axios from 'axios'
import React, { Component } from 'react'

class SingleStory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      story: {},
      turns: [],
      title: '',
      turn_text: '',
      errors: {}
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleAddNewTurn = this.handleAddNewTurn.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this) 
    this.renderErrorFor = this.renderErrorFor.bind(this)

  }

  componentDidMount () {
    const storyId = this.props.match.params.id

    axios.get(`/api/stories/${storyId}`).then(response => {
      this.setState({
        story: response.data,
        turns: response.data.turns
      })
    })
  }

  handleFieldChange (event) {
    this.setState({
      turn_text: event.target.value
    })
  }

  handleAddNewTurn (event) {
    event.preventDefault()

    const turn = {
      turn_text: this.state.turn_text,
      story_id: this.state.story.id
    }

    axios.post('/api/turns', turn)
      .then(response => {
        // clear form input
        this.setState({
          turn_text: ''
        })
        // add new task to list of tasks
        this.setState(prevState => ({
          turns: prevState.turns.concat(response.data)
        }))
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
    const { story, turns } = this.state

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>{story.name}</div>
              <div className='card-body'>
                <p>{story.description}</p>

                <ul className='list-group mt-3'>
                  {turns.map(turn => (
                    <li
                      className='list-group-item d-flex justify-content-between align-items-center'
                      key={turn.id}
                    >
                      {turn.turn_text}

                    </li>
                  ))}
                </ul>

                <hr />

                <form onSubmit={this.handleAddNewTurn}>
                    <div className='input-group'>
                        <input
                        type='text'
                        name='title'
                        className={`form-control ${this.hasErrorFor('turn_text') ? 'is-invalid' : ''}`}
                        placeholder='Task Text'
                        value={this.state.turn_text}
                        onChange={this.handleFieldChange}
                        />
                        <div className='input-group-append'>
                        <button className='btn btn-primary'>Add turn</button>
                        </div>
                        {this.renderErrorFor('turn_text')}
                    </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SingleStory