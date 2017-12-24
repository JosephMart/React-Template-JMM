import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory'

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { navComponents, routeComponents } from './routes';
import todoApp from './reducers';
import './index.css';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const store = createStore(
    combineReducers({
        ...todoApp,
        router: routerReducer
    }),
    applyMiddleware(middleware)
)


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <ul>
                    {navComponents}
                </ul>

                <hr />
                {routeComponents}
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker();
