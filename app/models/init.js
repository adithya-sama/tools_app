import AllotmentModel from "./allotment_model";
import ExpenseModel from "./expense_model";
import IncomeModel from "./income_model";

export const initDB = async () => {
  await AllotmentModel.init();
  await ExpenseModel.init();
  await IncomeModel.init();
};
