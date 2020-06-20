import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';

import firebase from '../firebase';

import useValidation from '../hooks/useValidation';
import loginValidation from '../validations/loginValidation';

const INITIAL_STATE = {
  email: '',
  password: ''
};

const Login = () => {
  const [error, setError] = useState(false);
  const {
    values, 
    errors,
    handleChange,
    handleSubmit
  } = useValidation(INITIAL_STATE, loginValidation, login);

  const { email, password } = values;

  async function login() {
    try {
      await firebase.login(email, password);
      setError(false);
      Router.push('/');
    } catch (error) {
      console.error('Login failed: ', error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1 css={css`
            text-align: center;
            margin-top: 5rem;
          `}>Log In</h1>
          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email"
                value={email}
                onChange={handleChange}
              />
            </Field>

            { errors.email && <Error>{errors.email}</Error> }

            <Field>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Your password"
                value={password}
                onChange={handleChange}
              />
            </Field>

            { errors.password && <Error>{errors.password}</Error> }

            { error && <Error>{error}</Error> }

            <InputSubmit type="submit" value="Log In"/>
          </Form>
        </>
      </Layout>
    </div>
  );
}
 
export default Login;