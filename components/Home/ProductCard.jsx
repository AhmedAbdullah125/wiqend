'use client'
import React from 'react'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import Link from 'next/link';
import fallback from '@/public/images/fallback.png'
import Image from "next/image"; import { t } from '@/lib/i18n';
import bedIcon from '@/public/images/bedIcon.svg'
import chairIcon from '@/public/images/chairIcon.svg'
import familyIcon from '@/public/images/familyIcon.svg'
export default function ProductCard({ product, lang }) {
    return (
        <Link href="/unit" className="booking-card">
            <div className="booking-img" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                <Swiper
                    pagination={{ clickable: true }}
                    spaceBetween={0}
                    className="w-full"
                    slidesPerView={1}
                    grid={{ rows: 3, fill: 'row' }}
                    loop={true}
                    autoplay={false}
                    navigation={false}
                    modules={[Autoplay, Navigation, Pagination]}
                    breakpoints={{
                        1400: { slidesPerView: 1, grid: { rows: 1, fill: 'row' }, },
                    }}
                >
                    {
                        product.images.length > 0 ? product?.images?.map((image, index) => (
                            <SwiperSlide key={index}>
                                <SwiperSlide >
                                    <figure>
                                        <Image src={image} alt="img" width={0} height={0} />
                                    </figure>
                                </SwiperSlide>
                            </SwiperSlide>
                        ))
                            :
                            product.main_image ?
                                <SwiperSlide>
                                    <figure>
                                        <Image src={product.main_image} alt="img" width={0} height={0} />
                                    </figure>
                                </SwiperSlide>
                                :
                                <SwiperSlide>
                                    <figure>
                                        <Image src={fallback} alt="img" width={0} height={0} />
                                    </figure>
                                </SwiperSlide>
                    }


                </Swiper>
                <div className="booking-btns">
                    <button className="fav-btn">
                        <i className="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>
            <div className="card-content">
                <div className="detail-flex">
                    <div className="category-name">{product.category.name}</div>
                    <div className="detail-info-item">
                        <i className="fa-solid fa-star"></i>
                        <span>{product.rating} <span>( {product.review_count} {t(lang, 'reviews')} )</span></span>
                    </div>
                </div>
                <div className="item-price">
                    {t(lang, 'Start_From')}
                    <span className="price">{product.price_per_night}</span>
                    {t(lang, 'KWD/Night')}
                </div>
                <div className="card-item-name">{product.name}</div>
                <div className="card-place">
                    <i className="fa-solid fa-location-dot"></i>{product.city}
                </div>
                <div className="card-option">
                    <span><i className="fa-solid fa-expand"></i>87 M</span>
                    <span><i className="fa-solid fa-bath"></i>{product.bathrooms ? product.bathrooms : 0}</span>
                    <span><Image src={bedIcon} alt="Wiqend" width={17} height={11} />{product.bedrooms ? product.bedrooms : 0}</span>
                    <span><Image src={chairIcon} alt="Wiqend" width={17} height={16} />{product.capacity ? product.capacity : 0}</span>
                    {
                        product.amenities?.map((amenity, index) => (
                            <span key={index} className="tooltip-cont">
                                <i className={`fa-solid fa-${amenity.icon}`}></i>
                                <span className="tooltip-text">{amenity.name}</span>
                            </span>
                        ))
                    }

                </div>
            </div>
        </Link>
    )
}
