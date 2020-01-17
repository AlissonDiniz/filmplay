import logger from '../../configuration/logger';
import Serie from './../domain/serie';

class SerieService {

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
        const result = await Serie.paginate(filter, options);
        return {
            content: result.docs.map((it) => {
                return {
                    id: it._id,
                    title: it.title,
                    synopsis: it.synopsis,
                    seasons: it.seasons
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
            seasons: bodyData.seasons
        };
        const result = await Serie.create(entity);
        return {
            id: result._id,
            title: result.title,
            synopsis: result.synopsis,
            seasons: result.seasons
        };
    }

    async update(id, bodyData) {
        logger.info(`${this.constructor.name}.update() with id ${id} and body data ${JSON.stringify(bodyData)}`);
        const changes = { ...bodyData };
        await Serie.updateOne({ _id: id }, { "$set": changes });
    }

    async delete(id) {
        logger.info(`${this.constructor.name}.delete() with id ${id}`);
        const result = await Serie.findOne({ _id: id });
        if (result) {
            await Serie.deleteOne({ _id: id });
        } else {
            throw Error('Movie cannot be found.');
        }
    }
}

export default new SerieService();
