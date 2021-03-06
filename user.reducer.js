import { GET_USER, UPDATE_BIO, UPLOAD_PICTURE } from "../actions/user.actions";


const etatInitial = {};

export default function userReducer(state = etatInitial, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload,

            };
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload,
            }
        default:
            return state;

    }
}
