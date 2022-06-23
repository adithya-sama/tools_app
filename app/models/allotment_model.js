import { run_non_returning_query, run_returning_query } from "./database";

export default class AllotmentModel {
  static periods = ["month"];
  static table_name = "Allotments";

  static async init() {
    const query = `CREATE TABLE IF NOT EXISTS ${AllotmentModel.table_name}(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT DEFAULT '',
      amount TEXT DEFAULT '0',
      period TEXT DEFAULT 'month',
      createdAt DATE DEFAULT CURRENT_TIMESTAMP
    );`;

    return await run_non_returning_query(query);
  }

  static async getAll() {
    const query = `SELECT * FROM ${AllotmentModel.table_name};`;
    return await run_returning_query(query);
  }

  static async create({ name, amount, period }) {
    let columns = [];
    let values = [];

    if (name) {
      columns.push("name");
      values.push(`'${name}'`);
    }

    if (amount) {
      columns.push("amount");
      values.push(`'${amount}'`);
    }

    if (period) {
      columns.push("period");
      values.push(`'${period}'`);
    }

    const query = `INSERT INTO ${AllotmentModel.table_name}(${columns}) VALUES(${values});`;
    return await run_non_returning_query(query);
  }

  static async update(id, name, amount, period) {
    let updates = [];

    if (name) {
      updates.push(`name = '${name}'`);
    }

    if (amount) {
      updates.push(`amount = '${amount}'`);
    }

    if (period) {
      updates.push(`period = '${period}'`);
    }

    const query = `UPDATE ${AllotmentModel.table_name} SET ${updates} WHERE id = ${id};`;
    return await run_non_returning_query(query);
  }

  static async deleteById(id) {
    const query = `DELETE FROM ${AllotmentModel.table_name} WHERE id = ${id};`;
    return await run_non_returning_query(query);
  }
}
