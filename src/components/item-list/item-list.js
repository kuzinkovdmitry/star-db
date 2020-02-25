import React, {Component} from 'react';
import './item-list.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";

export default class ItemList extends Component {

    swapiService = new SwapiService();

    state = {
      peopleList: null
    };

    componentDidMount() {
        this.swapiService.getAllPeoples()
            .then((peopleList) => {
                this.setState({peopleList});
            })
    }

    renderItems(arr) {
        return arr.map(({id, name}) => {
            return (
                <p className="list-item"
                   key={id}
                   onClick={() => this.props.onItemSelected(id)}>
                    {name}
                </p>
            )
        })
    }

    render() {

        const {peopleList} = this.state;

        if (!peopleList) {
            return <Spinner/>
        }

        const items = this.renderItems(peopleList);

        return (
            <div className="list">
                {items}
            </div>
        )
    }
};
