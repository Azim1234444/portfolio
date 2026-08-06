import { useEffect, useState } from "react";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiFolder,
  FiAward,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiDownload,
  FiCopy,
  FiCode,
} from "react-icons/fi";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSectionNav } from "@/hooks/useSectionNav";
import { NAV_LINKS, PERSONAL, SOCIAL_LINKS } from "@/constants";

const NAV_ICONS = [FiHome, FiUser, FiBriefcase, FiFolder, FiAward, FiCode, FiMail];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  // Not the raw `scrollTo`: the palette is mounted globally, so it's reachable
  // from /projects/:slug where none of the home sections exist. `goToSection`
  // routes home first, then hands off to Lenis.
  const { goToSection } = useSectionNav();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    // Let the dialog finish closing before the scroll starts.
    window.setTimeout(() => goToSection(href), 150);
  }

  function openExternal(href: string) {
    setOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent hideClose className="overflow-hidden p-0">
        <DialogTitle className="sr-only">Command Menu</DialogTitle>
        <Command>
          <CommandInput placeholder="Jump to a section, or run a command…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigate">
              {NAV_LINKS.map((link, i) => {
                const Icon = NAV_ICONS[i] ?? FiHome;
                return (
                  <CommandItem key={link.href} onSelect={() => go(link.href)}>
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => openExternal(PERSONAL.resumeUrl)}>
                <FiDownload className="h-4 w-4" />
                Download Resume
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  navigator.clipboard?.writeText(PERSONAL.email);
                  setOpen(false);
                }}
              >
                <FiCopy className="h-4 w-4" />
                Copy Email Address
              </CommandItem>
              <CommandItem onSelect={() => openExternal(SOCIAL_LINKS.github)}>
                <FiGithub className="h-4 w-4" />
                Open GitHub Profile
              </CommandItem>
              <CommandItem onSelect={() => openExternal(SOCIAL_LINKS.linkedin)}>
                <FiLinkedin className="h-4 w-4" />
                Open LinkedIn Profile
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="flex items-center justify-between border-t border-border px-5 py-3 text-[11px] text-fog">
          <span>Navigate with ↑ ↓, select with ↵</span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-tint-2 px-1.5 py-0.5 font-mono">esc</kbd>
            to close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
