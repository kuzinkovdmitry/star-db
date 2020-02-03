import React, {Component} from 'react';

import SwapiService from '../../services/swapi-service';

import './random-planet.css';
import Spinner from "../spinner/spinner";

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {}
    };

    constructor() {
        super();
        this.updatePlanet();
    }

    onPlanetLoaded = (planet) => {
        this.setState({planet});
    };

    updatePlanet() {
        const planetId = Math.floor(Math.random() * 25) + 2;
        this.swapiService.getPlanet(planetId)
            .then(this.onPlanetLoaded);
    }

    render() {
        const {planet: {id, name, population, rotationPeriod, diameter}} = this.state;
        return (
            <div className="random-planet jumbotron rounded">
                <img className="planet-image"
                     src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
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
            </div>
        )
    }
}
