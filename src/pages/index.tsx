import { useTheme } from 'next-themes';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Hero from '@/components/hero';
import Action from '@/components/action';
import Features from '@/components/features';
import Faq from '@/components/faq';

import { useEffect } from 'react';
import Stats from '@/components/stats';

export default function TopPageView() {
  const { theme, setTheme } = useTheme();

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setTheme(event.target.value);
    console.log(theme);
  };

  useEffect(() => {
    setTheme('dark');
  }, []);

  return (
    <main
      className="flex h-screen flex-col items-center text-base-content"
      onChange={handleChange}
    >
      <Navbar />

      <Hero />
      <Stats />

      <Features />
      {/* <Action /> */}
      <Faq />
      <Footer />
    </main>
  );
}
