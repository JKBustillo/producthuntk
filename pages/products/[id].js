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

const ProductCreator = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;

const Product = () => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [comment, setComment] = useState({});

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
    }, [id, product]);

    if (Object.keys(product).length === 0) {
        return 'Cargando';
    }

    const { comments, created, description, enterprise, imageUrl, name, url, votes, creator, hasVoted } = product;

    const voteProduct = () => {
        if (!user) {
            return router.push('/');
        }

        const newTotal = votes + 1;

        if (hasVoted.includes(user.uid)) {
            return
        }

        const newHasVoted = [...hasVoted, user.uid];

        firebase.db.collection('products').doc(id).update({ votes: newTotal, hasVoted: newHasVoted });

        setProduct({
            ...product,
            votes: newTotal
        });
    };

    const commentChange = e => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        });
    };

    const isCreator = id => {
        if (creator.id == id) {
            return true;
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!user) {
            return router.push('/');
        }

        comment.userid = user.uid;
        comment.username = user.displayName;

        const newComments = [...comments, comment];

        firebase.db.collection('products').doc(id).update({
            comments: newComments
        });

        setProduct({
            ...product,
            comments: newComments
        });
    }

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
                            <h2>Leave a comment</h2>
                            <form onSubmit={handleSubmit}>
                                <Field>
                                    <input
                                        type="text"
                                        name="message"
                                        placeholder="What are your thoughts?"
                                        onChange={commentChange}
                                    />
                                </Field>
                                <InputSubmit
                                    type="submit"
                                    value="Comment"
                                />
                            </form>
                        </>}

                        <h2 css={css`
                            margin: 2rem 0;
                        `}>Comments</h2>

                        {comments.length === 0 ? "No comments yet." :
                            <ul>
                                {comments.map((comment, i) => (
                                    <li
                                        key={`${comment.userid}-${i}`}
                                        css={css`
                                            border: 1px solid #e1e1e1;
                                            padding: 2rem;
                                        `}
                                    > 
                                        <p>{comment.message}</p>
                                        <p>By: 
                                            <span css={css`
                                                font-weight: bold;
                                            `}>
                                                {''} {comment.username}
                                            </span>
                                        </p>
                                        { isCreator(comment.userid) && <ProductCreator>Author</ProductCreator> }
                                    </li>
                                ))}
                            </ul>
                        }
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

                            { user && <Button onClick={voteProduct}>Vote</Button> }
                        </div>
                    </aside>
                </ProductContainer>
            </div>
            
        </Layout>
    );
}
 
export default Product;