import React from 'react';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit } from '../components/ui/Form';

import useValidation from '../hooks/useValidation';
import registerValidation from '../validations/registerValidation';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
};

const Register = () => {
  const {
    values, 
    errors,
    submitForm,
    handleChange,
    handleSubmit
  } = useValidation(INITIAL_STATE, registerValidation, createAccount);

  const { name, email, password } = values;

  function createAccount () {
    console.log('Register');
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
            <InputSubmit type="submit" value="Create account"/>
          </Form>
        </>
      </Layout>
    </div>
  );
}
 
export default Register;