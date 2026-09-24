# CyberGuide — Test Results and Final Review

**Date:** September 24, 2026  
**Method:** Codex checked the actual Vue, Vue Router, and Papa Parse application in a local jsdom environment, then tested the published app in a browser. Local tests covered data and storage edge cases; browser interaction and screenshots covered the main user flows, keyboard focus, and layout. No tester feedback or student reflection was invented.

**Published app:** [CyberGuide](https://wigginsdga-cell.github.io/c450-web-app/)

## Results already checked

| Area | Result |
|---|---|
| Routes and navigation | Home, Security Topics, detail, and About rendered; Home actions and navigation activated the expected routes. |
| CSV/model | Five unique topics; list fields parsed; all guidance and source fields available. |
| Loading/recovery | Delayed loading, unavailable CSV, malformed CSV, missing headers, and empty data showed understandable states. |
| Cards/images | Five cards, correct guidance links, and a test record with alt text; records without images remained usable. |
| Search/filter | Name, summary, and category terms; capitalization; combined conditions; Clear and no-results recovery passed. |
| Search safety | Special characters stayed text; no markup was created. DOM editing retained the input node, focus, and selection. |
| Pins | Shared state, card/detail labels, restored IDs, Unpin, corrupt saved data, and blocked storage passed. |
| Guidance | All five topics displayed their own sections, ordered immediate actions, and source information. |
| Missing topic | Invalid ID showed Topic not found and a collection link. |
| Sources | FTC pages retrieved September 24; rendered HTTPS links matched those pages with safe new-tab attributes. |
| Contrast | Primary blue/white 5.84:1; secondary text/background 7.76:1; body text/background 14.63:1; warning/white 7.99:1; border/white 4.69:1. |
| Scope/content | Starter wording removed from visible content; existing stack and front-end scope retained. |

A source review found and corrected a skip-link issue: a normal fragment link could change the hash route. Its handler now focuses main content without navigating; the local interaction check passed.

## Published browser review — passed

The build was published through the signed-in GitHub browser session after the connected integration rejected writes. GitHub Pages reported a successful deployment. The following checks completed on September 24, 2026, closing T20, T21, T24, T25, and T26:

- [x] Home actions opened the specified destinations: View Security Topics and Prevention opened the collection; Phishing and Account Compromise opened their own guides. Navigation and About worked.
- [x] All five cards and guides displayed their intended content and source, with ordered immediate actions before prevention.
- [x] Continuous typing of `phishing` kept focus and the caret. Moving into the word, inserting a character, and deleting it retained the expected caret position (R23).
- [x] Accounts plus `weak` returned Weak Passwords. Clear reset both filters, restored five cards, and focused search. Capitalization and no-results recovery worked (R11-R14).
- [x] Quotation marks, `&`, and angle brackets remained input text without creating markup (R24).
- [x] Pinning Phishing showed Pinned on its card, survived reload, and could be removed. The explanation correctly described saving guidance for later (R16-R17).
- [x] The Phishing source opened the expected FTC URL in a new tab while CyberGuide stayed on the guide. All five rendered source URLs matched their intended articles (R21).
- [x] Tab, Shift+Tab, Enter, Space, and arrow keys operated the relevant controls. Skip link, navigation, Home actions, search, category, Clear, View guidance, Pin/Unpin, and source links were reachable. Focused controls showed a 3px outline. The skip link focused main content without changing the hash route (R22).
- [x] Home, Security Topics, a full Weak Passwords guide, and About were inspected at desktop and **375 CSS-pixel viewport width**. Controls remained usable, text and long source URLs wrapped, and no horizontal page overflow was measured (R25).
- [x] An invalid topic showed Topic not found and recovered to the collection. A separate missing-CSV browser fixture showed the load error; Return Home recovered to Home (R19-R20).

The [browser check page](browser-checks.html) embeds the actual app in a 375px-wide frame. Home, collection, and detail measured 360px of content and 360px of scroll width inside the 375px viewport because of the vertical scrollbar; About measured 375px for both. The second frame loads the actual app code from a folder without the CSV, testing a real unavailable-data response without changing the production data.

Review found one small wording correction: a single search result now reads **1 topic**. The test fixtures are separate from the main app navigation.

These results cover the specified acceptance checks in the available browser. They are not a physical-phone test, a screen-reader audit, or a claim of full WCAG conformance. The owner still needs to review the result against their intention and record their own experience.

## Owner review notes

Add your own brief observations after using the app:

- What matched the original intention?
- What felt awkward or needed a correction?
- What do you understand better about the build now?
- What would you change in your instructions next time?

These prompts are not filled in on the owner's behalf.
