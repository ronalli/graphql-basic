import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import './App.css';
import { CREATE_USER } from './mutation/user';
import { GET_ALL_USERS } from './query/user';

const App = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [newUser] = useMutation(CREATE_USER);
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
    <div>
      <form>
        <input
          type='text'
          placeholder='Введите имя...'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='number'
          placeholder='Введите возраст...'
          value={age}
          onChange={(e) => setAge(+e.target.value)}
        />
        <div className='btns'>
          <button onClick={addUser}>Создать</button>
          <button onClick={getAll}>Получить</button>
        </div>
      </form>
      <div>
        {users.map((user, idx) => (
          <p key={user.id}>
            {idx + 1} - {user.username}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
