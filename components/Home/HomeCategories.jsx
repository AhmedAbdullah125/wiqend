import { t } from '@/lib/i18n'
import Link from 'next/link'
import React from 'react'
import Loading from '@/src/app/loading'
import { useGetHomeCategories } from './useGetHomeCategories';
import Image from 'next/image';
export default function HomeCategories({ lang }) {
    const { data, isLoading, isError, error, refetch } = useGetHomeCategories(lang);
    return (
        <div className="category-section">
            {
                isLoading ? <Loading /> :
                    <div className="container">
                        <h3 className="section-title">{t(lang, 'Browse_By_Category')}</h3>
                        <div className="category-cont">
                            {
                                data?.map((item) => (
                                    <Link href={`/category?category=${item.name}&id=${item.id}`} className="category-item" key={item.id}>
                                        <figure><Image src={item.image} alt="Wiqend" width={0} height={0} /></figure>
                                        <span>{item.name}</span>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
            }
        </div>
    )
}
