'use client';

import { ThemeProvider } from 'next-themes';
import React from 'react';

export default function ThemeProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
