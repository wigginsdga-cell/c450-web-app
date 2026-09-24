# Design System — CyberGuide

**Version:** 1.0  
**Date:** September 24, 2026  
**Project owner:** DeLorean Wiggins

## 1. Brand Principles

CyberGuide should feel calm, clear, and useful when someone is unsure about an online security issue. The design should help people find a topic and understand their next step without making the situation feel more alarming. Keep the existing Bootstrap layout, simple cards, and short headings.

## 2. Color Palette

| Name | Hex | Use |
|------|-----|-----|
| Primary | #0B5ED7 | Main buttons, links, and focus outlines |
| Text | #212529 | Headings and body text |
| Secondary text | #495057 | Supporting text |
| Background | #F8F9FA | Page background and category labels |
| Surface | #FFFFFF | Cards, navigation, and form fields |
| Border | #6C757D | Field and card boundaries |
| Warning | #664D03 | Small warning accents; always include a text label |

Use white text on primary buttons. Avoid gradients, large warning banners, and extra accent colors. Error messages can use the warning treatment with a clear explanation and recovery link.

## 3. Typography

Use Bootstrap's system font stack: `system-ui, -apple-system, "Segoe UI", sans-serif`. No extra font download is needed.

| Role | Size | Weight |
|------|------|--------|
| Heading 1 | 2rem (32px) | 700 |
| Heading 2 | 1.375rem (22px) | 600 |
| Card heading | 1.25rem (20px) | 600 |
| Body and controls | 1rem (16px) | 400 |
| Supporting text | 0.875rem (14px) | 400 |

Use a 1.5 body line height. Keep guidance in short paragraphs and lists.

## 4. Logo Usage

- Use the text **CyberGuide** as the wordmark in `components/navbar-component.js`.
- There is no separate logo asset in this version. Keep the starter's simple blue favicon.
- Do not use FTC or other source logos as CyberGuide branding or imply their endorsement.
- Keep the name readable and link it to Home.

## 5. Spacing & Grid

- Use the existing Bootstrap 12-column grid and a maximum content width of 1140px.
- Main spacing: 8, 16, 24, 32, and 48px; use Bootstrap spacing classes where possible.
- Cards use 16px padding; detail content may use 24px.
- Topic cards use one column on phones, two on medium screens, and three on large screens.
- Let navigation and controls wrap on narrow screens. Long source URLs must wrap too.

## 6. Core Components

| Component | Rules |
|-----------|-------|
| Primary button | Blue fill, white text, 6px radius; use for the main Home action and Pin. |
| Secondary button | White background, blue border and text; use for Clear, Unpin, and View guidance. |
| Card | White surface, 1px border, 6px radius; title, category, short description, and one guidance link. |
| Form field | Visible label above the field; 16px text, clear border, and normal browser editing behavior. |
| Navigation | CyberGuide, Home, Security Topics, and About; keep labels visible and mark the current view. |
| Guidance sections | Overview, Warning signs, What to do now, Prevention tips, Trusted source. Use an ordered list for immediate actions. |
| Status message | Explain loading, no matches, or an error in plain language. Errors and empty results include a recovery action. |
| Pinned label | Show the word Pinned on saved cards and detail pages. Explain that it saves guidance for later. |

Aim for at least 44px-high main buttons and form controls. Hover and focus must not shift the layout.

## 7. Voice & Tone

Use short, direct sentences and familiar words. Explain an unfamiliar security term when needed. Avoid jokes, scare tactics, and promises that the app fixes a threat.

Examples: **View guidance**, **Pin topic**, **No topics match your search. Clear the filters to try again.**

## 8. Accessibility Standards

Target [WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/); this document is a design target, not a completed conformance audit.

- At least 4.5:1 contrast for normal text, 3:1 for large text, and 3:1 for meaningful control boundaries/focus indicators against adjacent colors.
- Use a visible 3px blue keyboard-focus outline with a 3px offset.
- Use native links, buttons, inputs, and selects with visible labels.
- Keep headings in order and provide a skip link to main content.
- Do not use color or icons alone to explain a state.
- Optional images need meaningful alternative text; missing images must not block guidance.
- Check all main views at desktop width and the specified 375px phone width.

## 9. Version & Change Log

| Version | Date | Change | Review status |
|---------|------|--------|---------------|
| 1.0 | 2026-09-24 | Initial design system for the Module 1 front-end build. | Prepared with Codex; owner review pending. |

**Referenced by:** [specification.md](specification.md), [plan.md](plan.md), and [tasks.md](tasks.md).
