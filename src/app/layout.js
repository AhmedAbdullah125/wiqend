import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './globals.css';
import '@/src/style/main.css';
import NavBar from '@/components/navBar/NavBar';
import Footer from '@/components/footer/Footer';
import ClientProviders from '@/src/utils/providers/ClientProviders';
// import logo from '@/public/images/blue-logo.svg';

export async function generateMetadata() {
  return {
    title: 'Wiqend',
    description: 'Wiqend',
    keywords: 'Wiqend',
    openGraph: {
      title: 'Wiqend',
      description: 'Wiqend',
      url: 'Wiqend-rose.vercel.com',
      siteName: 'Wiqend',
      images: [
        {
          url: 'https://Wiqend-rose.vercel.app/_next/static/media/blue-logo.62b83cbf.svg',
          width: 1200,
          height: 630,
          alt: 'Wiqend',
        },
      ],
      type: 'website',
      locale: 'ar_SA',
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body suppressHydrationWarning={true}>
        <ClientProviders>
          <NavBar />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
