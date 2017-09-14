import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Dashboard from './containers/dashboard/Dashboard';
import Login from './containers/Login';
import Project from './containers/project/Project';
import Template from './containers/templates/Template';

export default (
	<Route path="/" component={App}>
		// <IndexRoute component={Dashboard} />
		<Route path="/" component={Dashboard} />
		<Route path="/project/:projectid" component={Project} />
		<Route path="/login" component={Login} />
		<Route path="/templates" component={Template} />
	</Route>
);
