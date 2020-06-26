import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import Router, { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';

import { FirebaseContext } from '../firebase';

import useValidation from '../hooks/useValidation';
import productValidation from '../validations/productValidation';

const INITIAL_STATE = {
  name: '',
  enterprise: '',
  image: '',
  url: '',
  description: ''
};

const NewProduct = () => {
  const [imageName, setImageName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const [error, setError] = useState(false);

  const { user, firebase } = useContext(FirebaseContext);

  const {
    values, 
    errors,
    handleChange,
    handleSubmit
  } = useValidation(INITIAL_STATE, productValidation, createProduct);

  const { name, enterprise, image, url, description } = values;

  // Redirection hook
  const router = useRouter();

  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  };

  const handleUploadError = error => {
    setUploading(error);
    console.error(error);
  };

  const handleUploadSuccess = imageName => {
    setProgress(100);
    setUploading(false);
    setImageName(imageName);
    firebase
      .storage
      .ref('products')
      .child(imageName)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        setImageUrl(url);
      });
  }

  const handleProgress = progress => setProgress({ progress });

  async function createProduct () {
    try {
      if (!user) {
        return router.push('/login');
      }

      const product = {
        name,
        enterprise,
        url,
        imageUrl,
        description,
        votes: 0,
        comments: [],
        created: Date.now(),
        creator: {
          id: user.uid,
          name: user.displayName,
        }
      };

      firebase.db.collection('products').add(product);

      return router.push('/');
    } catch (error) {
      console.error('Error creating the new product: ', error.message);
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
          `}>New Product</h1>
          <Form onSubmit={handleSubmit} noValidate>

            <fieldset>
              <legend>General information</legend>

              <Field>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Product name"
                  value={name}
                  onChange={handleChange}
                />
              </Field>

              { errors.name && <Error>{errors.name}</Error> }

              <Field>
                <label htmlFor="enterprise">Enterprise</label>
                <input
                  type="text"
                  name="enterprise"
                  id="enterprise"
                  placeholder="Enterprise or company name"
                  value={enterprise}
                  onChange={handleChange}
                  />
              </Field>

              { errors.enterprise && <Error>{errors.enterprise}</Error> }

              <Field>
                <label htmlFor="image">Image</label>
                <FileUploader
                  accept="image/*"
                  name="image"
                  id="image"
                  randomizeFileName
                  storageRef={firebase.storage.ref('products')}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Field>

              <Field>
                <label htmlFor="url">Url</label>
                <input
                  type="url"
                  name="url"
                  id="url"
                  placeholder="Product URL"
                  value={url}
                  onChange={handleChange}
                  />
              </Field>

              { errors.url && <Error>{errors.url}</Error> }
            </fieldset>

            <fieldset>
              <legend>About your product</legend>

              <Field>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  onChange={handleChange}
                  />
              </Field>

              { errors.description && <Error>{errors.description}</Error> }
            </fieldset>

            { error && <Error>{error}</Error> }

            <InputSubmit type="submit" value="Create product"/>
          </Form>
        </>
      </Layout>
    </div>
  );
}
 
export default NewProduct;