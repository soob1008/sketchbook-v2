import { Geist, Geist_Mono } from 'next/font/google';

import '@workspace/ui/globals.css';
import { Providers } from '@/components/providers';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@workspace/ui/components/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Toaster } from '@workspace/ui/components/sonner';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              <SidebarTrigger className="fixed" />
              <div className="py-20 px-10">{children}</div>
            </main>
            <Toaster position="top-center" richColors />
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}