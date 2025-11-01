'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from 'next/link'; import React from 'react'
import ProductCard from "./ProductCard";
import { useGetPropertiesWithParams } from "./useGetPropertiesWithParams";
import Loading from '@/src/app/loading'

export default function HomeCategory({ lang, name, page, CategoryKey }) {
    const { data, isLoading} = useGetPropertiesWithParams(lang, CategoryKey);
    return (
        <section className="most-booking">
            {
                isLoading ? <Loading /> :
                    <div className="container">
                        <h3 className="section-title">{name}</h3>
                        <Swiper
                            pagination={{ clickable: true }}
                            spaceBetween={12}
                            slidesPerView={5}
                            loop={true}
                            autoplay={false}
                            navigation={false}
                            modules={[Autoplay, Navigation, Pagination]}
                            className="category-swiper"
                            breakpoints={{
                                1440: {
                                    slidesPerView: 4,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                640: {
                                    slidesPerView: 1,
                                },
                                120: {
                                    slidesPerView: 1,
                                }
                            }}
                        >
                            {
                                data?.map((item) => (
                                    <SwiperSlide key={item.id} className="category-swiper-slide">
                                        <ProductCard product={item} lang={lang} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>

                        <Link href={`${page}`} className="custom-ancor">show more</Link>
                    </div>
            }
        </section>
    )
}
