# Product Images Guide

## How to Add Real Product Images

To replace placeholder images with actual product images, follow these steps:

### Option 1: Download and Host Images Locally (Recommended)

1. **Download Product Images**:
   - Visit Indian e-commerce sites (Amazon.in, Flipkart, Snapdeal) or manufacturer websites
   - Search for each product by name
   - Right-click on product images and "Save Image As"
   - Save images with descriptive names (e.g., `grass-herbs-hair-color.jpg`)

2. **Organize Images**:
   - Create folder: `public/images/products/`
   - Place all product images in this folder

3. **Update Product Data**:
   - Open `data/products.ts`
   - Replace image URLs with local paths:
     ```typescript
     image: '/images/products/grass-herbs-hair-color.jpg'
     ```

### Option 2: Use Direct Image URLs from E-commerce Sites

1. **Find Product Pages**:
   - Search for products on Amazon.in, Flipkart, etc.
   - Right-click on product image → "Copy Image Address"
   - Use the direct image URL in your product data

2. **Example URLs** (replace with actual product URLs):
   - Amazon India: `https://m.media-amazon.com/images/I/[IMAGE_ID]._SL1500_.jpg`
   - Flipkart: `https://rukminim2.flipkart.com/image/[IMAGE_ID]`

### Products That Need Images:

**Hair Colors:**
- Grass Herbs Hair Color
- Fruit Veniger Hair Color
- Color Beauty Wine Color
- Mint Hair Color
- Lavender Hair Color

**Trimmers:**
- Kemei 3909
- Kemei 657
- Gemei 6005
- Gemei 654
- Gemei 8046
- Whal Trimmer Super Tapper

### Image Requirements:
- **Format**: JPG or PNG
- **Size**: 500x500px minimum (1000x1000px recommended)
- **Aspect Ratio**: Square (1:1) preferred
- **File Size**: Under 500KB per image

### Quick Update Steps:

1. Download images for all products
2. Save to `public/images/products/` folder
3. Update `data/products.ts` with new image paths
4. Test the website to ensure all images load correctly


