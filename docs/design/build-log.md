# CyberGuide — Build Notes

Date: September 24, 2026. Built with Codex from the existing specification, plan, and task list. These are implementation observations and checks performed by Codex, not invented student reflections or tester feedback. The owner should review the app and add their own experience before submission.

Each task follows the existing no-build Vue/Bootstrap structure and Design System v1.0. Tasks are completed in order; the preceding completed tasks form the dependency check. Separate local commits preserve each step. GitHub publication is pending because the connected integration rejected writes.

## T01 — replace starter data with five sourced topics

Preflight: R6/R8/R15/R21; ADR-02/03; no earlier task dependency. Changes: five records with separate warnings, immediate actions, prevention, and source fields. Check: CSV parsing found five unique IDs and no missing required guidance fields. FTC pages were opened and checked on September 24; the Malware article redirected to its current URL, which is used here. Images are optional and left blank. To check manually: open each guide and compare its fields with the CSV. Lesson: source selection belongs with the data task, before the interface build.

## T02 — parse the CyberGuide guidance fields

Preflight: R6/R8/R15; ADR-02/03; T01 complete. Changes: the existing parser now exposes guidance arrays and source fields. Check: the real Vue/Papa Parse application mounted in a local DOM test and loaded all five records with nonempty lists and sources. Manually check each detail section after T15. Lesson: one small list helper keeps CSV editing simple. These DOM checks do not establish visual browser behavior.

## T03 — handle loading and topic data errors

Preflight: R7/R19; ADR-01/02; T02 complete. Changes: understandable loading/error text, a Return Home link, and CSV header/ID validation. Checks: delayed data showed Loading; valid data replaced it; unavailable, malformed, and missing-header data displayed an error with navigation in the local DOM tests. Manual check: temporarily delay or block the CSV request and follow Return Home. Lesson: a response can load successfully and still contain invalid data.

## T04 — add shared pin and unpin state

Preflight: R16/R17; ADR-04; T03 complete. Changes: one shared ID list and two small helpers identify and toggle saved topics. Check: pinning added the requested ID; unpinning removed it in the running application state. No guidance or personal data is copied. Manual check follows when the detail control is added in T16. Lesson: both views can read one state instead of keeping separate lists.

## T05 — persist pinned IDs with a storage fallback

Preflight: R16/R17; ADR-04; T04 complete. Changes: save IDs under cyberguidePinnedIds, read them at startup, and catch unavailable/corrupt storage. Checks: a fresh application restored the saved ID; Unpin saved an empty list; malformed values and blocked storage did not break guidance/navigation. Manual check: pin, reload the browser, unpin, and inspect the Application storage panel. Lesson: storage is optional, so its failure should not prevent reading guides.

## T06 — name and link CyberGuide navigation

Preflight: R2; ADR-01/06; T05 complete. Changes: the existing navbar now has the CyberGuide wordmark and the required Home, Security Topics, and About links. Check: all labels and target routes were present in the rendered DOM. Manual check: activate each link from every main view. Lesson: route addresses can stay the same while user-facing labels become clearer.

## T07 — build the Home topic shortcuts

Preflight: R3-R5; ADR-06; T01 IDs and T06 navigation complete. Changes: a short introduction, collection CTA, direct Phishing and Account Compromise cards, and a Prevention browse card. Check: rendered links use the exact required destinations. Manual check: click all four Home actions separately. Lesson: making the whole block a normal link addresses the earlier feedback about decorative-looking navigation.

## T08 — explain the educational scope on About

Preflight: R18; ADR-06; T07 complete. Changes: About explains the educational purpose, local pins, and service limits. Check: the rendered page states that the app does not scan, diagnose, or provide live incident response. Manual check: read About and confirm that it matches the project intent. Lesson: the limits should be easy to find and written in everyday language.

## T09 — adapt collection cards to security topics

Preflight: R8-R10; ADR-06; T08 complete. Changes: name, summary, category, and View guidance replace the business listing fields. Optional images keep alt text, and blank image fields leave a usable text card. Check: five cards and five guidance destinations rendered without Location text. Manual check: open Phishing from its card and compare a record with and without an image. Lesson: an optional image does not need a large empty placeholder.

## T10 — search topic names summaries and categories

Preflight: R11/R23/R24; ADR-05; T09 complete. Changes: a stable labeled search field and a computed list compare lowercase text in three fields. Checks: PHISHING returned Phishing, harmful returned Malware, and Accounts returned both account topics. Manual check: type phishing continuously, move the caret into the word, and edit it without clicking again. Browser typing/caret verification remains in T24. Lesson: update the list while leaving the input element in place.

## T11 — combine category filtering with search

Preflight: R12; ADR-05; T10 complete. Changes: a labeled category select uses categories from the CSV and applies both conditions together. Check: Accounts plus weak returned only Weak Passwords. Manual check: choose Accounts, search weak, then change the category and compare results. Lesson: deriving options from the data keeps the filter aligned with the guides.

## T12 — add Clear and no-results recovery

Preflight: R13/R14; ADR-05; T11 complete. Changes: Clear resets both filters and returns focus to search; an empty match shows an explanation and recovery button. Checks: combined filters reset to five cards and an unmatched query showed the message. Manual check: search an invented word and use Clear filters. Lesson: a useful empty state tells the user how to recover.

## T13 — show pinned labels on topic cards

Preflight: R16/R17; ADR-04; T04/T05 and T12 complete. Changes: saved cards display Pinned as text. Check: changing shared pin state updated the corresponding rendered card. Manual check: pin a guide on detail, return to Security Topics, and find its Pinned label. Lesson: text makes the saved state understandable without an icon.

## T14 — verify search input stays plain text

Preflight: R24; ADR-05; T10-T13 complete. No extra feature was needed. Check: a query containing quotation marks, an ampersand, and an image-like HTML string stayed in the input and created no image element. Source review found no v-html or innerHTML use. Manual check: enter those characters and confirm the page remains intact. Lesson: normal Vue text bindings avoid HTML assembly from user input.

## T15 — build the topic guidance sections

Preflight: R15; ADR-03/06; parsed lists and T14 complete. Changes: all five guidance sections render from the CSV, with numbered immediate actions before prevention. Check: Phishing displayed every required heading, overview, list, and source field in the local DOM test. Manual check: read each of the five guides and compare the section order with the specification. Lesson: the same component can display every topic when the data fields are consistent.

## T16 — connect detail pin controls to saved state

Preflight: R16/R17; ADR-04; T04/T05/T13/T15 complete. Changes: Pin topic and Unpin topic use shared state, Pinned appears as text, and a short explanation states what pinning means. Storage problems appear near the control. Check: clicking the rendered controls updated state both ways. Manual check: pin, return to collection, reload, and unpin. Lesson: a saved label should never suggest that a threat was repaired.

## T17 — open trusted sources safely in a new tab

Preflight: R21; ADR-02; T01 source checks and T15 complete. Changes: validated HTTPS links use target=_blank with noopener/noreferrer and tell users a new tab will open. Check: the rendered link matched the intended FTC URL and attributes. Manual check still needed: activate the link and confirm FTC opens while CyberGuide stays available (T25). Lesson: link behavior and source attribution should both be explicit.

## T18 — recover from an unknown topic address

Preflight: R20; ADR-06; T17 complete. Changes: an unknown ID shows Topic not found and a collection link. Check: /items/not-a-topic displayed the recovery message without substituting Phishing. Manual check: enter an invalid topic ID in the address bar and use Browse Security Topics. Lesson: a wrong address should have an obvious way back.

## T19 — apply the simple CyberGuide visual theme

Preflight: R25; ADR-01/06; T18 and Design System v1.0 complete. Changes: shared colors, type sizes, card borders, button rules, and a distinct immediate-action section. Checks: palette contrast calculations passed for normal text and control boundaries (blue/white 5.84:1; muted/background 7.76:1). All main views use the same stylesheet. Browser visual inspection remains pending in T21/T26. Manual check: compare Home, collection, detail, and About side by side. Lesson: a few shared rules are enough to keep the starter consistent.

## T20 — Labels, alt text, and keyboard focus (browser check pending)

Preflight: R9/R22; ADR-06; controls from T06-T18 are implemented. Added a skip link and visible focus outlines. Search/select labels match their field IDs; links/buttons have text; optional images have topic-specific alt text. Source review completed. The cloud browser rejects local app URLs, so keyboard-only operation has not been verified in a real browser. Keep T20 unchecked until the manual checklist is completed. Lesson: source review cannot replace interacting with the page.

## T21 — Phone layout (browser check pending)

Preflight: R25; ADR-01/06; T19 styling is implemented; T20 keyboard verification remains open. Bootstrap columns stack on phones, navigation can wrap, source URLs can break, and detail padding reduces at narrow widths. These rules were reviewed in source. A real 375px visual check has not been possible in this environment, so T21 remains unchecked. Manual check: open all four views at 375px and look for clipped text, overlapping controls, and horizontal scrolling. Lesson: responsive classes are a starting point, not evidence of a passed viewport test.

### T20 refinement — Skip link and hash routes

Review found that a normal `#main-content` jump could be mistaken for a Vue route. The link now prevents that navigation and focuses the main region through the root component. A local DOM check confirmed that activating it focuses main content while preserving the current route. Real keyboard traversal remains pending.

## T22 — verify navigation and core views in the local DOM

Preflight: R1-R5/R10/R18/R20; all required routes/views are implemented. Checks: activated every Home shortcut and navigation link in the running Vue DOM, confirmed each destination and its heading, inspected About limits, and tested an invalid ID. These automated functional checks passed; they are not a claim of a human browser review. Manual steps are retained in the final checklist. Lesson: test the link action as well as its written URL.

## T23 — verify data display and recovery states in the local DOM

Preflight: R6-R9/R14/R19; data/error/collection tasks complete. Checks: five CSV records produced five cards; a fixture with one optional image provided its alt text while other cards remained usable; empty data showed recovery text; delayed, unavailable, malformed, and missing-header CSV cases were handled. All local DOM checks passed. The optional image fixture was test-only and is not in the shipped CSV. Manual browser review remains in the final checklist. Lesson: test failure states separately from valid data.
