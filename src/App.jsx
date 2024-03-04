/* 
  I  n a previous tutorial, we implemented the fake API with 
  JavaScript's Promises for having it asynchronous and 
  JavaScript's setTimeout function for having an artificial 
  delay. Now we want to use this fake API with its mock data 
  as replacement for a backend in our React application

  */
import * as React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {getAsyncStories, getUsers, createUser, updateUser, deleteUser } from './api';
import './App.css'

const getDeveloperText = (isDeveloper) =>
  `is ${isDeveloper ? 'a' : 'not a'} developer`

 // Eliminate "return" statement and enclosing bracket if no business 
 //business logic. Otherwise retain the {} and put a "return" statement
 const App = () => { 

  //useEffect is called:
  //  1. Initially when the component renders the first time
  //  2. Leaving out the second argument (the dependency array) 
  //     would make the function for the side-effect (e.g getAsyncStories)
  //     run on every render (initial render and update renders) of 
  //     the component. 
  //  3. If the dependency array of React's useEffect is an empty 
  //     array, the function for the side-effect is only called 
  //     once when the component renders for the first time. 
  //     After all, the hook lets us opt into React's component 
  //     lifecycle when mounting, updating and unmounting the 
  //     component. It can be triggered when the component is first 
  //     mounted, but also if one of its values (state, props, derived 
  //     values from state/props) is updated.
   const [users, setUsers] = React.useState([]);

   /* 
     We have to use React's useCallback Hook here, because it memoizes 
     the function for us which mean that it doesn't change and therefore 
     React's useEffect Hook isn't called in an endless loop. 
   */
    const doGetUsers = React.useCallback(async ()  => {
      try {
        const result = await getUsers();
        setUsers(result);
      } catch (error){
        console.log(error);
      }
     
   }, []); 

   React.useEffect( () => {
    doGetUsers();
   }, [doGetUsers]); //Since doGetUsers above is memoize by using React.useCallback
                     //it means doGetUsers doesn't change and therefore
                     //useEffect hook isn't called in an ENDLESS loop.

   //Next, we can reuse this extracted function to refetch the 
   //mocked data after creating new data:
   const refetchUsers = async () => {
    await doGetUsers();
  };


  //States for first ande last names
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  //Event handler for firstName
  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  //Event handler for lastName
  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

   

  //Event handler for Submit button
  //There are two ways to keep the UI in sync after a request 
  //which modifies data on the backend:
  /*
    1. After the request finishes, we know about the mock data 
    which we just created, so we could update the React's state 
    with it (.e.g. updating the users state with the new user).

    2. After the request finishes, we could refetch all the mock 
    data from the backend. That's another network roundtrip to 
    the backend (which is our fake API here), but it keeps our 
    data in sync with the rendered UI as well. (THE PREFERRED WAY)

  */
  const handleCreate = async (event) => {
    event.preventDefault();  //Prevents the default to avoid browser refresh

    try {
      await createUser({ firstName, lastName, isDeveloper: false }); 
      await refetchUsers(); //After creating new record, we refetch all the mock data.
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    const user = users.find((user) => user.id === id);
    const isDeveloper = !user.isDeveloper;

    try {
      await updateUser(id, { isDeveloper });
      await refetchUsers();
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleRemove = async (id) => {
    try {
      await deleteUser(id);
      await refetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  if (!users) {
    return null;
  }

  return (
     <div>
      
      <ul>
        {users.map((user) => {
          const developerText = getDeveloperText(user.isDeveloper);
          return (
            <li key={user.id}>
              {user.firstName} {user.lastName} {developerText}
              <button
                type="button"
                onClick={() => handleEdit(user.id)}
              >
                Toggle Developer (Update)
              </button>
              <button
                type="button"
                onClick={() => handleRemove(user.id)}
              >
                Remove User (Delete)
              </button>
            </li>
          );
        })}
      </ul>

      <hr />

      <List list={users}/>
       
       <hr />
       <h1> Create a User</h1>

      <form onSubmit={handleCreate}>
        <label>
          First Name:
          <input type="input" onChange={handleChangeFirstName} />
        </label>

        <label>
          Last Name:
          <input type="input" onChange={handleChangeLastName} />
        </label>

        <button className="btn btn-primary" type="submit">Create</button>
      </form>

      
       
     </div>
   );
}

// List component
const List = (props) =>  (
  <ul>
     {props.list.map((item) => (
       <Item key={item.id} item={item} />
     ))}
  </ul>
 
);

//Item component
//Create another component that will display list of users.
//This component called "Item" encapsulates the task of displaying 
//each stories' record
const Item = (props) => (
<li>
      <span>{props.item.id}</span>
      <span>{props.item.firstName}</span>
      <button
          type="button"
          onClick={() => handleEdit(props.item.id)}
        >
          Toggle Developer (Update)
        </button>
      <span>{props.item.lastName}</span>
      <button
          type="button"
          onClick={() => handleRemove(props.item.id)}
        >
          Remove User (Delete)
        </button>

    </li>

);     
 
//UserList component
const UserList = (props) =>  (
  <ul>
     {props.list.map((item) => (
      
       <User key={item.id} item={item}
        />
     ))}
  </ul>
 
);

const User = (props) => (
  <li>
      <span>{props.item.id}</span>
      <span>{props.item.firstName}</span>
      <span>{props.item.lastName}</span>
      <span>

      <button
          type="button" 
          onClick={() => handleEdit(props.item.id)}
          className="btn btn-primary"
      >
        Update 
      </button>
      </span>

      <span>
      <button
          type="button"
          onClick={() => handleRemove(props.item.id)}
        >
          Remove User (Delete)
        </button>
        </span>
  </li>
  
  ); 
export default App
