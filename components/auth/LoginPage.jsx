'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import bluelogo from '@/public/images/logo.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendPostRequest } from './loginRequest';
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel, } from '@/components/ui/form';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import 'react-phone-number-input/style.css';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { toast } from 'sonner';
import { t } from '@/lib/i18n';
import Link from 'next/link';
import { useCountries } from './useGetCountries';

export default function LoginPage({ setStep, setPhone, setCountryIso }) {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'ar');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLang(localStorage.getItem('lang'));
    }
}, []);
  const [country, setCountry] = useState(0);
  const [loading, setLoading] = useState(false);
  const Countrydata = useCountries(lang);
  const data = Countrydata.data;
  const FormSchema = z.object({
    phone: z.string().min(8, { message: lang === 'ar' ? 'يجب أن يكون رقم الهاتف 8 أحرف على الأقل' : 'Phone number must be at least 8 characters.', }).regex(/^\+?\d+$/, { message: t(lang, "phone_Length_error") }),
    country: z.string().min(1, { message: t(lang, "select_country_error"), }),
  });
  const form = useForm({ resolver: zodResolver(FormSchema), defaultValues: { phone: '', country: '' }, });
  const onSubmit = (formdata) => {
    const country = data.find((item) => item.id === Number(formdata.country));
    const countryCode = country?.code;
    setCountryIso(countryCode)
    const phone = formdata.phone;
    sendPostRequest({ phone, countryCode, lang, setLoading, setStep, setPhone, resetForm: form.reset, });    
  };
  return (
    <div className="sign-section" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="sign-container">
        <div className="upper-head">
          <a href="index.html" className="logo-ancor">
            <figure className="logo-img">
              <Image src={bluelogo} alt="logo" className="img-fluid" />
            </figure>
          </a>
        </div>
        <h2 className="form-head">Login to your account</h2>
        <p className="form-pargh">Please enter your phone number to login</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField name="phone" control={form.control} render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="input-of-mobile-num flex flex-row-reverse">
                    <div className="country-select">
                      <FormField name="country" control={form.control} render={({ field: countryField }) => (
                        <FormItem>
                          <FormControl>
                            <Select onValueChange={(value) => { setCountry(value); countryField.onChange(value); }}>
                              <SelectTrigger className="w-28 pe-4 border-e p-0 border-none shadow-none border-black/10 h-[55px]">
                                <SelectValue placeholder={lang === 'ar' ? 'البلد' : 'Country'} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {data?.map((item, index) => (
                                    <SelectItem key={index} value={String(item.id)}>
                                      <div className="code-country-slug-cont"><div className="select-country-item-cont">
                                        {/* <Image src={item.image} alt={item.name} width={20} height={20} className="w-7 h-4" /> */}
                                        <span>{item.flag}</span>
                                      </div><p>{item.code}</p>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <div className="form-cont">
                      <div className="form-group">
                        <FormLabel className="form-label">{lang === 'ar' ? 'رقم الجوال' : 'Phone Number'}</FormLabel>
                        <Input type="tel" className="form-input" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}
                          placeholder={lang === 'ar' ? 'أدخل رقم هاتفك' : 'Enter Your Phone'} maxLength={14}
                          {...field} onKeyDown={(e) => {
                            if (country === 0) {
                              e.preventDefault();
                              toast(lang === 'ar' ? "يرجى اختيار الدولة أولاً" : "Please select a country first", {
                                style: { borderColor: '#dc3545', boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)' },
                              });
                            } else if (!/^[0-9]|Backspace|Delete$/.test(e.key)) { e.preventDefault(); }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="form-btn-cont"> <Button type="submit" className="form-btn" disabled={loading}> {loading ? t(lang, 'loading') : t(lang, 'check')}</Button> </div>
            <div className="text-center">
              <span className="register-span">{t(lang, "Didnt_Have_Account?")}</span> <Link href="/register" className="register-btn">{t(lang, "Create_account")}</Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
