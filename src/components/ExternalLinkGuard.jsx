import { useEffect } from "react";
import { useCookiesNext } from "cookies-next";
import { useLeadForm } from "@/context/LeadFormContext";
import { isExternalLink } from "@/lib/isExternalLink";

const SKIP_SELECTORS = "header, footer, [data-skip-external-gate]";

function shouldGateExternalLink(anchor) {
  if (!anchor?.closest("main")) return false;
  if (anchor.closest(SKIP_SELECTORS)) return false;

  const href = anchor.getAttribute("href");
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return false;
  }

  return (
    anchor.hasAttribute("data-ls-external-link") || isExternalLink(href)
  );
}

export default function ExternalLinkGuard() {
  const { showLeadForm } = useLeadForm();
  const { getCookie } = useCookiesNext();

  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest("a");
      if (!anchor || !shouldGateExternalLink(anchor)) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      event.preventDefault();
      event.stopPropagation();

      const leadVerified = getCookie("lead_verified") === "true";
      const leadId = getCookie("lead_id");

      if (!leadVerified && !leadId) {
        showLeadForm("external link click", {
          type: "redirect",
          url: href,
          external: true,
        });
        return;
      }

      window.open(href, "_blank", "noopener,noreferrer");
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [getCookie, showLeadForm]);

  return null;
}
