import def from 'ajv/dist/vocabularies/applicator/if';
import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from 'reactstrap';
import { doSignIn } from '../reducers/userReducer';

const Home = () => {
  
  const dispatch = useDispatch()
  const user = useSelector((state) => {
    //console.log(state) // == redux store state
    return state.user
  })
  const loggedIn = user?.username

  let greetingMsg = loggedIn ?
    <h1>Welcome, {user.username}</h1> :
    <h1>You haven't logged in</h1>

  let content;
  if (loggedIn) {
    content = (<h2>My Blogs</h2>)
    // TODO get my bloglist
  }
  else {
    let handleLogin = (form) => {
      form.preventDefault();
      let username = form.target.username.value
      let password = form.target.password.value
      dispatch(doSignIn({ username, password }))
    }
    content = (
      <form onSubmit={handleLogin}>
        {/*<h2>Log in...</h2>*/}
        <div>
          Username
          <Input name="username" />
        </div>
        <div>
          Password
          <Input name="password" type="password" />
        </div>
        <Input type="submit" className="mt-4" />
      </form>)
  }

  return (
    <div>
      {greetingMsg}
      {content}
    </div>
  );
}


export default Home
