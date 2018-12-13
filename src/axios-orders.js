import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-6f916.firebaseio.com'
});

export default instance;