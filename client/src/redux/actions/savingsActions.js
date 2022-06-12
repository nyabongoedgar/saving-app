import axiosInstance from "../../helpers/axios";
import * as actions from "./actionCreators/savingsCreators";
import notify from "../../helpers/notification";

export const createSaving =
  ({ amount, date, description }, callBack) =>
  async (dispatch) => {
    dispatch(actions.createSavingInit());
    const body = { amount, date: new Date(date), description };
    try {
      const res = await axiosInstance.post("/api/v1/savings", body);
      dispatch(actions.createSavingSuccess(res.data));
      notify("success", "Saving successfully captured");
      callBack && callBack();
    } catch (error) {
      if (error.response) {
        dispatch(actions.createSavingError(error.response.data.message));
        notify("error", "Deposit Error", error.response.data.message);
      } else {
        dispatch(actions.createSavingError(`${error}`));
      }
    }
  };

export const getSavings = () => async (dispatch) => {
  dispatch(actions.getSavingsInit());

  try {
    const res = await axiosInstance.get("/api/v1/savings");
    dispatch(actions.getSavingsSuccess(res.data));
  } catch (error) {
    if (error.response) {
      dispatch(actions.getSavingsError(error.response.data.error));
      notify("error", "Savings Error", error.response.data.error);
    } else {
      dispatch(actions.getSavingsError(`${error}`));
    }
  }
};
