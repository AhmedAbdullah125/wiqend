import { t } from '@/lib/i18n';
import Link from 'next/link';
import React from 'react';


export default function BreadCrumb({ first, firstLink, second, secondLink }) {
    return (

        <section className="breadcrumb-sec">
            <div className="container">
                <ul className="breadcrumb">
                    <li className="item-home">
                        <Link className="bread-home" href="/">home </Link>
                    </li>
                    {
                        first ?
                            <>
                                <li className="">
                                    <Link href={firstLink}> {first}</Link>
                                </li>
                                {
                                    second ? <li className="active">
                                        <Link href={secondLink}>{second}</Link>
                                    </li> : null
                                }
                            </>
                            : null
                    }
                </ul>
            </div>
        </section>

    );
}

