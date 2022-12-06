import axios from 'axios';

export const get = async (url) =>
    axios.get('https://api.apilayer.com/currency_data/list', {
        headers: {
            apikey: '99mMiaqhSYNlzxYyuF0Laclspa2OynAH'
        }
    });
