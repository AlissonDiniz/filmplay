import logger from '../../configuration/logger';
import Movie from './../domain/movie';

class MovieService {

    async getAll(filterBody, pageable) {
        let filter = {};
        if (filterBody) {
            filter = { "title": { $regex: filterBody.title + '.*' } };
        }

        const options = {
        };
        if (pageable.page && pageable.page > 0) {
            options.page = pageable.page;
        }
        if (pageable.size && pageable.size > 0) {
            options.limit = pageable.size;
        }
        if (pageable.sort) {
            options.sort = {};
            options.sort[pageable.sort] = 1;
            
            if (pageable.order === 'desc') {
                options.sort[pageable.sort] = -1;
            }
        }

        logger.info(`${this.constructor.name}.getAll() with filter ${JSON.stringify(filter)} and pagination ${JSON.stringify(pageable)}`);
        const result = await Movie.paginate(filter, options);
        return {
            content: result.docs.map((it) => {
                return {
                    id: it._id,
                    title: it.title,
                    synopsis: it.synopsis,
                    minutes: it.minutes
                };
            }),
            page: result.page,
            size: options.limit,
            totalRecords: result.total,
            totalPages: result.pages
        }
    }

    async create(bodyData) {
        logger.info(`${this.constructor.name}.create() with body data ${JSON.stringify(bodyData)}`);
        const entity = {
            title: bodyData.title,
            synopsis: bodyData.synopsis,
            minutes: bodyData.minutes
        };
        const result = await Movie.create(entity);
        return {
            id: result._id,
            title: result.title,
            synopsis: result.synopsis,
            minutes: result.minutes
        };
    }

    async update(id, bodyData) {
        logger.info(`${this.constructor.name}.update() with id ${id} and body data ${JSON.stringify(bodyData)}`);
        const changes = { ...bodyData };
        await Movie.updateOne({ _id: id }, { "$set": changes });
    }

    async delete(id) {
        logger.info(`${this.constructor.name}.delete() with id ${id}`);
        const result = await Movie.findOne({ _id: id });
        if (result) {
            await Movie.deleteOne({ _id: id });
        } else {
            throw Error('Movie cannot be found.');
        }
    }
}

export default new MovieService();
