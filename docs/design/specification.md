# CyberGuide — Specification

**Spec owner:** DeLorean Wiggins  
**Course:** INFO-C 450 System Design, Fall 2026  
**Revision date:** September 13, 2026  
**Basis:** CyberGuide business case, research summary, prototype, and feedback from Shamon, Brittany, and Bryant.

CyberGuide is a simple cybersecurity guidance web application for students, employees, and small organizations that need quick, plain-language help with common security threats. Users browse or search security topics, open a response guide, and pin useful topics for later.

This revision follows the supplied course specification template. Requirements and acceptance criteria describe intended application behavior; they are not a claim that every production feature has already been implemented or tested.

---

## 0. Constitution (fill once per project, reuse across specs)

| # | Principle | Why it exists |
|---|-----------|---------------|
| 1 | Provide educational guidance, not a claim of live detection, diagnosis, or automatic threat removal. | Users must not mistake a course guidance app for a security-response service. |
| 2 | Do not collect or store personal incident reports, credentials, confidential messages, or financial or health information. | The app does not need sensitive incident data to show general guidance. |
| 3 | Make recommended actions understandable and connect guidance to an identified trusted source. | Users need clear next steps without treating unsupported content as authoritative. |
| 4 | Preserve honest evaluation records and distinguish proposed features from tested behavior. | Requirements must be traceable to real findings rather than invented results. |

---

## 1. Problem & Intent

**Who is this for?**

Students, employees, and small-organization users who have a common cybersecurity question and need plain-language guidance rather than specialist tools.

**What problem do they have today?**

Useful guidance is spread across websites and help sections. Users can have trouble locating the right issue or knowing which action to take first. Brittany identified difficulty finding the right issue. Bryant wanted a clearer step-by-step explanation and prevention guidance. Shamon described using organizational helpdesk or training procedures.

**Why now / why us?**

CyberGuide builds on the existing course business case and starter project. It concentrates a small set of common topics into a consistent, searchable interface rather than trying to replace an organization's IT team or established security services.

**What does success look like?**

For the core prototype evaluation, at least two independent users can find Phishing guidance and identify a recommended next action without coaching. In the application, Home must offer a one-action path to Security Topics; search must allow continuous typing; pinning must preserve a topic in the same browser.

Three people returned evaluation feedback. Brittany and Bryant explicitly reported finding Phishing guidance without help. Shamon reported intuitive navigation and identified the misleading non-clickable Home blocks. These are small-sample findings, not a population-wide success rate. No timed performance result is claimed.

---

## 2. Scope

**In scope — what this version must do**

- Home, Security Topics, Topic Detail, and About views.
- An initial topic set of Phishing, Weak Passwords, Malware, Unsafe Links, and Account Compromise.
- Clearly labeled topic navigation, search, category filtering, and clear/reset behavior.
- Detail guidance organized into overview, warning signs, immediate actions, prevention tips, and trusted sources.
- Pin/unpin behavior stored locally in the same browser.
- Loading, no-results, data-error, and missing-topic messages.
- Keyboard-usable controls and readable desktop/mobile layouts.
- Topic data loaded from `items-template.csv` in the course application.

**Out of scope — what it explicitly will NOT do**

- User accounts, login, cloud synchronization, or a server-side database.
- Real-time malware, email, or URL scanning.
- Automated incident response, automatic password changes, or one-click remediation.
- Live chat or AI-generated personalized security advice.
- Collection or reporting of confidential incidents to outside organizations.
- Organization-specific policies or replacement of an employer's helpdesk.

**Key data**

Each topic uses the following fields. The list fields use pipe-separated values, as documented in plan.md (ADR-03).

| Field | Meaning |
|-------|---------|
| `id` | Unique topic identifier used in the detail route. |
| `name` | Topic name, such as Phishing. |
| `description` | Short collection-card summary and overview. |
| `category` | Topic grouping, such as Accounts or Email & Messaging. |
| `image_url` | Optional topic image. |
| `warning_signs` | Concise warning signs. |
| `recommended_actions` | Ordered immediate response steps. |
| `prevention_tips` | Prevention guidance. |
| `source_name` | Name of the identified trusted source. |
| `source_url` | Link to the source supporting the guidance. |

**Prototype versus application**

The rapid prototype demonstrates interaction flows and may use in-file sample data and simple hash navigation. The application requirements below retain the course starter's route and CSV architecture. A prototype demonstration does not establish that the full application has met every acceptance criterion.

---

## 3. User Scenarios

**Scenario 1: Find help for a suspicious email**
- Actor: A student or employee with an unexpected message.
- Trigger: The user is uncertain whether the message is phishing.
- Steps: Open Home; choose Phishing directly or open Security Topics and choose its Phishing guide; read warning signs and What to do now.
- Success outcome: The user reaches the correct guide and identifies a recommended next action without coaching.
- Failure outcome: A prominent Home block does nothing, the topic is difficult to locate, or the immediate actions are unclear.

**Scenario 2: Locate another security issue**
- Actor: A user with a password, account, link, or device-security question.
- Trigger: The user needs relevant guidance without searching several websites.
- Steps: Open Security Topics; enter a search phrase and optionally select a category; open a matching topic; clear the filters when needed.
- Success outcome: Relevant topics are easy to locate, and the user can type continuously without losing focus.
- Failure outcome: Search interrupts typing, results do not match the issue, or an empty result gives no recovery option.

**Scenario 3: Save guidance for later**
- Actor: A user who expects to return to a topic such as Account Compromise.
- Trigger: The user wants to keep useful guidance available.
- Steps: Open the topic; select Pin; return in the same browser; identify the pinned topic; unpin it when no longer needed.
- Success outcome: The saved state is visible and persists on reload in the same browser.
- Failure outcome: The saved state disappears unexpectedly or the user believes Pin automatically fixes the threat.

**Scenario 4: Recover from unavailable guidance**
- Actor: Any user.
- Trigger: Topic data does not load or the user opens an invalid topic address.
- Steps: Read the error message; use the offered navigation to return to Home or Security Topics.
- Success outcome: The user understands the problem and can return to a working view.
- Failure outcome: The page is blank or silently shows the wrong topic.

---

## 4. Requirements (EARS notation)

The patterns follow the supplied template: ubiquitous, event-driven, state-driven, unwanted behavior, and optional. IDs allow each requirement to be connected to an acceptance check and later implementation work.

| ID | Requirement | Pattern |
|----|-------------|---------|
| R1 | The system shall provide Home (`#/`), Security Topics (`#/items`), Topic Detail (`#/items/:id`), and About (`#/about`) views. | Ubiquitous |
| R2 | The system shall display navigation links labeled Home, Security Topics, and About. | Ubiquitous |
| R3 | When a user selects View Security Topics on Home, the system shall open the topic collection. | Event |
| R4 | When a user selects the Home Phishing or Account Compromise block, the system shall open the corresponding topic detail. | Event |
| R5 | When a user selects the Home Prevention block, the system shall open Security Topics, with wording that identifies the block as a browse-topics action. | Event |
| R6 | When the application starts, the system shall load topic records from `items-template.csv`. | Event |
| R7 | While topic data is loading, the system shall show a plain-language loading message. | State |
| R8 | When valid topic data is available, the system shall show one collection card per record with its name, description, category, and a View guidance control. | Event |
| R9 | Where a topic image is supplied, the system shall show it with an appropriate text alternative; where no image is supplied, the topic card shall remain usable. | Optional |
| R10 | When a user selects View guidance on a topic card, the system shall open the detail view for that record. | Event |
| R11 | When a user enters search text, the system shall filter topics by name, description, or category without regard to letter case. | Event |
| R12 | When a user selects a category, the system shall show only records in that category that also match any active search text. | Event |
| R13 | When a user selects Clear, the system shall clear the search text and restore the All category. | Event |
| R14 | If no topic matches the active search and category, then the system shall show a no-results message and a way to clear the filters. | Unwanted |
| R15 | When a topic detail view opens, the system shall display its name, category, overview, warning signs, What to do now actions, prevention tips, and trusted-source link. | Event |
| R16 | When a user pins or unpins a topic, the system shall update its visible saved state and store only the pinned topic IDs in browser localStorage. | Event |
| R17 | While a topic is pinned, the system shall show a text-labeled pinned state on its collection card and detail view and explain that pinning saves guidance for later rather than fixing a threat. | State |
| R18 | The system shall explain on About that CyberGuide provides general educational guidance, not scanning, diagnosis, or live incident-response services. | Ubiquitous |
| R19 | If the CSV cannot be loaded or parsed, then the system shall show a clear error message and navigation to a working view. | Unwanted |
| R20 | If a requested topic ID does not exist, then the system shall show Topic not found and a link back to Security Topics. | Unwanted |
| R21 | When a user follows a trusted-source link, the system shall open that source in a new browser tab. | Event |
| R22 | The system shall provide clear text labels, keyboard-operable controls, and a visible keyboard-focus indicator. | Ubiquitous |
| R23 | When a user types or edits a search phrase, the system shall keep the search field focused and preserve the intended text-editing position. | Event |
| R24 | When user-entered search text is displayed, the system shall treat it as text rather than executable HTML. | Event |
| R25 | The system shall remain readable and operable on desktop and phone-sized viewports. | Ubiquitous |

---

## 5. Acceptance Criteria

These are planned pass/fail checks for the specified application. They are not a completed test log.

| Requirement | Test | Pass condition |
|-------------|------|----------------|
| R1 | Open each route using an existing topic ID for the detail route. | Each route displays its named view, not a blank page. |
| R2 | Activate each navigation link. | Each link opens its named view and remains usable from the other main views. |
| R3 | Start on Home and select View Security Topics once. | The Security Topics collection opens in one action. |
| R4 | Select each of the two Home topic blocks separately. | Phishing opens Phishing guidance; Account Compromise opens Account Compromise guidance. |
| R5 | Read the Prevention block and activate it. | The block indicates that it browses topics and opens the collection; it is not decorative. |
| R6 | Load the application with a valid topic CSV. | The collection uses the records from the CSV. |
| R7 | Delay the topic-data response during a developer test. | A loading message is visible until loading succeeds or an error appears. |
| R8 | Load a test CSV with five distinct topic records. | Five corresponding cards appear, with the required labels and no duplicated record. |
| R9 | Compare a topic record with an image to one without an image. | Both cards are usable; the supplied image has an appropriate text alternative. |
| R10 | Open Phishing from its collection card. | The detail view displays Phishing, not another topic. |
| R11 | Search for a known topic name, a description term, and a category term; repeat a query with different capitalization. | Displayed records match the searched fields, and capitalization does not change the results. |
| R12 | Select Accounts, then enter a term that matches one Accounts record. | Only records satisfying both the category and search conditions appear. |
| R13 | Apply a search and category filter, then select Clear. | The search is empty and all available topic records are displayed. |
| R14 | Search for a term not present in the dataset. | A clear no-results message appears and Clear restores the collection. |
| R15 | Open a complete topic record and inspect its detail sections. | All listed sections appear; immediate actions precede prevention tips and the sections are clearly distinguished. |
| R16 | Pin a topic, inspect the saved browser value, reload, and then unpin it. | The pin survives reload in the same browser; unpinning removes it; saved app data contains topic IDs rather than incident details. |
| R17 | Pin a topic, compare both views, and read the pin explanation. | Both views identify the saved state; the interface does not promise automated protection or remediation. |
| R18 | Read the About view. | The educational purpose and service limits are stated in plain language. |
| R19 | Test an unavailable CSV and a parsing failure. | The user sees an understandable error and a working navigation option instead of a blank collection. |
| R20 | Open a detail route with a nonexistent topic ID. | Topic not found appears; the system does not silently substitute Phishing or another topic. |
| R21 | Activate a topic's trusted-source link. | The intended source opens in a new tab and the CyberGuide page remains available. |
| R22 | Use the main navigation, Home blocks, search, filters, guidance controls, and pin controls with the keyboard. | Each control can be reached and operated, its purpose is labeled, and the focused control is visible. |
| R23 | Type phishing continuously, then place the caret in the middle and edit the word. | Typing does not require repeated clicks, and editing does not unexpectedly jump to another position. |
| R24 | Enter quotation marks, ampersands, and angle brackets in the search field. | The query remains text, the interface remains intact, and the query does not create executable markup. |
| R25 | Inspect the main views at a desktop width and a 375-pixel phone-width test viewport. | Text and controls are not clipped or overlapped, and core actions can be used without horizontal page scrolling. |

---

## 6. Constraints & Non-Functional Requirements

- **Performance:** The small topic set should be quick to scan and search must not interrupt typing. A numeric page-load benchmark has not been established or measured; resolve it before claiming a measured performance result.
- **Security/Privacy:** Store only pinned topic IDs locally. Treat search text as data, not HTML. Do not request confidential incident details, passwords, or message uploads.
- **Accessibility:** Use meaningful headings, clear text labels, keyboard-operable controls, visible focus, readable contrast, and layouts that remain usable at phone widths. A formal accessibility-conformance audit has not been completed.
- **Compliance/Legal:** Clearly describe the educational scope; identify content sources; do not claim diagnosis, legal advice, live threat protection, or guaranteed remediation. No formal compliance certification is claimed.
- **Budget/Timeline:** Keep the first version within the existing course starter and static-hosting approach, without a paid backend or external service dependency. The Specification, Research, and Prototype assignment is due September 14, 2026.
- **Architecture:** Keep the starter's Vue, Vue Router, Papa Parse, Bootstrap, CSV data, and GitHub Pages approach for the course application.
- **Style and theme:** Follow [Design System v1.0](design-system.md). Calm, professional, trustworthy, and easy to scan. Use a light background, dark navy or charcoal text, blue primary actions, and restrained amber/red warnings. Use short headings, simple cards, and minimal decoration. Immediate actions should be visually separated from warning signs and prevention information.

---

## 7. Open Questions

An open question is not approval to guess silently or add a feature beyond scope.

| Question | Owner | Status |
|----------|-------|--------|
| How will multi-step lists be serialized and parsed in the CSV? | DeLorean Wiggins | Resolved — pipe-separated values, trimmed and converted to arrays; see plan.md ADR-03. |
| Which exact source article supports each initial topic, and when will those source links be checked? | DeLorean Wiggins | Resolved for initial content — FTC articles mapped in items-template.csv and checked September 24, 2026. |
| What numeric page-load target and test device/network should be used? | DeLorean Wiggins | Open — no benchmark or measured result is claimed. |
| What should users see if browser storage is blocked or unavailable? | DeLorean Wiggins | Resolved — keep pins in page memory and show a short message when browser storage cannot be used; see plan.md and T05. |
| Should prominent Home blocks act as navigation? | DeLorean Wiggins | Resolved in this revision — Phishing and Account Compromise open their guides; Prevention opens the collection. |
| Should Pin fix threats or perform automatic security actions? | DeLorean Wiggins | Resolved — Pin saves guidance only; automated remediation remains out of scope. |
| Have the owner and reviewer formally approved this revision? | DeLorean Wiggins / course reviewer | Open — approval is recorded separately in Section 9, not inferred from tester feedback. |

---

## 8. Plan (derived from this spec — separate document once approved)

Once the specification is reviewed, prepare the following separate planning documents before full application implementation:

- **`plan.md`** — describe the approach and decisions, traced to the requirement IDs above.
- **`tasks.md`** — break that plan into ordered, checkable implementation and test tasks.

Planning groups:
1. Navigation and core views: R1–R5, R10, R18, R20.
2. Data loading, collection display, and recovery states: R6–R9, R14, R19.
3. Search, filtering, reset, and safe input handling: R11–R13, R23–R24.
4. Guidance content, sources, and saved topics: R15–R17, R21.
5. Keyboard and viewport checks: R22, R25.

The rapid prototype is an evaluation artifact. These planning documents and a complete application test log are not claimed to be finished here.

### Research and prototype revision record

| Evidence | Finding | Specification response |
|----------|---------|------------------------|
| Competitive-analysis summary in the report | Guidance benefits from clear topic groupings, concise actions, and links to established sources. | Retain the searchable collection, consistent detail sections, and identified sources (R8, R11–R15, R21). |
| Shamon's completed tester sheet | Navigation was intuitive, but the Home Phishing block looked clickable; he recommended clickable Phishing, Account Compromise, and Prevention blocks. | Make those blocks functioning navigation with clear destinations (R4–R5). |
| Brittany's completed tester sheet | Locating the correct issue is a general frustration; she found Phishing without help, understood What to do now, and found Pin useful. | Preserve explicit topic labels, the guidance flow, and saved-topic clarity (R8, R10–R17). |
| Bryant's completed tester sheet | He found Phishing without help, wanted step-by-step explanations, and saw limited benefit in Pin compared with automated remediation. | Keep actions explicit and explain that Pin saves guidance only (R15–R17); do not add automated remediation. |
| Bryant's follow-up technical email | He reported search focus loss and direct interpolation of search text into HTML, and raised a code-fence delivery concern. | Require uninterrupted search editing and text-safe input handling (R23–R24); deliver the executable prototype as an HTML file, not a fenced code listing. |

The original tester sheets and Bryant's follow-up are retained in the supporting feedback package. Feedback is summarized, not replaced with invented responses.

---

## 9. Approval

Preparation of this revision does not constitute an instructor's approval or a tester's formal sign-off.

| Role | Name | Date | Signed off? |
|------|------|------|-------------|
| Spec owner | DeLorean Wiggins | Not recorded | Pending owner review. |
| Reviewer | Course reviewer — not yet recorded | Not recorded | Pending; no reviewer approval is claimed. |

---

### Source basis

- Supplied course specification template, including its Constitution, EARS requirements, acceptance criteria, open questions, plan, and approval sections.
- CyberGuide business case and the Specification, Research, and Prototype report.
- Original completed tester sheets from Shamon, Brittany, and Bryant, plus Bryant's technical follow-up email.
- Existing completed CyberGuide specification and revised prototype, carried forward into the supplied template's organization.

Source links for the research summary are listed in the assignment report. The template's methodological links are references supplied with the template; this revision does not claim a new review of those external materials.
<img width="696" height="450" alt="Screenshot 2026-09-13 at 2 24 22 PM" src="https://github.com/user-attachments/assets/b58a46b4-3233-4cc2-a84e-449220dca631" />
