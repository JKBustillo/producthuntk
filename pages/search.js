import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails';
import useProducts from '../hooks/useProducts';

const Search = () => {
  const router = useRouter();
  const { query: { q } } = router;
  
  const { products } = useProducts('created');
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const search = q.toLowerCase();

    const filtered = products.filter(product => {
      return (
        product.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search)
      )
    });

    setResponse(filtered);
  }, [q, products]);

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {response.map(product => (
                <ProductDetails
                  key={product.id}
                  product={product}
                />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
}
 
export default Search;