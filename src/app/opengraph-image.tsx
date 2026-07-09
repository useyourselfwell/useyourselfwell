import { ImageResponse } from 'next/og'
import { siteConfig } from "@/lib/course"

export const alt = 'Use Yourself Well — Alexander Technique, Bountiful Utah'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/jpeg'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: '#FAFAFA',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 80,
          fontFamily: 'serif',
          color: '#1A1A1A',
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 'bold' }}>{siteConfig.name}</div>
        <div style={{ fontSize: 48, marginTop: 40, color: '#4A4A4A' }}>Alexander Technique Lessons</div>
        <div style={{ fontSize: 40, marginTop: 20, color: '#6A6A6A', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Bountiful, Utah</div>
      </div>
    ),
    { ...size }
  )
}
