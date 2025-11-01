'use client'
import { t } from '@/lib/i18n';
import axios from 'axios';
import { toast } from 'sonner';

export const verify = async (API_BASE_URL, phone, data, router, setLoading ,countryIso,lang) => {

    setLoading(true); // Set loading state
    const url = `${API_BASE_URL}/auth/login`; // API endpoint

    try {
        // Prepare the request payload
        const queryParams = {
            phone: phone,
            otp: data.otp,
            country_code : countryIso,
            fcm_token : "device-token", // Replace with your FCM token
        };
        const response = await axios({
            method: 'post',
            url: url,
            data: queryParams,
            headers: { lang: 'en' }, // Optional headers
        });

        setLoading(false); // Reset loading state
        // Get message from response
        const message = response.data?.data || 'Operation successful';
        console.log(response);
        
        if (response.status === 200) {
            // Success toast notification
            toast(`${t(lang,'hello_user')} ${response.data.data.user.name}`, {
                style: {
                    borderColor: "#28a745",
                    boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)',
                },
            });
            // Store token in local storage
            localStorage.setItem('token', response.data.data.token);
            // Redirect or perform additional actions
            router.back();
            // location.reload();
        } else {
            // Handle unexpected responses
            toast('Unexpected response', {
                style: {
                    borderColor: "#dc3545",
                    boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
                },
            });
        }
    } catch (error) {
        setLoading(false);
         // Extract error message from response
        const errorMessage = error?.response?.data.message || error.message || 'An unknown error occurred';
        // Display error toast notification
        toast(errorMessage, {
            style: {
                borderColor: "#dc3545",
                boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
            },
        });
    }
};
