import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import MovieReducer from '../features/movie/movieSlice';
import addMovies from '../features/movie/AddMovies';

export default configureStore({
    reducer:{
        user:userReducer,
        movie:MovieReducer,
        addmovie:addMovies,
    },
    middleware:getDefaultMiddleware({
        serializableCheck:false,
    })
})