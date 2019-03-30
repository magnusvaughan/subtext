// resources/assets/js/components/ProjectsList.js

import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LyricsList extends Component {
  constructor () {
    super()
    this.state = {
      stories: []
    }
  }

  componentDidMount () {
    axios.get('/api/stories').then(response => {
      this.setState({
        stories: response.data
      })
    })
  }

  render () {
    const { stories } = this.state
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>All Lyrics</div>
              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                  Giff up some lyrics
                </Link>
                <ul className='list-group list-group-flush'>
                  {stories.map(story => (
                    <Link
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                      to={`/${story.id}`}
                      key={story.id}
                    >
                      {story.name}
                      <span className='badge badge-primary badge-pill'>
                        {story.turn_count}
                      </span>
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

export default LyricsList