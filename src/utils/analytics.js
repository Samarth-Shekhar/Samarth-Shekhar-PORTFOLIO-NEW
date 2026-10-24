// Privacy-conscious client-side visitor analytics tracker

function getVisitorId() {
  let vid = localStorage.getItem('samarth_vid')
  if (!vid) {
    vid = 'v_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36)
    localStorage.setItem('samarth_vid', vid)
  }
  return vid
}

function getSessionId() {
  let sid = sessionStorage.getItem('samarth_sid')
  if (!sid) {
    sid = 's_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36)
    sessionStorage.setItem('samarth_sid', sid)
  }
  return sid
}

function getDeviceInfo() {
  const ua = navigator.userAgent
  let deviceType = 'desktop'
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    deviceType = 'tablet'
  } else if (/mobile|iphone|ipod|android|blackberry|iemobile/i.test(ua)) {
    deviceType = 'mobile'
  }

  let browser = 'Other'
  if (ua.includes('Firefox')) browser = 'Firefox'
  else if (ua.includes('SamsungBrowser')) browser = 'Samsung Internet'
  else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera'
  else if (ua.includes('Edge') || ua.includes('Edg')) browser = 'Edge'
  else if (ua.includes('Chrome')) browser = 'Chrome'
  else if (ua.includes('Safari')) browser = 'Safari'

  return { deviceType, browser }
}

export function trackEvent(eventType, options = {}) {
  // Exclude admin dashboard pages from public analytics
  if (window.location.pathname.startsWith('/admin')) {
    return
  }

  const { deviceType, browser } = getDeviceInfo()
  const payload = {
    eventType,
    sessionId: getSessionId(),
    visitorId: getVisitorId(),
    path: window.location.pathname + window.location.hash,
    referrer: document.referrer || '',
    deviceType,
    browser,
    targetLabel: options.targetLabel || '',
    targetUrl: options.targetUrl || '',
    durationSeconds: options.durationSeconds || 0,
  }

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
      navigator.sendBeacon('/api/analytics/track', blob)
    } else {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {})
    }
  } catch {}
}

export function initAnalytics() {
  if (typeof window === 'undefined') return

  // 1. Track initial Pageview
  trackEvent('pageview')

  // 2. Track outbound link clicks and resume interactions
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a')
    if (!target) return

    const href = target.getAttribute('href') || ''
    const text = target.innerText.trim() || target.getAttribute('aria-label') || ''

    if (href.includes('Resume') || href.includes('.pdf') || text.toLowerCase().includes('resume')) {
      trackEvent('resume_download', { targetLabel: text || 'Resume Link', targetUrl: href })
    } else if (href.startsWith('http') && !href.includes(window.location.host)) {
      trackEvent('click_external', { targetLabel: text || href, targetUrl: href })
    }
  })

  // 3. Track session engagement duration on unload
  const startTime = Date.now()
  window.addEventListener('beforeunload', () => {
    const duration = Math.round((Date.now() - startTime) / 1000)
    if (duration > 2) {
      trackEvent('heartbeat', { durationSeconds: duration })
    }
  })
}
