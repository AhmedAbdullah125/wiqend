'use client'
import React, { useState, useEffect } from 'react';
import logo from '@/public/images/logo.png';
import tiktok from '@/public/images/tiktok.svg';
import instagram from '@/public/images/instagram.svg';
import twitter from '@/public/images/twitter.svg';
import { t } from '@/lib/i18n';
import { useGetHomeCategories } from '../Home/useGetHomeCategories';
import Link from 'next/link';
import Image from 'next/image';
export default function Footer() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'ar');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLang(localStorage.getItem('lang'));
    }
  }, []);
  const { data, isLoading, isError } = useGetHomeCategories(lang);
  
  return (
    <footer>
      <div className="container">
        <div className="footer-cont">
          <div className="footer-logo">
            <Image src={logo} alt="logo" width={0} height={0} />
            <div className="social">
              <Link href="https://tiktok.com"><Image className='social-link' src={tiktok} alt="wiqend" width={0} height={0} /></Link>
              <Link href="https://instagram.com"><Image className='social-link' src={instagram} alt="wiqend" width={0} height={0} /></Link>
              <Link href="https://twitter.com"><Image className='social-link' src={twitter} alt="wiqend" width={0} height={0} /></Link>
            </div>
          </div>
          <div className="footer-item">
            <h3>{t(lang, 'Quick_Links')}</h3>
            <ul>
              <li><Link href="/">{t(lang, 'home')}</Link></li>
              <li><Link href="/contact">{t(lang, 'Contact us')}</Link></li>
              <li><Link href="/privacy_policy">{t(lang, 'privacy_policy')}</Link></li>
              <li><Link href="/terms_conditions">{t(lang, 'Terms_conditions')}</Link></li>
              <li><Link href="/terms_of_use">{t(lang, 'Terms_of_use')}</Link></li>
              <li><Link href="/faqs">{t(lang, 'FAQS')}</Link></li>
            </ul>
          </div>
          <div className="footer-item">
            <h3>{t(lang, 'categories')}</h3>
            {
              isLoading ? null :
                <ul>
                  {
                    data?.map((item) => (
                      <li key={item.id}>
                        <Link href={`/category?category=${item.name}&id=${item.id}`}>{item.name}</Link>
                      </li>
                    ))
                  }
                </ul>
            }
          </div>
        </div>
      </div>

    </footer>

  );
}
