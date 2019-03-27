import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import jsonResponse from '../../json/monarchs';

export default class Example extends Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    handleClick(e)  {
        alert('This is being clicked');
    }

    render() {


        var monarchList = jsonResponse.map(function(element, index) {
            return (
            <div key={index}>
                <h3>{ element.nm }</h3>
                <p>{ element.hse }</p>
            </div>
            );
        });

        console.log(monarchList);

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div onClick={this.handleClick} className="card-header">Larareact</div>

                            <div className="card-body">
                                { this.state.date.toLocaleTimeString() }
                            </div>

                            { monarchList }

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
