export const initUser = () => {
    const user = window.localStorage.getItem('login');
    return {type: 'INITUSER', data: JSON.parse(user)};
};

export const logOut = () => {
    window.localStorage.removeItem('login');
    return({type: 'LOGOUT'});
};

export const logIn = (user) => {
    window.localStorage.setItem('login', JSON.stringify(user));
    return {type: 'LOGIN', data: user};
};

const reducer = (state = null, action) => {
    switch(action.type) {
        case 'LOGIN':
            return action.data;
        case 'LOGOUT':
            return null;
        case 'INITUSER':
            return action.data;
        default:
            return state;
    }
};

export default reducer;