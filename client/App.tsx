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
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import About from "./pages/About";
import TrainingsOverview from "./pages/TrainingsOverview";
import Trainings from "./pages/Trainings";
import SeminarsPage from "./pages/Seminars";
import Services from "./pages/Services";
import Brochures from "./pages/Brochures";
import Resources from "./pages/Resources";
import Videos from "./pages/ResourcesVideos";
import KnowledgeHub from "./pages/ResourcesKnowledgeHub";
import Podcasts from "./pages/ResourcesPodcasts";
import CaseStudies from "./pages/ResourcesCaseStudies";
import ResourcesQuizzes from "./pages/ResourcesQuizzes";
import Quiz from "./pages/Quiz";
import KnowledgeArticle from "./pages/KnowledgeArticle";
import ProductPage from "./pages/Product";
import TrainingsAndSeminars from "./pages/services/TrainingsAndSeminars";
import ValidationService from "./pages/services/ValidationService";
import CommissioningAndQualification from "./pages/services/CommissioningAndQualification";

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
            <Route path="/products" element={<Catalog />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<TrainingsOverview />} />
            <Route path="/services/trainings-and-seminars" element={<TrainingsAndSeminars />} />
            <Route path="/services/validation-service" element={<ValidationService />} />
            <Route path="/services/commissioning-and-qualification" element={<CommissioningAndQualification />} />
            <Route path="/services/about" element={<Trainings />} />
            <Route path="/services/seminars" element={<SeminarsPage />} />
            <Route path="/services/services" element={<Services />} />
            <Route path="/services/brochures" element={<Brochures />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/videos" element={<Videos />} />
            <Route path="/resources/articles" element={<KnowledgeHub />} />
            <Route
              path="/resources/articles/:slug"
              element={<KnowledgeArticle />}
            />
            <Route path="/resources/quizzes" element={<ResourcesQuizzes />} />
            <Route path="/resources/quizzes/:slug" element={<Quiz />} />
            <Route path="/news/:slug" element={<NewsArticle />} />
            <Route path="/resources/podcasts" element={<Podcasts />} />
            <Route path="/resources/case-studies" element={<CaseStudies />} />
            <Route path="/resources/faq" element={<Faq />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
