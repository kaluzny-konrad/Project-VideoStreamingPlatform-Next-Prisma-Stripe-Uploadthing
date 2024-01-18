import UploadZone from '@/components/UploadZone'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>Upload zone:</p>
        <UploadZone />
    </main>
  )
}
