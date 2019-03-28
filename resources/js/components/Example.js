import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import jsonResponse from '../../json/monarchs';

export default class Example extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            image: ''
        };
    }

    handleClick(e)  {
        alert('This is being clicked');
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div onClick={this.handleClick} className="card-header">Larareact</div>

                            <div className="card-body">
                                { this.state.date.toLocaleTimeString() }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
