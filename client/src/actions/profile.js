import axios from "axios";
import { setAlert } from "./alert";

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    GET_REPOS

} from "./types";

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get("/api/profile/me");

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get all Profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE});
    try {
        const res = await axios.get("/api/profile");

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get Profile by ID
export const getProfileBuyId = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//create or update a profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await axios.post("/api/profile", formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        //if edit is true, then say 'profile updated', else say "Profile Created"
        dispatch(setAlert(edit ? "profile Updated": 'Profile Created', "success"));

        if(!edit) {
            history.push("/dashboard");
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));  
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
};

//Get Github repos
export const getGithubRepos = username => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};