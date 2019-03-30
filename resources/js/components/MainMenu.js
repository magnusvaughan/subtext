import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MainMenu extends Component {
  constructor () {
    super()
    this.state = {

    }
  }

  componentDidMount () {
      
  }

  render () {
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>You must choose</div>
              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3 ' to='/stories'>
                  Show Giffed Stories
                </Link>
                <Link className='btn btn-primary btn-sm mb-3 ml-3' to='/songs'>
                  Show Giffed Lyrics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MainMenu