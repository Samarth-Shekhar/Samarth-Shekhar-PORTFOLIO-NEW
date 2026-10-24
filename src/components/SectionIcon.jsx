function SectionIcon({ type }) {
  if (type === 'stats') {
    // Analytics graph icon matching reference image 3: rounded box with bar lines & corner dot
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3.5" y="4.5" width="17" height="15" rx="3.5" />
        <circle cx="16" cy="8.5" r="1.4" fill="currentColor" />
        <path d="M7.5 15.5v-3.5M11.5 15.5v-6M15.5 15.5v-2" strokeWidth="2.2" />
      </svg>
    )
  }

  if (type === 'projects') {
    // 3-node connected network triangle matching reference image 2
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="6" r="2.2" />
        <circle cx="6" cy="18" r="2.2" />
        <circle cx="18" cy="18" r="2.2" />
        <path d="m10.5 7.8-3.4 8.4M13.5 7.8l3.4 8.4M8.2 18h7.6" />
      </svg>
    )
  }

  if (type === 'experience') {
    // Modern executive briefcase / product ledger icon
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="3" />
        <path d="M8.5 7V4.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5V7" />
        <path d="M3 12h18" opacity="0.6" />
        <rect x="10" y="11" width="4" height="3" rx="1" fill="currentColor" />
      </svg>
    )
  }

  if (type === 'extracurricular') {
    // Dynamic spark / community orbit trophy icon
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l2.4 5.2 5.6.8-4 4 1 5.8-5-2.8-5 2.8 1-5.8-4-4 5.6-.8Z" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    )
  }

  if (type === 'education') {
    // Academic cap with tassel
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2.5 9.5 12 4.5l9.5 5-9.5 5Z" />
        <path d="M6 12.2V17c0 1.8 2.7 3.2 6 3.2s6-1.4 6-3.2v-4.8" />
        <path d="M21.5 9.5v6" />
      </svg>
    )
  }

  if (type === 'skills') {
    // Tech terminal prompt / code diamond icon
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m8 9-4 3 4 3M16 9l4 3-4 3M13 7l-2 10" />
      </svg>
    )
  }

  if (type === 'faq') {
    // Rounded chat speech bubble with question prompt
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 12a8 8 0 0 0-8-8c-4.4 0-8 3.6-8 8 0 1.8.6 3.5 1.7 4.9L4 21l4.4-1.6c1.1.6 2.3 1 3.6 1a8 8 0 0 0 8-8Z" />
        <path d="M10.2 9.5a1.8 1.8 0 1 1 3.1 1.3c-.9.9-1.3 1.2-1.3 2.2" strokeWidth="2" />
        <circle cx="12" cy="15.8" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m12 8 4 4-4 4M8 12h8" />
    </svg>
  )
}

export default SectionIcon
