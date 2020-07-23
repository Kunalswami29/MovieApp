import { ADD_MOVIES, ADD_TO_FAVOURITE ,REMOVE_FROM_FAVOURITE,SET_SHOW_FAVOURITE} from '../actions';
import { combineReducers } from 'redux';
const initalMovieState= {
    list:[],
    favourites: [],
    showFavourite : false
}
export  function movies (state=initalMovieState ,action){
    // if(action.type === ADD_MOVIES ){
    //     return  {
    //         ...state,
    //         list: action.movies
    //     }
    // }
    // return state ;
    switch(action.type){
        case ADD_MOVIES:
            return{
                ...state,
                list: action.movies
            }
        case ADD_TO_FAVOURITE:
            return {
                ...state,
                favourites: [action.movie,...state.favourites]
            }
        case REMOVE_FROM_FAVOURITE:
            const filteredArray = state.favourites.filter(
                movie => movie.Title !== action.movie.Title
            );
            return{
                ...state,
                favourites: filteredArray
            };
        case SET_SHOW_FAVOURITE:
            return{
                ...state,
                showFavourite: action.val
            }
        default:
            return state;

    }
}
// search Reducer
const intialSearchState = {
    result : {}
};
export function search (state = intialSearchState , action){
    return state ;
}
// this is the main rootr reducer object , this is passed to the APP index.js
const intialRootState = {
    movies : initalMovieState,
    search : intialSearchState
}
// export default function rootReducer ( state = intialRootState ,action){
//     return {
//         movies : movies(state.movies ,action) ,
//         search : search(state.search ,action)
//     }
// }
export default combineReducers({
    movies,
    search
})
