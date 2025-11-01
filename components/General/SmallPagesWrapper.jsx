import React from 'react'
import BreadCrumb from './BreadCrumb'
export default function SmallPagesWrapper({ type, name }) {
    return (
        <div className="">
            <BreadCrumb first={name} firstLink={`/${type}`} />
            <section className="content-section">
                <div className="container">
                    <h3 className="section-title">{name}</h3>
                    <div className="help-center">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has survived not only
                        five centuries, but also the leap into electronic typesetting, Lorem
                        Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it
                        to make a type specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, Lorem Ipsum is simply
                        dummy text of the printing and typesetting industry. Lorem Ipsum has
                        been the industry's standard dummy text ever since the 1500s, when an
                        unknown printer took a galley of type and scrambled it to make a type
                        specimen book.printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an
                        unknown printer took a galley of type and scrambled it to make a type
                        specimen book.printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s,
                    </div>
                </div>
            </section>
        </div>
    )
}
