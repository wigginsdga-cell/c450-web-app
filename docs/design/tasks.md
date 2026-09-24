# CyberGuide — Implementation Tasks

**Owner:** DeLorean Wiggins  
**Course:** INFO-C 450 System Design, Fall 2026  
**Plan source:** `docs/design/plan.md`  
**Specification source:** `docs/design/specification.md`

Tasks are ordered so each stage builds on the previous one. A task is complete only when its **Done when** condition is met.

## Phase 1 — Data and Model

### T01 — Replace Starter Data with CyberGuide Topics
- [x] **Requirements:** R6, R8, R15, R21
- **Files:** `items-template.csv`
- **Work:** Replace the local-business sample records with Phishing, Weak Passwords, Malware, Unsafe Links, and Account Compromise. Add `warning_signs`, `recommended_actions`, `prevention_tips`, `source_name`, and `source_url`. Use `|` between multi-step list items.
- **Done when:** The CSV contains five unique cybersecurity topics, each has a category and core guidance fields, and each topic has an identified trusted source or is clearly marked as still needing source verification.

### T02 — Expand the Parsed Topic Model
- [x] **Requirements:** R6, R8, R15
- **Files:** `app.js`
- **Work:** Extend the Papa Parse mapping for the new CyberGuide fields. Split the three list fields on `|`, trim items, and remove blank list entries.
- **Done when:** Shared item objects expose all fields required by the collection and detail views and valid CSV data loads without parser errors.

### T03 — Verify Loading and Data Failure States
- [x] **Requirements:** R7, R19
- **Files:** `app.js`, collection/detail components as needed
- **Work:** Preserve the loading state and make CSV load/parse errors plain-language and recoverable.
- **Done when:** Valid data loads normally, delayed loading shows a message, and failed load/parse does not leave a blank page.

## Phase 2 — Saved Topic State

### T04 — Add Shared Pinned-ID State
- [x] **Requirements:** R16, R17
- **Files:** `app.js`
- **Work:** Add shared pin/unpin helpers and keep pinned topic IDs in one array/set available to collection and detail components.
- **Done when:** A topic can be pinned and unpinned from shared state without storing guidance text or personal data.

### T05 — Add localStorage Persistence and Fallback
- [x] **Requirements:** R16, R17
- **Files:** `app.js`
- **Work:** Load/save pinned IDs under a CyberGuide-specific storage key. Catch storage failures and keep the app usable with session-only state.
- **Done when:** Pins survive reload when storage works, unpin removes the ID, and blocked storage does not break navigation or guidance.

## Phase 3 — CyberGuide Identity and Core Views

### T06 — Update Navbar
- [x] **Requirements:** R2
- **Files:** `components/navbar-component.js`
- **Work:** Change the starter brand to CyberGuide and rename Items to Security Topics while keeping Home and About.
- **Done when:** All three required navigation labels are visible and open their correct routes.

### T07 — Rebuild Home Content Using Existing Landing Component
- [x] **Requirements:** R3, R4, R5
- **Files:** `components/landing-page-component.js`
- **Work:** Replace starter instructions with a short CyberGuide introduction, View Security Topics CTA, direct Phishing and Account Compromise blocks, and a Prevention browse-topics block.
- **Done when:** Each block looks actionable and opens the exact destination defined in the specification.

### T08 — Update About Scope Language
- [x] **Requirements:** R18
- **Files:** `components/about-page-component.js`
- **Work:** Explain that CyberGuide provides general educational guidance and does not scan, diagnose, or perform live incident response.
- **Done when:** The service limits are visible in plain language.

## Phase 4 — Security Topics Collection

### T09 — Adapt Collection Cards to CyberGuide
- [x] **Requirements:** R8, R9, R10
- **Files:** `components/collection-page-component.js`
- **Work:** Rename Collection to Security Topics, remove the starter Location display, preserve optional image behavior, show name/description/category, and rename View details to View guidance.
- **Done when:** One usable card appears per topic and each View guidance control opens the correct detail route.

### T10 — Add Search
- [x] **Requirements:** R11, R23, R24
- **Files:** `components/collection-page-component.js`
- **Work:** Add a search field that filters name, description, and category case-insensitively using computed JavaScript state.
- **Done when:** Known terms and capitalization variants return expected topics and continuous typing/editing keeps focus/caret behavior stable.

### T11 — Add Category Filtering
- [x] **Requirements:** R12
- **Files:** `components/collection-page-component.js`
- **Work:** Add an All category plus available categories and combine the category condition with active search text.
- **Done when:** Results satisfy both filters when both are active.

### T12 — Add Clear and No-Results Recovery
- [x] **Requirements:** R13, R14
- **Files:** `components/collection-page-component.js`
- **Work:** Add Clear to reset search and category. Show a useful no-results message with a clear recovery action.
- **Done when:** Clear restores all topics and an unmatched search never leaves an unexplained blank collection.

### T13 — Show Pinned State on Cards
- [x] **Requirements:** R16, R17
- **Files:** `components/collection-page-component.js`
- **Work:** Read shared pinned IDs and show a text-labeled saved/pinned state on matching cards.
- **Done when:** A pin made on the detail page is visible on its collection card and remains understandable without relying on an icon alone.

### T14 — Verify Search Text Is Text-Safe
- [x] **Requirements:** R24
- **Files:** `components/collection-page-component.js`
- **Work:** Confirm user search text is never rendered with `v-html`, `innerHTML`, or direct HTML assembly.
- **Done when:** Quotation marks, ampersands, and angle brackets remain text and do not create markup.

## Phase 5 — Topic Guidance Detail

### T15 — Build Guidance Sections
- [ ] **Requirements:** R15
- **Files:** `components/item-detail-page-component.js`
- **Work:** Render topic name, category, overview, warning signs, What to do now, prevention tips, and trusted source using the parsed model.
- **Done when:** A complete topic shows every required section and immediate actions are clearly separated from prevention tips.

### T16 — Add Pin / Unpin to Detail
- [ ] **Requirements:** R16, R17
- **Files:** `components/item-detail-page-component.js`
- **Work:** Add a text-labeled Pin / Pinned / Unpin control using shared state and explain that pinning only saves guidance for later.
- **Done when:** Pin state updates immediately, persists when supported, and never implies the threat was fixed.

### T17 — Add Safe Trusted-Source Link
- [ ] **Requirements:** R21
- **Files:** `components/item-detail-page-component.js`
- **Work:** Show the source name and URL and open it in a new tab using safe external-link attributes.
- **Done when:** The intended source opens in a new tab and CyberGuide remains open.

### T18 — Improve Missing Topic Recovery
- [ ] **Requirements:** R20
- **Files:** `components/item-detail-page-component.js`
- **Work:** Change generic Item not found wording to Topic not found and provide a link back to Security Topics.
- **Done when:** An invalid ID does not substitute another topic and the user has an obvious recovery action.

## Phase 6 — Visual Design, Accessibility, and Responsive Behavior

### T19 — Apply CyberGuide Visual Theme
- [ ] **Requirements:** R25
- **Files:** `style.css` and component classes as needed
- **Work:** Use a calm light background, dark navy/charcoal text, blue primary actions, and restrained amber/red warning accents.
- **Done when:** Main views look like one application rather than a partly customized starter.

### T20 — Verify Labels, Alt Text, Keyboard Use, and Focus
- [ ] **Requirements:** R9, R22
- **Files:** components and `style.css`
- **Work:** Check navigation, Home blocks, search, category, Clear, View guidance, Pin, and source controls using the keyboard. Add visible focus styling where needed and confirm optional images have useful alt text.
- **Done when:** Every main control can be reached/used by keyboard and the focused control is visually obvious.

### T21 — Verify Phone-Width Layout
- [ ] **Requirements:** R25
- **Files:** `style.css`, components as needed
- **Work:** Inspect Home, Security Topics, detail, and About at 375px width and correct clipping/overlap/horizontal-scroll problems.
- **Done when:** Core actions remain usable without horizontal page scrolling.

## Phase 7 — Acceptance Test Pass

### T22 — Run Navigation and Core-View Checks
- [ ] **Requirements:** R1-R5, R10, R18, R20
- **Work:** Run the corresponding acceptance checks from `specification.md`.
- **Done when:** Every listed check passes or the related implementation task is reopened.

### T23 — Run Data, Collection, and Recovery Checks
- [ ] **Requirements:** R6-R9, R14, R19
- **Work:** Test valid data, five cards, missing images, loading, failed CSV, parse failure, and no-results recovery.
- **Done when:** Each acceptance condition passes.

### T24 — Run Search / Filter / Safety Checks
- [ ] **Requirements:** R11-R13, R23-R24
- **Work:** Test name/description/category terms, capitalization, combined filters, Clear, continuous editing, and special characters.
- **Done when:** All search/filter/safety acceptance conditions pass.

### T25 — Run Guidance / Pin / Source Checks
- [ ] **Requirements:** R15-R17, R21
- **Work:** Verify all guidance sections, pin-reload-unpin behavior, saved-data contents, pinned labels, explanation, and source links.
- **Done when:** All related acceptance conditions pass.

### T26 — Run Accessibility and Viewport Checks
- [ ] **Requirements:** R22, R25
- **Work:** Complete keyboard-only and 375px viewport checks.
- **Done when:** Controls remain operable, focus is visible, and core pages do not clip or require horizontal scrolling.

### T27 — Final Starter-Content and Scope Sweep
- [ ] **Requirements:** all
- **Files:** entire front end
- **Work:** Search for leftover generic terms such as Web App Starter, Collection, Items, Location, or local-business sample content. Confirm no backend, login, scanning, remediation, or AI-advice feature was added.
- **Done when:** Visible content consistently describes CyberGuide and the completed front end remains inside the approved scope.
