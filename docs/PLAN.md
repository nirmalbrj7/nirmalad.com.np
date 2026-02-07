# Visual & Interactive Overhaul Plan

## Goal
To elevate the visual appeal and interactivity of the portfolio website, creating a premium user experience that reflects the user's expertise. This involves integrating 3D elements, enhancing data visualizations, and adding polished animations.

## User Review Required
> [!IMPORTANT]
> This plan introduces new dependencies: `three`, `@react-three/fiber`, and `@react-three/drei`. ensure this aligns with your performance budget.

## Proposed Changes

### 1. New Dependencies
- **Action**: Install `three`, `@types/three`, `@react-three/fiber`, `@react-three/drei`.
- **Purpose**: To enable 3D rendering capabilities for the Hero section and potentially other visual elements.

### 2. Home Page (`src/pages/Home.tsx`)
- **[NEW] 3D Hero Component**: Create a `Hero3D` component using `react-three-fiber`.
    - **Concept**: A subtle, interactive particle system or geometric structure that reacts to mouse movement.
    - **Integration**: Replace or augment the existing static hero image/background.
- **[MODIFY] Layout**: Ensure the hero section accommodates the canvas without layout shifts.

### 3. Visualizations (`src/components/viz`)
- **[MODIFY] `ResearchGraph.tsx`**:
    - **Visuals**: Add glow effects to nodes/links. Use a more vibrant color palette.
    - **Interactivity**: Smooth zoom/pan (if not present), hover tooltips with glassmorphism style.
    - **Animation**: Animate nodes on entry.

### 4. Interactions & Animations (Global)
- **[MODIFY] `KeyProjects.tsx`, `Publications.tsx`, `Academic.tsx`**:
    - **Cards**: Add `whileHover` effects (scale up, shadow bloom) using `framer-motion`.
    - **Scroll Reveal**: Wrap main content blocks in a `ScrollReveal` component (to be created) that triggers fade-in/slide-up animations when elements enter the viewport.

### 5. UI Polish
- **[MODIFY] `src/index.css` & Tailwind Config**:
    - Refine typography (ensure modern font stack).
    - Add "glassmorphism" utility classes (backdrop-blur, translucent background) for reuse in tooltips and overlays.

## Verification Plan

### Manual Verification
1.  **3D Hero**: Load Home page, verify 3D element renders, rotates/moves with mouse, and doesn't lag.
2.  **Visualizations**: Check `ResearchGraph` for rendering errors, verify tooltips appear on hover, and nodes animate in.
3.  **Responsiveness**: Check Home and Graphs on mobile viewport to ensure 3D canvas scales correctly and doesn't block scrolling.
4.  **Navigation**: Verify page transitions in `App.tsx` still work smoothly with new content.

### Automated Tests
-   Run `npm run build` to ensure new dependencies don't break the build.
-   Run `npm run lint` to check for code quality issues.
