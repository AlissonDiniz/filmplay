import Properties from './../properties';
import TokenManager from './../utils/token-manager';

export class MovieService {

    async getAll(filterName, page, size, sort, order) {
        const token = TokenManager.getUserToken();
        let urlPath = `${Properties.server}/api/movie?page=${page}&size=${size}`;
        if (sort && order) {
            urlPath = `${urlPath}&sort=${sort}&order=${order}`;
        }
        try {
            const response = await fetch(urlPath, {
                method: 'post',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: filterName ? JSON.stringify({ title: filterName }) : null
            });

            if (response.status !== 200) {
                const error = new Error();
                error.status = response.status;
                throw error;
            }
            const responseJson = response.json();
            return responseJson;
        } catch (error) {
            throw error;
        }
    }

    async create(movieRequestDTO) {
        const token = TokenManager.getUserToken();
        try {
            const response = await fetch(`${Properties.server}/api/movie/create`, {
                method: 'post',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...movieRequestDTO, minutes: Number(movieRequestDTO.minutes) })
            });

            if (response.status !== 201) {
                const error = new Error();
                error.status = response.status;
                throw error;
            }
            const responseJson = response.json();
            return responseJson;
        } catch (error) {
            throw error;
        }
    }

    async update(id, changes) {
        const token = TokenManager.getUserToken();
        try {
            const response = await fetch(`${Properties.server}/api/movie/${id}`, {
                method: 'put',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...changes, minutes: Number(changes.minutes) })
            });
            if (response.status !== 200) {
                const error = new Error();
                error.status = response.status;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        const token = TokenManager.getUserToken();
        try {
            const response = await fetch(`${Properties.server}/api/movie/${id}`, {
                method: 'delete',
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            });

            if (response.status !== 200) {
                const error = new Error();
                error.status = response.status;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new MovieService();