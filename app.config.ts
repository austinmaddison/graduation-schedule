export default defineAppConfig({
  global: {
    picture: {
      dark: 'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      light: 'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/',
    email: 'ui-pro@nuxt.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'neutral',
      neutral: 'neutral'
    },
    icons: {
      arrowLeft: 'i-material-symbols-arrow-back-rounded',
      arrowRight: 'i-material-symbols-arrow-forward-rounded',
      check: 'i-material-symbols-check-rounded',
      chevronDown: 'i-material-symbols-keyboard-arrow-down-rounded',
      chevronLeft: 'i-material-symbols-chevron-left-rounded',
      chevronRight: 'i-material-symbols-chevron-right-rounded',
      chevronUp: 'i-material-symbols-keyboard-arrow-up-rounded',
      close: 'i-material-symbols-close-rounded',
      ellipsis: 'i-material-symbols-more-horiz-rounded',
      external: 'i-material-symbols-open-in-new-rounded',
      loading: 'i-material-symbols-progress-activity',
      minus: 'i-material-symbols-remove-rounded',
      plus: 'i-material-symbols-add-rounded',
      search: 'i-material-symbols-search-rounded'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  }
})
