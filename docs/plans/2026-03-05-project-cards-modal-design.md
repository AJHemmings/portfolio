# Project Cards & Modal Redesign

**Date:** 2026-03-05
**Status:** Approved

## Problem

- Project card thumbnails use `h-40 object-cover` — this crops portrait phone screenshots and looks wrong for logos/slides
- Modal only shows 2 images, uses the same fixed crop, and has no visual hierarchy
- Modal layout is plain: two stacked image boxes then a two-column info grid with bare anchor links

## Goals

1. Card thumbnails handle both landscape (web app) and portrait (phone app) images without cropping
2. Modal uses a split panel layout with a proper image gallery on the left and scrollable info on the right
3. All available images (up to 4) are accessible in the modal gallery
4. Repo and deployed links become styled buttons

## Design

### Project Card Thumbnail

- Container: fixed height (`h-52`), `relative overflow-hidden`
- Layer 1 (background): blurred, scaled-up version of the same image using CSS `backgroundImage`, `backgroundSize: cover`, `filter: blur + brightness`
- Layer 2 (foreground): `<Image>` with `object-contain` centered on top
- Result: no cropping, any orientation fills the space naturally

### Project Modal

**Layout:**
- Desktop: two-column split, ~50/50
- Mobile: single column, gallery stacked above info

**Left panel — Image gallery:**
- Featured image: tall fixed-height container (`aspect-[4/3]` or similar), `object-contain`, dark/neutral background
- Thumbnail strip: row of up to 4 small clickable thumbnails (`imageOne` through `imageFour`, shown only if defined)
- Active thumbnail: highlighted border
- Clicking featured image opens the existing fullscreen lightbox

**Right panel — Project info (scrollable):**
- Project title + description at top
- Current State
- Features in Development (bulleted list)
- Planned Features (bulleted list)
- Known Bugs
- Version History (link or WIP badge)
- Repo + Deployed links as styled button pair at bottom

**Lightbox:**
- Already uses `object-contain` — no changes needed, already handles portrait and landscape correctly

### Responsive

- `md:grid-cols-2` for split panel — stacks on mobile
- Left panel scrolls independently if needed on small screens; right panel scrolls within the modal

## Files to Change

- `src/components/Projects.tsx` — all changes contained here
  - `ProjectCard` component: thumbnail area
  - `ProjectModal` component: full layout replacement
  - `modalImages` logic: include all 4 images
