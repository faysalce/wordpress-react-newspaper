import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

class Search extends Component {
    componentDidMount() {
        if ( this.props.isSearch) {
            this.searchInput.focus();
            const tempValue = this.props.searchTerm;
            this.searchInput.value = '';
            this.searchInput.value = tempValue;
        }
    }

    handleSearch(event) {
        event.preventDefault();
        const searchTerm = event.target.value;
        if (0 < searchTerm.length) {
            this.props.history.push(`/search/${searchTerm}`);
        } else {
            this.props.history.push('/');
        }
    }

    submit(event) {
        event.preventDefault();
    }

    render() {
        return (
            
            <form  onSubmit={this.submit}>

                                <div className="searchbar">
                                <input type="search"
                       value={this.props.searchTerm}
                       ref={(input) => this.searchInput = input}
                       onChange={this.handleSearch.bind(this)}
                       className="form-control"
                       placeholder="কী খুঁজতে চান?"/>

                                    <button type="submit" className="btn"><i className="ion-search"></i></button>

                                </div>

                            </form>

           
        );
    }
}

export default withRouter(Search);
