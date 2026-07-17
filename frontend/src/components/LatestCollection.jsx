// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext'
// import Title from './Title.jsx';

// const LatestCollection = () => {

//   const { products } = useContext(ShopContext);
//   const [latestProducts,setLatestProducts]=useState([]);

//   useEffect(()=>{
//     setLatestProducts(products.slice(0,10));
//   },[products]);



//   return (
//     <div className='my-10'>
//       <div className='text-center py-8 text-3xl'>
//         <Title text1={'LATEST'} text2={'COLLECTION'}/>
//            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
//              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae quos magnam molestiae exercitationem tempore aspernatur quia eveniet magni quisquam ullam eius aut, aliquam cupiditate eligendi, temporibus soluta consequuntur? Molestias, quam!
             
//            </p>
      
//       </div>
//     </div>
//   )
// }

// export default LatestCollection

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className='my-10'>

      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />

        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Discover our latest collection featuring premium quality products
          with modern designs and unbeatable prices.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map((item, index) => (
          <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
          />
        ))}
      </div>

    </div>
  );
};

export default LatestCollection;