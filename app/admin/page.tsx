'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiPlus, FiImage, FiX, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'

interface ProductFormData {
  name: string
  description: string
  category: string
  image: string
  imageFile: File | null
}

export default function AdminPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    image: '',
    imageFile: null,
  })
  const [preview, setPreview] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const categories = [
    'Hair Color',
    'Trimmer',
    'Hair Care',
    'Styling Tools',
    'Accessories',
    'Oils',
    'Blades',
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please select a valid image file' })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size should be less than 5MB' })
        return
      }

      setFormData(prev => ({ ...prev, imageFile: file }))

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
        setFormData(prev => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, imageFile: null, image: '' }))
    setPreview('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      // Get existing products from localStorage
      const existingProducts = JSON.parse(localStorage.getItem('customProducts') || '[]')
      
      // Generate new product ID
      const newId = existingProducts.length > 0 
        ? Math.max(...existingProducts.map((p: any) => p.id)) + 1 
        : 1000

      // Create product object
      const newProduct = {
        id: newId,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: 0, // Price is hidden, so set to 0
        image: formData.image, // Base64 image
        featured: false,
      }

      // Add to localStorage
      existingProducts.push(newProduct)
      localStorage.setItem('customProducts', JSON.stringify(existingProducts))

      setMessage({ type: 'success', text: 'Product added successfully!' })
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        image: '',
        imageFile: null,
      })
      setPreview('')

      // Reload page after 2 seconds to show new product
      setTimeout(() => {
        router.refresh()
      }, 2000)

    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add product. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition mb-6 font-medium"
      >
        <FiArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Add New Product</h1>
        <p className="text-gray-600 mb-8">Upload product image and enter product details</p>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Kemei 3909 Hair Trimmer"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:shadow-md focus:shadow-red-100 focus:bg-gray-50 transition-all duration-300"
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the product features and benefits..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:shadow-md focus:shadow-red-100 focus:bg-gray-50 transition-all duration-300 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:shadow-md focus:shadow-red-100 focus:bg-gray-50 transition-all duration-300"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image <span className="text-red-500">*</span>
            </label>
            
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Product preview"
                  className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiImage className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required={!preview}
                />
              </label>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiPlus className="w-5 h-5" />
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>
            <Link
              href="/products"
              className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-red-600 hover:text-red-600 transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

