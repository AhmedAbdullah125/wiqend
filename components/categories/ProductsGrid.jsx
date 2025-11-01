import React from 'react';
// import Pagination from '../General/Pagination';
import emptyImg from '@/public/images/empty.webp'
import Image from 'next/image';
import ProductCard from '../Home/ProductCard';
import ProductGridCard from '../Home/ProductGridCard';

export default function ProductsGrid({ data, lang, setPage }) {

    return (
        <div className="col-lg-9">


            {/* {
                data.items.length > 0 ?
                    <div className="items-grid">

                        {
                            data.items.map((product) => (
                                <ProductCard key={product.id} product={product} lang={lang} />
                            ))
                        }
                    </div>
                    :
                    <div className="empty-img-cont flex justify-center items-center">
                        <Image src={emptyImg} alt="empty" />
                    </div>} */}



            {/* <Pagination data={data} setPage={setPage} /> */}
            <div className="items-grid">
                {
                    Array.from({ length: 12 }, (_, index) => (
                        <ProductCard key={index} />
                    ))
                }
            </div>
        </div>
    );
}

