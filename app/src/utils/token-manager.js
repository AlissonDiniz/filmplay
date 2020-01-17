export default class TokenManager {
    
    static putUserToken(token) {
        localStorage.setItem('@filmplay-app/token', token);
    }

    static getUserToken(token) {
        return localStorage.getItem('@filmplay-app/token', token);
    }

    static signOut(history) {
        localStorage.removeItem('@filmplay-app/token');
        history.push('/login');
    }

    static putAppToken(token) {
        localStorage.setItem('@filmplay-app/app-token', token);
    }

    static removeAppToken() {
        localStorage.removeItem('@filmplay-app/app-token');
    }
}