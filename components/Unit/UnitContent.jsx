import React from 'react'
export default function UnitContent() {
    return (
        <div className="details-content">
            <div className="detail-flex">
                <div className="category-name">Chalets</div>
            </div>
            <div className="item-price">
                Start From
                <span className="price">30.000</span>
                KWD/Night
            </div>
            <div className="card-item-name">Studio with a Side Seating</div>
            <div className="box-grid">
                <a href="#" className="card-box">
                    <div className="card-box-flex">
                        <div className="card-place">
                            <i className="fa-solid fa-location-dot"></i>Hawalli
                        </div>
                        <div className="card-ancor">
                            <span className="link-name">Show Map</span>
                            <i className="fa-solid fa-caret-right"></i>
                        </div>
                    </div>
                </a>
                <a href="#" className="card-box">
                    <div className="card-box-flex">
                        <div className="detail-info-item">
                            <i className="fa-solid fa-star"></i>
                            <span>4 <span>( 113 reviews )</span></span>
                        </div>
                        <div className="card-ancor">
                            <i className="fa-solid fa-caret-right"></i>
                        </div>
                    </div>
                </a>
                <a href="#" className="card-box">
                    <div className="card-box-flex">
                        <div className="card-by">
                            <span>Posted By</span><span className="by-name">Mahmoud Mohamed</span>
                        </div>
                        <div className="card-ancor">
                            <span className="link-name">View Profile</span>
                            <i className="fa-solid fa-caret-right"></i>
                        </div>
                    </div>
                </a>
                <div className="card-box">
                    <h4 className="card-head">Description:</h4>
                    <p className="desc-pargh">
                        Tourism Ministry License Number: 50005560. The Studio includes
                        master bed and W.C
                    </p>
                </div>
                <div className="card-box">
                    <h4 className="card-head">Specification:</h4>
                    <div className="card-option">
                        <span ><i className="fa-solid fa-expand"></i> <span>Area :</span>
                            <span>87 M</span></span>
                        <span><i className="fa-solid fa-bath"></i><span>Toilets :</span><span>1</span></span>
                        <span><i className="fa-solid fa-car-side"></i><span>Bedrooms :</span><span>1</span></span>
                        <span><i className="fa-solid fa-loveseat"></i><span>Living Rooms :</span><span>1</span></span>
                        <span><i className="fa-solid fa-wifi"></i><span>Amenities :</span><span>TV , Free Internet</span></span>
                        <span><i className="fa-solid fa-family"></i><span>Suitable for Families</span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
