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
