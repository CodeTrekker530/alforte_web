import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import SplashScreen from '../components/SplashScreen';
import { SelectionProvider } from '../context/SelectionContext'; // adjust path

export default function Layout() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000); // adjust duration
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SelectionProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SelectionProvider>
  );
}
