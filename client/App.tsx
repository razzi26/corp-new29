import React from "react";
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SiteLayout from "./components/layout/SiteLayout";
import Catalog from "./pages/Catalog";
import Blog from "./pages/Blog";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Trainings from "./pages/Trainings";
import SeminarsPage from "./pages/Seminars";
import Services from "./pages/Services";
import Brochures from "./pages/Brochures";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/seminars/trainings" element={<Trainings />} />
            <Route path="/seminars/seminars" element={<SeminarsPage />} />
            <Route path="/seminars/services" element={<Services />} />
            <Route path="/seminars/brochures" element={<Brochures />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
