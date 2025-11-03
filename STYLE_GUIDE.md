# Esco Cell Culture Institute - Style Guide

## Design Philosophy

The design system emphasizes **typography-focused, minimalist aesthetics** with clean lines and strategic use of negative space. The visual approach prioritizes **readability**, **hierarchy**, and **visual separation** through typography, borders, and spacing rather than decorative elements.

### Core Principles

1. **Typography First**: Use font weight, size, and color hierarchy to establish structure
2. **Minimalist Lines**: Strategic use of horizontal lines and borders for visual separation
3. **Generous Spacing**: Use whitespace and padding to organize content
4. **Intentional Color**: Dark navy for headings, brand blue for accents and lines
5. **Sharp Edges**: Remove rounded corners for a clean, professional look

---

## Color Palette

### Primary Colors

- **Dark Navy (Heading Text)**: `hsl(205 100% 12%)` - Very dark but not black, used for main headings
- **Brand Blue (Primary)**: `hsl(205 100% 25%)` - Used for accent lines, buttons, and interactive elements
- **Brand Blue Light**: `hsl(205 100% 30%)` - Lighter variant for secondary accents

### Secondary Colors

- **Slate 50**: `hsl(210 40% 96.1%)` - Light background sections
- **Slate 300**: `hsl(214.3 31.8% 91.4%)` - Borders and dividers
- **Slate 700**: `hsl(215.4 16.3% 46.9%)` - Body text
- **Slate 900**: `hsl(205 100% 15%)` - Dark text

### Usage

```css
/* Headings */
color: hsl(205 100% 12%);

/* Accent Lines & Buttons */
background-color: hsl(var(--primary)); /* hsl(205 100% 25%) */

/* Borders & Dividers */
border-color: hsl(214.3 31.8% 91.4%);

/* Body Text */
color: hsl(215.4 16.3% 46.9%);
```

---

## Typography

### Font Family

- **Primary**: Poppins (all weights)
- **Fallback**: System fonts (ui-sans-serif, system-ui, Segoe UI, etc.)

### Heading Styles

#### Section Headings (H2)

- **Font Size**: 36px (desktop), 24px (mobile)
- **Font Weight**: 700 (bold)
- **Color**: `hsl(205 100% 12%)`
- **Line Height**: 1.2
- **Accent Line**: 4px solid `hsl(var(--primary))` above heading

**Implementation**:

```jsx
<div className="mb-12">
  <div className="w-16 h-1 bg-[hsl(var(--primary))] mb-4"></div>
  <h2 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)]">
    Section Title
  </h2>
</div>
```

#### Subsection Headings (H3)

- **Font Size**: 32px (desktop), 20px (mobile)
- **Font Weight**: 700 (bold)
- **Color**: `hsl(205 100% 12%)`
- **Line Height**: 1.2

#### Card Titles

- **Font Size**: 18-20px
- **Font Weight**: 600 (semibold)
- **Color**: `hsl(205 100% 12%)`

#### Small Labels & Captions

- **Font Size**: 12-14px
- **Font Weight**: 400-500
- **Color**: `hsl(215.4 16.3% 46.9%)`

### Body Text

- **Font Size**: 16px (desktop), 14px (mobile)
- **Font Weight**: 400 (regular)
- **Color**: `hsl(215.4 16.3% 46.9%)`
- **Line Height**: 1.6 (relaxed for readability)

---

## Borders & Lines

### Accent Lines (Above Headings)

- **Width**: 64px (`w-16`)
- **Height**: 4px (`h-1`)
- **Color**: `hsl(var(--primary))`
- **Placement**: Above and slightly offset from the heading
- **Margin**: 16px below the line to the heading

**Implementation**:

```jsx
<div className="w-16 h-1 bg-[hsl(var(--primary))] mb-4"></div>
```

### Section Dividers

- **Type**: Horizontal border line
- **Height**: 1px
- **Color**: `hsl(214.3 31.8% 91.4%)`
- **Usage**: Between major content sections

### Card Borders

- **Type**: Bottom border (for simple cards)
- **Height**: 1px
- **Color**: `hsl(214.3 31.8% 91.4%)`
- **Padding Bottom**: 24px

**Implementation**:

```jsx
<div className="border-b border-slate-300 pb-6">{/* Content */}</div>
```

### FAQ/Accordion Separators

- **Type**: Border-top and border-bottom
- **Height**: 1px
- **Color**: `hsl(214.3 31.8% 91.4%)`
- **Padding**: 24px vertical between items

---

## Spacing System

### Margins & Padding

- **Extra Small**: 4px (0.25rem)
- **Small**: 8px (0.5rem)
- **Standard**: 16px (1rem)
- **Medium**: 24px (1.5rem)
- **Large**: 32px (2rem)
- **XL**: 48px (3rem)
- **2XL**: 64px (4rem)
- **3XL**: 80px (5rem)

### Section Spacing

- **Vertical Padding**: 80px (5rem) on desktop, 64px (4rem) on mobile
- **Horizontal Padding**: 16px on mobile, 32px on tablet, 16px on desktop (container handles)

**Container Example**:

```jsx
<section className="py-20 md:py-28 bg-white">
  <div className="container mx-auto px-4">{/* Content */}</div>
</section>
```

---

## Buttons

### Primary Button

- **Background**: `hsl(var(--primary))` (brand blue)
- **Text Color**: White
- **Padding**: 12px horizontal (px-5), 12px vertical (py-3)
- **Font Weight**: 600 (semibold)
- **Border Radius**: None (sharp corners)
- **Shadow**: None - no shadows
- **Hover State**: Slightly darker background (`hsl(205_100%_20%)`)

**Implementation**:

```jsx
<button className="inline-flex items-center justify-center bg-[hsl(var(--primary))] hover:bg-[hsl(205_100%_20%)] text-white px-5 py-3 font-semibold transition">
  Button Text
</button>
```

### Secondary Button

- **Background**: Transparent
- **Border**: 1px solid `hsl(214.3 31.8% 91.4%)`
- **Text Color**: Text color matches page (slate-900 or slate-700)
- **Padding**: 12px horizontal (px-5), 12px vertical (py-3)
- **Font Weight**: 600 (semibold)
- **Shadow**: None
- **Hover State**: Subtle background change (bg-slate-50)

**Implementation**:

```jsx
<button className="inline-flex items-center justify-center border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-50">
  Button Text
</button>
```

### Button Groups

- **Gap**: 12-16px between buttons
- **Responsive**: Stack vertically on mobile, horizontal on desktop

---

## Form Elements

### Input Fields

- **Height**: 48px (h-12)
- **Border**: 2px solid `hsl(214.3 31.8% 91.4%)`
- **Border Radius**: None (sharp corners)
- **Padding**: 16px horizontal (px-4)
- **Background**: White
- **Font Size**: 16px
- **Focus State**: 2px ring in brand blue (`focus:ring-2 focus:ring-[hsl(var(--primary))]`), transparent border

**Implementation**:

```jsx
<input className="h-12 bg-white text-slate-900 border-2 border-slate-300 px-4 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent" />
```

### Textarea

- **Height**: Auto (min 4 rows)
- **Border**: Same as input (2px solid slate-300)
- **Padding**: 16px (px-4) horizontal, 12px (py-3) vertical
- **No rounded corners**

**Implementation**:

```jsx
<textarea
  rows={4}
  className="bg-white text-slate-900 border-2 border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
/>
```

### Form Labels

- **Font Size**: 16px (base)
- **Font Weight**: 600 (semibold)
- **Color**: `hsl(205 100% 15%)` (slate-900)
- **Margin Bottom**: 8px (mb-2)
- **Display**: Block element above input

**Implementation**:

```jsx
<label className="grid gap-2 text-base font-semibold">
  <span>Label Text</span>
  <input {...props} />
</label>
```

---

## Cards & Content Blocks

### Simple Card (with border-bottom)

- **Background**: White
- **Border**: 1px bottom in slate-300
- **Padding**: 24px (6) vertical, 0 horizontal
- **No rounded corners**
- **No shadows**

**Implementation**:

```jsx
<div className="border-b border-slate-300 pb-6">
  <h3 className="text-lg font-bold text-[hsl(205_100%_12%)]">Title</h3>
  <p className="mt-2 text-slate-700">Content</p>
</div>
```

### Mission/Feature Card

- **Layout**: Rectangular white box
- **Background**: White (`bg-white`)
- **Border**: 1px solid `hsl(214.3 31.8% 91.4%)`
- **Padding**: 24px (6)
- **Gap Between Cards**: 24px (6) in grid layout
- **No accent dots or badges**
- **No shadows**

**Implementation**:

```jsx
<div className="bg-white border border-slate-200 p-6">
  <h3 className="text-lg font-semibold text-[hsl(205_100%_12%)] mb-4">
    {title}
  </h3>
  <p className="text-sm leading-relaxed text-slate-700">{description}</p>
</div>
```

**Multi-column layout**:

```jsx
<div className="grid gap-6 md:grid-cols-3">
  <MissionCard title="Title 1" descr="Description 1" />
  <MissionCard title="Title 2" descr="Description 2" />
  <MissionCard title="Title 3" descr="Description 3" />
</div>
```

---

## Accordion / FAQ

### Accordion Styles

- **Border**: Top border on container, bottom border on each item
- **Border Color**: `hsl(214.3 31.8% 91.4%)`
- **No rounded corners**
- **No shadows**
- **Padding**: 24px (py-6) vertical, 0 horizontal between items

**Implementation**:

```jsx
<div className="space-y-0 border-t border-slate-300">
  {items.map((item) => (
    <Accordion
      key={item.q}
      type="single"
      collapsible
      className="border-b border-slate-300"
    >
      <AccordionItem value={item.q} className="border-0">
        <AccordionTrigger className="py-6 px-0 text-left font-semibold text-slate-900">
          {item.q}
        </AccordionTrigger>
        <AccordionContent className="pb-6 px-0 text-slate-700">
          {item.a}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ))}
</div>
```

### Trigger Icon

- **Icon**: Plus/Minus lines (custom SVG or CSS)
- **Color**: Brand blue (`hsl(var(--primary))`)
- **Size**: 16px x 20px
- **Animation**: Smooth transition on state change

---

## Responsive Design

### Breakpoints

- **Mobile**: < 640px (no breakpoint prefix)
- **Tablet**: 640px – 1024px (`sm:` and `md:` prefixes)
- **Desktop**: > 1024px (`lg:` and `xl:` prefixes)

### Mobile-First Approach

- Design starts with mobile layout
- Use `md:` and `lg:` prefixes for larger screens
- Increase font sizes and spacing as screen grows

**Typography Scaling Example**:

```jsx
<h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
  Heading that scales with screen
</h2>
```

### Spacing Adjustments

```jsx
<section className="py-12 md:py-16 lg:py-20">
  <div className="container mx-auto px-4 md:px-6">{/* Content */}</div>
</section>
```

---

## Common Patterns

### Hero Section with Accent Line

```jsx
<div className="mb-8">
  <div className="w-16 h-1 bg-[hsl(var(--primary))] mb-4"></div>
  <h2 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)]">
    Page Title
  </h2>
</div>
<p className="text-lg text-slate-700 leading-relaxed">
  Descriptive text about the section.
</p>
```

### Two-Column Layout

```jsx
<div className="grid lg:grid-cols-2 gap-12">
  <div>{/* Left column content */}</div>
  <div>{/* Right column content */}</div>
</div>
```

### Simple Timeline or Journey List

```jsx
<div className="space-y-4">
  {items.map((item) => (
    <div key={item.id}>
      <p className="text-sm leading-relaxed text-slate-700">
        <span className="font-semibold">{item.label}:</span> {item.description}
      </p>
    </div>
  ))}
</div>
```

### Contact Form Section

```jsx
<form className="max-w-2xl">
  <label className="grid gap-2 text-base font-semibold mb-6">
    <span>Name</span>
    <input
      required
      className="h-12 bg-white text-slate-900 border-2 border-slate-300 px-4 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
    />
  </label>
  {/* More fields */}
  <button className="mt-4 inline-flex items-center justify-center bg-[hsl(var(--primary))] hover:bg-[hsl(205_100%_20%)] text-white px-8 py-3.5 font-bold">
    Submit
  </button>
</form>
```

---

## Code Standards

### CSS Class Organization

Use Tailwind CSS utility classes in this order:

1. **Layout**: `flex`, `grid`, `block`, etc.
2. **Sizing**: `w-`, `h-`, `min-`, `max-`
3. **Spacing**: `p-`, `m-`, `gap-`
4. **Background & Borders**: `bg-`, `border-`, `shadow-`
5. **Typography**: `text-`, `font-`, `leading-`
6. **Effects**: `opacity-`, `transform-`, `transition-`
7. **States**: `hover:`, `focus:`, `dark:`, `md:`, `lg:`

### Example

```jsx
<button className="inline-flex items-center justify-center w-full h-12 px-4 py-3 bg-[hsl(var(--primary))] text-white font-bold border-0 hover:bg-[hsl(205_100%_20%)] focus:ring-2 focus:ring-offset-2 transition">
  Click me
</button>
```

### Color Variables

Always prefer CSS custom properties (variables) over hardcoded colors:

```jsx
// ✓ Good
className = "bg-[hsl(var(--primary))]";

// ✗ Avoid
className = "bg-[#005a9f]";
```

---

## Accessibility Considerations

1. **Color Contrast**: Maintain WCAG AA standard contrast ratios
2. **Focus States**: Always provide visible focus indicators
3. **Semantic HTML**: Use proper heading hierarchy (h1, h2, h3)
4. **ARIA Labels**: Add aria-labels for icon-only elements
5. **Link Focus**: Ensure keyboard navigation works smoothly
6. **Form Labels**: Always associate labels with inputs

### Focus State Example

```jsx
<input className="focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent outline-none" />
```

---

## What NOT to Do

Avoid these practices to maintain design consistency:

1. ❌ **Rounded corners on cards** - Use sharp corners for all content blocks
2. ❌ **Drop shadows** - No shadows on cards (shadows only on very rare elements like modals)
3. ❌ **Dot/circle accents** - Removed from cards and lists
4. ❌ **Gradient overlays** - Keep backgrounds clean and simple
5. ❌ **Vertical divider lines between cards** - Use separate white card boxes instead
6. ❌ **Rounded buttons** - Always use sharp corners for buttons
7. ❌ **Multiple decorative elements** - Focus on typography and spacing only

## When to Break the Rules

While consistency is important, these situations may warrant exceptions:

1. **Brand-specific colors** in hero sections (blues for background overlays only)
2. **Subtle rounded corners** only on interactive elements like avatars (very rare)
3. **Page banner gradients** - Brand gradient backgrounds are acceptable for hero/banner areas only
4. **Extra spacing** for visual emphasis on key CTAs

Always document such exceptions and maintain visual coherence across the interface.

---

## Maintenance & Updates

- Review style guide quarterly or after major design changes
- Update examples when new patterns are established
- Keep color variable definitions in `client/global.css` synchronized
- Ensure all contributors follow the established patterns

For questions or suggestions about the style guide, refer to the design team.
