import Footer from "@/components/shared/Footer";
import "./globals.css";
import AppProvider from "@/providers/AppProvider";

export const metadata = {
  title: "Pet Adoption Platform",
  description: "Find your perfect pet companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}

      
        </AppProvider>
      </body>
    </html>
  );
}