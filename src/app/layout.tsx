import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from './components/react-query-provider/ReactQueryProvider';
import InteractiveHeader from './components/InteractiveHeader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <InteractiveHeader />
          <main className="flex-1 bg-gray-100">
            <div className="container mx-auto px-6 py-4">{children}</div>
          </main>
          <footer className="bg-blue-600 text-white py-4 mt-auto">
            <div className="container mx-auto px-6 text-center">
              <p>&copy; 2024 Plant Finder. All rights reserved.</p>
            </div>
          </footer>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
