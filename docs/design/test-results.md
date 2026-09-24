# CyberGuide — Test Results and Final Review

**Date:** September 24, 2026  
**Method:** Codex used the actual Vue, Vue Router, and Papa Parse application in a local jsdom environment. That checks rendered content and interactions without providing a visual browser. No tester feedback or student reflection was invented.

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

## Browser review still required

The cloud browser blocked local app previews. GitHub also rejected writes, so the new build could not be published there for browser testing. T20, T21, T24, T25, and T26 remain unchecked. A full visual/accessibility pass is **not** claimed.

Open the app using the README instructions and record the actual result for each check:

- [ ] On Home, activate View Security Topics, Phishing, Account Compromise, and Prevention. Confirm their exact destinations.
- [ ] Browse all five cards and guides. Confirm immediate actions appear before prevention and every guide has its intended source.
- [ ] Type `phishing` continuously. Move the caret into the middle, insert and delete characters, and confirm it stays where expected (R23).
- [ ] Choose Accounts and search `weak`. Clear both filters. Search an unmatched word and use Clear filters (R11-R14).
- [ ] Enter quotation marks, `&`, and angle brackets. Confirm they remain plain text (R24).
- [ ] Pin a guide, return to its card, reload, and unpin it. Confirm the explanation does not promise a fix (R16-R17).
- [ ] Activate a trusted-source link. Confirm the correct FTC article opens in a new tab while CyberGuide stays open (R21).
- [ ] Use only Tab, Shift+Tab, Enter, Space, and arrow keys where appropriate. Check skip link, navigation, Home blocks, search, category, Clear, View guidance, Pin/Unpin, and source links. Focus should be visible and should not become trapped (R22).
- [ ] At desktop width and **375px** width, inspect Home, Security Topics, a full guide, and About. Confirm no clipped text, overlapping controls, or horizontal page scrolling (R25).
- [ ] Repeat one failed-data check in browser developer tools, then restore the CSV request. Confirm Return Home works (R19).

Mark the remaining tasks complete only after these checks pass. If a check fails, record the issue and refine the related task before committing it.

## Owner review notes

Add your own brief observations after using the app:

- What matched the original intention?
- What felt awkward or needed a correction?
- What do you understand better about the build now?
- What would you change in your instructions next time?

These prompts are not filled in on the owner's behalf.
