import React, {Component} from 'react';

import SwapiService from '../../services/swapi-service';

import './random-planet.css';
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false
        });
    };

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    };

    updatePlanet = () => {
        const planetId = Math.floor(Math.random() * 25) + 3;
        this.swapiService.getPlanet(planetId)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    };

    render() {
        const {planet, loading, error} = this.state;

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <PlanetView planet={planet}/> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const PlanetView = ({planet}) => {
    const {id, name, population, rotationPeriod, diameter} = planet;
    return (
        <React.Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                 alt=""/>
            <div className="info-block">
                <h4>{name}</h4>
                <div className="info-item">
                    <span className="info-item__label">Population:</span>
                    <span className="info-item__value">{population}</span>
                </div>
                <div className="info-item">
                    <span className="info-item__label">Rotation Period:</span>
                    <span className="info-item__value">{rotationPeriod}</span>
                </div>
                <div className="info-item">
                    <span className="info-item__label">Diameter:</span>
                    <span className="info-item__value">{diameter}</span>
                </div>
            </div>
        </React.Fragment>
    );
};
