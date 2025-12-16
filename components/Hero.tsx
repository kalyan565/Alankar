import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Alankar Cosmetics
          </h1>
          <p className="text-xl mb-8 text-primary-100">
            Your trusted local salon in Andhra Pradesh - Premium hair care products, styling tools, and beauty essentials
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

