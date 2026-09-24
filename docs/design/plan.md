# CyberGuide — Implementation Plan

**Owner:** DeLorean Wiggins  
**Course:** INFO-C 450 System Design, Fall 2026  
**Source:** `business-case.md`, `specification.md`, current starter application, and prototype/user feedback

## 1. Approach Summary

CyberGuide will be built by adapting the existing C450 web application rather than replacing it. The current Vue/Vue Router/Papa Parse starter already provides the basic route structure, shared CSV loading, collection cards, and detail routing. I plan to keep that structure and adapt the data model, content, interactions, and styling so the application stays aligned with the CyberGuide specification.

The work will move in a simple sequence:

1. Replace the starter data with CyberGuide topic data and extend the parsed model.
2. Add shared state needed for pinned topics and reliable loading/error handling.
3. Adapt Home, navigation, collection, detail, and About views.
4. Add search, category filtering, Clear, pin/unpin, trusted-source links, and recovery states.
5. Improve accessibility and responsive styling.
6. Run the specification acceptance checks and correct problems before considering the front-end complete.

This version stays intentionally front-end only. It will not add login, a backend, a cloud database, threat scanning, automated remediation, or AI-generated security advice.

## 2. Technology Stack

| Area | Choice | Reason |
|---|---|---|
| Frontend | No-build Vue 3 | Already used by the starter and sufficient for the project. |
| Routing | Vue Router with hash history | Existing routes already match the required Home, collection, detail, and About pattern. |
| Styling | Bootstrap 5, Bootstrap Icons, `style.css` | Reuses the template and supports responsive layouts without adding a build system. |
| Data | `items-template.csv` + Papa Parse | Required by the current application architecture and specification. |
| Saved state | Browser localStorage | Only pinned topic IDs need persistence. |
| Hosting | GitHub Pages | Already fits the static front-end architecture and course workflow. |
| External content | Trusted source links stored in CSV | Keeps security guidance tied to identified sources. |

## 3. Components and Responsibilities

| Component / File | Planned Responsibility | Requirements |
|---|---|---|
| `app.js` | Routes, CSV loading/parsing, shared item state, pin state, storage fallback. | R1, R6-R7, R16, R19 |
| `items-template.csv` | Five initial CyberGuide topics and all guidance/source fields. | R6, R8, R15, R21 |
| `navbar-component.js` | CyberGuide brand and Home / Security Topics / About navigation. | R2 |
| `landing-page-component.js` | CyberGuide introduction, main CTA, Phishing, Account Compromise, and Prevention navigation blocks. | R3-R5 |
| `collection-page-component.js` | Search, category filtering, Clear, topic cards, no-results state, pinned state. | R8-R14, R17, R23-R24 |
| `item-detail-page-component.js` | Full guidance sections, trusted source, pin/unpin, missing-topic recovery. | R10, R15-R17, R20-R21 |
| `about-page-component.js` | Educational purpose and service limitations. | R18 |
| `style.css` | CyberGuide visual theme, focus states, card/detail layout, responsive fixes. | R22, R25 |

## 4. Data and State Design

### Topic Record

Each topic will use these CSV fields:

`id, name, description, category, image_url, warning_signs, recommended_actions, prevention_tips, source_name, source_url`

The initial topic set is:

- Phishing
- Weak Passwords
- Malware
- Unsafe Links
- Account Compromise

### Multi-step List Format

`warning_signs`, `recommended_actions`, and `prevention_tips` will use a pipe character (`|`) between list items in the CSV. The parser in `app.js` will split the value on `|`, trim each entry, and remove empty entries.

This keeps the data editable in one CSV while producing arrays that the detail page can render as clear lists.

### Search and Filter State

Search text and selected category will live in the collection component. The filtered list will be computed from the original shared topic records. Filtering will compare lowercase strings for name, description, and category.

Search input will remain a normal controlled text value. User-entered text will not be inserted with `v-html` or `innerHTML`.

### Pinned Topics

Only topic IDs will be saved, under a CyberGuide-specific localStorage key such as `cyberguidePinnedIds`.

If browser storage is unavailable, the rest of the application will continue to work. The pin control can use the current session state and show a short message that saved topics cannot be persisted in that browser.

## 5. Architecture Decisions

### ADR-01 — Keep the Existing No-Build Vue Architecture

**Decision:** Continue with Vue 3, Vue Router, Bootstrap, Papa Parse, and GitHub Pages.  
**Reason:** The existing starter already supplies the routing and component structure needed by CyberGuide. A framework rewrite would add risk without helping the requirements.  
**Requirements supported:** R1-R2, R6, R25.

### ADR-02 — Keep CSV as the Source of Topic Content

**Decision:** Store CyberGuide topic content in `items-template.csv`.  
**Reason:** This matches the course starter and keeps the application static and easy to host.  
**Requirements supported:** R6, R8, R15, R21.

### ADR-03 — Use Pipe-Separated Values for Multi-Step Lists

**Decision:** Store list items inside CSV fields using `|` and parse them into arrays.  
**Reason:** This is simple to edit and avoids adding a second data format or backend.  
**Requirements supported:** R15.

### ADR-04 — Save Only Pinned IDs in localStorage

**Decision:** Persist only an array of topic IDs.  
**Reason:** Pinning is a convenience feature and does not require personal or incident data.  
**Requirements supported:** R16-R17 and the privacy constraint.

### ADR-05 — Treat Search Input as Plain Text

**Decision:** Use Vue text binding and JavaScript string comparisons only; do not render search input as HTML.  
**Reason:** This addresses the prototype feedback about direct interpolation of search text into HTML and protects R24.  
**Requirements supported:** R11-R13, R23-R24.

### ADR-06 — Reuse Existing Components Instead of Creating a New App Structure

**Decision:** Adapt the existing landing, collection, detail, navbar, and About components.  
**Reason:** The starter already matches the main information architecture.  
**Requirements supported:** R1-R5, R8-R10, R15, R18, R20.

## 6. Dependencies and Assumptions

- Visual work follows [Design System v1.0](design-system.md).

- Vue 3, Vue Router, Bootstrap, Bootstrap Icons, and Papa Parse continue to load from their current CDNs.
- GitHub Pages remains the deployment target.
- Topic guidance is educational and comes from identified trusted sources.
- The first version remains small enough for client-side CSV filtering.
- No user account or server-side persistence is needed.
- Source links for all five starting topics must be selected and checked before the content is treated as finished.
- The application must remain usable even if an optional topic image is missing.
- A numeric performance benchmark is still not established; the plan will not claim one.
- Formal instructor/reviewer approval is not assumed.

## 7. Implementation Sequence

### Phase 1 — Data Foundation

1. Replace starter local-business records with the five CyberGuide topics.
2. Add the CyberGuide fields and source fields.
3. Extend `app.js` parsing to create arrays for the three list fields.
4. Verify loading and parsing with the updated CSV.

**Requirements:** R6-R9, R15, R21.

### Phase 2 — Shared State and Persistence

1. Add pinned-ID state and localStorage load/save helpers.
2. Add a graceful storage-unavailable path.
3. Keep saved data limited to IDs.

**Requirements:** R16-R17.

### Phase 3 — Main Views and Navigation

1. Update navbar brand and labels.
2. Rewrite Home for CyberGuide and connect the three prominent blocks.
3. Update About with educational-scope language.
4. Update collection and detail labels from generic Item/Collection wording to CyberGuide wording.

**Requirements:** R1-R5, R10, R18, R20.

### Phase 4 — Collection Interaction

1. Add search input.
2. Add category filter derived from available topic categories.
3. Combine category and search filtering.
4. Add Clear.
5. Add no-results recovery.
6. Show pinned state on cards.
7. Confirm typing and editing do not lose focus.
8. Keep displayed search text text-safe.

**Requirements:** R8, R11-R14, R17, R23-R24.

### Phase 5 — Guidance Detail

1. Render overview, warning signs, What to do now, prevention tips, and trusted source.
2. Add pin/unpin.
3. Explain that pinning saves guidance only.
4. Open trusted sources in a new tab with safe link attributes.
5. Improve Topic not found recovery.

**Requirements:** R15-R17, R20-R21.

### Phase 6 — Accessibility and Responsive Design

1. Add visible focus styling where Bootstrap defaults are not enough.
2. Confirm meaningful labels and alt text.
3. Check keyboard operation for navigation, filters, guidance, and pin controls.
4. Check desktop and 375px phone-width layouts.

**Requirements:** R9, R22, R25.

### Phase 7 — Acceptance Testing

Run the R1-R25 checks from `specification.md`. Fix failures before marking related tasks complete. Pay special attention to:

- Home blocks actually navigating.
- uninterrupted search typing/editing.
- safe handling of angle brackets and other search characters.
- pin persistence across reload.
- invalid topic route recovery.
- CSV load and parse failure states.
- no horizontal scrolling at 375px.

## 8. Requirement Traceability

| Planning Group | Requirements | Main Work |
|---|---|---|
| Navigation and core views | R1-R5, R10, R18, R20 | Navbar, Home blocks, detail routing, About, missing topic |
| Data and collection | R6-R9, R14, R19 | CyberGuide CSV, parser, cards, loading/error/no-results states |
| Search and filtering | R11-R13, R23-R24 | Search, category, Clear, focus, text-safe handling |
| Guidance and saved topics | R15-R17, R21 | Guidance sections, pin state, source links |
| Accessibility / viewport | R22, R25 | Keyboard, focus, labels, responsive layout |

## 9. Validation Strategy

Validation will use the acceptance criteria already written in the specification rather than inventing a different test standard.

- Test each required route.
- Test the five-topic CSV data set.
- Test valid, empty, and failed data states.
- Test search by name, description, and category with different capitalization.
- Test combined category + search behavior.
- Test Clear.
- Test pin, reload, and unpin.
- Test a nonexistent topic ID.
- Test trusted-source links.
- Test keyboard-only operation.
- Test the specified special search characters.
- Test desktop and 375px viewport layouts.

Results will be recorded during the Execute and Test stage rather than claimed in advance.

## 10. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| CSV list fields become hard to maintain. | Use one documented pipe separator and a small parser helper. |
| Search re-rendering causes focus/caret problems. | Keep the input element stable and filter through computed state instead of rebuilding the control. |
| Search text is rendered unsafely. | Use text binding only and never pass the search value into HTML rendering. |
| Saved topics fail when localStorage is blocked. | Keep the app usable and fall back to session-only pin state with a clear message. |
| Generic starter wording remains visible. | Include a final text/content sweep in the task list. |
| Cybersecurity guidance appears authoritative beyond its purpose. | Keep educational-scope language on About and avoid diagnosis/remediation claims. |
| Mobile layout clips controls or content. | Include 375px checks before task completion. |

## 11. Deferred / Out of Scope

The following are not part of this plan:

- authentication or user accounts
- server-side database
- cloud synchronization
- malware/email/URL scanning
- automated password changes or remediation
- uploads of confidential incidents
- AI-generated personalized security advice
- organization-specific policy workflows

Those items can only be reconsidered in a future specification revision.
