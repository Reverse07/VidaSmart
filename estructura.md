### 4.2 — Estructura de carpetas

Crea esta estructura dentro de `src/`:
```
src/
├── app/
│   ├── (tienda)/
│   │   ├── layout.tsx        ← layout con navbar y footer
│   │   ├── page.tsx          ← home
│   │   ├── productos/
│   │   │   ├── page.tsx      ← catálogo
│   │   │   └── [slug]/
│   │   │       └── page.tsx  ← página de producto
│   │   ├── carrito/
│   │   │   └── page.tsx
│   │   └── checkout/
│   │       └── page.tsx
│   └── api/
│       └── productos/
│           └── route.ts
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Badge.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── lib/
│   ├── supabase.ts
│   └── utils.ts
└── store/
    └── cartStore.ts          ← estado del carrito