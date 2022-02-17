
import{
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';

//reducer 전 state와 현재를 다음 state로 보냄 
export default function (state={}, action){
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            return {...state, register:action.payload}
            break;
        case AUTH_USER:
            return {...state, userData:action.payload}
            break;
        default:
            return state;
    }
}