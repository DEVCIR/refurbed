import { FaCheck } from "react-icons/fa";
import logo from "../../assets/logos/refurbed-logo.svg";
import { Link } from "react-router-dom";
import phoneCaseImg from '../../assets/accessories/product1.jpg';
import screenProtectorImg from '../../assets/accessories/product2.jpg';
import chargerImg from '../../assets/accessories/product3.jpg';
import singleProtectorImg from '../../assets/accessories/product4.jpg';
import sustainableCoverImg from '../../assets/accessories/product5.jpg';
import airpodsImg from '../../assets/accessories/product6.jpg';
import cable from '../../assets/accessories/product7.jpg';
import usb from '../../assets/accessories/product8.jpg';
import adaptar from '../../assets/accessories/product9.jpg';
import phone1 from '../../assets/accessories/product10.jpg';
import phone2 from '../../assets/accessories/product11.jpg';
import phone3 from '../../assets/accessories/product12.jpg';

export default function Accessories() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white mt-10">
      <header className="w-full flex flex-col">
        {/* First row with logo and help */}
        <div className="w-full flex items-center justify-between px-6 py-4">
          <Link to="/" className="cursor-pointer">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>
          <button className="text-[#584a9f] text-lg">
            Help
          </button>
        </div>
        
        {/* First horizontal line */}
        <hr className="border-t border-gray-200 w-full" />
        
        {/* Benefits row - now aligned to right */}
        <div className="w-full flex items-center justify-end py-4 bg-gray-50 px-6">
          <div className="flex flex-wrap justify-end gap-6 text-lg text-gray-600">
            <div className="flex items-center gap-1">
              <FaCheck className="text-[#336b59] text-lg" />
              Min. 12-month warranty
            </div>
            <div className="flex items-center gap-1">
              <FaCheck className="text-[#336b59] text-lg" />
              Free shipping
            </div>
            <div className="flex items-center gap-1">
              <FaCheck className="text-[#336b59] text-lg" />
              Free returns
            </div>
            <div className="flex items-center gap-1">
              <FaCheck className="text-[#336b59] text-lg" />
              Free 30-day trial
            </div>
          </div>
        </div>
        
        <hr className="border-t border-gray-200 w-full" />
      </header>

      <main className="w-[95%] mx-auto px-4 py-2">
        {/* Heading and total with button */}

        <h1 className="text-3xl font-semibold text-gray-900 mt-10 flex justify-center items-center">Accessories</h1>

<div className="w-full mb-12 mt-10">
  <div className="flex justify-between border-b border-gray-200 pb-2">
    <div className="flex-1 text-left">
      <button className="text-lg font-semibold text-[#322d81] border-b-2 border-[#322d81] pb-1 px-3 transition-all duration-300 hover:text-[#4b45ad] hover:scale-105 cursor-pointer">
        Accessories
      </button>
    </div>
    <div className="flex-1 text-center">
      <button className="text-lg font-semibold text-gray-500 hover:text-[#322d81] hover:border-b-2 hover:border-[#322d81] pb-1 px-3 transition-all duration-300 hover:scale-105 cursor-pointer">
        Cart
      </button>
    </div>
    <div className="flex-1 text-right">
      <button className="text-lg font-semibold text-gray-500 hover:text-[#322d81] hover:border-b-2 hover:border-[#322d81] pb-1 px-3 transition-all duration-300 hover:scale-105 cursor-pointer">
        Checkout
      </button>
    </div>
  </div>
</div>


        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Accessories for your iPhone 13</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl text-black">Total</div>
              <div className="text-2xl font-semibold text-[#08896b]">€1,020.96</div>
            </div>
            <button className="bg-[#322d81] text-white px-6 py-3 rounded-md hover:bg-indigo-700">
              Proceed to cart
            </button>
          </div>
        </div>



        {/* First row of products */}
        <div className="bg-[#f4ebfe] p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Product 1 */}
            <div className="bg-white p-4 rounded-lg flex flex-col">
              <div className="flex gap-4 mb-4">
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={phoneCaseImg} 
                    alt="Transparent Phone Case" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-black">Transparent Phone Case & Screen Protector | PanzerGlass™</h3>
                  <p className="text-lg font-bold text-[#08896b] mt-1">€28.99</p>
                  <p className="text-sm text-gray-500">iPhone 13/14</p>
                </div>
              </div>
              <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded hover:bg-indigo-50 mt-auto flex justify-center items-center">
                <span className="text-xl mr-1">+</span> Add
              </button>
            </div>

            {/* Product 2 */}
            <div className="bg-white p-4 rounded-lg flex flex-col">
              <div className="flex gap-4 mb-4">
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={screenProtectorImg} 
                    alt="Screen Protectors" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-black">Pack of 2 Screen Protectors | PanzerGlass™</h3>
                  <p className="text-lg font-bold text-[#08896b] mt-1">€27.99</p>
                  <p className="text-sm text-gray-500">iPhone 13/13 Pro/14</p>
                </div>
              </div>
              <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded hover:bg-indigo-50 mt-auto flex justify-center items-center">
                <span className="text-xl mr-1">+</span> Add
              </button>
            </div>

            {/* Product 3 */}
            <div className="bg-white p-4 rounded-lg flex flex-col">
              <div className="flex gap-4 mb-4">
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={chargerImg} 
                    alt="Fast Charger" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-black">35W Multiport Fast Charger UK (USB-A + USB-C) & Cable (USB-C + Lightning) | white</h3>
                  <p className="text-lg font-bold text-[#08896b] mt-1">€26.99</p>
                </div>
              </div>
              <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded hover:bg-indigo-50 mt-auto flex justify-center items-center">
                <span className="text-xl mr-1">+</span> Add
              </button>
            </div>
          </div>
        </div>

        {/* Accessories heading */}
        <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Accessories</h2>

        {/* Second row of products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Product 1 */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col">
            <div className="flex gap-4 mb-4">
              <div className="w-24 h-24 flex-shrink-0">
                <img 
                  src={singleProtectorImg} 
                  alt="Screen Protector" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black">Screen Protector iPhone | PanzerGlass™</h3>
                <p className="text-lg font-bold text-[#08896b] mt-1">€19.99</p>
                <p className="text-sm text-gray-500">iPhone 13/13 Pro/14 | Clear Glass</p>
              </div>
            </div>
            <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded hover:bg-indigo-50 mt-auto flex justify-center items-center">
              <span className="text-xl mr-1">+</span> Add
            </button>
          </div>

          {/* Product 2 */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col">
            <div className="flex gap-4 mb-4">
              <div className="w-24 h-24 flex-shrink-0">
                <img 
                  src={sustainableCoverImg} 
                  alt="Sustainable Phone Cover" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black">Sustainable Phone Cover Refurbed | iPhone 13/14</h3>
                <p className="text-lg font-bold text-[#08896b] mt-1">€16.99</p>
                <p className="text-sm text-gray-500">Transparent</p>
              </div>
            </div>
            <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded hover:bg-indigo-50 mt-auto flex justify-center items-center">
              <span className="text-xl mr-1">+</span> Add
            </button>
          </div>

          {/* Product 3 */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col">
            <div className="flex gap-4 mb-4">
              <div className="w-24 h-24 flex-shrink-0">
                <img 
                  src={airpodsImg} 
                  alt="Apple AirPods" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black">Apple AirPods 2. Gen</h3>
                <p className="text-lg font-bold text-[#08896b] mt-1">€107.99</p>
                <p className="text-sm text-gray-500">Good</p>
              </div>
            </div>
            <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded hover:bg-indigo-50 mt-auto flex justify-center items-center">
              <span className="text-xl mr-1">+</span> Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Product 1 */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col">
            <div className="flex gap-4 mb-4">
              <div className="w-24 h-24 flex-shrink-0">
                <img 
                  src={cable} 
                  alt="Screen Protector" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black">Braided Cable (USB-C to Lightning) - 1m | white/blue</h3>
                <p className="text-lg font-bold text-[#08896b] mt-1">€14.99</p>
                <p className="text-sm text-gray-500">iPhone 13/13 Pro/14 | Clear Glass</p>
              </div>
            </div>
            <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded hover:bg-indigo-50 mt-auto flex justify-center items-center">
              <span className="text-xl mr-1">+</span> Add
            </button>
          </div>

          {/* Product 2 */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col">
            <div className="flex gap-4 mb-4">
              <div className="w-24 h-24 flex-shrink-0">
                <img 
                  src={usb} 
                  alt="Sustainable Phone Cover" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black">3-in-1 USB Charging Braided Cable (Type-C, Lightning, Micro) - 1.5m | white</h3>
                <p className="text-lg font-bold text-[#08896b] mt-1">€16.99</p>
                <p className="text-sm text-gray-500">Transparent</p>
              </div>
            </div>
            <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded hover:bg-indigo-50 mt-auto flex justify-center items-center">
              <span className="text-xl mr-1">+</span> Add
            </button>
          </div>

          {/* Product 3 */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col">
            <div className="flex gap-4 mb-4">
              <div className="w-24 h-24 flex-shrink-0">
                <img 
                  src={adaptar} 
                  alt="Apple AirPods" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black">3-in-1 Lightning Port Adapter (USB-A, USB-C, AUX) | white</h3>
                <p className="text-lg font-bold text-[#08896b] mt-1">€29.99</p>
                <p className="text-sm text-gray-500">Good</p>
              </div>
            </div>
            <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded hover:bg-indigo-50 mt-auto flex justify-center items-center">
              <span className="text-xl mr-1">+</span> Add
            </button>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Product 1 */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col">
            <div className="flex gap-4 mb-4">
              <div className="w-24 h-24 flex-shrink-0">
                <img 
                  src={phone1} 
                  alt="Screen Protector" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black">Silicon Case</h3>
                <p className="text-lg font-bold text-[#08896b] mt-1">€19.99</p>
                <p className="text-sm text-gray-500">iPhone 13/13 Pro/14 | Clear Glass</p>
              </div>
            </div>
            <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded hover:bg-indigo-50 mt-auto flex justify-center items-center">
              <span className="text-xl mr-1">+</span> Add
            </button>
          </div>

          {/* Product 2 */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col">
            <div className="flex gap-4 mb-4">
              <div className="w-24 h-24 flex-shrink-0">
                <img 
                  src={phone2} 
                  alt="Sustainable Phone Cover" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black">Silicon Case</h3>
                <p className="text-lg font-bold text-[#08896b] mt-1">€16.99</p>
                <p className="text-sm text-gray-500">Transparent</p>
              </div>
            </div>
            <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded hover:bg-indigo-50 mt-auto flex justify-center items-center">
              <span className="text-xl mr-1">+</span> Add
            </button>
          </div>

          {/* Product 3 */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col">
            <div className="flex gap-4 mb-4">
              <div className="w-24 h-24 flex-shrink-0">
                <img 
                  src={phone3} 
                  alt="Apple AirPods" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black">Silicon Cover</h3>
                <p className="text-lg font-bold text-[#08896b] mt-1">€107.99</p>
                <p className="text-sm text-gray-500">Good</p>
              </div>
            </div>
            <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded hover:bg-indigo-50 mt-auto flex justify-center items-center">
              <span className="text-xl mr-1">+</span> Add
            </button>
          </div>
        </div>


      </main>

      
    </div>
  );
}