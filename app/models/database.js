import * as sqlite from "expo-sqlite";

let db = undefined;

export const initDBConnection = async () => {
  console.log("initializing DB...");
  if (db === undefined) {
    db = sqlite.openDatabase("budget_app.db");
    console.log(db);
  }
};

export const run_returning_query = async (query) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const run_non_returning_query = async (query) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(query, null, resolve, (_, error) => reject(error));
    });
  });
};

initDBConnection();
