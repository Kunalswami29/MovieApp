import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies , setshowFavourite} from '../actions';
import { StoreContext } from '../index'
class App extends React.Component {
    componentDidMount(){
        const {store}= this.props;
        store.subscribe(() =>{
            console.log('updated');
            this.forceUpdate();
        });
        //make api call
        // dispatch action
        store.dispatch(addMovies(data));
        console.log('STATE',this.props.store.getState());
    }
    isMovieFavourite =(movie) => {
        const { movies } = this.props.store.getState();
        const index = movies.favourites.indexOf(movie);
        if(index !== -1){
            // found the movie
            return true;
        }
        return false;
    }
    onChangeTab = (val) => {
        this.props.store.dispatch(setshowFavourite(val))
    }
    render(){
        const { movies,search } = this.props.store.getState(); // { movies: {} , search : {} }
        const { list, favourites, showFavourite } = movies;
        console.log('Render',this.props.store.getState());
        const displayMovies = showFavourite ? favourites: list;
        
        return(
        <div className="App">
            <Navbar  search={search} />
            <div className ="main">
                <div className="tabs">
                    <div className={`tab ${showFavourite ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)} >Movies</div>
                    <div className ={`tab ${showFavourite ? 'active-tabs' :'' }`}onClick= {() => this.onChangeTab(true)} >Favourite</div>
                </div>
                <div className="List">
                    {displayMovies.map((movie ,index) => (
                        <MovieCard 
                         movie ={movie} 
                         key={`movies-${index}`} 
                         dispatch={this.props.store.dispatch} 
                         isFavourite = { this.isMovieFavourite(movie)}
                        />
                    ))}
                </div>
                {displayMovies.length === 0 ? <div className="no-movies"> No Movies to Display !!</div> : null}
            </div>
        </div>
        );
    }  
 }

 class AppWrapper extends React.Component{
     render(){
         return(
             <StoreContext.Consumer>
                 { (store)  => <App store = {store} /> }
             </StoreContext.Consumer>
         )
     }
 }
export default AppWrapper;
