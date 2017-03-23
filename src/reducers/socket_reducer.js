import { SOCKET } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case SOCKET:
            return { ...state, socket: action.payload };
        
    }
    return state;
}