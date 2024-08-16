import defaultTheme from 'tailwindcss/defaultTheme'

const parseBreakpoint = (value: string) => parseInt(value.replace('px', ''), 10)

type BreakpointsKey = keyof typeof defaultTheme.screens
type Breakpoints = Record<keyof typeof defaultTheme.screens, number>

export const breakpoints = Object.entries(defaultTheme.screens).reduce(
  (acc: Breakpoints, [key, value]) => {
    acc[key as BreakpointsKey] = parseBreakpoint(value)
    return acc
  },
  {} as Breakpoints
)
