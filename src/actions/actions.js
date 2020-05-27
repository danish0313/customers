import { ADD_ITEMS, LOADING } from './types';
import axios from 'axios';

export const addItem = (data) => dispatch =>
{
        console.log(data);
        axios.post('/Suppliers', data)
                .then(res => dispatch({
                        type: ADD_ITEMS,
                        payload: res.data
                }))
}

export const loading = () =>
{
        return {
                type: LOADING,
        };
}


