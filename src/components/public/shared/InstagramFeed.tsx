"use client"

import Script from "next/script"

interface InstagramFeedProps {
  widgetId?: string
}

const DEFAULT_WIDGET_ID = "83639f75-3a97-49cf-8505-9452729c0c8f"

export function InstagramFeed({ widgetId }: InstagramFeedProps) {
  const id = widgetId || DEFAULT_WIDGET_ID

  return (
    <>
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="lazyOnload"
      />
      <div className={`elfsight-app-${id}`} data-elfsight-app-lazy />
    </>
  )
}
