import React, { useState } from 'react';
import "./Table.css";
import { Link } from "react-router-dom";

const initialValues = {
  userName:'',
  userSurname:'',
  userSalary:''
}


function Table() {
  const [userData, setUserData] = useState(initialValues);
  const [users, setUsers] = useState([])
  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null
  })

  const handleRemoveClick = (index) => {
    setUsers(users.filter((user,userIndex) => userIndex !== index));
  }

  const isFilledFields = userData.userName && userData.userSurname && userData.userSalary;

  const handleSubmitUser = (e) => {
e.preventDefault();

if(isFilledFields){
if (editableUserData.isEdit){
  const editedDate = users;
  editedDate.splice(editableUserData.userIndex, 1, userData)

  setUsers(editedDate);

  setEditableUserData({
    isEdit: false,
    userIndex: null
  })

} else{
  setUsers((prevState) => [...prevState, userData]);
}
  setUserData(initialValues)
}
  }

const handleCleanClick = () => setUserData(initialValues);

const handleEditClick =(data, index) => {
  setUserData(data);
  setEditableUserData({
    isEdit: true,
    userIndex: index
  })
}

// console.log('userData', userData)




  return (
   <div className='wrapperx'>
    <div className='wrapper-contentx'>
      <div className='table-datax'>
        <table className='tablex'>
          <th className='thx'>#</th>
          <th className='thx'>User Name</th>
          <th className='thx'>User Surname</th>
          <th className='thx'>User Salary</th>
          <th className='thx'>Actions</th>

          <tbody className='tbodyx'>
            {users.map((user, index) => (
              <tr>
                <td className='tdx'>{index + 1}</td>
                <td className='tdx'>{user.userName}</td>
                <td className='tdx'>{user.userSurname}</td>
                <td className='tdx'>{user.userSalary}</td>
                <td className='tdx'>
                  <div>
                    <button className='edita-ectionx' onClick={() => handleEditClick(user,index)}>edit</button>
                    <button className='removea-actionx' onClick={() => handleRemoveClick(index)}>remove</button>
                  </div>
                </td>
              </tr>
            
            ))}
          </tbody>

        </table>
      </div>
        <div>
          <form className='formax' onSubmit={handleSubmitUser} onReset={handleCleanClick}>
            <input className='inputx' placeholder="Write your name" onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userName: e.target.value
            }))} 
            value={userData.userName}
            />


            <input className='inputx' placeholder="Write your surname" onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userSurname: e.target.value}))}
              value={userData.userSurname}
               />


            <input className='inputx' placeholder="Write your salary" onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userSalary: e.target.value
            }))}
            value={userData.userSalary}
            />


            <div className='buttons-wrapperx'>
              <button className='buttonx' type="reset">Clean</button>
              <button className='buttonx' disabled={!isFilledFields} type="submit">{editableUserData.isEdit ? 'Edit' : 'Add'}</button>
            </div>
          </form>
        </div>
    </div>
    <div>
    <Link to="/">
              <button className='menux'>Back to Home</button>
            </Link>
      
      </div>
   </div>
  );
}

export default Table;
