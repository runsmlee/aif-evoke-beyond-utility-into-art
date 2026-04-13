# Evoke MVP — Test Specification

## Acceptance Criteria

### AC-1: Email Signup API Integration
- CTA section email form must POST to `/api/subscribe` with `{ email, source }` body
- Footer newsletter form must POST to `/api/subscribe` with `{ email, source }` body
- On success, display confirmation message
- On failure, display error message
- Loading state shown during submission

### AC-2: No Dead Links
- Header logo must link to `/`
- All footer nav links must use `/path` format (not `#`)
- Social links must point to external URLs with `target="_blank"` and `rel="noopener noreferrer"`
- Legal links (Privacy, Terms, Cookies) must use `/path` format

### AC-3: Accessibility
- All forms have associated labels
- Error messages use `role="alert"`
- Success messages use `role="status"` and `aria-live="polite"`
- Interactive elements are keyboard accessible
- Skip-to-content link present
- Focus management in modals

### AC-4: Responsive Design
- Mobile-first layout (320px baseline)
- Touch targets minimum 44x44px
- Flexible grid layouts

### AC-5: Build & Tests
- `npm run build` completes with no errors
- `npm test` — all tests pass
- TypeScript strict mode enabled
