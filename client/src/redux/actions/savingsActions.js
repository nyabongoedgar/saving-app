import axiosInstance from "../../helpers/axios";
import * as actions from "./actionCreators/savingsCreators";
import notify from "../../helpers/notification";

export const createSaving =
  ({ amount, date, description }) =>
  async (dispatch) => {
    dispatch(actions.createSavingInit());
    const body = { amount, date, description };
    try {
      await axiosInstance.post("/api/v1/savings", body);
      dispatch(actions.createSavingSuccess());
      notify("success", "Saving successfully captured");
    } catch (error) {
      if (error.response) {
        dispatch(actions.createSavingError(error.response.data.error));
        notify("error", "Registration Error", error.response.data.error);
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
      notify("error", "Registration Error", error.response.data.error);
    } else {
      dispatch(actions.getSavingsError(`${error}`));
    }
  }
};
