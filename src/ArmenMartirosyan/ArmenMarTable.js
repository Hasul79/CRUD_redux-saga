// import React from "react";
import React, { useEffect, useState } from "react";
import "./ArmenMarTable.css";
import axios from "axios";
import { Link } from "react-router-dom";

// initial state-սկզբնական վիճակն է
const initialValues = {
  name: "",
  surname: "",
  salary: ""
}

function ArmenMarTable() {
  const [userData, setUserData] = useState(initialValues)//userData is passed initialValues ​​as the initial value- userData-ին որպես սկզբնական արժեք փոխանցվում է initialValues-ը
  const [users, setUsers] = useState([])//storing a list of users in an empty array-օգտատերերի ցուցակի պահպանում  դատարկ զանգվածում
  const [editTableUserData, setEditTableUseData] = useState({//storing information about changing users-փոփոխվող օգտատերերի մասին տեղեկատվության պահպանում
    isEdit: false,
    userIndex: null//փոփոխվող օգտատերերի 0-ական վիճակն է
  });

  //READ(GET)-front-ի միացում backend-ին, fetch-ով հարցում ենք ուղարկում backend,պատասխանը json-ով հետ է գալիս(.then(response=>response.json()), որից հետո եկած պատասխանը դնում ենք data-ի մեջ(.then(data=>setUsers(data))) և setUsers-ով փոխանցում ենք users-ին
  useEffect(() => {
    fetch(`http://localhost:3200/workers`)
      .then(response => response.json())
      .then(data => setUsers(data))
  });

  //filling in all Inputs and only then activating the add button-բոլոր Input-ների լրացում և միայն այդ դեպքում add կոճակի ակտիվացում 
  const isFilledFields = userData.name && userData.surname && userData.salary

  //Add operation
  const handleSubmitUser = (e) => {
    e.preventDefault()

    //inputs check that all fields are complete-input-ների բոլոր դաշտերը լրացվածության ստուգում
    if (isFilledFields) {

      //user check, is there an existing user or are we going to add a new use-user-ի ստուգում՝ առկա user է թե նոր user ենք ավելացնելու     
      if (editTableUserData.isEdit) {
        const editedData = users;
        editedData.splice(editTableUserData.userIndex, 1, userData);
        setUsers(editedData);
        //Saving changing user data-փոփոխվող user-ի տվյալների պահպանում
        setEditTableUseData({
          isEdit: false, // սա նշանակում է փոփոխվող user-ի նախկին տվյալները չպահպանել, զրոյացնել
          userIndex: null //փոփոխվող user-ի index-ի զրոյացում  
        })
        //UPDATE-backend-ի հետ կապ
        fetch(`http://localhost:3200/workers/${editedData[editTableUserData.userIndex].id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
        })
      } else {
        //CREATE-backend-ի հետ կապ
        fetch(`http://localhost:3200/workers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
        })
        //adding a new user-...prevState-ին(նախկին վիճակ) ավելացվում է նոր user-ը:
        setUsers((prevState) => [...prevState, userData]);
      }
      setUserData(initialValues)
    }
  }

  // DELETE(remove) operation-backend-ի հետ կապ
  const getData = () => {
    axios.get(`http://localhost:3200/workers`)
      .then((getData) => {
        setUsers(getData.data);
      })
  }
  const handleRemoveClick = (id) => {
    axios.delete(`http://localhost:3200/workers/${id}`)//axios-ը նույն fetch-ի ֆունկցիան է իրականացնում 
      .then(() => {
        getData();
      })
  }
  // Clean operation
  const handleCleanClick = () => setUserData(initialValues);

  // Edit operation
  const handleEditСlick = (data, index) => {// այս ֆունկցիան ընդունում է ընթացիկ user-ին և իր index-ը
    setUserData(data);
    setEditTableUseData({
      isEdit: true,
      userIndex: index
    })
  }
  return (
    <div className="body1">
      <div className="wrapper1">
        <div className="wrapper-content1">
          <div className="table-data1">
            <table className="table1">
              {/* Table Header element-աղյուսակի վերնագրի տարրերի սահմանում*/}
              <th className="th1">#</th>
              <th className="th1">User Name</th>
              <th className="th1">User Surname</th>
              <th className="th1">User Salary</th>
              <th className="th1">Actions</th>
              {/* մեր ավելացվող user(օգտագործող)-ներին հասցեագրելու համար ենք ստեղծում tbody-ն */}
              <tbody>
                {users.map((user, index) => (//Adding users-user-ների ավելացնում տաբլիցայի տակ add կնոպկայով
                  <tr key={index}>
                    {/*Defining user serial numbers-user-ների հերթական համարների սահմանում */}
                    <td className="td1">{index + 1}</td>
                    <td className="td1">{user.name}</td>
                    <td className="td1">{user.surname}</td>
                    <td className="td1">{user.salary}</td>
                    <td>
                      <div>
                        <button className="edit-action1" onClick={() => handleEditСlick(user, index)}>Edit</button>
                        <button className="remove-action1" onClick={() => handleRemoveClick(user.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            {/*Users are added to the form-form-ում ավելացվում են user-ները*/}
            <form className="form1" onSubmit={handleSubmitUser} onReset={handleCleanClick}>
              <input className="input1" placeholder="Write your name"
                //e-ից ստանում ենք ընթացիկ արժեքը
                //previous state- ...prevState-ը նախորդ վիճակն է 
                onChange={(e) => setUserData((prevState) => ({
                  ...prevState,
                  name: e.target.value //e.target.value-սա ընթացիկ թարմացված արժեքն է օբյեկտի 
                }))}
                value={userData.name}
              />
              <input className="input1" placeholder="Write your surname"
                onChange={(e) => setUserData((prevState) => ({
                  ...prevState,
                  surname: e.target.value
                }))}
                value={userData.surname}
              />
              <input className="input1" placeholder="Write your salary"
                onChange={(e) => setUserData((prevState) => ({
                  ...prevState,
                  salary: e.target.value
                }))}
                value={userData.salary}
              />
              <div className="buttons-wrapper1">
                {/* Clean button */}
                <button type="reset" className="butt1">Clean</button>
                {/*Edit and Add buttons*/}
                <button type="submit" className="butt2">{editTableUserData.isEdit ? "Edit" : "Add"}</button>
              </div>
            </form>
            <div>
              {/* Login button */}
              <Link to="/">
                <button className="home" type="button">Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ArmenMarTable