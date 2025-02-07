const EventEmitter = require('events');

class DbServiceKit extends EventEmitter{
	constructor() {
		super()
		this.instance = this._connect();

		if (!this.instance) {
			throw new Error('Sequelize instance not found');
		}
	}

	/** Initial connect
	 * @returns {SequelizeInstance|null}
	 */
	_connect() {
		if (this.instance) return;

		const modules = Object.values(require.cache);

		for (let module of modules) {
			if (module.exports && module.exports instanceof require('sequelize').Sequelize) {
				return module.exports
			}
		}

		return null
	}

	 _checkDefinedTable(tableName) {
		if (!Object.keys(obj).length) {
			throw new Error('This Table is not defined');
		}

		for (let [key, value] of Object.entries(this.instance.models)) {
			if (key !== tableName) {
				throw new Error('This Table is not defined');
			}
		}
	}

	/**
	 * @param modelName
	 * @param params
	 * @returns {Promise<SequelizeInstance>}
	 */
	async getCount(modelName, params) {
		this._checkDefinedTable(modelName);

		const result = await this.instance.models[modelName].count(params);

		return result;

	}
	/**
	 * @param modelName
	 * @param params
	 * @returns {Promise<SequelizeInstance>}
	 */
	async getList(modelName, params) {
		this._checkDefinedTable(modelName);

		const result = await this.instance.models[modelName].findAll(params);

		return result;

	}
	/**
	 * @param modelName
	 * @param params
	 * @returns {Promise<SequelizeInstance>}
	 */
	async getOne(modelName, params) {
		this._checkDefinedTable(modelName);

		const result = await this.instance.models[modelName].getById(params);

		return result;

	}
}

const dbServiceKit = new DbServiceKit();

module.exports = dbServiceKit;
