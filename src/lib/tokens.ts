export const tokens = {
  colors: {
    // Neutrals
    black: '#080808',
    white: '#FAFAF8',
    gray: {
      50:  '#F7F6F4',
      100: '#EFEDE9',
      200: '#E2DED8',
      300: '#C8C3BB',
      400: '#A09890',
      500: '#7A7269',
      600: '#5C554E',
      700: '#3E3A35',
      800: '#252220',
      900: '#131210',
    },
    // Brand
    blue: {
      50:  '#EFF6FF',
      100: '#DBEAFE',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
    },
    amber: {
      400: '#FBBF24',
      500: '#F59E0B',
    },
    green: {
      400: '#4ADE80',
      500: '#22C55E',
      600: '#16A34A',
    },
    red: {
      500: '#EF4444',
      600: '#DC2626',
    },
  },
  spacing: {
    1: '4px',  2: '8px',  3: '12px', 4: '16px',
    5: '20px', 6: '24px', 8: '32px', 10: '40px',
    12: '48px', 16: '64px', 20: '80px', 24: '96px',
  },
  radius: {
    sm: '8px', md: '12px', lg: '16px',
    xl: '24px', '2xl': '32px', full: '9999px',
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 16px rgba(0,0,0,0.06)',
    lg: '0 12px 40px rgba(0,0,0,0.08)',
    xl: '0 24px 64px rgba(0,0,0,0.10)',
  },
  font: {
    display: "'Bebas Neue', sans-serif",
    sans: "'DM Sans', sans-serif",
    mono: "'DM Mono', monospace",
  },
  transition: {
    fast: 'all 0.15s cubic-bezier(0.16,1,0.3,1)',
    base: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
    slow: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
  }
}