import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import './App.css';
import { GET_ALL_USERS } from './query/user';

const App = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  // const {} = useMutation();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [userAge, setUserAge] = useState('');

  useEffect(() => {
    if (!loading) setUsers(data.getAllUsers);
  }, [data]);

  const createUser = () => {
    const user = {
      username,
      age: userAge,
    };
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
          value={userAge}
          onChange={(e) => setUserAge(e.target.value)}
        />
        <div className='btns'>
          <button onClick={createUser}>Создать</button>
          <button>Получить</button>
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
