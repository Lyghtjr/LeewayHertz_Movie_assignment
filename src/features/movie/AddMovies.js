import {
    SET_LOADING_STATUS,
    GET_MOVIES
} from '../../actions/actionType'


export const initState = {
    addMovies:[],
    loading:false,
   
};
   const addMovies = (state=initState, action) => {
        switch (action.type){
            case GET_MOVIES:
                return{
                    ...state,
                    articles:action.payload,
                }
            case SET_LOADING_STATUS:
                return{
                    ...state,
                    loading:action.status,
                }
            default:
                return state;
        }
    };


export default addMovies;
