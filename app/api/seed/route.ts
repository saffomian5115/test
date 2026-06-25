import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/models/Product";

const dummyProducts = [
  { name: "iPhone 15 Pro Max", price: 1499.99, description: "Apple ka flagship phone with A17 Pro chip and titanium design.", image: "https://picsum.photos/seed/iphone/400/300" },
  { name: "Samsung Galaxy S24 Ultra", price: 1299.99, description: "Samsung ka top-tier phone with S Pen and AI features.", image: "https://picsum.photos/seed/samsung/400/300" },
  { name: "MacBook Air M3", price: 1299.99, description: "Ultra-thin laptop with Apple M3 chip, 15-inch display.", image: "https://picsum.photos/seed/macbook/400/300" },
  { name: "Sony WH-1000XM5", price: 349.99, description: "Industry-leading noise cancelling wireless headphones.", image: "https://picsum.photos/seed/sony/400/300" },
  { name: "Apple AirPods Pro 2", price: 249.99, description: "Adaptive audio, active noise cancellation with USB-C.", image: "https://picsum.photos/seed/airpods/400/300" },
  { name: "Logitech MX Master 3S", price: 99.99, description: "Premium wireless mouse with ergonomic design.", image: "https://picsum.photos/seed/mouse/400/300" },
  { name: "Samsung 49-inch Odyssey G9", price: 1399.99, description: "Ultra-wide gaming monitor with 240Hz refresh rate.", image: "https://picsum.photos/seed/monitor/400/300" },
  { name: "PlayStation 5 Slim", price: 449.99, description: "Sony gaming console with ultra-fast SSD.", image: "https://picsum.photos/seed/ps5/400/300" },
  { name: "Nintendo Switch OLED", price: 349.99, description: "Gaming console with vibrant 7-inch OLED screen.", image: "https://picsum.photos/seed/switch/400/300" },
  { name: "Apple Watch Ultra 2", price: 799.99, description: "Rugged smartwatch with precision dual-frequency GPS.", image: "https://picsum.photos/seed/watch/400/300" },
  { name: "iPad Pro M4", price: 1099.99, description: "Apple's most powerful tablet with Ultra Retina XDR display.", image: "https://picsum.photos/seed/ipad/400/300" },
  { name: "Nike Air Jordan 1", price: 189.99, description: "Classic sneakers with iconic design and premium leather.", image: "https://picsum.photos/seed/jordan/400/300" },
  { name: "Adidas Ultraboost Light", price: 179.99, description: "Lightweight running shoes with responsive boost midsole.", image: "https://picsum.photos/seed/adidas/400/300" },
  { name: "Levi's 501 Original Fit", price: 69.99, description: "Classic straight-leg jeans since 1873, 100% cotton.", image: "https://picsum.photos/seed/levi/400/300" },
  { name: "Ray-Ban Aviator Classic", price: 163.99, description: "Legendary sunglasses with gold frame and green lenses.", image: "https://picsum.photos/seed/rayban/400/300" },
  { name: "Fossil Gen 6 Smartwatch", price: 249.99, description: "Wear OS smartwatch with AMOLED display and GPS.", image: "https://picsum.photos/seed/fossil/400/300" },
  { name: "Kindle Paperwhite", price: 139.99, description: "Waterproof e-reader with 6.8-inch glare-free display.", image: "https://picsum.photos/seed/kindle/400/300" },
  { name: "Bose SoundLink Max", price: 399.99, description: "Portable Bluetooth speaker with deep bass and 20hr battery.", image: "https://picsum.photos/seed/bose/400/300" },
  { name: "Dyson Airwrap Complete", price: 599.99, description: "Multi-styler hair dryer with Coanda airflow technology.", image: "https://picsum.photos/seed/dyson/400/300" },
  { name: "Nespresso Vertuo Next", price: 179.99, description: "Coffee machine with Centrifusion technology, 5 cup sizes.", image: "https://picsum.photos/seed/nespresso/400/300" },
  { name: "Instant Pot Duo Plus", price: 89.99, description: "9-in-1 electric pressure cooker, slow cooker, rice cooker.", image: "https://picsum.photos/seed/instantpot/400/300" },
  { name: "YETI Rambler 64 oz", price: 55.99, description: "Double-wall vacuum insulated water bottle, dishwasher safe.", image: "https://picsum.photos/seed/yeti/400/300" },
  { name: "Canon EOS R6 Mark II", price: 2499.99, description: "Full-frame mirrorless camera with 24.2MP and 4K video.", image: "https://picsum.photos/seed/canon/400/300" },
  { name: "Nintendo Pro Controller", price: 69.99, description: "Wireless controller with HD rumble and motion controls.", image: "https://picsum.photos/seed/procon/400/300" },
  { name: "Anker PowerCore 26800", price: 59.99, description: "26800mAh portable charger with dual USB-C and fast charging.", image: "https://picsum.photos/seed/anker/400/300" },
];

export async function POST() {
  try {
    await connectToDatabase();

    // Purane products delete karo
    await Product.deleteMany({});
    const inserted = await Product.insertMany(dummyProducts);

    return NextResponse.json({
      message: `✅ ${inserted.length} products successfully seeded!`,
      count: inserted.length,
    });
  } catch (error) {
    console.error("Error seeding products:", error);
    return NextResponse.json(
      { error: "Failed to seed products" },
      { status: 500 }
    );
  }
}
