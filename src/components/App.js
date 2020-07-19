import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies , setshowFavourite} from '../actions';

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
        const { favourites } = this.props.store.getState();
        const index = favourites.indexOf(movie);
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
        const { list, favourites, showFavourite } = this.props.store.getState();
        console.log('Render',this.props.store.getState());

        const displayMovies = showFavourite?favourites:list;
        return(
        <div className="App">
            <Navbar />
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

export default App;
