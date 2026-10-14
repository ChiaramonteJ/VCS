# VCS website audit and implementation report

Date: October 14, 2026
Branch: improve/vcs-seo-ux-2026-10-14
Status: Local changes only. Nothing committed, pushed, or published.

## Audit and prioritized plan

The repository had no uncommitted changes, no package manifest, no automated tests, and no applicable AGENTS.md in the inspected project. All 49 complete HTML pages, both component templates, both JavaScript files (main.js is empty), main.css, robots.txt, sitemap.xml, redirects, favicon manifest, image inventory, and page references were inspected.

Priority 1: Deliver reliable navigation, correct metadata/indexing/schema, preserve URLs and Jobber integrations, and fix contrast.
Priority 2: Improve service and location journeys, headings, breadcrumbs, service comparison, quote visibility, and responsive styling.
Priority 3: Reserve image space, optimize heavy assets, remove missing backgrounds, and validate static and browser behavior.
Priority 4: Record content, business verification, hosting, and analytics work requiring outside information.

Initial findings:
- Most pages had empty headers and footers until a network fetch finished. The fetched header included another header element. Fallback home/logo paths were relative and could break on nested URLs.
- Bright pink with white navigation, button, and link text had poor contrast. Generic button styles overrode Bootstrap variants.
- Most pages lacked a main landmark and skip link; the area hub had two H1 elements and contact content skipped to H4.
- Several pages lacked social metadata; other pages used relative sharing-image URLs.
- City schema described a separate LocalBusiness/address in each served city and used inconsistent social identities. Homepage address data conflicted with the existing Allegan-based business description.
- The thank-you page was indexable and included in the sitemap. Sitemap dates were not reliably tied to changes.
- The webmanifest referenced nonexistent root icon paths. CSS referenced three nonexistent hero images.
- Many city pages consisted largely of city-name substitutions. The services and all-services hubs substantially overlapped.
- Quote paths varied between two existing Jobber destinations. Both were preserved.
- Kalamazoo and Portage already had noindex redirects and explicitly excluded coverage. The owner confirmed that both remain excluded.
- Large PNG assets, missing image dimensions, and animated backgrounds created avoidable loading/layout/motion costs.

## SEO improvements

Updated all 46 nonredirect complete pages. The three existing redirect pages remain unchanged. Shared component changes appear in each delivered HTML page.

- Retained production domain, established URLs, working integration snippets, and pricing.
- Validated unique existing titles and descriptions; refined service-detail titles for West Michigan and differentiated the two service hubs.
- Added missing Open Graph/Twitter metadata and made sharing-image URLs absolute. Social titles now match page titles.
- Retained self-referencing canonical URLs on indexable pages. Removed base tags after making assets root-relative so same-page skip/fragment links work on nested pages.
- Added main landmarks, skip links, visible breadcrumbs matching existing BreadcrumbList schema, and corrected the area/contact heading structure.
- Replaced city-as-business schema with Service/areaServed and a shared business identifier. Kept one named LocalBusiness entity on the homepage with existing contact/social information.
- Removed contradictory location/address data from business schema rather than inventing a street address. No review/rating/certification claims were added.
- Used standard LocalBusiness + Service schema for cleaning. Schema.org's cleaning example uses those types; a dedicated CleaningService type was not verified and was not invented.
- Retained existing FAQs and BreadcrumbList data; verified JSON parsing and breadcrumb order. JSON checks are not equivalent to Google's rich-result validation.
- Set thank-you.html to noindex, follow. Sitemap now contains exactly 44 indexable canonical URLs, without guessed modification dates, priorities, or change frequencies.
- Verified robots.txt still permits crawling and points to the production sitemap.
- Checked incoming links: no orphan indexable pages remain.

Pages/groups updated:
- Homepage; about; contact; before-after; promotions and gift-card landing; stories hub and both articles; service-area hub; services and all-services hubs; thank-you and 404.
- All 11 service-detail/quote pages.
- All 21 active city/area pages: Alamo, Allegan, Byron Center, Caledonia, Dorr, Fennville, Grand Rapids, Gun Lake, Holland, Hopkins, Hudsonville, Jenison, Martin, Middleville, Nazareth, Orangeville, Otsego, Plainwell, Saugatuck, Wayland, Zeeland.
- Header/footer components, navigation JavaScript, shared CSS, favicon manifest, sitemap, and referenced image variants.

## Local content and service journeys

- Linked previously unlinked service-list entries on city pages to the matching service checklists.
- Added quote-preparation and service-selection guidance to the 11 requested active priority locations, with contextual links to relevant existing communities.
- Guidance covers move preparation in Allegan, recurring frequency in Otsego/Dorr, focused versus whole-home cleaning in Caledonia, seasonal-home details near Gun Lake, and other concrete request details.
- This improves usefulness but does not replace first-hand local evidence. Remaining largely templated city copy needs owner-supplied information; no local job history or neighborhood claims were fabricated.
- Homepage -> service -> existing Jobber request remains direct.
- City -> relevant service checklist -> existing Jobber request remains available; city hero links retain their original booking destination.
- Homepage -> about -> quote/contact now has an explicit final call to action.
- Services is the overview; all-services now includes one service/schedule comparison table. Both URLs remain indexable. Search Console is needed to determine whether further differentiation or consolidation is warranted.

## Design and conversion improvements

- Preserved pink branding, Bootstrap, original page structure, business copy, photographs, and existing interactive features.
- Added a softer page background, dark accessible text/accent colors, consistent card spacing/radii, clearer button variants, hover states, focus rings, and reduced-motion support.
- Static navigation eliminates component-fetch layout replacement. The header collapses below 1200px to allow space for the existing full menu.
- Navigation and FAQs remain accessible without JavaScript/Bootstrap. Dropdown control is a real button with accessible state.
- Renamed header BOOK NOW to Request a Quote, retaining its exact destination.
- Added a three-step homepage explanation after service selection, more links to priority locations, and an about-page quote/contact section.
- Added direct main-content quote calls to action to the area, promotions, and stories hubs.
- Contact now explains useful request details and includes the existing business telephone.
- Preserved the mobile sticky quote/call controls and manually controlled testimonial carousel. Existing reviews and certification/experience claims were retained; their sources were not independently verified.

## Performance improvements

- Headers/footers are embedded at edit time; nav.js now updates year/current-page state without network component requests.
- Added intrinsic image dimensions, below-fold lazy loading, and high fetch priority for the homepage hero logo. The hero is not lazy-loaded.
- Created eight smaller WebP variants using the browser's native encoder, retaining every original image and updating matching site references.
- Homepage logo asset: 493,299 -> 136,076 bytes (about 72% smaller).
- Spring promotion asset: 2,970,093 -> 187,622 bytes (about 94% smaller).
- Total size difference across the eight converted originals: 10,887,994 bytes. This is an asset-library comparison, not a per-page transfer saving; some variants are not currently referenced.
- Removed three nonexistent CSS background references, repaired manifest icon paths, pinned the existing icon stylesheet version, stopped continuous hero animation, and honored reduced motion.
- No new framework, package dependency, paid provider, or hosting change.

## Testing results

- tools/check-site.ps1: PASS across 49 pages / 44 indexable URLs. Checks canonical/indexing consistency, duplicate/missing titles/descriptions, social URLs, one H1/main, static landmarks, JSON-LD parsing, breadcrumb order, local assets/fragments, incoming links, sitemap coverage, image dimensions, manifest/CSS assets, and retention of original Jobber URLs compared with main.
- Edge headless: all 46 affected pages checked at 375px, 768px, 1440px (138 checks). Checks horizontal overflow, landmarks, navigation, quote-link presence, mobile menu, service dropdown, FAQ control state where present, hero availability, and captured JavaScript errors. Initial results passed 138/138; final results are recorded in browser-test-results.json.
- No-script sandbox: homepage, deep clean, and Plainwell at 375px passed navigation, service-link visibility, FAQ visibility, and overflow checks. Results in no-script-test-results.json.
- Desktop/mobile screenshot review performed; a header text-color conflict was corrected. Mobile review uses a 375px iframe because Chromium's desktop window has a minimum layout width.
- Original Jobber links and embed URLs were preserved. Browser-check previews suppress analytics and live Jobber scripts to avoid polluting analytics or interacting with customer systems.
- No real quote was submitted. Live Jobber embedding, external links, analytics events, Google rich-result eligibility, field Core Web Vitals, and post-deployment indexing remain external checks.
- No Lighthouse score or ranking improvement is claimed.

## Outstanding recommendations

Business information:
- Confirm a public business address before restoring address fields. Google's LocalBusiness rich-result requirements include address; current truthful address-free schema does not guarantee eligibility.
- Supply actual cleaning examples, owner-written service notes, permissioned photos, and coverage/scheduling details for each city. Existing generic location text remains the main content limitation.
- Verify existing testimonial provenance, AHCA certification, years-of-experience claims, and product-safety wording before publication. No existing business claims/prices were changed.
- Review seasonal promotion dates/availability; promotional pricing was preserved.
- Confirm whether the two existing Jobber destinations intentionally have different roles. They were not silently unified.
- Maintain Kalamazoo and Portage exclusions as explicitly confirmed.

Search Console / analytics:
- After owner-approved deployment, validate representative pages in Rich Results Test and Schema Markup Validator, submit sitemap, inspect rendered URLs/canonicals, and review indexing.
- Examine queries landing on services/all-services and overlapping recurring-service pages before considering consolidation. No city deletion or new redirect was introduced.
- Use Search Console/CrUX field data and a production Lighthouse run for LCP, CLS, INP and third-party embedding costs.
- Check GA4 lead events and funnel drop-off with access; no new tracking was added.

Hosting:
- GitHub Pages does not apply Netlify-style _redirects rules. The existing file is preserved, but legacy routes listed there without actual files may still return 404. Existing Kalamazoo/Portage/giftcard HTML redirects continue to work. Hosting-compatible legacy stubs or redirect infrastructure should be reviewed separately before deployment.
- Review whether tooling/docs should be excluded from publication through an existing/future build workflow. HTML utilities declare noindex and browser checks restrict execution to localhost.

Maintenance:
- Edit components/header.html or footer.html, then run:
  powershell -NoProfile -ExecutionPolicy Bypass -File tools/sync-components.ps1
- Validate:
  powershell -NoProfile -ExecutionPolicy Bypass -File tools/check-site.ps1
- Local preview:
  powershell -NoProfile -ExecutionPolicy Bypass -File tools/serve.ps1 -BrowserChecks
- Open http://localhost:8765/tools/browser-check.html for browser checks.
- ExecutionPolicy Bypass applies only to the launched process; it does not change machine policy.
- Keep changes on the optimization branch for review. Nothing was committed, pushed, or deployed.

## Official references consulted

- Crawlable links: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- LocalBusiness requirements: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Schema.org cleaning-service example: https://schema.org/Service

## Follow-up design updates

- Homepage service area: replaced the plain list with a responsive community-tile panel; all 15 original city destinations remain.
- Shared hero design: all 43 existing banners now use the same light blush background, subtle curved accents, dark text, purple primary buttons, and dark outlined secondary buttons.
- Removed dark overlay markup and consolidated obsolete animated/dark hero styles.
- Reviewed homepage desktop/mobile and service-area desktop screenshots.
- Revalidated 49 pages, 44 indexable URLs, and 138/138 browser checks at 375px, 768px, and 1440px. git diff --check passes.
- Changes remain local and unpublished.