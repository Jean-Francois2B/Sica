
import React, { useState } from "react";
import LeftNav from '../LeftNav';
import { useDispatch, useSelector } from 'react-redux';
import Uploadimg from "./Uploadimg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../utils";

const UpdateProfil = () => {

    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();
    const [followingPopUp, setFollowingPopUp] = useState(false);
    const [followersPopUp, setFollowersPopUp] = useState(false);

    const handleUpdate = () => (
        dispatch(updateBio(userData._id, bio)),
        setUpdateForm(false)
    )

    return (
        <div className="profil-container">
            <LeftNav />
            <h1>Profil de {userData.pseudo}</h1>
            <div className="left-part">
                <h3>Photo de profil</h3>
                <img src={userData.picture} alt="user.pic" />
                <Uploadimg />

            </div>
            <div className="right-part">
                <div className="bio-update">
                    <h3>Biographie</h3>
                    (updateForm === false && (
                    <>
                        <p onClick={() => setUpdateForm[!updateForm]}>(userData.bio</p>
                        <button onClick={() => setUpdateForm[!updateForm]} >  Modifier la biographie </button>
                    </>
                    ) )
                    (updateForm && (
                    <>
                        <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                        <button onClick={handleUpdate}>Valider les modifications </button>
                    </>
                    ))
                </div>
                <h4> Membre depuis le : {dateParser(userData.createdAt)}</h4>
                <h5 onClick={() => setFollowingPopUp(true)}>Abonnements : {userData.following ? userData.following.length : ""}</h5>
                <h5 onClick={() => setFollowersPopUp(true)}>Abonnés : {userData.followers ? userData.followers.length : ""}</h5>
            </div>
            {followingPopUp && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span className="cross" onClick={() => setFollowingPopUp(false)}>&#10005</span>
                        <ul>
                            {usersData.map((user) => {
                                for (let i = 0; i < usersData.following.length; i++) {
                                    if (user._id === userData.following[i]) {
                                        return (
                                            <li key={user._id}>
                                                <img src={user.picture} alt="user-pic" />
                                                <h4>
                                                    {user.pseudo}
                                                </h4>
                                                <h1>Follow handler</h1>
                                            </li>
                                        )
                                    }
                                }
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {followersPopUp && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnés</h3>
                        <span className="cross" onClick={() => setFollowersPopUp(false)}>&#10005</span>
                        <ul>
                            {usersData.map((user) => {
                                for (let i = 0; i < usersData.followers.length; i++) {
                                    if (user._id === userData.followers[i]) {
                                        return (
                                            <li key={user._id}>
                                                <img src={user.picture} alt="user-pic" />
                                                <h4>
                                                    {user.pseudo}
                                                </h4>
                                                <h1>Follow handler</h1>
                                            </li>
                                        )
                                    }
                                }
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );

};
export default UpdateProfil;
