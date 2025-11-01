'use client'
import React, { useEffect, useState } from 'react'
import Hero from './Hero'
import HomeCategories from './HomeCategories'
import HomeCategory from './HomeCategory'
export default function HomeWrapper() {
  const [lang, setLang] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLang(localStorage.getItem('lang'));
    }
}, []);
  return (
    <div>
        <Hero lang={lang} />
        <HomeCategories lang={lang} />
        <HomeCategory lang={lang} name={"Most Booking"} page={"/category?sort=most_booking"} CategoryKey={"most-booked?limit=10"} />
        {/* <Loading /> */}
        {/* <HomeCategory name={"Recent Added"} page={"recent_added"} />
        <HomeCategory name={"Top Rated"} page={"top_rated"} /> */}
    </div>
  )
}
