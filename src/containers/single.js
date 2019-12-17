import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchPost} from '../actions/index';

import Header from '../components/header';
import MainSingle from '../components/mainSingle';
import Footer from '../components/footer';
import LoaderList from "../components/home/loaderList";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Single extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
        };
       
    }
    componentWillUpdate() {
		window.scrollTo(0, 0);
	}
    componentWillMount() {
        this.props.fetchPost(this.props.location.pathname).then( () => this.setState({ loading: false}));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.props.fetchPost(nextProps.location.pathname);
        }
    }

    componentDidUpdate() {
       
    
        if(this.props.single){

            document.title = `${this.props.single.title.rendered} - ${RT_API.siteName} - ${RT_API.siteDescription}`;

        }else{
            document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;
        }
    }

    render() {
        return (
            
            <section className="container-fluid template-single">
                <Header/>
                <ReactCSSTransitionGroup
						transitionName="fade"
						transitionEnterTimeout={5000}
						transitionLeaveTimeout={5000}>
                {this.state.loading?<LoaderList />:<MainSingle />}
                </ReactCSSTransitionGroup>
                <Footer/>
            </section>
        );
    }
}


function mapStateToProps({single}) {
    return {single};
}

export default connect(mapStateToProps, {fetchPost})(Single)