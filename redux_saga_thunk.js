// For reference https://medium.com/javascript-in-plain-english/redux-thunk-vs-redux-saga-8c93fc822de

// Install these dependencies 
//npm i --save react-redux redux redux-logger redux-saga redux-thunk

        //Redux Setup in Project

        //Create Redux Folder

//  store.js in Redux Folder

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;


// root-reducer in Redux Folder

//root-reducer
import { combineReducers } from 'redux';
import fetchTasksReducer from './reducers/fetchTasksReducer'

const rootReducer = combineReducers({tasks: fetchTasksReducer,});

export default rootReducer;


// import store inside App.js

// app.js


import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Tasks from './components/tasks';
import './App.css';

const store = require('./reducers').init();

class App extends Component {
    render(){
        return(
            <Provider store={store}>
                <BrowserRouter>
                <div className='container'>
                    <Route exact path = '/' component={Tasks} />
                    </div>
                    </BrowserRouter>
            </Provider>
        );
    }

}

export default App;



//create fetchTasksREducer

...

const INITIAL_STATE = {
    tasks: null,
    isFetching: false,
    errorMessage: undefined
};


const fetchTasksReducer = (state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case "FETCH_TASKS_START":
            return {
                ...state,
                isFetching: true
            };
//fetch_tasks_start in this HTTP request has been started

            case "FETCH_TASKS_SUCCESS":
                return {
                    ...state,
                    isFetching: false,
                    tasks: action.payload
                };
//fetch_tasks_sucess in this HTTP request successfull so the state must be updated


                case "FETCH_TASKS_ERROR":
                    return {
                        ...state,
                        isFetching: false,
                        errorMessage: action.payload
                    };

// fetch_tasks_error in this HTTP request has errrored out. In this we can show an error component 
//to let user know the error has occured                    
                    default:
                        return state;
    }
};

export default fetchTasksReducer;


//App does not work until it has any action creator to fire an action that reducer handles

           






//REDUX THUNK


            export const fetchTasksStarted = () => ({
                type: "FETCH_TASKS_START"
            });

            export const fetchTasksSuccess = tasks => ({
                type: "FETCH_TASKS_SUCCESS",
                payload: tasks
            });

            export const fetchTasksError = errorMessage => ({
                type: "FETCH_TASKS_ERROR",
                payload: errorMessage
            });


            const fetchTasks = () => async dispatch => {
                dispatch(fetchTasksStarted())
                try{
                    const TasksResponse = await fetch("API URL")

            const task = await taskResponse.json()
                        dispatch(fetchTasksSuccess(tasks))
                }catch(exc){
                    dispatch(fetchTasksError(error.message))
                }
            }

            // fetchTasks is a function that returns another function has a parameter dispatch 
            //once dispatch gets called the control flow will move to reducer to decide what to do



            
            
            
            
            
            
//REDUX SAGA
//REDUX SAGA is the middleware which allows to implement asynchronous code with Redux


// store.js for redux saga


import { createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

import { watchFetchTasksSaga } from './saga/fetchTasks.saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(watchFetchTasksSaga);

export default store;


// Create actions


export const fetchTasksStarted = () => ({
    type: "FETCH_TASKS_START"
});

export const fetchTasksSuccess = tasks => ({
    type: "FETCH_TASKS_SUCCESS",
    payload: tasks
});

export const fetchTasksError = errorMessage => ({
    type: "FETCH_TASKS_ERRROR",
    payload: errorMessage
});

// Create a Saga Folder and create a new file fetchTasks.saga

//fetchTasks.saga

import { takeLatest, put} from "redux-saga/effects";

function* fetchTasksSaga(){
    try{
        const taskResponse = yield fetch("API URL")

        const tasks = yield taskResponse.json()

        yield put(fetchTasksSuccess(tasks));
    } catch (error) {
        yield put(fetchTasksError(error.message));
    }
}

export default function* watchFetchTasksSaga(){
    yield takeLatest("FETCH_TASKS_START", fetchTasksSaga)
}

// function * are called generator functions used with (takeLatest) and (takeEvery)

// by using put function we can fire actions just like dispatch





...

const INITIAL_STATE = {
    tasks: null,
    isFetching: false,
    errorMessage: undefined
};

const fetchTasksReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_TASKS_START":
            return {
                ...state,
                isFetching: true
            };
            case "FETCH_TASKS_SUCCESS":
                return {
                    ...state,
                    isFetching: false,
                    tasks: action.payload
                };
                case "FETCH_TASKS_ERROR":
                    return {
                        ...state,
                        isFetching: false,
                        errorMessage: action.payload
                    };

                    default:
                        return state;
    }
};

export default fetchTasksReducer;

