import { run_non_returning_query, run_returning_query } from "./database";

export default class IncomeModel {
  static table_name = "Incomes";

  static async init() {
    const query = `CREATE TABLE IF NOT EXISTS ${IncomeModel.table_name}(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount INTEGER DEFAULT 0,
      createdAt DATE DEFAULT CURRENT_TIMESTAMP
    );`;

    return await run_non_returning_query(query);
  }

  static async getAll() {
    const query = `SELECT * FROM ${IncomeModel.table_name};`;
    return await run_returning_query(query);
  }

  static async create({ amount }) {
    let columns = [];
    let values = [];

    if (amount === undefined) {
      amount = 0;
    }

    if (amount) {
      columns.push("amount");
      values.push(`'${amount}'`);
    }

    const query = `INSERT INTO ${IncomeModel.table_name}(${columns}) VALUES(${values});`;
    return await run_non_returning_query(query);
  }

  static async update({ id, amount }) {
    let updates = [];

    if (id) {
      updates.push(`id = '${id}'`);
    }

    if (amount) {
      updates.push(`amount = ${amount}`);
    }

    const query = `UPDATE ${IncomeModel.table_name} SET ${updates} WHERE id = ${id};`;
    return await run_non_returning_query(query);
  }

  static async deleteById(id) {
    const query = `DELETE FROM ${IncomeModel.table_name} WHERE id = ${id};`;
    return await run_non_returning_query(query);
  }
}
