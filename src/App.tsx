import { Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "@/context/ThemeProvider";
import { SmoothScrollProvider } from "@/context/SmoothScrollProvider";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { PerspectiveGrid } from "@/components/shared/PerspectiveGrid";
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
import { Analytics } from '@vercel/analytics/react';

/**
 * Vercel Speed Insights. Renders nothing — it samples real-user Core Web Vitals
 * and beacons them out, and only reports from a Vercel deployment.
 *
 * Kept as its own component so the `useLocation` subscription lives here rather
 * than in App, where a route change would re-render the navbar, footer, and other
 * layout elements along with it.
 *
 * `route` is passed explicitly: without it the nine project pages would each
 * become their own row, splitting the sample size instead of aggregating.
 */
function VitalsReporter() {
  const { pathname } = useLocation();
  const route = pathname.startsWith("/projects/")
    ? "/projects/[slug]"
    : pathname;
  return <SpeedInsights route={route} />;
}

function App() {
  return (
    // `reducedMotion="user"` makes every motion component honour the OS setting:
    // transform and layout animations are dropped, opacity fades are kept so
    // content still resolves rather than appearing stuck at its `initial` state.
    // The CSS block in index.css covers keyframe animations; this covers JS.
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <SmoothScrollProvider>
          <ScrollToTop />
          {/* Persistent full-viewport animated 3D perspective grid + starfield */}
          <PerspectiveGrid fixed horizonRatio={0.34} columns={10} rows={16} showStars />
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_34%,transparent_0%,var(--color-void)_92%)] opacity-55"
          />

          <ScrollProgress />
          <Navbar />

          <main className="relative z-10">
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

          <VitalsReporter />
          <Analytics />
        </SmoothScrollProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
