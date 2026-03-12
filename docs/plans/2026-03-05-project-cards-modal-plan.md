# Project Cards & Modal Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign project card thumbnails and the project modal so images of any orientation (portrait phone screenshots or landscape web screenshots) display correctly, and the modal uses a polished split-panel layout.

**Architecture:** All changes are isolated to `src/components/Projects.tsx`. The `ProjectCard` component gets a new two-layer thumbnail (blurred CSS background + contained foreground image). The `ProjectModal` component is rebuilt as a split panel: left = image gallery with featured image + clickable thumbnail strip (up to 4 images), right = scrollable project info with styled link buttons.

**Tech Stack:** Next.js 14, React, TypeScript, Tailwind CSS, `next/image`

---

### Task 1: Update ProjectCard thumbnail to blurred-background + contain

**Files:**
- Modify: `src/components/Projects.tsx` — `ProjectCard` component only (lines ~232–275)

**Context:**
The current card thumbnail is:
```tsx
<div className="w-full h-40 overflow-hidden">
  <Image src={...} className="w-full h-full object-cover ..." />
</div>
```
This crops images. We need two layers: a blurred version fills the background, the real image sits on top with `object-contain`.

**Step 1: Replace the thumbnail section in `ProjectCard`**

Replace the entire `{/* Project image */}` block with:

```tsx
{/* Project image */}
<div className="relative w-full h-52 overflow-hidden">
  {/* Blurred background layer */}
  <div
    className="absolute inset-0 scale-110"
    style={{
      backgroundImage: `url(${project.image || "/placeholder.svg"})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(12px) brightness(0.5)",
    }}
  />
  {/* Foreground image — contained, no cropping */}
  <Image
    src={project.image || "/placeholder.svg"}
    alt={project.title}
    fill
    className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
  />
</div>
```

**Note on `fill` vs `width/height`:** Switching to `fill` requires the parent to have `position: relative` (already added above). Remove the old `width={400} height={300}` props.

**Step 2: Verify manually**

Run the dev server:
```bash
npm run dev
```

Open `http://localhost:3000`, scroll to Projects section. Check:
- All 5 project cards show images without hard cropping
- Portrait images (phone app screenshots) display full-height with blurred sides
- Landscape images (web screenshots) display full-width with blurred top/bottom (or just fill)
- Cards are the same height (`h-52`) across the grid

**Step 3: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: update project card thumbnail to blurred-bg + object-contain"
```

---

### Task 2: Add gallery state to ProjectModal and wire up all 4 images

**Files:**
- Modify: `src/components/Projects.tsx` — `ProjectModal` component

**Context:**
Currently `modalImages` only includes `imageOne` and `imageTwo`. We need to:
1. Build the array from all 4 optional image fields
2. Add a `selectedImage` state (local to the modal, not to be confused with the lightbox state in the parent)
3. Default the featured image to `imageOne`

**Step 1: Update the `modalImages` array and add local state**

Inside `ProjectModal`, replace:
```tsx
const modalImages = [project.imageOne, project.imageTwo].map(
  (image) => image || project.image || "/placeholder.svg",
);
```

With:
```tsx
const allImages = [
  project.imageOne,
  project.imageTwo,
  project.imageThree,
  project.imageFour,
]
  .filter((img): img is string => Boolean(img))
  .map((img) => img || "/placeholder.svg");

const [featuredImage, setFeaturedImage] = useState(allImages[0] ?? project.image ?? "/placeholder.svg");
```

**Step 2: Verify the array is correct**

Add a temporary `console.log(allImages)` after the array definition. In the browser console, click any project and confirm the logged array only contains defined image paths (no `undefined` entries). Remove the log after confirming.

**Step 3: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: build modal image array from all 4 image fields"
```

---

### Task 3: Rebuild ProjectModal layout as split panel

**Files:**
- Modify: `src/components/Projects.tsx` — full `ProjectModal` return/JSX

**Context:**
The existing modal JSX is one scrollable column. Replace it entirely with a split panel:
- Left: featured image + thumbnail strip
- Right: scrollable project info

**Step 1: Replace the modal's inner JSX**

Replace everything inside the `<div className="bg-white dark:bg-gray-800 rounded-2xl ...">` with:

```tsx
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
  {/* Header bar */}
  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
    <h2 className="text-2xl font-bold">{project.title}</h2>
    <button
      onClick={onClose}
      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  {/* Split panel body */}
  <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

    {/* LEFT: Image gallery */}
    <div className="md:w-1/2 flex flex-col gap-3 p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
      {/* Featured image */}
      <div
        className="relative w-full bg-gray-950 rounded-xl overflow-hidden cursor-pointer"
        style={{ aspectRatio: "4/3" }}
        onClick={() => onImageClick(featuredImage)}
      >
        <Image
          src={featuredImage}
          alt={project.title}
          fill
          className="object-contain"
        />
      </div>

      {/* Thumbnail strip */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setFeaturedImage(img)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                featuredImage === img
                  ? "border-blue-500 opacity-100"
                  : "border-transparent opacity-60 hover:opacity-90"
              }`}
            >
              <Image
                src={img}
                alt={`${project.title} ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>

    {/* RIGHT: Project info */}
    <div className="md:w-1/2 overflow-y-auto p-6 flex flex-col gap-5">
      <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Current State</h3>
        <p className="text-sm">{project.currentState}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Features in Development</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          {project.featuresInDevelopment.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Planned Features</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          {project.plannedFeatures.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Known Bugs</h3>
        <p className="text-sm text-red-500">{project.knownBugs}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Version History</h3>
        {project.versionHistory?.url ? (
          <a href={project.versionHistory.url} target="_blank" rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline">
            {project.versionHistory.label}
          </a>
        ) : (
          <span className="text-sm text-yellow-600">Work in Progress (WIP)</span>
        )}
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill, i) => (
            <span key={i} className="bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-full text-xs uppercase tracking-wide">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-3 mt-auto pt-2">
        <a href={project.repoLink} target="_blank" rel="noopener noreferrer"
          className="flex-1 text-center text-sm font-medium px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          View Repo
        </a>
        <a href={project.deployedLink} target="_blank" rel="noopener noreferrer"
          className="flex-1 text-center text-sm font-medium px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          Live Demo
        </a>
      </div>
    </div>
  </div>
</div>
```

**Step 2: Update the portal wrapper**

The outer portal `div` should center the modal. Make sure it is:
```tsx
<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
```
(This is already correct — just confirm it hasn't changed.)

**Step 3: Verify manually**

- Click each project card. The modal should open with the split panel.
- Featured image shows at correct aspect, no cropping
- Thumbnails appear below the featured image (if more than 1 image exists)
- Clicking a thumbnail updates the featured image
- Clicking the featured image opens the fullscreen lightbox
- Right panel scrolls if content overflows
- Close button works
- On a narrow viewport (< 768px), panels stack vertically

**Step 4: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: rebuild project modal as split panel with image gallery"
```

---

### Task 4: Final polish pass

**Files:**
- Modify: `src/components/Projects.tsx`

**Step 1: Check all 5 projects for issues**

Open the dev server and click through every project card:

| Project | Expected |
|---|---|
| Inbox Buster | Landscape screenshots fill nicely, blurred bg on card |
| Novari | Same — app screenshots |
| Dam Anna | Logo image shows contained, not cropped |
| Mega OX | Game screenshots |
| OOP Content | Slide images |

**Step 2: Fix any edge cases found**

Common issues to watch for:
- Thumbnail strip overflows on mobile → already handled with `overflow-x-auto`
- Right panel doesn't scroll → confirm `overflow-y-auto` is on the right panel div, NOT the outer modal container
- Modal too tall on short screens → `max-h-[90vh]` on the outer modal div handles this

**Step 3: Final commit**

```bash
git add src/components/Projects.tsx
git commit -m "fix: project modal and card thumbnail polish"
```
