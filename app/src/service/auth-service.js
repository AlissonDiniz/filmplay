import Properties from './../properties';

export class AuthService {

    async signIn(username, password) {
        try {
            const response = await fetch(`${Properties.server}/api/auth/token`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const responseJson = response.json();
            if (response.status !== 201) {
                throw new Error(responseJson.error_description);
            }
            return responseJson;
        } catch (error) {
            throw new Error('INTERNAL_SERVER_EXCEPTION');
        }
    }

}

export default new AuthService();