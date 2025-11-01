'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import bluelogo from '@/public/images/logo.png';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/apiConfig';
import { useRouter } from 'next/navigation';
import { verify } from './verify';
import { t } from '@/lib/i18n';
import { sendPostRequest } from './loginRequest';

export default function Verify({ setStep, phone, countryIso, setPhone }) {
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'ar');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLang(localStorage.getItem('lang'));
        }
    }, []);
    const router = useRouter();
    const FormSchema = z.object({ otp: z.string().min(4, { message: lang === 'ar' ? 'يجب أن يتكون رمز التحقق من 4 أرقام' : 'OTP must be 4 digits' }), });
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (data) => { await verify(API_BASE_URL, phone, data, router, setLoading, countryIso, lang); };
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: { otp: '' },
    });
    function onSubmit(data) {
        handleSubmit(data);
    }

    const handleResend = () => {
        sendPostRequest({ phone, countryCode: countryIso, lang, setLoading, setStep, setPhone, resetForm: "nothing", });
    };
    return (
        <div className="sign-section">
            <div className="sign-container">
                <div className="upper-head">
                    <a href="index.html" className="logo-ancor">
                        <figure className="logo-img">
                            <Image src={bluelogo} alt="logo" className="img-fluid" />
                        </figure>
                    </a>
                </div>
                <h2 className="form-head">{t(lang, "verify_phone")}</h2>
                <p className="form-pargh">{t(lang, "enter_otp")}</p>
                <div className="form-number">{phone}</div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="otp" style={{ direction: 'ltr' }}>
                                        <FormControl>
                                            <InputOTP maxLength={4} pattern={/^[0-9]+$/} className="otp-input" {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} className="otp-field" />
                                                    <InputOTPSlot index={1} className="otp-field" />
                                                    <InputOTPSlot index={2} className="otp-field" />
                                                    <InputOTPSlot index={3} className="otp-field" />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="form-btn-cont">
                            <Button type="submit" className="form-btn" disabled={loading}>
                                {loading ? (t(lang, 'loading')) : (t(lang, 'confirm'))}
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="text-center">
                    <span className="register-span"> {t(lang, "Didnt_Get_Code")}</span>
                    <button className="register-btn" onClick={handleResend}> {t(lang, "Resend")}</button>
                </div>
            </div>
        </div>
    );
}