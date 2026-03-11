"use client"

import Script from "next/script"

interface InstagramFeedProps {
  widgetId: string
}

export function InstagramFeed({ widgetId }: InstagramFeedProps) {
  if (!widgetId) return null

  return (
    <>
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        strategy="lazyOnload"
      />
      <div className={`elfsight-app-${widgetId}`} />
    </>
  )
}
