import { useState, useEffect } from "react"

function useScrollTop() {
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const handleScrollTop = () => {
      setScrollTop(document.documentElement.scrollTop)
    }
    window.addEventListener("scroll", handleScrollTop)
    handleScrollTop()

    return () => window.removeEventListener("scroll", handleScrollTop)
  }, [])
  return scrollTop
}

export default useScrollTop