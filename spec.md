# All Subjects Quiz

## Current State
A full quiz app with 7 subjects, 5 quizzes per subject, and MCQs with green/red answer feedback. The frontend has HomePage, SubjectPage, QuizPage, ResultPage, Header, Footer components. The site already has basic responsive classes but has several mobile UX issues and potential performance bottlenecks.

## Requested Changes (Diff)

### Add
- `touch-manipulation` on all interactive buttons for faster mobile tap response
- `will-change` hints on animated elements to improve GPU acceleration
- Viewport meta `user-scalable=no` for better mobile control
- `preconnect` and font `preload` link tags in index.html
- Lazy loading (`React.lazy` + Suspense) for QuizPage and ResultPage to reduce initial bundle
- `loading="lazy"` on any images
- Touch-friendly minimum tap target sizes (44x44px) on all buttons

### Modify
- **Header**: Fix mobile hamburger menu overlap issues; ensure logo text doesn't truncate on small screens; make nav items full-width touch targets on mobile
- **HomePage Hero**: On mobile (< sm), hide the right decorative icon orbit section entirely (it causes overflow and scroll); reduce hero padding on mobile to py-10
- **SubjectPage**: Subject card grid on mobile should be single column with proper padding; hero section padding reduced on mobile
- **QuizPage**: 
  - Quiz header sticky bar: make it less tall on mobile, reduce padding
  - Option buttons: increase min tap height to py-3.5 for better touch; text should wrap properly
  - Question navigator: increase button size to w-8 h-8 for better tappability
  - Navigation buttons (Prev/Next/Submit): full width on mobile using flex-col
  - Progress bar area: compact on mobile
- **ResultPage**: Stats grid - on mobile, 3 columns might be cramped; use 3 cols but reduce padding. Action buttons already have flex-col on mobile.
- **Footer**: On mobile, reduce padding; grid already goes to col-1
- **index.css**: Add `-webkit-tap-highlight-color: transparent` on buttons to remove tap flash; add `touch-action: manipulation` globally on interactive elements; add `text-size-adjust: 100%` to html
- **index.html**: Add font preload for PlusJakartaSans.woff2; add `theme-color` and apple mobile web app meta tags already present - keep them
- **vite.config.js**: Ensure build output has good chunking with `manualChunks` for vendor split

### Remove
- Animated floating icons orbit in hero on mobile (hidden via `hidden sm:block` wrapper)
- Unused font files referenced in CSS that are not loaded (already handled by font-face)

## Implementation Plan
1. Update `index.html` to add font preload
2. Update `index.css` to add mobile tap/touch fixes globally
3. Update `vite.config.js` to add manual chunks for better code splitting
4. Update `App.tsx` to add React.lazy for QuizPage, ResultPage, SubjectPage
5. Update `HomePage.tsx` to hide hero orbit on mobile, reduce padding, fix mobile layout
6. Update `QuizPage.tsx` to fix mobile tap targets, navigation, sticky header
7. Update `SubjectPage.tsx` for mobile padding fixes
8. Update `ResultPage.tsx` for mobile improvements
9. Update `Header.tsx` for mobile nav improvements
10. Validate and fix any TypeScript/lint errors
