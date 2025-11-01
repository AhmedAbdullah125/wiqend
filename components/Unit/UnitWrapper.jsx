import React from 'react'
import BreadCrumb from '../General/BreadCrumb'
import UnitSwiper from './UnitSwiper'
import UnitContent from './UnitContent'
import Link from 'next/link'
export default function UnitWrapper() {
    return (
        <div className='unit-wrapper'>
            <BreadCrumb first="Chalets" firstLink="/categories?category=chalets" second="Ad Details" secondLink="/unit?id=1" />
            <section className="content-section">
                <div className="container">
                    <div className="details-container">
                        <UnitSwiper />
                        <UnitContent />
                    </div>
                    <Link href="#" className="custom-ancor btn">Check Availbality</Link>
                </div>
            </section>
        </div>
    )
}
