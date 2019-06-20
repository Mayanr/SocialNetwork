import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import Spinner from "../layout/Spinner"
// import ProfileItem from "./ProfileItem"
// import { getProfiles } from "../../actions/profile"

const ProfileItems = ({ 
    profile:  {
        user: {_id, name, avatar },
        status,
        company,
        location,
        skills
    }
}) => {
    return <div className="profile bg-light">
    <img src={avatar} alt="" className="round-img"/>
    <div>
        <h2>{name}</h2>
        {/* if there's a company, print the company name */}
        <p>{status} {company && <span>at {company}</span>}</p>
        <p className="my-1">{ location && <span>in {location}</span>} </p>
        <Link to={`/profile/${_id}`} className= "btn btn-primary">
            View Profile
        </Link>
    </div>
    <ul>
        {skills.slice(0,4).map((skill, index) =>  
            <li key={index} className="text-primary">
                <i className="fas fa-check"></i>{skill}
            </li>)}
    </ul>
    </div>;
};

ProfileItems.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItems;