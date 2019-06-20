import { 
    GET_PROFILE, 
    PROFILE_ERROR, 
    CLEAR_PROFILE, 
    GET_PROFILES, 
    GET_REPOS 
} from "../actions/types";

const intialState = {
    //holds all the user profile data. Also, if we visit another user's profile, it'll be stored in here...both sets of individual data will be put in here.
    profile: null,
    //an empty array that is for the profile listing page where we have the list of developers 
    profiles: [],
    //once fetching github repos, this is where they'll be stored
    repos: [],
    //once we make a request, this will be set to false
    loading: true,
    //holds any errors in the request
    error: {}
}

export default function(state = intialState, action){
    const{ type, payload } = action;

    switch(type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
               ...state,
               profiles: payload,
               loading: false 
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            };
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        default:
            return state;
    }
}