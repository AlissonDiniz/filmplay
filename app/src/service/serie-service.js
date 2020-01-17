import Properties from './../properties';
import TokenManager from './../utils/token-manager';

export class SerieService {

    async getAll(filterName, page, size, sort, order) {
        const token = TokenManager.getUserToken();
        let urlPath = `${Properties.server}/api/serie?page=${page}&size=${size}`;
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

    async create(serieRequestDTO) {
        const token = TokenManager.getUserToken();
        try {
            const response = await fetch(`${Properties.server}/api/serie/create`, {
                method: 'post',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...serieRequestDTO, seasons: Number(serieRequestDTO.seasons) })
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
            const response = await fetch(`${Properties.server}/api/serie/${id}`, {
                method: 'put',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...changes, seasons: Number(changes.seasons) })
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
            const response = await fetch(`${Properties.server}/api/serie/${id}`, {
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

export default new SerieService();