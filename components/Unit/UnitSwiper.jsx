'use client'
import React from 'react';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from 'next/link';
import Image from 'next/image';
import img from '@/public/images/booking.jpg'
import { toast } from 'sonner';


export default function UnitSwiper() {
    return (
        <main className="booking-img">
            <Swiper
                pagination={{ clickable: true }}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={true}
                navigation={{
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
                    Array.from({ length: 6 }, (_, index) => (
                        <SwiperSlide key={index}>
                            <figure>
                                <Image src={img} alt="img" />
                            </figure>
                        </SwiperSlide>
                    ))
                }


            </Swiper>
            <div className="booking-btns">
                <button className="fav-btn" onClick={() => {
                    toast.success('Added to favourites');
                }}>
                    <i className="fa-regular fa-heart"></i>
                </button>
            </div>
        </main>
    );
}
