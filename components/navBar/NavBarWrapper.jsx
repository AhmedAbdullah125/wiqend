'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { t } from '@/lib/i18n';
import logo from '@/public/images/logo.png';
import { useGetHomeCategories } from '../Home/useGetHomeCategories';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
export default function NavBarWrapper() {
    const [lang, setLang] = useState(null);
    const [token, setToken] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('lang') === 'ar' || localStorage.getItem('lang') === 'en') {
                setLang(localStorage.getItem('lang'));
            }
            else {
                localStorage.setItem('lang', 'en');
                setLang('en');
            }
            setToken(localStorage.getItem('token'));
        }
    }, []);
    const { data, isloading } = useGetHomeCategories(lang);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const category = searchParams.get('category');

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <header style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                <div className="container">
                    <div className="top-header">
                        <div className="nav-header">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="menu-bars" id="menu-id">
                                        <i className="fas fa-bars"></i>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="start">
                                    {/* <DropdownMenuLabel>{t(lang, 'My_Account')}</DropdownMenuLabel> */}
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link href="/" className='w-full'>{t(lang, 'home')}</Link>
                                        </DropdownMenuItem>
                                        {
                                            data?.map((item) => (
                                                <DropdownMenuItem key={item.id}>
                                                    <Link href={`/category?category=${item.name}&id=${item.id}`} className='w-full'>{item.name}</Link>
                                                </DropdownMenuItem>
                                            ))
                                        }
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />

                                </DropdownMenuContent>
                            </DropdownMenu>
                            <figure className="img-logo">
                                <Link href="/"><Image src={logo} className="img-fluid" alt="logo" />
                                </Link>
                            </figure>

                            <div className="navgition">
                                <div className="nav-head">
                                    <button className="close-menu">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                <ul className="big-menu list-unstyled">
                                    <li>
                                        <Link href="/" className={pathname === '/' ? 'active' : ''}> {t(lang, 'home')} </Link>
                                    </li>
                                    {
                                        data?.slice(0, 7)?.map((item) => (
                                            <li key={item.id}>
                                                <Link href={`/category?category=${item.name}&id=${item.id}`} className={pathname == '/category' && category === item.name ? 'active' : ''}>{item.name}</Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="header-icons">
                                <button href="#" className="lang-ancor" onClick={() => {
                                    if (lang !== 'en') {
                                        localStorage.setItem('lang', 'en');
                                        window.location.reload();

                                    }
                                    else {
                                        localStorage.setItem('lang', 'ar');
                                        window.location.reload();
                                    }
                                }}> {lang === 'en' ? 'ع' : 'EN'}</button>
                                {
                                    token ?
                                        <Link href="/profile" className="add-to">
                                            <div className="user-cont">
                                                <i className="fa-solid fa-circle-user"></i>
                                            </div>

                                        </Link>
                                        :
                                        <div className="dropdown cat-anchor">
                                            <div className="add-to">
                                                <div className="user-cont">
                                                    <i className="fa-solid fa-circle-user"></i>
                                                </div>
                                                <div className="dropdown-content">
                                                    <Link className="cat-drop" href="/login">{t(lang, 'login')}</Link>
                                                    <Link className="cat-drop" href="/register">{t(lang, 'new_account')}</Link>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </Suspense>
    );
}
