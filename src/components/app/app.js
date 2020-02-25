import React, {Component} from 'react';
import Header from '../header';
import ErrorIndicator from "../error-indicator";
import RandomPlanet from '../random-planet';

import './app.css'
import PeoplePage from "../people-page";

export default class App extends Component {

    state = {
        hasError: false
    };

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>;
        }
        return (
            <div className="host-block">
                <Header/>
                <RandomPlanet/>
                <PeoplePage/>
            </div>
        )
    }
};
