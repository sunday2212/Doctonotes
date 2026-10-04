import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Register service worker (relative to the app base so it works on
// GitHub Pages subpaths like /repo-name/ as well as root domains)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker.register(swUrl)
      .then((registration) => {
        console.log('SW registered: ', registration);
        registration.update().catch(() => {});
        // Reload page when a new SW takes control to avoid stale chunks
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
