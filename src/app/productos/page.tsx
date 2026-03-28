'use client'

import { useEffect, useState, Suspense, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Zap, PawPrint, Gamepad2, Plus, Check, Mouse, Keyboard, Headset, Monitor, Sofa, SquareMousePointer, Search, X, SlidersHorizontal, TrendingUp } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useCartStore } from '@/store/cartStore'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  compare_price: number
  category: string
  subcategory?: string
  description: string
  is_active: boolean
  images?: string[]
}

const CAT_STYLE: Record<string, { bg: string; icon: React.ReactElement; accent: string; dark: boolean }> = {
  gaming:   { bg: '#1a0f2e', icon: <Gamepad2 size={36} color="#A78BFA" />, accent: '#8B5CF6', dark: true },
  tech:     { bg: '#EFF6FF', icon: <Zap size={36} color="#2563EB" />,      accent: '#2563EB', dark: false },
  mascotas: { bg: '#FFF7ED', icon: <PawPrint size={36} color="#D97706" />, accent: '#D97706', dark: false },
}

const GAMING_SUBCATEGORIES = [
  { label: 'Todo Gaming', value: null,         icon: <Gamepad2 size={12} />,           accent: '#8B5CF6' },
  { label: 'Mice',        value: 'mice',        icon: <Mouse size={12} />,              accent: '#8B5CF6' },
  { label: 'Teclados',    value: 'teclados',    icon: <Keyboard size={12} />,           accent: '#A78BFA' },
  { label: 'Headsets',    value: 'headsets',    icon: <Headset size={12} />,            accent: '#C084FC' },
  { label: 'Mousepads',   value: 'mousepads',   icon: <SquareMousePointer size={12} />, accent: '#D946EF' },
  { label: 'Sillas',      value: 'sillas',      icon: <Sofa size={12} />,               accent: '#EC489A' },
  { label: 'Monitores',   value: 'monitores',   icon: <Monitor size={12} />,            accent: '#F43F5E' },
]

const FILTERS = [
  { label: 'Todo',       value: null,       accent: '#080808' },
  { label: 'Gaming',     value: 'gaming',   accent: '#8B5CF6' },
  { label: 'Tecnología', value: 'tech',     accent: '#2563EB' },
  { label: 'Mascotas',   value: 'mascotas', accent: '#D97706' },
]

const TRENDING = ['Logitech G102', 'Attack Shark', 'VGN Dragonfly', 'Razer', 'Foco WiFi', 'Petkit']

function ProductCard({ p }: { p: Product }) {
  const [added, setAdded] = useState(false)
  const addItem = useCartStore(state => state.addItem)
  const style = CAT_STYLE[p.category] ?? CAT_STYLE.tech
  const discount = p.compare_price ? Math.round((1 - p.price / p.compare_price) * 100) : 0
  const subcatInfo = p.subcategory && GAMING_SUBCATEGORIES.find(sc => sc.value === p.subcategory)

  return (
    <Link href={`/productos/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <article style={{
        background: style.dark ? '#0f0a1a' : '#fff',
        border: `1px solid ${style.dark ? 'rgba(139,92,246,0.2)' : '#E2DED8'}`,
        borderRadius: '24px', overflow: 'hidden',
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = style.dark
            ? '0 24px 48px rgba(139,92,246,0.20)'
            : '0 24px 48px rgba(0,0,0,0.08)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
        }}
      >
        <div style={{
          background: style.bg, aspectRatio: '1',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {style.dark && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 30%, rgba(139,92,246,0.15), transparent 70%)',
              pointerEvents: 'none',
            }} />
          )}
          {p.images?.[0] ? (
            <img src={p.images[0]} alt={p.name} style={{
              width: '80%', height: '80%', objectFit: 'contain',
              position: 'relative', zIndex: 1,
              filter: style.dark ? 'drop-shadow(0 8px 16px rgba(139,92,246,0.3))' : 'none',
            }} />
          ) : (
            <div style={{
              width: '80px', height: '80px',
              background: style.dark ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.8)',
              borderRadius: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              border: style.dark ? '1px solid rgba(139,92,246,0.3)' : 'none',
              position: 'relative', zIndex: 1,
            }}>{style.icon}</div>
          )}
          {discount > 0 && (
            <div style={{
              position: 'absolute', top: '14px', right: '14px',
              background: style.accent, color: '#fff',
              fontFamily: "'DM Mono', monospace", fontSize: '10px',
              padding: '4px 8px', borderRadius: '100px', zIndex: 2,
            }}>-{discount}%</div>
          )}
          {style.dark && subcatInfo && (
            <div style={{
              position: 'absolute', bottom: '14px', left: '14px',
              background: `${subcatInfo.accent}20`,
              border: `1px solid ${subcatInfo.accent}40`,
              borderRadius: '100px', padding: '3px 10px',
              fontFamily: "'DM Mono', monospace", fontSize: '9px',
              color: subcatInfo.accent, letterSpacing: '0.08em',
              backdropFilter: 'blur(8px)', zIndex: 2,
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              {subcatInfo.icon} {subcatInfo.label}
            </div>
          )}
        </div>

        <div style={{ padding: '20px' }}>
          <p style={{
            fontFamily: "'DM Mono', monospace", fontSize: '10px',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: style.dark ? '#7C3AED' : '#A09890', marginBottom: '6px',
          }}>
            {p.category === 'gaming' && p.subcategory
              ? `${p.category} / ${GAMING_SUBCATEGORIES.find(sc => sc.value === p.subcategory)?.label || p.subcategory}`
              : p.category}
          </p>
          <h3 style={{
            fontSize: '15px', fontWeight: 600, lineHeight: 1.3,
            color: style.dark ? '#F3F0FF' : '#080808',
            marginBottom: '6px', fontFamily: "'DM Sans', sans-serif",
          }}>{p.name}</h3>
          <p style={{
            fontSize: '12px', color: style.dark ? '#6B5B8A' : '#7A7269',
            marginBottom: '16px', lineHeight: 1.5,
            fontFamily: "'DM Sans', sans-serif",
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{p.description}</p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px',
                color: style.dark ? '#F3F0FF' : '#080808',
              }}>S/{p.price / 100}</span>
              {p.compare_price && (
                <span style={{
                  fontSize: '12px',
                  color: style.dark ? '#4A3A6A' : '#C8C3BB',
                  textDecoration: 'line-through',
                  fontFamily: "'DM Sans', sans-serif",
                }}>S/{p.compare_price / 100}</span>
              )}
            </div>
            <button
              onClick={e => {
                e.preventDefault()
                addItem({ id: p.id, name: p.name, price: p.price / 100, image: p.images?.[0] ?? '', quantity: 1, slug: p.slug })
                setAdded(true)
                setTimeout(() => setAdded(false), 1800)
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                background: added ? '#16A34A' : style.accent,
                color: '#fff', border: 'none',
                borderRadius: '100px', padding: '9px 16px',
                fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: !added && style.dark ? '0 4px 14px rgba(139,92,246,0.4)' : 'none',
              }}
            >
              {added ? <><Check size={12} /> Listo</> : <><Plus size={12} /> Agregar</>}
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}

function SkeletonCard({ dark = false }: { dark?: boolean }) {
  return (
    <div style={{
      borderRadius: '24px', overflow: 'hidden',
      border: `1px solid ${dark ? 'rgba(139,92,246,0.15)' : '#E2DED8'}`,
      background: dark ? '#0f0a1a' : '#fff',
    }}>
      <div style={{
        aspectRatio: '1',
        background: dark
          ? 'linear-gradient(90deg,#1a1030 25%,#251845 50%,#1a1030 75%)'
          : 'linear-gradient(90deg,#F2F1EF 25%,#E8E6E1 50%,#F2F1EF 75%)',
        backgroundSize: '800px 100%',
        animation: 'shimmer 1.4s infinite',
      }} />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[40, 80, 60].map(w => (
          <div key={w} style={{
            height: '13px', width: `${w}%`, borderRadius: '6px',
            background: dark ? '#1a1030' : '#F2F1EF',
            animation: 'shimmer 1.4s infinite',
          }} />
        ))}
      </div>
    </div>
  )
}

// ── SEARCH BAR COMPONENT ──
function SearchBar({
  isDark,
  query,
  setQuery,
  onSearch,
  allProducts,
}: {
  isDark: boolean
  query: string
  setQuery: (q: string) => void
  onSearch: (q: string) => void
  allProducts: Product[]
}) {
  const [focused, setFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.length >= 2) {
      const q = query.toLowerCase()
      setSuggestions(
        allProducts
          .filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
          .slice(0, 5)
      )
    } else {
      setSuggestions([])
    }
  }, [query, allProducts])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
    setFocused(false)
  }

  const showDrop = focused && (suggestions.length > 0 || query.length === 0)

  return (
    <>
      <style>{`
        .search-wrap {
          position: relative;
          width: 100%;
          max-width: 680px;
        }
        .search-box {
          display: flex;
          align-items: center;
          gap: 0;
          border-radius: 100px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .search-box.dark {
          background: rgba(139,92,246,0.08);
          border: 1.5px solid rgba(139,92,246,0.25);
          box-shadow: 0 0 0 0 rgba(139,92,246,0);
        }
        .search-box.dark.focused {
          border-color: rgba(139,92,246,0.6);
          box-shadow: 0 0 0 4px rgba(139,92,246,0.12);
          background: rgba(139,92,246,0.12);
        }
        .search-box.light {
          background: #fff;
          border: 1.5px solid #E2DED8;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .search-box.light.focused {
          border-color: #080808;
          box-shadow: 0 0 0 4px rgba(0,0,0,0.04);
        }
        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 14px 20px;
          font-family: "'DM Sans', sans-serif";
          font-size: 14px;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
        }
        .search-input.dark {
          color: #F3F0FF;
        }
        .search-input.dark::placeholder { color: rgba(167,139,250,0.5); }
        .search-input.light {
          color: #080808;
        }
        .search-input.light::placeholder { color: #C8C3BB; }

        .search-btn {
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin: 4px;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .search-btn.dark {
          background: rgba(139,92,246,0.2);
          color: #A78BFA;
        }
        .search-btn.dark:hover { background: #8B5CF6; color: #fff; }
        .search-btn.light {
          background: #080808;
          color: #fff;
        }
        .search-btn.light:hover { background: #333; }

        .search-clear {
          border: none; cursor: pointer;
          background: transparent;
          display: flex; align-items: center;
          padding: 0 8px;
          opacity: 0.5;
          transition: opacity 0.2s;
        }
        .search-clear:hover { opacity: 1; }

        /* Dropdown */
        .search-drop {
          position: absolute;
          top: calc(100% + 10px);
          left: 0; right: 0;
          border-radius: 20px;
          overflow: hidden;
          z-index: 100;
          animation: dropIn 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }
        .search-drop.dark {
          background: #0f0a1a;
          border: 1px solid rgba(139,92,246,0.2);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .search-drop.light {
          background: #fff;
          border: 1px solid #E2DED8;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .drop-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          text-decoration: none;
          transition: background 0.15s ease;
          cursor: pointer;
          border: none;
          width: 100%;
          text-align: left;
          background: transparent;
        }
        .drop-item.dark { color: #C4B5FD; }
        .drop-item.dark:hover { background: rgba(139,92,246,0.1); }
        .drop-item.light { color: #080808; }
        .drop-item.light:hover { background: #F7F6F4; }

        .drop-section-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 10px 16px 4px;
        }
        .drop-section-label.dark { color: rgba(139,92,246,0.5); }
        .drop-section-label.light { color: #C8C3BB; }

        .drop-divider {
          height: 1px;
          margin: 4px 16px;
        }
        .drop-divider.dark { background: rgba(139,92,246,0.1); }
        .drop-divider.light { background: #E2DED8; }

        .trending-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 100px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.06em;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }
        .trending-chip.dark {
          background: rgba(139,92,246,0.1);
          color: #A78BFA;
          border: 1px solid rgba(139,92,246,0.15);
        }
        .trending-chip.dark:hover {
          background: rgba(139,92,246,0.2);
          color: #C4B5FD;
        }
        .trending-chip.light {
          background: #F7F6F4;
          color: #5C554E;
          border: 1px solid #E2DED8;
        }
        .trending-chip.light:hover {
          background: #EDEBE8;
          color: #080808;
        }
      `}</style>

      <div className="search-wrap" ref={dropRef}>
        <form onSubmit={handleSubmit}>
          <div className={`search-box ${isDark ? 'dark' : 'light'} ${focused ? 'focused' : ''}`}>
            <input
              ref={inputRef}
              className={`search-input ${isDark ? 'dark' : 'light'}`}
              type="text"
              placeholder="Buscar productos, marcas..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className="search-clear"
                onClick={() => { setQuery(''); onSearch(''); inputRef.current?.focus() }}
                style={{ color: isDark ? '#A78BFA' : '#A09890' }}
              >
                <X size={14} />
              </button>
            )}
            <button type="submit" className={`search-btn ${isDark ? 'dark' : 'light'}`}>
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Dropdown */}
        {showDrop && (
          <div className={`search-drop ${isDark ? 'dark' : 'light'}`}>
            {suggestions.length > 0 ? (
              <>
                <div className={`drop-section-label ${isDark ? 'dark' : 'light'}`}>
                  Resultados
                </div>
                {suggestions.map(p => {
                  const style = CAT_STYLE[p.category] ?? CAT_STYLE.tech
                  return (
                    <Link
                      key={p.slug}
                      href={`/productos/${p.slug}`}
                      className={`drop-item ${isDark ? 'dark' : 'light'}`}
                      onClick={() => setFocused(false)}
                    >
                      {/* Mini image */}
                      <div style={{
                        width: '40px', height: '40px',
                        borderRadius: '10px',
                        background: style.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, overflow: 'hidden',
                        border: style.dark ? '1px solid rgba(139,92,246,0.2)' : '1px solid #E2DED8',
                      }}>
                        {p.images?.[0] ? (
                          <img src={p.images[0]} alt={p.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                        ) : (
                          <span style={{ fontSize: '16px' }}>{p.category === 'gaming' ? '🎮' : p.category === 'tech' ? '⚡' : '🐾'}</span>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '13px', fontWeight: 600,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          color: isDark ? '#F3F0FF' : '#080808',
                        }}>{p.name}</div>
                        <div style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: '10px',
                          color: isDark ? '#7C3AED' : '#A09890',
                          textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}>{p.category} · S/{p.price / 100}</div>
                      </div>
                      <div style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: '18px',
                        color: style.accent,
                        flexShrink: 0,
                      }}>S/{p.price / 100}</div>
                    </Link>
                  )
                })}
              </>
            ) : (
              <>
                <div className={`drop-section-label ${isDark ? 'dark' : 'light'}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={10} /> Tendencias
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '8px 16px 14px' }}>
                  {TRENDING.map(t => (
                    <button
                      key={t}
                      className={`trending-chip ${isDark ? 'dark' : 'light'}`}
                      onClick={() => { setQuery(t); onSearch(t); setFocused(false) }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}

function Catalogo() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const cat = searchParams.get('cat')
  const subcat = searchParams.get('subcat')
  const searchQuery = searchParams.get('q') || ''

  const [products, setProducts] = useState<Product[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState(searchQuery)

  // Load ALL products once for search suggestions
  useEffect(() => {
    supabase.from('products').select('*').eq('is_active', true).then(({ data }) => {
      setAllProducts(data ?? [])
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    async function load() {
      let q = supabase.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false })

      if (cat === 'tech' || cat === 'mascotas' || cat === 'gaming') q = q.eq('category', cat)
      if (cat === 'gaming' && subcat && subcat !== 'all') q = q.eq('subcategory', subcat)

      const { data } = await q
      let results = data ?? []

      // Client-side search filter
      if (searchQuery) {
        const sq = searchQuery.toLowerCase()
        results = results.filter(p =>
          p.name.toLowerCase().includes(sq) ||
          p.description?.toLowerCase().includes(sq) ||
          p.supplier?.toLowerCase().includes(sq)
        )
      }

      setProducts(results)
      setLoading(false)
    }
    load()
  }, [cat, subcat, searchQuery])

  const handleSearch = useCallback((q: string) => {
    const params = new URLSearchParams()
    if (cat) params.set('cat', cat)
    if (subcat) params.set('subcat', subcat)
    if (q) params.set('q', q)
    router.push(`/productos${params.toString() ? '?' + params.toString() : ''}`)
  }, [cat, subcat, router])

  const isDark = cat === 'gaming'
  const currentSubcat = subcat === 'all' ? null : subcat

  const TITLE: Record<string, string> = {
    gaming:   'PC GAMING\nPERIFÉRICOS',
    tech:     'TECNOLOGÍA\nSMART HOME',
    mascotas: 'MASCOTAS\nPET SMART',
  }

  return (
    <div style={{ background: isDark ? '#080610' : '#FAFAF8', minHeight: '100vh' }}>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
      `}</style>

      {/* HEADER */}
      <div style={{
        padding: '80px 48px 48px',
        borderBottom: `1px solid ${isDark ? 'rgba(139,92,246,0.15)' : '#E2DED8'}`,
        background: isDark ? 'linear-gradient(180deg, #0f0a1a 0%, #080610 100%)' : 'transparent',
        position: 'relative', overflow: 'hidden',
      }}>
        {isDark && (
          <div style={{
            position: 'absolute', top: '-100px', right: '-100px',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />
        )}

        {/* Title + Search in same row on large screens */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '32px',
          flexWrap: 'wrap',
          marginBottom: '32px',
        }}>
          <div>
            <p style={{
              fontFamily: "'DM Mono', monospace", fontSize: '11px',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: isDark ? '#7C3AED' : '#A09890', marginBottom: '16px',
            }}>
              {loading ? '...' : searchQuery
                ? `${products.length} resultados para "${searchQuery}"`
                : `${products.length} productos disponibles`}
            </p>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 0.88,
              color: isDark ? '#F3F0FF' : '#080808',
              whiteSpace: 'pre-line',
            }}>
              {searchQuery
                ? `BÚSQUEDA`
                : cat ? TITLE[cat] : 'TODOS LOS\nPRODUCTOS'}
            </div>
          </div>

          {/* ── SEARCH BAR ── */}
          <div style={{ flex: '1', minWidth: '280px', maxWidth: '520px', paddingBottom: '4px' }}>
            <SearchBar
              isDark={isDark}
              query={query}
              setQuery={setQuery}
              onSearch={handleSearch}
              allProducts={allProducts}
            />
          </div>
        </div>

        {/* Main Category Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: cat === 'gaming' ? '20px' : '0' }}>
          {FILTERS.map(f => {
            const active = cat === f.value
            return (
              <Link key={f.label} href={f.value ? `/productos?cat=${f.value}` : '/productos'} style={{
                fontFamily: "'DM Mono', monospace", fontSize: '11px',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '10px 20px', borderRadius: '100px', textDecoration: 'none',
                border: `1.5px solid ${active ? f.accent : isDark ? 'rgba(139,92,246,0.2)' : '#E2DED8'}`,
                background: active ? f.accent : 'transparent',
                color: active ? '#fff' : isDark ? '#9F7AEA' : '#A09890',
                transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: active && f.value === 'gaming' ? '0 4px 14px rgba(139,92,246,0.35)' : 'none',
              }}>{f.label}</Link>
            )
          })}
        </div>

        {/* Gaming Subcategory Filters */}
        {cat === 'gaming' && (
          <div style={{
            display: 'flex', gap: '8px', flexWrap: 'wrap',
            paddingTop: '16px',
            borderTop: `1px solid ${isDark ? 'rgba(139,92,246,0.1)' : '#E2DED8'}`,
            marginTop: '8px',
          }}>
            {GAMING_SUBCATEGORIES.map(sub => {
              const isActive = (sub.value === null && !subcat) || (sub.value !== null && subcat === sub.value)
              return (
                <Link
                  key={sub.label}
                  href={sub.value ? `/productos?cat=gaming&subcat=${sub.value}` : '/productos?cat=gaming'}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    fontFamily: "'DM Mono', monospace", fontSize: '10px',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '7px 14px', borderRadius: '100px', textDecoration: 'none',
                    border: `1.5px solid ${isActive ? sub.accent : isDark ? 'rgba(139,92,246,0.2)' : '#E2DED8'}`,
                    background: isActive ? `${sub.accent}20` : 'transparent',
                    color: isActive ? sub.accent : isDark ? '#9F7AEA' : '#A09890',
                    transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  {sub.icon} {sub.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* GRID */}
      <div style={{ padding: '48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {loading
          ? [...Array(8)].map((_, i) => <SkeletonCard key={i} dark={isDark} />)
          : products.map(p => <ProductCard key={p.slug} p={p} />)
        }
      </div>

      {/* Empty state */}
      {!loading && products.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '80px 48px',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <div style={{
            fontSize: '48px', marginBottom: '16px',
          }}>🔍</div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '32px',
            color: isDark ? '#4A3A6A' : '#C8C3BB',
            marginBottom: '8px',
          }}>
            Sin resultados
          </div>
          <p style={{
            fontSize: '14px', color: isDark ? '#6B5B8A' : '#A09890',
            marginBottom: '24px',
          }}>
            No encontramos productos para "{searchQuery}"
          </p>
          <Link href="/productos" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: "'DM Mono', monospace", fontSize: '11px',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: isDark ? '#A78BFA' : '#080808', textDecoration: 'none',
            padding: '12px 24px', borderRadius: '100px',
            border: `1.5px solid ${isDark ? 'rgba(139,92,246,0.3)' : '#E2DED8'}`,
          }}>
            Ver todos los productos
          </Link>
        </div>
      )}
    </div>
  )
}

export default function ProductosPage() {
  return (
    <Suspense fallback={<div style={{ padding: '80px 48px' }}>Cargando...</div>}>
      <Catalogo />
    </Suspense>
  )
}