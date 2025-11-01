'use client';
import React, { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { t } from '@/lib/i18n';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import ReactSlider from 'react-slider';

export default function Filter({ data, lang, setSortBy, sortBy, brand, setBrand, tags, setTags, category, setCategory, prices, setPrices }) {
    const [dataFilter, setDataFilter] = useState(
        
        {"categories": [
            {
                "id": 1,
                "name": "Chalets",
            },
            {
                "id": 2,
                "name": "Farms",
            },
            {
                "id": 5,
                "name": "Jawakher",
            },
           
        ],
        "tags": [
            {
                "id": 1,
                "name": "New",
                "image": "https://b3app.co/storage/80/Group-(4).png"
            },
            {
                "id": 2,
                "name": "Old",
                "image": "https://b3app.co/storage/81/Group-1.png"
            },
            {
                "id": 3,
                "name": "On the Sea",
                "image": "https://b3app.co/storage/79/Group-(3).png"
            },
            {
                "id": 6,
                "name": "For Animals",
                "image": "https://b3app.co/storage/82/Group-(5).png"
            },
            {
                "id": 7,
                "name": "For Children",
                "image": "https://b3app.co/storage/87/Group.png"
            },
            {
                "id": 8,
                "name": "For Couples",
                "image": "https://b3app.co/storage/88/Group-(1).png"
            },
            {
                "id": 9,
                "name": "For Families",
                "image": "https://b3app.co/storage/108/Instagram-post---44.png"
            },
          
        ]
    }
    );
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [display, setDisplay] = useState(false);
    function clearFilter() {
        setSortBy(null);
        setBrand(null);
        setTags(null);
        setCategory(null);
        setPrices([]);
    }

    const [secPrice, setSecPrice] = useState([]);

    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const response = await axios.get(API_BASE_URL + `/general/filters`, {
    //                 headers: {
    //                     'accept-language': lang,
    //                 },
    //             });
    //             let data = response.data.data;
    //             setDataFilter(data);


    //         } catch (error) {
    //             console.error('Error retrieving data:', error);
    //             throw new Error('Could not get data');
    //         }
    //     }
    //     getData();
    // }, []);
    useEffect(() => {
        if (!data?.items?.length) return;
        let max = 0;
        let min = Number(data.items[0].price); // start with first item's price
        for (let i = 0; i < data.items.length; i++) {
            const price = Number(data.items[i].price);
            if (price > max) max = price;
            if (price < min) min = price;
        }

        if (maxPrice === 0) setMaxPrice(max);
        if (minPrice === 0 || min < minPrice) setMinPrice(min); // initial or lower found
    }, [data]);


    return (
        <div className="col-lg-3 filter">
            <div className={`filter-cont ${display && "active"}`}>
                <button className="filters-mobile-btn" onClick={() => setDisplay(!display)} style={lang == "ar" ? { borderRadius: "5px 0 0 5px" } : { borderRadius: "0 5px 5px 0" }}>
                    <i className="fas fa-filter"></i>
                </button>

                <div className="filter-main-cont">
                    <h2 className="filter-title">{t(lang, "Filter")}</h2>
                    {
                        brand || tags || sortBy || category || prices.length > 0 ? <button className="clear-filter border-b-0" onClick={clearFilter}>{t(lang, "Clear_Filters")}</button> : null
                    }
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        defaultValue="item-1"
                    >
                        <AccordionItem value="item-1" className="accordion-item-custom">
                            <AccordionTrigger className="accordion-trigger-custom bg-white mb-2 rounded-[8px]">{t(lang, "sort_by")}</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance pt-4 pb-5 bg-white rounded-[8px] mb-2">
                                <div className="option-cont">
                                    <div className="check-label" onClick={() => setSortBy("most_sell")}>
                                        <span className={`checkmark-parent ${sortBy === "most_sell" && "checkmark-parent-active"}`}>
                                            {sortBy === "most_sell" && <span className="checkmark-custom-active"></span>}
                                        </span>
                                        <span className={`check-text ${sortBy === "most_sell" ? "active-check-text" : ""}`}>{t(lang, "most_sell")}</span>
                                    </div>
                                </div>
                                <div className="option-cont">
                                    <div className="check-label" onClick={() => setSortBy("most_rated")}>
                                        <span className={`checkmark-parent ${sortBy === "most_rated" && "checkmark-parent-active"}`}>
                                            {sortBy === "most_rated" && <span className="checkmark-custom-active"></span>}
                                        </span>
                                        <span className={`check-text ${sortBy === "most_rated" ? "active-check-text" : ""}`}>{t(lang, "most_rated")}</span>
                                    </div>
                                </div>
                                <div className="option-cont">
                                    <div className="check-label" onClick={() => setSortBy("top_price")}>
                                        <span className={`checkmark-parent ${sortBy === "top_price" && "checkmark-parent-active"}`}>
                                            {sortBy === "top_price" && <span className="checkmark-custom-active"></span>}
                                        </span>
                                        <span className={`check-text ${sortBy === "top_price" ? "active-check-text" : ""}`}>{t(lang, "top_price")}</span>
                                    </div>
                                </div>
                                <div className="option-cont">
                                    <div className="check-label" onClick={() => setSortBy("less_price")}>
                                        <span className={`checkmark-parent ${sortBy === "less_price" && "checkmark-parent-active"}`}>
                                            {sortBy === "less_price" && <span className="checkmark-custom-active"></span>}
                                        </span>
                                        <span className={`check-text ${sortBy === "less_price" ? "active-check-text" : ""}`}>{t(lang, "less_price")}</span>
                                    </div>
                                </div>

                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="accordion-item-custom">
                            <AccordionTrigger className="accordion-trigger-custom  bg-white mb-2 rounded-[8px]">{t(lang, "categories")}</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance pt-4 pb-5 bg-white rounded-[8px] mb-2">

                                {
                                    dataFilter?.categories?.map((item, index) =>
                                        <div className="option-cont" key={index}>
                                            <div className="check-label" onClick={() => setCategory(item.id)}>
                                                <span className={`checkmark-parent ${category === item.id && "checkmark-parent-active"}`}>
                                                    {category === item.id && <span className="checkmark-custom-active"></span>}
                                                </span>
                                                <span className={`check-text ${category === item.id ? "active-check-text" : ""}`}>{item.name}</span>
                                            </div>
                                        </div>
                                    )
                                }

                            </AccordionContent>
                        </AccordionItem>
                        {/* <AccordionItem value="item-3" className="accordion-item-custom">
                            <AccordionTrigger className="accordion-trigger-custom  bg-white mb-2 rounded-[8px]">{t(lang, "brands")}</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance pt-4 pb-5 bg-white rounded-[8px] mb-2">

                                {
                                    dataFilter?.brands?.map((item, index) =>
                                        <div className="option-cont" key={index}>
                                            <div className="check-label" onClick={() => setBrand(item.id)}>
                                                <span className={`checkmark-parent ${brand === item.id && "checkmark-parent-active"}`}>
                                                    {brand === item.id && <span className="checkmark-custom-active"></span>}
                                                </span>
                                                <span className={`check-text ${brand === item.id ? "active-check-text" : ""}`}>{item.name}</span>
                                            </div>
                                        </div>
                                    )
                                }

                            </AccordionContent>
                        </AccordionItem> */}
                        <AccordionItem value="item-4" className="accordion-item-custom">
                            <AccordionTrigger className="accordion-trigger-custom bg-white mb-2 rounded-[8px]">{t(lang, "tags")}</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance pt-4 pb-5 bg-white rounded-[8px] mb-2">

                                <div className="tags">
                                    {
                                        dataFilter?.tags?.map((item) =>
                                                <span className={`tag ${tags === item.id && "tag-active"}`} key={item.id} onClick={() => setTags(item.id)}>
                                                    {item.name}
                                                </span >
                                        )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5" className="accordion-item-custom">
                            <AccordionTrigger className="accordion-trigger-custom bg-white mb-2 rounded-[8px]">{t(lang, "price")}</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 pt-4 bg-white rounded-[8px] mb-2">
                                <div className="slider-range">
                                    <ReactSlider
                                        className="horizontal-slider"
                                        thumbClassName="example-thumb"
                                        trackClassName="example-track"
                                        defaultValue={[0, 5000]}
                                        ariaLabel={['Lower thumb', 'Upper thumb']}
                                        ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                        // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                        pearling
                                        minDistance={10}
                                        value={prices}
                                        onAfterChange={setPrices}
                                        // min={Math.floor(Number(minPrice))}
                                        min={10}
                                        onChange={setSecPrice}
                                        // max={Math.ceil(Number(maxPrice))}
                                        max={100}
                                    />
                                    <p className='flex justify-between mt-4' style={{ direction: "rtl" }}>
                                        {/* <span>{secPrice.length > 0 ? Number(secPrice[1]).toFixed(2) : "" || Math.ceil(Number(maxPrice)).toFixed(2)} {t(lang, "currency")}</span>
                                        <span>{secPrice.length > 0 ? Number(secPrice[0]).toFixed(2) : Math.floor(Number(minPrice)).toFixed(2)} {t(lang, "currency")}</span> */}
                                        <span>{secPrice.length > 0 ? Number(secPrice[1]).toFixed(2) : "" || Math.ceil(Number(maxPrice)).toFixed(2)} {t(lang, "KWD")}</span>
                                        <span>{secPrice.length > 0 ? Number(secPrice[0]).toFixed(2) : Math.floor(Number(minPrice)).toFixed(2)} {t(lang, "KWD")}</span>
                                    </p>
                                </div>

                            </AccordionContent>

                        </AccordionItem>
                    </Accordion>
                </div>
            </div>

        </div>
    );
}

