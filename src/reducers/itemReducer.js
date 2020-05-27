
import { ADD_ITEMS, LOADING } from '../actions/types';

const initialState = {
        items: [],
        loading: false
};
export default function (state = initialState, action)
{
        switch (action.type)
        {

                case ADD_ITEMS:
                        return {
                                ...state,
                                items: [action.payload, ...state.items]
                        }

                case LOADING:
                        return {
                                ...state,
                                loading: true
                        }
                default:
                        return state;
        }
}