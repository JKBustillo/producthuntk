import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/core';

import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/Error404';
import Layout from '../../components/layout/Layout';

const Product = () => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);

    const router = useRouter();
    const { query: { id } } = router;

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        if (id) {
            const getProduct = async () => {
                const productQuery = await firebase.db.collection('products').doc(id);
                const product = await productQuery.get();
                if (product.exists) {
                    setProduct(product.data());
                } else {
                    setError(true);
                }
            }

            getProduct();
        }
    }, [id]);

    return (
        <Layout>
            {error && <Error404 /> }
            
            <div className="contenedor">
                <h1 css={css`
                    text-align: center;
                    margin-top: 5rem;
                `}>

                </h1>
            </div>
            
        </Layout>
    );
}
 
export default Product;