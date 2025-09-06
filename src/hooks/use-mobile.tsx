import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${1024 - 1}px)`)
    const onChange = () => {
      setIsTablet(window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < 1024)
    }
    mql.addEventListener("change", onChange)
    setIsTablet(window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < 1024)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isTablet
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: 1024px)`)
    const onChange = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    mql.addEventListener("change", onChange)
    setIsDesktop(window.innerWidth >= 1024)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isDesktop
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<'mobile' | 'tablet' | 'desktop' | undefined>(undefined)

  React.useEffect(() => {
    const updateBreakpoint = () => {
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        setBreakpoint('mobile')
      } else if (window.innerWidth < 1024) {
        setBreakpoint('tablet')
      } else {
        setBreakpoint('desktop')
      }
    }

    const mql = window.matchMedia('(min-width: 1px)')
    mql.addEventListener("change", updateBreakpoint)
    updateBreakpoint()

    return () => mql.removeEventListener("change", updateBreakpoint)
  }, [])

  return breakpoint
}
