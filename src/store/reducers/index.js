import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth";

export const rootReducer = combineReducers({ auth });
