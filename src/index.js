require('./sass/styles.scss');

import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {createLogger} from 'redux-logger';
import {routerMiddleware, connectRouter, ConnectedRouter} from 'connected-react-router';
import withTracker from './components/withTracker';

import rootReducer from './reducers';

const siteBaseUrl = RT_API.baseUrl.replace(['http://','https://'],'').replace(window.location.origin.replace(['http://','https://'],''), '');
const history = createBrowserHistory({basename: siteBaseUrl});
const store = createStore(
	connectRouter(history)(rootReducer),
	compose(
		applyMiddleware(
			routerMiddleware(history),
			promise(),
			thunk,
			createLogger()
		)
	)
);

import Blog from './containers/blog';
import Home from './containers/home';
import Search from './containers/search';
import Category from './containers/category';
import Tag from './containers/tag';
import Single from './containers/single';

ReactDom.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path="/" component={withTracker(Home)}/>
				<Route path="/page/:pageNum" component={withTracker(Blog)}/>
				<Route path="/search/:term" component={withTracker(Search)}/>
				<Route path="/category/:slug/page/:pageNum" component={withTracker(Category)}/>
				<Route path="/category/:slug/" component={withTracker(Category)}/>
				<Route path="/category/:parent/:slug/page/:pageNum" component={withTracker(Category)}/>
				<Route path="/category/:parent/:slug/" component={withTracker(Category)}/>
				<Route path="/tag/:slug/page/:pageNum" component={withTracker(Tag)}/>
				<Route path="/tag/:slug" component={withTracker(Tag)}/>
				<Route path="*" component={withTracker(Single)}/>
			</Switch>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('react-main')
);
