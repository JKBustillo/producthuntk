import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';

import firebase from '../firebase';

import useValidation from '../hooks/useValidation';
import registerValidation from '../validations/registerValidation';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
};

const Register = () => {
  const [error, setError] = useState(false);
  const {
    values, 
    errors,
    handleChange,
    handleSubmit
  } = useValidation(INITIAL_STATE, registerValidation, createAccount);

  const { name, email, password } = values;

  async function createAccount () {
    try {
      await firebase.register(name, email, password);
      setError(false);
      Router.push('/');
    } catch (error) {
      console.error('Error creating the new user: ', error.message);
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
          `}>Create an account</h1>
          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your name"
                value={name}
                onChange={handleChange}
              />
            </Field>

            { errors.name && <Error>{errors.name}</Error> }

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

            <InputSubmit type="submit" value="Create account"/>
          </Form>
        </>
      </Layout>
    </div>
  );
}
 
export default Register;