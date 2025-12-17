import Hero from '@/components/Hero'
import CategoryGrid from '@/components/CategoryGrid'

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Shop by Category
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Explore our wide range of professional salon products
        </p>
        <CategoryGrid />
      </div>
    </div>
  )
}

