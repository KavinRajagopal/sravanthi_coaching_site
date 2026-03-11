"use client"

import Script from "next/script"

export function WhatsAppButton() {
  return (
    <>
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="lazyOnload"
      />
      <div className="elfsight-app-da6560df-783e-481a-8ad7-5ed42c760bb3" data-elfsight-app-lazy />
    </>
  )
}
