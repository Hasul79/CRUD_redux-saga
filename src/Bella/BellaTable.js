import React,{ useState } from 'react';
import './BellaTable.css';
import { Link } from "react-router-dom";

const initialValues = {
  userName: '',
  userSurname: '',
  userSalary: ''
}

function BellaTable() {
  const [userData, setUserData] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null
  })

  const handleRemoveClick = (index) => {
    setUsers(users.filter((user, userIndex) => userIndex !== index))
  }

  const isFilledFields = userData.userName && userData.userSurname && userData.userSalary;

  const handleSubmitUser = (e) => {
    e.preventDefault();

    if (isFilledFields) {
      if (editableUserData.isEdit) {
        const editedData = users;
        editedData.splice(editableUserData.userIndex, 1, userData)

        setUsers(editedData);

        setEditableUserData({
          isEdit: false,
          userIndex: null 
        })
      } else {
setUsers((prevState) => [...prevState, userData]);
      }

    setUserData(initialValues)
  }
}

const handleCleanClick = () => setUserData(initialValues);

const handleEditClick = (data, index) => {
  setUserData(data);
  setEditableUserData({
    isEdit: true,
    userIndex: index
  })
 
}

console.log('userData: ', userData)

  return (
    <div className="wrapper3"> 
      <div className="wrapper-content3">
        <div className="table-data3">
          <table className='table3'>
            <th className='th3'>#</th>
            <th className='th3' >User Name</th>
            <th className='th3'>User Surname</th>
            <th className='th3'>User Salary</th>
            <th className='th3'>Actions</th>

            <tbody className='tbody3'>
              {users.map((user, index) => (
                <tr>
                  <td className='td3'>{index + 1}</td>
                  <td className='td3'>{user.userName}</td>
                  <td className='td3'>{user.userSurname}</td>
                  <td className='td3'>{user.userSalary}</td>
                  <td>
                    <div className='btn3'>
                      <button className='edit-action3' onClick={() => handleEditClick(user, index)}>edit</button>
                      <button className='remove-action3' onClick={() => handleRemoveClick(index)}>remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <form className='form3' onSubmit={handleSubmitUser} onReset={handleCleanClick}>
            <input className='input3' placeholder='Write your name' onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userName: e.target.value
            }))} 
            value={userData.userName}
            />
            <input className='input3' placeholder='Write your surename' onChange={(e) => setUserData((prevState) => ({
               ...prevState,
               userSurname: e.target.value
              }))} 
              value={userData.userSurname}
              />
            <input className='input3' placeholder='Write your salary'
            onChange={(e) => setUserData((prevState) => ({
               ...prevState,
                userSalary: e.target.value 
              }))}
              value={userData.userSalary}
                />

            <div className="buttons-wrapper3">
              <button className='button3' type="reset">Clean</button>
              <button className='button3' disabled={!isFilledFields}type="submit">{editableUserData.isEdit ? 'Edit' : 'Add'}</button>
            </div>
         </form>
         <Link  to="/">
                <button className="home3" type="button" >Home</button>
              </Link>
        </div>
       </div>
      
    </div>
  );
}

export default BellaTable;
