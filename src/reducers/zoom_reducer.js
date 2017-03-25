import { ZOOM } from '../actions/types';

export default function(state={zoomLevel:1}, action) {
    switch(action.type) {
        case ZOOM :
            return {...state, zoomLevel:action.payload};
    }
    return state;
}