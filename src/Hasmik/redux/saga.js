import { takeEvery, call, put } from 'redux-saga/effects';
import {sagaActions } from './sagaAction';
import axios from 'axios';
import { fetchUser } from './store';

const usersFetch = async (url) => {
     return await axios ({
      url: "http://localhost:7777/users"
     })
     
}
 console.log(usersFetch)


//2.
 function* workGetUsersFetch() {
   console.log(33)
   const result = yield call(usersFetch)
    yield put(fetchUser(result.data)) 
    console.log(result)
 }
 
 //1.
 function* mySaga() {
    yield takeEvery(sagaActions.GET_USERS, workGetUsersFetch);
  }
//   console.log(mySaga)
  export default mySaga;