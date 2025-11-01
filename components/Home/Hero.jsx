import React from 'react';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from 'next/link';
import Image from 'next/image';
import Loading from '@/src/app/loading'
import { useGetHomeBanners } from './useGetHomeBanners';
export default function Hero({ lang }) {
    const { data, isLoading, isError, error, refetch } = useGetHomeBanners(lang);

    return (
        <div className="hero">
            {
                isLoading ? <Loading /> :
                    <main className="main-slider"
                        onMouseEnter={(e) => {
                            e.currentTarget.querySelector(".swiper").swiper.autoplay.stop();
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.querySelector(".swiper").swiper.autoplay.start();
                        }}
                    >
                        <Swiper
                            pagination={{ clickable: true }}
                            spaceBetween={0}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                                delay: 3000, // autoplay delay in ms
                                disableOnInteraction: false, // keeps autoplay active after user interaction
                            }} navigation={{
                                nextEl: `#swiper-btn-leftHero`,
                                prevEl: `#swiper-btn-rightHero`,
                            }}
                            modules={[Autoplay, Navigation, Pagination]}
                            breakpoints={{
                                1400: {
                                    slidesPerView: 1,
                                },
                            }}
                        >
                            {
                                data?.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <Link href={item?.link} className="main" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                                            <div href={item?.link} className="pro-img">
                                                {
                                                    item.media_type == "image" ?
                                                        <Image src={item.media_url} className="img-fluid" alt="Wiqend" width={500} height={1000} /> :
                                                        <video controls={false} autoPlay={true} muted={true} loop={true} className='img-fluid'>
                                                            <source src={item.media_url} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>}

                                            </div>
                                            <div className="main-content">
                                                <div className="container">
                                                    <h2>{item.title}</h2>
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <div className="swiper-btn-prev swiper-btn" id="swiper-btn-rightHero">
                            <i className="fa-solid fa-chevron-right"></i>
                        </div>
                        <div className="swiper-btn-next swiper-btn" id="swiper-btn-leftHero">
                            <i className="fa-solid fa-chevron-left"></i>
                        </div>
                    </main>
            }
        </div>
    );
}
