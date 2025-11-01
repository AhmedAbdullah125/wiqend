// lib/api/login.js
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import { toast } from 'sonner';
import { t } from '@/lib/i18n';

export async function registerRequest(data, lang, setLoading, setStep, setPhone, resetForm, setCountryIso) {
  setLoading(true);
  const url = `${API_BASE_URL}/auth/register`; // API endpoint

  try {
    const response = await axios.post(
      url,
      {
        name: data.fullName,
        phone: data.phone,
        country_code: data.country,
        fcm_token: "fcm_token_here" // Replace with your FCM token
      },
      { headers: { 'accept-language': lang } }
    );

    setLoading(false);
    const message = response.data?.message || t(lang, 'success_message');
    if (response.status === 200 || response.status === 201) {
      toast(message, {
        style: {
          borderColor: '#28a745',
          boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)',
        },
      });

      const url = `${API_BASE_URL}/auth/initiate-login`;

      try {
        const response = await axios.post(
          url,
          {
            phone: data.phone,
            country_code: data.country

          },
          { headers: { 'accept-language': lang } }
        );

        setLoading(false);
        console.log(response.data.data);

        const message = response?.data?.data?.message || t(lang, 'success_message');

        if (response.status === 200) {
          toast(message, {
            style: {
              borderColor: '#28a745',
              boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)',
            },
          });

          setStep('verify');
          console.log(data);
          
          setCountryIso(data.country);
          setPhone(data.phone);

          if (resetForm !== "nothing") {
            resetForm();
          }
        } else {
          toast(message, {
            style: {
              borderColor: '#dc3545',
              boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
            },
            description: lang === 'ar' ? 'استجابة غير متوقعة' : 'Unexpected response',
          });
        }
      } catch (error) {
        setLoading(false);

        const errorMessage = error?.response?.data?.message || error.message || (lang === 'ar' ? 'حدث خطأ غير معروف' : 'An unknown error occurred');

        toast(errorMessage, {
          style: {
            borderColor: '#dc3545',
            boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
          },
        });
      }
    } else {
      toast(message, {
        style: {
          borderColor: '#dc3545',
          boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
        },
        description: lang === 'ar' ? 'استجابة غير متوقعة' : 'Unexpected response',
      });
    }
  } catch (error) {
    setLoading(false);

    const errorMessage =
      error?.response?.data.message || error.message || (lang === 'ar' ? 'حدث خطأ غير معروف' : 'An unknown error occurred');

    toast(errorMessage, {
      style: {
        borderColor: '#dc3545',
        boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
      },
    });
  }
}
