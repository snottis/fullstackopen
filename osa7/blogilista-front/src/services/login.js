import axios from 'axios';

const baseUrl = '/login';

const login = async (u, p) => {
    try {
        const result = await axios.post(baseUrl, {username: u, password: p});
        return result.data;
    } catch (error) {
        return null;
    }
    
};

export default login;