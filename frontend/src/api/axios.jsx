import axios from 'axios';

// Named export of Axios instance as a function
export const createApiClient = () => {
    return axios.create({
        baseURL: 'http://localhost:8080'
    });
};

export default createApiClient;
