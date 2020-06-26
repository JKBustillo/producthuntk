import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/Error404';
import Layout from '../../components/layout/Layout';
import { Field, InputSubmit } from '../../components/ui/Form';
import Button from '../../components/ui/Button';

const ProductContainer = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const Product = () => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);

    const router = useRouter();
    const { query: { id } } = router;

    const { firebase, user } = useContext(FirebaseContext);

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

    if (Object.keys(product).length === 0) {
        return 'Cargando';
    }

    const { comments, created, description, enterprise, imageUrl, name, url, votes, creator } = product;

    return (
        <Layout>
            {error && <Error404 /> }
            
            <div className="contenedor">
                <h1 css={css`
                    text-align: center;
                    margin-top: 5rem;
                `}>{name}</h1>

                <ProductContainer>
                    <div>
                        <p>Published {formatDistanceToNow(new Date(created))} ago</p>
                        { creator && <p>By: {creator.name} from {enterprise}</p> }

                        <img src={imageUrl} alt={name} />

                        <p>{description}</p>

                        { user &&
                        <>
                            <h2>Add a comment</h2>
                            <form>
                                <Field>
                                    <input
                                        type="text"
                                        name="message"
                                    />
                                </Field>
                                <InputSubmit
                                    type="submit"
                                    value="Add comment"
                                />
                            </form>
                        </>}

                        <h2 css={css`
                            margin: 2rem 0;
                        `}>Comments</h2>

                        {comments.map(comment => (
                            <li>
                                <p>{comment.name}</p>
                                <p>By: {comment.username}</p>
                            </li>
                        ))}
                    </div>

                    <aside>
                        <Button
                            target="_blank"
                            bgColor="true"
                            href={url}
                        >Visit URL</Button>

                        <div css={css`
                            margin-top: 5rem;
                        `}>
                            <p css={css`
                                text-align: center;
                            `}>{votes} votes</p>

                            { user && <Button>Vote</Button> }
                        </div>
                    </aside>
                </ProductContainer>
            </div>
            
        </Layout>
    );
}
 
export default Product;