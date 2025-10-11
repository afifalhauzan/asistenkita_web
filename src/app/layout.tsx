import "/src/app/app.css";
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { QueryProvider } from '@/providers/QueryProvider';
import type { LayoutProps } from '@/types/routing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AsistenKita - Platform Jasa ART Terpercaya",
  description: "Platform Jasa ART Terpercaya",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo_navbar.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Fira+Code&family=Inter:opsz,wght@14..32,100..900&family=Poppins:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/logo_navbar.svg" />
      </head>
      <body className={"bg-[#FAFAFB] font-['Plus_Jakarta_Sans'] text-sm text-[#56565C]"}>
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}