import "./globals.css";
import AppProvider from "../providers/AppProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Pet Adoption Platform",
  description: "Find your perfect pet companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
          <Toaster position="top-center" />
        </AppProvider>
      </body>
    </html>
  );
}