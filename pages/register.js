import React from 'react';
import Layout from '../components/layout/Layout';

const Register = () => {
  return (
    <div>
      <Layout>
        <>
          <h1>Create an account</h1>
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your nombre"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Your password"
              />
            </div>
            <input type="submit" value="Create account"/>
          </form>
        </>
      </Layout>
    </div>
  );
}
 
export default Register;