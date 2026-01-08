'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiUpload, FiCheckCircle } from 'react-icons/fi'
import { products } from '@/data/products'

interface ProductFormData {
  name: string
  description: string
  price: number
  category: string
  image: string | File | null
  imagePreview: string | null
}

export default function AddProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: null,
    imagePreview: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const categories = Array.from(new Set(products.map(p => p.category)))
  const [newCategory, setNewCategory] = useState('')
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'category' && value === 'New Category') {
      setShowNewCategoryInput(true)
      setFormData(prev => ({ ...prev, category: '' }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) || 0 : value,
      }))
      if (showNewCategoryInput && name === 'category') {
        setShowNewCategoryInput(false)
      }
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      setFormData(prev => ({
        ...prev,
        image: file,
      }))

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imagePreview: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Generate new product ID
      const newId = Math.max(...products.map(p => p.id), 0) + 1

      // Handle image upload
      let imageUrl = ''
      if (formData.image instanceof File) {
        // For now, we'll save to localStorage and use data URL
        // In production, you'd upload to a server/cloud storage
        const reader = new FileReader()
        reader.onloadend = () => {
          const dataUrl = reader.result as string
          
          // Save product to localStorage
          const newProduct = {
            id: newId,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            category: formData.category,
            image: dataUrl,
            featured: false,
          }

          // Get existing products from localStorage or use default
          const storedProducts = localStorage.getItem('customProducts')
          const customProducts = storedProducts ? JSON.parse(storedProducts) : []
          customProducts.push(newProduct)
          localStorage.setItem('customProducts', JSON.stringify(customProducts))

          setSuccess(true)
          setTimeout(() => {
            router.push('/products')
          }, 2000)
        }
        reader.readAsDataURL(formData.image)
      } else {
        // If no image, use placeholder
        const newProduct = {
          id: newId,
          name: formData.name,
          description: formData.description,
          price: formData.price,
          category: formData.category,
          image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=500&h=500&fit=crop&q=80',
          featured: false,
        }

        const storedProducts = localStorage.getItem('customProducts')
        const customProducts = storedProducts ? JSON.parse(storedProducts) : []
        customProducts.push(newProduct)
        localStorage.setItem('customProducts', JSON.stringify(customProducts))

        setSuccess(true)
        setTimeout(() => {
          router.push('/products')
        }, 2000)
      }
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Error adding product. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <FiCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Product Added Successfully!</h1>
          <p className="text-gray-600 mb-8">Redirecting to products page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/products"
        className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition mb-6 font-medium"
      >
        <FiArrowLeft className="w-5 h-5" />
        Back to Products
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Add New Product</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:shadow-md focus:shadow-red-100 focus:bg-gray-50 transition-all duration-300"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-600">*</span>
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:shadow-md focus:shadow-red-100 focus:bg-gray-50 transition-all duration-300"
              placeholder="Enter product description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:shadow-md focus:shadow-red-100 focus:bg-gray-50 transition-all duration-300"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-600">*</span>
              </label>
              {showNewCategoryInput ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="category"
                    required
                    value={newCategory}
                    onChange={(e) => {
                      setNewCategory(e.target.value)
                      setFormData(prev => ({ ...prev, category: e.target.value }))
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:shadow-md focus:shadow-red-100 focus:bg-gray-50 transition-all duration-300"
                    placeholder="Enter new category name"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewCategoryInput(false)
                      setNewCategory('')
                      setFormData(prev => ({ ...prev, category: '' }))
                    }}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:shadow-md focus:shadow-red-100 focus:bg-gray-50 transition-all duration-300"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                  <option value="New Category">+ Add New Category</option>
                </select>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image <span className="text-red-600">*</span>
            </label>
            <div className="space-y-4">
              {formData.imagePreview && (
                <div className="relative w-64 h-64 border-2 border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>
            <Link
              href="/products"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

