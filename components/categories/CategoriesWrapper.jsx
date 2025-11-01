'use client';
import React, { Suspense, useEffect, useState } from 'react';
import BreadCrumb from '../General/BreadCrumb';
import ProductsWithFilter from './ProductsWithFilter';
import { useSearchParams } from 'next/navigation';

export default function CategoriesWrapper({ type }) {
    const [lang, setLang] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState(null);
    const [brand, setBrand] = useState(null);
    const [page, setPage] = useState(1);
    const [prices, setPrices] = useState([]);
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('id');
    const tagId = searchParams.get('tag');
    const categoryName = searchParams.get('category');
    const [tags, setTags] = useState(tagId ? Number(tagId) : null);
    const [category, setCategory] = useState(categoryId ? Number(categoryId) : null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('lang') === 'ar' || localStorage.getItem('lang') === 'en') {
                setLang(localStorage.getItem('lang'));
            }
            else {
                localStorage.setItem('lang', 'en');
                setLang('ar');
            }
        }
    })
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <section className="content-section">
                <BreadCrumb first={categoryName} firstLink={`/category?category=${categoryId}&name=${categoryName}`} />
                <div className="container">
                    <ProductsWithFilter loading={loading} data={data} lang={lang} setSortBy={setSortBy} sortBy={sortBy} brand={brand} setBrand={setBrand} tags={tags} setTags={setTags} setPage={setPage} category={category} setCategory={setCategory} prices={prices} setPrices={setPrices} />
                </div>
            </section>
        </Suspense>
    );
}

