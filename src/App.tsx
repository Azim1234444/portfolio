import { Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { LoadingProvider } from "@/context/LoadingContext";
import { SmoothScrollProvider } from "@/context/SmoothScrollProvider";
import { Loader } from "@/components/shared/Loader";
import { PointerFX } from "@/components/shared/PointerFX";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { BackToTop } from "@/components/shared/BackToTop";
import { WhatsAppChat } from "@/components/shared/WhatsAppChat";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { PageTransition } from "@/components/shared/PageTransition";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Home } from "@/pages/Home";
import { ProjectDetail } from "@/pages/ProjectDetail";
import { NotFound } from "@/pages/NotFound";

function App() {
  return (
    // `reducedMotion="user"` makes every motion component honour the OS setting:
    // transform and layout animations are dropped, opacity fades are kept so
    // content still resolves rather than appearing stuck at its `initial` state.
    // The CSS block in index.css covers keyframe animations; this covers JS.
    <MotionConfig reducedMotion="user">
      <LoadingProvider>
        <SmoothScrollProvider>
          <ScrollToTop />
          <Loader />
          <PointerFX />
          <ScrollProgress />
          <Navbar />

          <main>
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </main>

          <Footer />
          <BackToTop />
          <WhatsAppChat />
          <CommandPalette />
        </SmoothScrollProvider>
      </LoadingProvider>
    </MotionConfig>
  );
}

export default App;
