import { createSlice, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import mySaga from './saga';

const userSlice = createSlice({
    name: "Name",
    initialState: {
        data: []
    },
    reducers: {
        fetchUser: (state, action) => {
             console.log(state, action)
            return {
                ...state,
                data: action.payload
            }
        }
    }
})

export const {fetchUser} =  userSlice.actions
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        userData: userSlice.reducer
    },
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(mySaga)
export default store;