import {ADD_MOVIES} from '../actions';
const initalMovieState= {
    list:[],
    favourites: []
}
export default function movies (state=initalMovieState ,action){
    if(action.type === ADD_MOVIES ){
        return  {
            ...state,
            list: action.movies
        }
    }
    return state ;
}

