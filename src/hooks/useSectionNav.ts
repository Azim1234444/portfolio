import { useLocation, useNavigate } from "react-router-dom";
import { useSmoothScroll } from "@/context/SmoothScrollProvider";

/**
 * Section navigation that works whether we're already on the one-page home
 * layout or on a sub-route (e.g. a project detail page): it routes home
 * first, then hands off to Lenis for the smooth scroll.
 */
export function useSectionNav() {
  const { scrollTo } = useSmoothScroll();
  const navigate = useNavigate();
  const location = useLocation();

  function goToSection(target: string | number) {
    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => scrollTo(target), 450);
    } else {
      scrollTo(target);
    }
  }

  return { goToSection };
}
