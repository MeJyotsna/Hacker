import {combineReducers} from 'redux';

import newsReducer from './newsReducer';
import voteCountReducer from './voteCountReducer';

const rootReducer = combineReducers({
    newsFeed: newsReducer,
    voteCount: voteCountReducer
});

export default rootReducer;