import React, {Component} from 'react';
import './person-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        loading: true
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.personId !== prevProps.personId) {
            this.setState({loading: true});
            this.updatePerson();
        }
    }

    onPersonLoaded = (person) => {
      this.setState({
          person,
          loading: false
      })
    };

    updatePerson() {
        const {personId} = this.props;
        if (!personId) {
            return;
        }
        this.swapiService.getPerson(personId)
            .then(this.onPersonLoaded)
    }

    render() {
        const {person, loading} = this.state;
        const content = !loading ? PersonView(person) : <Spinner/>;

        return (
            <div className="person-block rounded">
                {content}
            </div>
        )
    }
};

const PersonView = (person) => {
    if (!person) {
        return <span>Select a person from a list</span>
    }
    const {id, name, gender, birthYear, eyeColor} = person;
    return (
        <React.Fragment>
            <img className="person-image"
                 src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                 alt=""/>
            <div className="person-info">
                <h4>{name}</h4>
                <div className="person-info-item">
                    <span className="person-info-item__label">Gender:</span>
                    <span className="person-info-item__value">{gender}</span>
                </div>
                <div className="person-info-item">
                    <span className="person-info-item__label">Birth Year:</span>
                    <span className="person-info-item__value">{birthYear}</span>
                </div>
                <div className="person-info-item">
                    <span className="person-info-item__label">Eye Color:</span>
                    <span className="person-info-item__value">{eyeColor}</span>
                </div>
            </div>
        </React.Fragment>
    )
};
