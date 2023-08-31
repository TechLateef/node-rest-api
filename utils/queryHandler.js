const { Op } = require('sequelize');

class QueryHandler {
  constructor(Model, queryString, defaultSort) {
    this.Model = Model;
    this.queryString = queryString;
    this.defaultSort = defaultSort || [['createdAt', 'DESC'], ['id', 'DESC']];
  }

  filter() {
    const excluded = ['page', 'sort', 'limit', 'fields'];
    const queryParam = {};
    for (const field in this.queryString) {
      if (this.queryString[field] !== '' && !excluded.includes(field)) {
        queryParam[field] = this.queryString[field];
      }
    }
    for (const field of ['fullname', 'email']) {
      if (queryParam[field]) {
        queryParam[field] = { [Op.like]: `%${queryParam[field]}%` };
      }
    }
    return queryParam;
  }

  sort() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort;
      if (!(sortBy instanceof Array)) {
        sortBy = sortBy.split(',');
      }
      return sortBy.map((field) => field.startsWith('-') ? [field.substring(1), 'DESC'] : [field, 'ASC']);
    }
    return this.defaultSort;
  }

  project() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').map((field) => field.trim());
      return fields;
    } else {
      return ['id', 'fullname', 'email'];
    }
  }

  paginate() {
    const page = this.queryString.page > 0 ? this.queryString.page : 1;
    const limit = this.queryString.limit * 1 || 10;
    const offset = (page - 1) * limit;
    return [offset, limit];
  }

  async process() {
    const query = this.filter();
    const attributes = this.project();
    const order = this.sort();
    const [offset, limit] = this.paginate();

    let results = [];
    try {
      results = await this.Model.findAll({
        where: query,
        attributes,
        order,
        offset,
        limit,
      });
    } catch (error) {
      console.log('Error Processing Query String >>>', error);
    } finally {
      return results;
    }
  }
}

module.exports = QueryHandler;
