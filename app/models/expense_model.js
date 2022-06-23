import { run_non_returning_query, run_returning_query } from "./database";

export default class ExpenseModel {
  static table_name = "Expenses";

  static async init() {
    const query = `CREATE TABLE IF NOT EXISTS ${ExpenseModel.table_name}(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      allotment_id INTEGER DEFAULT NULL,
      expense INTEGER DEFAULT 0,
      createdAt DATE DEFAULT CURRENT_TIMESTAMP
    );`;

    return await run_non_returning_query(query);
  }

  static async getAll() {
    const query = `SELECT * FROM ${ExpenseModel.table_name};`;
    return await run_returning_query(query);
  }

  static async create({ allotment_id, expense }) {
    let columns = [];
    let values = [];

    if (allotment_id) {
      columns.push("allotment_id");
      values.push(`'${allotment_id}'`);
    }

    if (expense) {
      columns.push("expense");
      values.push(`${expense}`);
    }

    const query = `INSERT INTO ${ExpenseModel.table_name}(${columns}) VALUES(${values});`;
    return await run_non_returning_query(query);
  }

  static async update({ id, expense }) {
    let updates = [];

    if (id) {
      updates.push(`id = '${id}'`);
    }

    if (expense) {
      updates.push(`expense = ${expense}`);
    }

    const query = `UPDATE ${ExpenseModel.table_name} SET ${updates} WHERE id = ${id};`;
    return await run_non_returning_query(query);
  }

  static async deleteById(id) {
    const query = `DELETE FROM ${ExpenseModel.table_name} WHERE id = ${id};`;
    return await run_non_returning_query(query);
  }
}
