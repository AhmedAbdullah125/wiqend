'use client'
import React from 'react'
import Link from 'next/link';
import img from '@/public/images/booking.jpg'
import Image from "next/image"; export default function ProductGridCard() {
    return (
        <Link href="/unit" className="booking-card">
            <div className="booking-img">

                <figure>
                    <Image src={img} alt="img" width={0} height={0} />
                </figure>
                <div className="booking-btns">
                    <button className="fav-btn">
                        <i className="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>
            <div className="card-content">
                <div className="detail-flex">
                    <div className="category-name">Chalets</div>
                    <div className="detail-info-item">
                        <i className="fa-solid fa-star"></i>
                        <span>4 <span>( 113 reviews )</span></span>
                    </div>
                </div>
                <div className="item-price">
                    Start From
                    <span className="price">30.000</span>
                    KWD/Night
                </div>
                <div className="card-item-name">Studio with a Side Seating</div>
                <div className="card-place">
                    <i className="fa-solid fa-location-dot"></i>Hawalli
                </div>
                <div className="card-option">
                    <span><i className="fa-solid fa-expand"></i>87 M</span>
                    <span><i className="fa-solid fa-bath"></i>1</span>
                    <span><i className="fa-solid fa-car-side"></i>1</span>
                    <span><i className="fa-solid fa-loveseat"></i>1</span>
                    <span><i className="fa-solid fa-wifi"></i></span>
                    <span><i className="fa-solid fa-family"></i></span>
                </div>
            </div>
        </Link>
    )
}
