import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://gv-burger-react.firebaseio.com/'
});

export default instance;