// import { useEffect } from "react";
// import iphoneImg from "../../assets/product-images/iphone.webp";

// import { BASE_URL } from "../../service";


// export const fetchAllProducts = () => {
 

//     const allProducts = [
//         {
//             id: 1,
//             name: "iPhone 13",
//             color: "Midnight",
//             condition: "Excellent",
//             oldPrice: 699.99,
//             currentPrice: 332.99,
//             material: "Aluminum",
//             image: iphoneImg,
//             popularity: 12,
//             tag: "Bestseller",
//             category: "Phones",
//             description: "The iPhone 13 offers impressive performance and long battery life in a sleek, durable aluminum body. With its advanced camera system and vibrant display, it's perfect for everyday use and photography."
//         },
//         {
//             id: 2,
//             name: "iPhone 15",
//             color: "Blue",
//             condition: "Brand New",
//             oldPrice: 999.99,
//             currentPrice: 595.99,
//             material: "Aluminum",
//             image: iphoneImg,
//             popularity: 27,
//             category: "Phones",
//             description: "Experience next-level innovation with the iPhone 15. It features a stunning design, powerful A-series chip, and industry-leading camera system for capturing moments with absolute clarity and style."
//         },
//         {
//             id: 3,
//             name: "iPhone 14",
//             color: "Red",
//             condition: "Good",
//             oldPrice: 799.99,
//             currentPrice: 406.99,
//             material: "Aluminum",
//             image: iphoneImg,
//             popularity: 5,
//             category: "Phones",
//             description: "The iPhone 14 combines performance and style with its robust features, making it a great value. It handles multitasking with ease and delivers rich visuals through its high-quality display."
//         },
//         {
//             id: 4,
//             name: "iPhone SE",
//             color: "White",
//             condition: "Excellent",
//             oldPrice: 499.99,
//             currentPrice: 199.99,
//             material: "Aluminum",
//             image: iphoneImg,
//             popularity: 33,
//             category: "Phones",
//             description: "Compact, powerful, and affordable, the iPhone SE brings you incredible performance in a classic design. Ideal for users who want Apple’s features in a smaller, budget-friendly form."
//         },
//         {
//             id: 5,
//             name: "iPhone 12",
//             color: "Black",
//             condition: "Good",
//             oldPrice: 649.99,
//             currentPrice: 299.99,
//             material: "Aluminum",
//             image: iphoneImg,
//             popularity: 19,
//             category: "Phones",
//             description: "The iPhone 12 delivers outstanding performance and a beautiful OLED display. It’s a great choice for users who want premium Apple features at a much more accessible price."
//         },
//         {
//             id: 6,
//             name: "PS5",
//             color: "White",
//             condition: "Brand New",
//             oldPrice: 599.99,
//             currentPrice: 499.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 8,
//             category: "Consoles",
//             description: "The PS5 brings lightning-fast load times, stunning graphics, and immersive gaming with haptic feedback and adaptive triggers. Dive into next-gen gaming with an extensive library of exclusive titles."
//         },
//         {
//             id: 7,
//             name: "Xbox One",
//             color: "Black",
//             condition: "Good",
//             oldPrice: 449.99,
//             currentPrice: 279.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 24,
//             category: "Consoles",
//             description: "Enjoy a huge library of games, streaming apps, and multiplayer options with the Xbox One. A great choice for casual and hardcore gamers looking for entertainment versatility."
//         },
//         {
//             id: 8,
//             name: "Canon EOS",
//             color: "Black",
//             condition: "Excellent",
//             oldPrice: 999.99,
//             currentPrice: 749.99,
//             material: "Metal",
//             image: iphoneImg,
//             popularity: 36,
//             category: "Cameras",
//             description: "Capture every moment with stunning clarity using the Canon EOS. With powerful autofocus, high-resolution imaging, and versatile lens compatibility, it’s ideal for photographers at any level."
//         },
//         {
//             id: 9,
//             name: "Nikon Z5",
//             color: "Grey",
//             condition: "Brand New",
//             oldPrice: 1099.99,
//             currentPrice: 899.99,
//             material: "Metal",
//             image: iphoneImg,
//             popularity: 15,
//             category: "Cameras",
//             description: "The Nikon Z5 delivers full-frame photography in a compact body. With 4K video, dual SD slots, and image stabilization, it’s great for creators seeking quality and portability."
//         },
//         {
//             id: 10,
//             name: "Samsung TV",
//             color: "Black",
//             condition: "Good",
//             oldPrice: 799.99,
//             currentPrice: 499.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 31,
//             tag: "Premium",
//             category: "TVs",
//             description: "This Samsung TV offers vivid picture quality and smart features for an immersive viewing experience. Perfect for streaming, gaming, and everyday entertainment with minimal input lag."
//         },
//         {
//             id: 11,
//             name: "LG OLED",
//             color: "Silver",
//             condition: "Brand New",
//             oldPrice: 1199.99,
//             currentPrice: 999.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 2,
//             category: "TVs",
//             description: "Experience deep blacks and vibrant colors with this LG OLED TV. Its ultra-thin design, AI-powered features, and cinematic quality make it the ultimate home entertainment upgrade."
//         },
//         {
//             id: 12,
//             name: "Asus Laptop",
//             color: "Grey",
//             condition: "Excellent",
//             oldPrice: 899.99,
//             currentPrice: 699.99,
//             material: "Metal",
//             image: iphoneImg,
//             popularity: 40,
//             category: "Laptops",
//             description: "This Asus laptop combines power, speed, and portability for work or play. With a sleek build and fast processor, it’s ideal for students, professionals, and gamers on the go."
//         },
//         {
//             id: 13,
//             name: "HP Pavilion",
//             color: "Black",
//             condition: "Good",
//             oldPrice: 799.99,
//             currentPrice: 549.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 17,
//             category: "Laptops",
//             description: "A reliable everyday laptop, the HP Pavilion offers smooth performance, a full HD display, and long battery life. Great for browsing, streaming, schoolwork, and light productivity."
//         },
//         {
//             id: 14,
//             name: "Logi Mouse",
//             color: "White",
//             condition: "Brand New",
//             oldPrice: 49.99,
//             currentPrice: 29.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 29,
//             tag: "Budget",
//             category: "Accessories",
//             description: "The Logi Mouse offers smooth tracking, ergonomic design, and reliable wireless connectivity. Perfect for office work or casual use, it’s compact and highly responsive for every task."
//         },
//         {
//             id: 15,
//             name: "iPad Mini",
//             color: "Gold",
//             condition: " 특정한",
//             oldPrice: 499.99,
//             currentPrice: 349.99,
//             material: "Aluminum",
//             image: iphoneImg,
//             popularity: 10,
//             category: "Tablets",
//             description: "The iPad Mini delivers powerful performance in a compact size. Ideal for reading, sketching, browsing, or streaming, it’s lightweight and features Apple’s smooth and secure iOS experience."
//         },
//         {
//             id: 16,
//             name: "iMac 24",
//             color: "Blue",
//             condition: "Brand New",
//             oldPrice: 1399.99,
//             currentPrice: 1199.99,
//             material: "Metal",
//             image: iphoneImg,
//             popularity: 22,
//             category: "Desktops",
//             description: "The iMac 24 is a sleek all-in-one desktop with a brilliant Retina display, M1 chip, and minimal footprint. Ideal for creatives and productivity lovers alike with Apple performance."
//         },
//         {
//             id: 17,
//             name: "Canon Printer",
//             color: "Black",
//             condition: "Good",
//             oldPrice: 199.99,
//             currentPrice: 149.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 38,
//             category: "Printers",
//             description: "Get reliable prints every time with the Canon Printer. Great for home or office use, it supports wireless printing and delivers crisp text and vibrant photo-quality results."
//         },
//         {
//             id: 18,
//             name: "Sony Cam",
//             color: "Black",
//             condition: "Excellent",
//             oldPrice: 699.99,
//             currentPrice: 549.99,
//             material: "Metal",
//             image: iphoneImg,
//             popularity: 4,
//             category: "Cameras",
//             description: "Record your memories with the Sony Cam featuring advanced stabilization, HD video, and a compact design. It's a great companion for travel, vlogging, or capturing life’s moments."
//         },
//         {
//             id: 19,
//             name: "Galaxy S22",
//             color: "Purple",
//             condition: "Brand New",
//             oldPrice: 999.99,
//             currentPrice: 749.99,
//             material: "Glass",
//             image: iphoneImg,
//             popularity: 26,
//             category: "Phones",
//             description: "The Galaxy S22 blends premium performance with modern aesthetics. Packed with features like a pro-grade camera, AMOLED display, and fast charging—it’s a flagship experience at its best."
//         },
//         {
//             id: 20,
//             name: "OnePlus 11",
//             color: "Green",
//             condition: "Good",
//             oldPrice: 799.99,
//             currentPrice: 599.99,
//             material: "Glass",
//             image: iphoneImg,
//             popularity: 14,
//             category: "Phones",
//             description: "The OnePlus 11 delivers a fast and fluid user experience with its powerful processor and 120Hz display. A fantastic Android choice for users seeking speed, power, and design."
//         },
//         {
//             id: 21,
//             name: "Nintendo Switch OLED",
//             color: "White",
//             condition: "Brand New",
//             oldPrice: 349.99,
//             currentPrice: 299.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 32,
//             category: "Consoles",
//             description: "The Nintendo Switch OLED offers a vibrant 7-inch display and versatile gaming modes for home or on-the-go play. Perfect for family fun and iconic titles like Mario and Zelda."
//         },
//         {
//             id: 22,
//             name: "Xbox Series S",
//             color: "White",
//             condition: "Excellent",
//             oldPrice: 299.99,
//             currentPrice: 249.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 7,
//             category: "Consoles",
//             description: "Compact yet powerful, the Xbox Series S delivers next-gen gaming with fast load times and up to 120 FPS. Ideal for digital gamers with access to Game Pass."
//         },
//         {
//             id: 23,
//             name: "Fujifilm X-T4",
//             color: "Silver",
//             condition: "Brand New",
//             oldPrice: 1699.99,
//             currentPrice: 1399.99,
//             material: "Metal",
//             image: iphoneImg,
//             popularity: 20,
//             category: "Cameras",
//             description: "The Fujifilm X-T4 offers pro-level performance with in-body stabilization and 4K video. Its retro design and film-like color profiles make it a favorite for creative photographers."
//         },
//         {
//             id: 24,
//             name: "GoPro HERO11",
//             color: "Black",
//             condition: "Good",
//             oldPrice: 399.99,
//             currentPrice: 299.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 35,
//             category: "Cameras",
//             description: "Capture epic adventures with the GoPro HERO11. Waterproof, rugged, and equipped with 5.3K video, it’s perfect for action shots and extreme sports enthusiasts."
//         },
//         {
//             id: 25,
//             name: "Sony Bravia XR",
//             color: "Black",
//             condition: "Brand New",
//             oldPrice: 1499.99,
//             currentPrice: 1299.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 11,
//             category: "TVs",
//             description: "The Sony Bravia XR delivers stunning 4K visuals with cognitive processing for lifelike images. Perfect for movies and gaming with HDMI 2.1 and low input lag."
//         },
//         {
//             id: 26,
//             name: "TCL 6-Series",
//             color: "Black",
//             condition: "Excellent",
//             oldPrice: 699.99,
//             currentPrice: 549.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 28,
//             category: "TVs",
//             description: "The TCL 6-Series offers QLED technology and Roku smart features at a budget-friendly price. Great for vibrant colors and seamless streaming in any living room."
//         },
//         {
//             id: 27,
//             name: "MacBook Air M2",
//             color: "Silver",
//             condition: "Brand New",
//             oldPrice: 1199.99,
//             currentPrice: 999.99,
//             material: "Aluminum",
//             image: iphoneImg,
//             popularity: 3,
//             category: "Laptops",
//             description: "The MacBook Air M2 offers incredible performance with a fanless design and Retina display. Perfect for professionals and creatives needing power and portability."
//         },
//         {
//             id: 28,
//             name: "Dell XPS 13",
//             color: "Platinum",
//             condition: "Excellent",
//             oldPrice: 1299.99,
//             currentPrice: 1099.99,
//             material: "Aluminum",
//             image: iphoneImg,
//             popularity: 39,
//             category: "Laptops",
//             description: "The Dell XPS 13 combines premium build quality with a 13.4-inch 4K display. Ideal for multitasking and productivity with its powerful Intel processor."
//         },
//         {
//             id: 29,
//             name: "Anker PowerBank",
//             color: "Black",
//             condition: "Brand New",
//             oldPrice: 59.99,
//             currentPrice: 39.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 16,
//             category: "Accessories",
//             description: "The Anker PowerBank provides fast charging with a 20,000mAh capacity. Compact and durable, it’s perfect for keeping your devices powered during travel or long days."
//         },
//         {
//             id: 30,
//             name: "Sony WH-1000XM5",
//             color: "Black",
//             condition: "Excellent",
//             oldPrice: 399.99,
//             currentPrice: 349.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 23,
//             category: "Accessories",
//             description: "The Sony WH-1000XM5 headphones deliver industry-leading noise cancellation and rich audio. Ideal for music lovers and professionals needing focus in any environment."
//         },
//         {
//             id: 31,
//             name: "Apple AirPods Pro",
//             color: "White",
//             condition: "Brand New",
//             oldPrice: 249.99,
//             currentPrice: 199.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 34,
//             category: "Accessories",
//             description: "The AirPods Pro offer active noise cancellation and immersive sound in a sleek design. Perfect for workouts, calls, and seamless integration with Apple devices."
//         },
//         {
//             id: 32,
//             name: "Samsung Galaxy Tab S8",
//             color: "Graphite",
//             condition: "Brand New",
//             oldPrice: 699.99,
//             currentPrice: 549.99,
//             material: "Aluminum",
//             image: iphoneImg,
//             popularity: 1,
//             category: "Tablets",
//             description: "The Galaxy Tab S8 offers a vibrant AMOLED display and S Pen support. Great for productivity, gaming, and entertainment with its powerful processor and sleek design."
//         },
//         {
//             id: 33,
//             name: "iPad Air",
//             color: "Space Grey",
//             condition: "Excellent",
//             oldPrice: 599.99,
//             currentPrice: 499.99,
//             material: "Aluminum",
//             image: iphoneImg,
//             popularity: 30,
//             category: "Tablets",
//             description: "The iPad Air combines power and portability with the M1 chip and Apple Pencil support. Ideal for creatives and professionals needing a versatile tablet."
//         },
//         {
//             id: 34,
//             name: "Amazon Fire HD 10",
//             color: "Black",
//             condition: "Good",
//             oldPrice: 149.99,
//             currentPrice: 99.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 13,
//             category: "Tablets",
//             description: "The Amazon Fire HD 10 is a budget-friendly tablet for streaming, reading, and light productivity. With Alexa integration, it’s perfect for casual users."
//         },
//         {
//             id: 35,
//             name: "HP Envy Desktop",
//             color: "Black",
//             condition: "Excellent",
//             oldPrice: 999.99,
//             currentPrice: 799.99,
//             material: "Metal",
//             image: iphoneImg,
//             popularity: 25,
//             category: "Desktops",
//             description: "The HP Envy Desktop offers powerful performance for work and entertainment. With a fast processor and ample storage, it’s great for multitasking and creative projects."
//         },
//         {
//             id: 36,
//             name: "Dell Inspiron",
//             color: "Silver",
//             condition: "Good",
//             oldPrice: 799.99,
//             currentPrice: 649.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 37,
//             category: "Desktops",
//             description: "The Dell Inspiron is a reliable desktop for home or office use. It offers solid performance for browsing, streaming, and productivity with a compact design."
//         },
//         {
//             id: 37,
//             name: "Lenovo IdeaCentre",
//             color: "Grey",
//             condition: "Brand New",
//             oldPrice: 1199.99,
//             currentPrice: 999.99,
//             material: "Metal",
//             image: iphoneImg,
//             popularity: 9,
//             category: "Desktops",
//             description: "The Lenovo IdeaCentre delivers high performance with a sleek design. Perfect for gaming, video editing, and heavy multitasking with its robust hardware."
//         },
//         {
//             id: 38,
//             name: "Epson EcoTank",
//             color: "White",
//             condition: "Brand New",
//             oldPrice: 299.99,
//             currentPrice: 249.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 18,
//             category: "Printers",
//             description: "The Epson EcoTank offers cost-effective printing with high-capacity ink tanks. Ideal for home or small offices, it delivers vibrant colors and sharp text with wireless connectivity."
//         },
//         {
//             id: 39,
//             name: "HP LaserJet Pro",
//             color: "White",
//             condition: "Excellent",
//             oldPrice: 349.99,
//             currentPrice: 279.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 21,
//             category: "Printers",
//             description: "The HP LaserJet Pro provides fast, high-quality monochrome printing for small businesses. With wireless and mobile printing, it’s efficient and easy to use."
//         },
//         {
//             id: 40,
//             name: "Brother Inkjet",
//             color: "Black",
//             condition: "Good",
//             oldPrice: 179.99,
//             currentPrice: 129.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 6,
//             category: "Printers",
//             description: "The Brother Inkjet is a versatile all-in-one printer for home use. It offers reliable printing, scanning, and copying with affordable ink and wireless features."
//         },
//         {
//             id: 41,
//             name: "Apple Magic Mouse 3",
//             color: "White",
//             condition: "Brand New",
//             oldPrice: 99.99,
//             currentPrice: 79.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 12,
//             category: "Apple",
//             description: "The Apple Magic Mouse 3 offers a sleek, wireless design with multi-touch surface for intuitive navigation. Perfect for Mac users seeking seamless performance and elegant style in their workspace."
//         },
//         {
//             id: 42,
//             name: "Apple HomePod Mini",
//             color: "Space Grey",
//             condition: "Excellent",
//             oldPrice: 129.99,
//             currentPrice: 99.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 18,
//             category: "Apple",
//             description: "The Apple HomePod Mini delivers rich 360-degree audio in a compact design. With Siri integration and smart home controls, it’s the perfect addition to any Apple ecosystem household."
//         },
//         {
//             id: 43,
//             name: "Apple Watch Series 7",
//             color: "Blue",
//             condition: "Good",
//             oldPrice: 399.99,
//             currentPrice: 299.99,
//             material: "Aluminum",
//             image: iphoneImg,
//             popularity: 25,
//             category: "Apple",
//             description: "Stay connected and healthy with the Apple Watch Series 7. Featuring a larger display, advanced health sensors, and fast charging, it’s ideal for fitness tracking and daily productivity."
//         },
//         {
//             id: 44,
//             name: "Apple AirTag",
//             color: "White",
//             condition: "Brand New",
//             oldPrice: 39.99,
//             currentPrice: 29.99,
//             material: "Plastic",
//             image: iphoneImg,
//             popularity: 7,
//             category: "Apple",
//             description: "Keep track of your belongings with Apple AirTag. Its precision finding, easy setup, and seamless integration with the Find My app make it a must-have for Apple users on the go."
//         },
//         {
//             id: 45,
//             name: "Apple Magic Keyboard",
//             color: "Silver",
//             condition: "Excellent",
//             oldPrice: 149.99,
//             currentPrice: 119.99,
//             material: "Aluminum",
//             image: iphoneImg,
//             popularity: 15,
//             category: "Apple",
//             description: "The Apple Magic Keyboard provides a comfortable, precise typing experience with a sleek, rechargeable design. Perfect for Mac and iPad users who value portability and Apple’s signature style."
//         }
//     ];

//     return allProducts
// }

















//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




import { useEffect } from "react";
import { BASE_URL } from "../../service";

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/inventory`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const jsonData = await response.json();
    const apiProducts = jsonData.data.data;
    
    // Map API data to the format your application expects
    const mappedProducts = apiProducts.map((item, index) => {
      // Extract product and variant information
      const { variant, supplier } = item;
      const { product } = variant;
      
      return {
        id: item.id,
        name: product.model_name,
        color: variant.color,
        condition: item.condition,
        oldPrice: parseFloat(item.selling_price),
        currentPrice: item.discount_price 
          ? item.discount_type === "fixed" 
            ? parseFloat(item.selling_price) - parseFloat(item.discount_price)
            : parseFloat(item.selling_price) * (1 - parseFloat(item.discount_price) / 100)
          : parseFloat(item.selling_price),
        material: "Aluminum", // Default if not provided in API
        image: product.feature_imageUrl,
        popularity: Math.floor(Math.random() * 40) + 1, // Random popularity if not in API
        category: product.category,
        description: product.description,
        tag: index === 0 ? "Bestseller" : undefined, // Example tag logic
        storage: variant.storage_gb ? `${variant.storage_gb}GB` : undefined,
        networkType: variant.network_type,
        brand: product.brand ? product.brand.brand_name : undefined,
        barcode: item.barcode,
        stockStatus: item.stock_status,
        location: item.location,
        imei: item.imei,
        serialNo: item.serial_no
      };
    });
    
    return mappedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return empty array in case of error
  }
};
