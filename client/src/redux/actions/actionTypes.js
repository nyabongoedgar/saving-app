import defineAction from "../utils/defineAction"

export const LOGIN_USER = defineAction("LOGIN_USER", [
  "INIT",
  "SUCCESS",
  "ERROR",
]);

export const REGISTER_USER = defineAction("REGISTER_USER", [
  "INIT",
  "SUCCESS",
  "ERROR",
]);

export const LOGOUT_USER = defineAction('LOGOUT_USER', ['SUCCESS']);

export const CREATE_SAVING = defineAction('CREATE_SAVING', [ "INIT",
"SUCCESS",
"ERROR"])

export const GET_SAVINGS = defineAction('GET_SAVINGS', [ "INIT",
"SUCCESS",
"ERROR"])