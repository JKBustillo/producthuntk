import React from 'react';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit } from '../components/ui/Form';

const Register = () => {
  return (
    <div>
      <Layout>
        <>
          <h1 css={css`
            text-align: center;
            margin-top: 5rem;
          `}>Create an account</h1>
          <Form>
            <Field>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your nombre"
              />
            </Field>
            <Field>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email"
              />
            </Field>
            <Field>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Your password"
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