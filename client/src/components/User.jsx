import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_USER } from '../query/user';

const User = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id },
  });
  // const [user, setUser] = useState('');
  console.log(data, error);

  // useEffect(() => {
  //   if (!loading) setUser(data.getUser(id));
  // }, [data]);

  if (loading) return <h2>Loading...</h2>;

  return <div>User {id}</div>;
};

export default User;
