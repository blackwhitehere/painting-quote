import { Metadata } from "next"
import { PaintingEstimator } from "../components/PaintingEstimator/PaintingEstimator"

export const metadata: Metadata = {
  title: "Painting Job Estimator",
  description: "Get an instant quote for your painting job",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="mb-8 text-3xl font-bold text-center">Painting Job Estimator</h1>
      <PaintingEstimator />
    </main>
  )
}
