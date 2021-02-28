import axios from 'axios';

const FETCH_PHOTOS_REQUESTED = 'FETCH_PHOTOS_REQUESTED';
const FETCH_PHOTOS_SUCCEEDED = 'FETCH_PHOTOS_SUCCEEDED';
const FETCH_PHOTOS_FAILED = 'FETCH_PHOTOS_FAILED';

const GET_SEARCH_VALUE = 'GET_SEARCH_VALUE';

export const fetchPhotos = (value) => {
	return (dispatch) => {
		dispatch(fetchRequested());
		axios
			.get(
				`https://api.unsplash.com/search/photos?client_id=IiHTjYC5n1BhVTDfhpUAo-m5H1qPHy4CXT-WfrMDO4A&query=${value}`
			)
			.then((data) => {
				dispatch(fetchSucceeded(data.results));
			})
			.catch((error) => {
				dispatch(fetchFailed(error));
			});
	};
};

export const fetchRequested = () => ({ type: FETCH_PHOTOS_REQUESTED });

export const fetchFailed = () => ({ type: FETCH_PHOTOS_SUCCEEDED });

export const fetchSucceeded = (data) => ({
	type: FETCH_PHOTOS_FAILED,
	payload: data,
});

export const getSearchValue = (value) => ({
	type: GET_SEARCH_VALUE,
	payload: value,
});

const INITIAL_STATE = {
	searchValue: '',
	photos: [],
	isLoading: false,
	isError: false,
};

const photosReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_PHOTOS_REQUESTED:
			return {
				...state,
				isLoading: true,
				isError: false,
			};
		case FETCH_PHOTOS_SUCCEEDED:
			return {
				...state,
				isLoading: false,
				isError: false,
				photos: action.payload,
			};
		case FETCH_PHOTOS_FAILED:
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		case GET_SEARCH_VALUE:
			return {
				...state,
				searchValue: action.payload,
			};
		default:
			return state;
	}
};

export default photosReducer;
