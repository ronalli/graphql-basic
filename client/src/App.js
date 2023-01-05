import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import './App.css';
import { CREATE_USER } from './mutation/user';
import { GET_ALL_USERS, GET_USER } from './query/user';

const App = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [newUser] = useMutation(CREATE_USER);
  // const {
  //   data: dataUser,
  //   loading: loadingUser,
  //   error: errorUser,
  // } = useQuery(GET_USER);

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (!loading) setUsers(data.getAllUsers);
  }, [data]);

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age,
        },
      },
    })
      .then(({ data }) => console.log('Successfully', data))
      .catch((error) => console.log(error));
    setUsername('');
    setAge('');
  };

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };

  if (loading) return <h2>Loading....</h2>;

  return (
    <div className='flex min-h-full items-center justify-center flex-col'>
      <form className='border p-10 mt-10 mb-10 rounded-xl shadow-lg'>
        <div className='mb-2'>
          <input
            className='appearance-none px-3 py-1 border border-gray-300 focus:border-indigo-500 focus:z-10 relative block w-full rounded-none focus:outline-none shadow-md'
            type='text'
            placeholder='Введите имя...'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <input
            className='appearance-none px-3 py-1 border border-gray-300 focus:border-indigo-500 focus:z-10 relative block w-full rounded-none focus:outline-none shadow-md'
            type='number'
            placeholder='Введите возраст...'
            value={age}
            onChange={(e) => setAge(+e.target.value)}
          />
        </div>

        <div className='flex justify-between'>
          <button
            type='button'
            className='py-2 px-4 border-transparent bg-indigo-500 text-sm rounded text-white font-bold mr-4 hover:bg-indigo-700 transition-colors active:ring-2 active:ring-offset-2'
            onClick={addUser}
          >
            Создать
          </button>
          <button
            type='button'
            className='py-2 px-4 border-transparent bg-indigo-500 text-sm rounded text-white font-bold  hover:bg-indigo-700 transition-colors active:ring-2 active:ring-offset-2'
            onClick={getAll}
          >
            Получить
          </button>
        </div>
      </form>
      <div className=''>
        {users.map((user, idx) => (
          <p key={user.id}>
            {idx + 1} - {user.username} - {user.age}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
