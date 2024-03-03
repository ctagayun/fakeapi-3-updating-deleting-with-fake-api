import { v4 as uuidv4 } from 'uuid';

const idOne = uuidv4();
const idTwo = uuidv4();

// pseudo database
let users = {
  [idOne]: {
    id: idOne,
    firstName: 'Robin',
    lastName: 'Wieruch',
    isDeveloper: true,
  },
  [idTwo]: {
    id: idTwo,
    firstName: 'Dave',
    lastName: 'Davddis',
    isDeveloper: false,
  },
};


const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
 ]

// pseudo API
/*
  This function returns our object of items as an converted array. 
However, it's just a function which returns data synchronously. 
In order to fake an API, it would need to be asynchronous. 
Therefore, we will wrap it into a JavaScript promise. 
The longer promise version enables us to handle errors too:
*/
export const getUsers = () =>
  new Promise((resolve, reject) => {
    if (!users) {
      return setTimeout(
        () => reject(new Error('Users not found')),
        250
      );
    }
    setTimeout(() => resolve(Object.values(users)), 250);
  });


// getUsers()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const loadUsers = async () => {
  try {
    const result = await getUsers();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
loadUsers();

export const getUser = (id) =>
  new Promise((resolve, reject) => {
    const user = users[id];

    if (!user) {
      return setTimeout(
        () => reject(new Error('User not found')),
        250
      );
    }

    setTimeout(() => resolve(users[id]), 250);
  });

export const createUser = (data) =>
  new Promise((resolve, reject) => {
    if (!data.firstName || !data.lastName) {
      reject(new Error('Not all information provided'));
    }

    const id = uuidv4();
    const newUser = { id, ...data };

    users = { ...users, [id]: newUser };

    setTimeout(() => resolve(true), 250);
  });

export const updateUser = (id, data) =>
  new Promise((resolve, reject) => {
    if (!users[id]) {
      return setTimeout(
        () => reject(new Error('User not found')),
        250
      );
    }

    users[id] = { ...users[id], ...data };

    return setTimeout(() => resolve(true), 250);
  });

export const deleteUser = (id) =>
  new Promise((resolve, reject) => {
    const { [id]: user, ...rest } = users;

    if (!user) {
      return setTimeout(
        () => reject(new Error('User not found')),
        250
      );
    }

    users = { ...rest };

    return setTimeout(() => resolve(true), 250);
  });

   //Call getStories() Api asynchronously
 export const getAsyncStories = () =>
   new Promise((resolve) =>
   setTimeout(
     () => resolve({ data: { stories: initialStories } }),
     1000
   )
 );