'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { t } from '@/lib/i18n';
import { registerRequest } from './registerRequest';
import logo from '@/public/images/logo.png';
import { useCountries } from './useGetCountries';

export default function Register({ setStep, setPhone, setCountryIso }) {
    const [lang, setLang] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLang(localStorage.getItem('lang'));
        }
    }, []);
    const [country, setCountry] = useState(0);
    const data = useCountries(lang).data;
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/');
        }
    }, []);

    const FormSchema = z.object({
        phone: z.string().min(8, { message: lang === 'ar' ? 'يجب أن يكون رقم الهاتف 8 أحرف على الأقل' : 'Phone number must be at least 8 characters.' })
            .regex(/^\+?\d+$/, { message: lang === 'ar' ? 'يجب أن يبدأ رقم الهاتف بعلامة + ويحتوي على أرقام فقط' : 'Phone number must start with a plus sign and contain only digits.' }),
        fullName: z.string().min(2, { message: lang === 'ar' ? 'الرجاء إدخال اسمك' : 'Please enter your name' }),
        country: z.string().min(1, { message: lang === 'ar' ? 'الرجاء اختيار دولة' : 'Please select a country' }),
        termsAccepted: z.literal(true, {
            errorMap: () => ({
                message: lang === 'ar' ? 'يرجى قبول الشروط والأحكام' : 'Please accept the terms and conditions',
            }),
        })
    });

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: { fullName: '', phone: '', country: '', termsAccepted: false, },
    });

    const handleSubmit = async (data) => {
        await registerRequest(data, lang, setLoading, setStep, setPhone, form.reset, setCountryIso);
    };

    const onSubmit = (data) => { handleSubmit(data); };
    return (
        <div className="sign-section">
            <div className="sign-container">
                <div className="upper-head">
                    <a href="index.html" className="logo-ancor">
                        <figure className="logo-img">
                            <Image src={logo} alt="logo" className="img-fluid" />
                        </figure>
                    </a>
                </div>
                <h2 className="form-head">Create Account</h2>
                <p className="form-pargh">Please enter required data to create account</p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="login-form">
                        <FormField name="fullName" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="form-cont">
                                        <div className="form-group">
                                            <FormLabel className="form-label">{lang === 'ar' ? 'اسمك' : 'Your Name'}</FormLabel>
                                            <Input type="text" className="form-input" placeholder={lang === 'ar' ? 'أدخل اسمك' : 'Enter Your Name'} {...field} />
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

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
                                                                    {data?.map((item) => (
                                                                        <SelectItem key={item.id} value={String(item.code)}>
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
                        <div className="form-group mt-4">
                            <FormField name="termsAccepted" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="check-group">
                                            <div className="check-width">
                                                <label className="check-label">
                                                    <span>
                                                        <input type="checkbox" checked={field.value} onChange={field.onChange} />
                                                        <span className="checkmark custom-checkmark"></span>
                                                        <span className="check-text">{t(lang, "accept")} <Link href="/terms_conditions">{t(lang, "terms&conditions")}</Link></span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <div className="form-btn-cont">
                            <Button type="submit" className="form-btn" disabled={loading}>
                                {loading ? (lang === 'ar' ? 'جاري التحميل...' : 'Loading...') : (lang === 'ar' ? 'إنشاء حساب' : 'Create Account')}
                            </Button>
                        </div>
                        <div className="text-center">
                            <span className="register-span"> {t(lang, "have_account")} </span>
                            <Link href="/login" className="register-btn"> {t(lang, "login")}</Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
