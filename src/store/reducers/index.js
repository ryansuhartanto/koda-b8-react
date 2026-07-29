import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth";
import orders from "./orders";

export const rootReducer = combineReducers({ auth, orders });
