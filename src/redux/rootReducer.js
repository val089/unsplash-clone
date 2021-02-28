import { combineReducers } from 'redux';
import photosReducer from './redux';

const rootReducer = combineReducers({
	photos: photosReducer,
});

export default rootReducer;
