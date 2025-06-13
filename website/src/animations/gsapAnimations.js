import gsap from "gsap"

export const FadeUpAll = (selector = ".fade-up", yOffset = 100, duration = 1) => {
  const elements = document.querySelectorAll(selector)

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target

          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration,
            ease: "power3.out",
            onStart: () => {
              el.style.visibility = "visible"
            },
          })

          observerInstance.unobserve(el)
        }
      })
    },
    { threshold: 0.1 }
  )

  elements.forEach(el => {
    el.style.opacity = 0
    el.style.transform = `translateY(${yOffset}px)`
    el.style.visibility = "hidden"
    observer.observe(el)
  })
}
