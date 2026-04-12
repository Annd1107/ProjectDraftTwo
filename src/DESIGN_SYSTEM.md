# TemtseenPortal Design System

## 🎨 Color Palette

### Primary Colors
- **Purple**: Primary brand color
  - `from-purple-600 to-purple-700` - Main gradients
  - `bg-purple-50` / `dark:bg-purple-900/30` - Light backgrounds
  - `text-purple-600` / `dark:text-purple-400` - Text
  - `border-purple-600` - Borders

- **Blue**: Secondary accent
  - `from-blue-600 to-blue-700` - Secondary gradients
  - `bg-blue-50` / `dark:bg-blue-900/30` - Light backgrounds
  - `text-blue-600` / `dark:text-blue-400` - Text

### Neutral Colors
- **Gray**: Base colors
  - `bg-gray-50` / `dark:bg-gray-900` - Page backgrounds
  - `bg-white` / `dark:bg-gray-800` - Card backgrounds
  - `text-gray-900` / `dark:text-white` - Headings
  - `text-gray-600` / `dark:text-gray-400` - Body text
  - `border-gray-200` / `dark:border-gray-700` - Borders

### Status Colors
- **Green**: Success states
  - `bg-green-100` / `dark:bg-green-900/50`
  - `text-green-600` / `dark:text-green-400`

- **Red**: Error states
  - `bg-red-50` / `dark:bg-red-900/20`
  - `text-red-600` / `dark:text-red-400`

## 🔤 Typography

### Headings
```tsx
// Page Title (Hero)
className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white"

// Section Title
className="text-4xl font-bold text-gray-900 dark:text-white"

// Card Title
className="text-3xl font-bold text-gray-900 dark:text-white"

// Subsection Title
className="text-2xl font-bold text-gray-900 dark:text-white"

// Small Title
className="text-xl font-bold text-gray-900 dark:text-white"
```

### Body Text
```tsx
// Large body
className="text-xl text-gray-600 dark:text-gray-400"

// Regular body
className="text-base text-gray-600 dark:text-gray-400"

// Small text
className="text-sm text-gray-500 dark:text-gray-500"

// Tiny text
className="text-xs text-gray-500 dark:text-gray-500"
```

## 📦 Components

### Cards
```tsx
// Primary Card
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 hover:shadow-xl transition-all">

// Card with Gradient Background
<div className="relative bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-12 overflow-hidden">
  <div className="absolute inset-0 bg-grid-white/10"></div>
  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
  <div className="relative">
    {/* Content */}
  </div>
</div>
```

### Buttons

#### Primary Button
```tsx
<button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl font-semibold">
```

#### Secondary Button
```tsx
<button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-700 transition-all font-semibold">
```

#### Danger Button
```tsx
<button className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all shadow-md hover:shadow-lg font-medium">
```

#### Icon Button
```tsx
<button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
```

### Form Inputs
```tsx
// Text Input
<input
  type="text"
  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all placeholder:text-gray-400"
  placeholder="Placeholder text"
/>

// Input with Icon
<div className="relative">
  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
  <input
    type="text"
    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
  />
</div>
```

### Navigation Items
```tsx
// Active Link
<Link 
  href="/path"
  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
    isActive 
      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
  }`}
>
```

### Badge/Tag
```tsx
// Info Badge
<span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">

// Status Badge
<div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/50 rounded-full border border-purple-200 dark:border-purple-800">
```

### Icon Container
```tsx
// Small Icon Container
<div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
  <Icon className="size-6 text-purple-600 dark:text-purple-400" />
</div>

// Medium Icon Container
<div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
  <Icon className="size-7 text-purple-600 dark:text-purple-400" />
</div>

// Large Icon Container
<div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-2xl">
  <Icon className="size-8 text-purple-600 dark:text-purple-400" />
</div>

// Gradient Icon Container
<div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
  <Icon className="size-10 text-white" />
</div>
```

## 🌊 Effects & Animations

### Glassmorphism
```tsx
className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg"
```

### Blur Decorations
```tsx
<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-700/10 rounded-full blur-3xl"></div>
```

### Gradients
```tsx
// Background Gradient
className="bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"

// Text Gradient
className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"

// Button Gradient
className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
```

### Transitions
```tsx
// Standard Transition
className="transition-all duration-300"

// Transform on Hover
className="hover:shadow-xl transition-all"
className="group-hover:-translate-x-1 transition-transform"
```

### Shadows
```tsx
// Card Shadow
className="shadow-lg hover:shadow-xl"

// Large Shadow
className="shadow-2xl"

// Medium Shadow
className="shadow-md hover:shadow-lg"
```

## 📐 Spacing & Layout

### Border Radius
- Small: `rounded-lg` (8px)
- Medium: `rounded-xl` (12px)
- Large: `rounded-2xl` (16px)
- XLarge: `rounded-3xl` (24px)
- Circle: `rounded-full`

### Padding
- Small: `p-4` (16px)
- Medium: `p-6` (24px)
- Large: `p-8` (32px)
- XLarge: `p-10` (40px)
- XXLarge: `p-12` (48px)

### Gaps
- Small: `gap-2` (8px)
- Medium: `gap-4` (16px)
- Large: `gap-6` (24px)
- XLarge: `gap-8` (32px)

### Container Widths
```tsx
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"  // Main container
className="max-w-5xl mx-auto"  // Content container
className="max-w-3xl mx-auto"  // Narrow container
className="max-w-md"  // Form container
```

## 📱 Responsive Design

### Breakpoints
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

### Common Patterns
```tsx
// Responsive Text
className="text-4xl sm:text-5xl lg:text-6xl"

// Responsive Grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"

// Responsive Padding
className="px-4 sm:px-6 lg:px-8 py-12 sm:py-20"

// Hide on Mobile
className="hidden sm:block"

// Hide on Desktop
className="block sm:hidden"
```

## 🎯 Best Practices

1. **Always provide dark mode variants**
   - Use `dark:` prefix for all color utilities
   
2. **Use consistent spacing**
   - Stick to the Tailwind spacing scale (4, 6, 8, 10, 12)
   
3. **Maintain accessibility**
   - Ensure proper color contrast
   - Include focus states on interactive elements
   - Use semantic HTML
   
4. **Optimize for mobile first**
   - Start with mobile styles, then add responsive variants
   
5. **Use gradients consistently**
   - Purple to purple for primary actions
   - Purple to blue for special sections
   - Single color for subtle accents
   
6. **Animation subtlety**
   - Use `transition-all` for smooth state changes
   - Keep animations fast (default 300ms)
   - Only animate what's necessary

## 🚀 Component Examples

### Page Header with Badge
```tsx
<div className="text-center mb-20">
  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/50 rounded-full mb-6 border border-purple-200 dark:border-purple-800">
    <Sparkles className="size-4 text-purple-600 dark:text-purple-400" />
    <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
      Badge Text
    </span>
  </div>
  <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
    Page Title
  </h1>
  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
    Description text
  </p>
</div>
```

### Stat Card
```tsx
<div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-2xl mb-4">
    <Trophy className="size-8 text-purple-600 dark:text-purple-400" />
  </div>
  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">50+</div>
  <div className="text-gray-600 dark:text-gray-400">Label</div>
</div>
```

### CTA Section
```tsx
<div className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 sm:p-16 overflow-hidden">
  <div className="absolute inset-0 bg-grid-white/10"></div>
  <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
  
  <div className="relative text-center">
    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
      CTA Title
    </h2>
    <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
      CTA Description
    </p>
    <button className="px-8 py-4 bg-white text-purple-700 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl font-semibold text-lg">
      Call to Action
    </button>
  </div>
</div>
```
