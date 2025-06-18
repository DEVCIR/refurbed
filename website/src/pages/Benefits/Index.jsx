import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, DollarSign, Leaf } from "lucide-react";

export default function RefurbedLanding() {
  return (
    <div className="min-h-screen bg-white">
      <img
        src="/hero_image.lg.jpg"
        alt="Refurbished electronic devices including headphones and smartphones"
        className="w-full rounded-lg object-cover"
      />
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8"></div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-2">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Your advantages at refurbed
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  You buy more sustainable and save up to 40% compared to a new
                  purchase
                </p>
                <div className="space-y-4 text-gray-600">
                  <p>
                    We offer you experts: renewed electronic devices that are
                    fully functional. Compared to new equipment, the renewal
                    process – the refurbished process – achieves up to 70% less
                    CO₂. In addition, you will receive a minimum of 12 months
                    warranty. This makes refurbed devices better and more
                    reliable than,
                  </p>
                  <p className="text-sm">
                    for example, used iPhones or second-hand kitchen appliances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>{" "}
              <h3 className="font-semibold text-lg mb-2">Better than used</h3>
              <p className="text-sm text-gray-600">
                All devices are 100% functional and tested by experts.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Min. 12 months warranty
              </h3>
              <p className="text-sm text-gray-600">
                All devices come with at least 12 months warranty.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Buy Refurbed, Save money
              </h3>
              <p className="text-sm text-gray-600">
                Save up to 40% compared to new devices.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                More environmentally friendly than new
              </h3>
              <p className="text-sm text-gray-600">
                Up to 70% more environmentally friendly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 30 Days Trial Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="/blob_images/smartphone.jpg"
                  alt="iPhone mockup"
                  width={200}
                  height={400}
                  className="rounded-3xl shadow-2xl"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">30 days free trial</h2>
              <p className="text-gray-600 mb-4">
                We are convinced that the quality of our products, so we also
                want to convince you. You have 30 days of charge from 30 days.
                If you are not satisfied after buying a refurbished device for
                any reason, you can simply return the product to us for free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Save Money Section */}
      <section className="py-16 bg-[#fff]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Buy Refurbed, Save money
              </h2>
              <p className="text-gray-600 mb-4">
                By buying a refurbed device, you can save up to 40% compared to
                a new purchase.
              </p>
              <p className="text-gray-600">
                The money you save allows us to offer you certified products
                significantly more affordable, and you don't have to do without
                quality or electronics when purchasing your electronic devices.
                In addition, the device shipment is very fast compared to the
                new.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/blob_images/laptop.jpg"
                alt="MacBook laptop"
                width={400}
                height={300}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="/blob_images/tablet.jpg"
                alt="Mountain landscape"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                More environmentally friendly than new
              </h2>
              <p className="text-gray-600 mb-4">
                Buy more sustainable and environmentally friendly, helps the
                world a little greener.
              </p>
              <p className="text-gray-600 mb-6">
                Our goal is to make the world a more sustainable place with you.
                The CO2 footprint avoided instead of buying new. We invest for
                the environment. Receive the best electronic and electronics
                with refurbed at the cheapest for your device.
              </p>
              <Button variant="outline" className="px-8">
                LEARN MORE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Safe Buy Section */}
      <section className="py-16 bg-gray-50 h-[40rem]">
        <div className="container mx-auto px-4">
          <div className="text-center relative">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-6">
              100% Safe buy from refurbed
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Our payment transaction is secured and we testing protected you
              can purchase such as "Stripe". This means your data 100% secure
              and you are protected as a refurbed customer.
            </p>
            <div className="flex justify-center space-x-4">
              <img className="w-10 h-fit" src="/blob_images/visa.svg" />
              <img className="w-10 h-fit" src="/blob_images/mastercard.svg" />
              <img className="w-10 h-fit" src="/blob_images/credit_card.svg" />
              <img
                className="w-10 h-fit"
                src="/blob_images/pay_apple_pay.svg"
              />
              <img
                className="w-10 h-fit"
                src="/blob_images/pay_google_pay.svg"
              />
              <img
                className="w-10 h-fit"
                src="/blob_images/pay_paypal_logo.svg"
              />
            </div>
            <span className="mt-10 absolute  top-8/12 right-1/2 transform translate-x-1/2 md:translate-x-0 md:right-0 w-40 h-auto lg:mr-8 xl:mr-16">
              <img className="w-full" src="/blob_images/secure.svg" />
            </span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-semibold text-xl mb-4">Tested dealers</h3>
              <p className="text-gray-600 mb-4">
                All our products come from certified and tested dealers. You can
                choose from different dealers and you can read reviews and
                ratings. The quality of the devices is always tested, you can
                choose additional quality. This makes refurbished better
                alternative to used or second-hand devices.
              </p>
              <h4 className="font-semibold text-lg mb-2">
                Shipping by professionals
              </h4>
              <p className="text-gray-600 text-sm">
                Our dealers will send the product directly to your home or the
                desired delivery address. The shipping is fast and secure and
                you can track your package. You can also choose express shipping
                if you want to receive it in the European countries.
              </p>
              <div className="my-5">
                <img
                  className="inline-block w-32 h-8"
                  alt="dhl"
                  src="/blob_images/dhl.svg"
                />
                <img
                  className="inline-block w-32 h-8"
                  alt="dpd"
                  src="/blob_images/dpd.svg"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/blob_images/merchant.jpg"
                alt="Professional working with electronics"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Service Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="py-16 bg-[#e5e6e3] flex justify-center rounded-br-[64px] md:rounded-br-20 lg:rounded-br-28">
              <img src="/blob_images/customer_service.svg" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Free refurbed customer service
              </h2>
              <p className="text-gray-600 mb-4">Your direct contact with us.</p>
              <p className="text-gray-600 mb-4">
                Before and after the purchase, our excellent and competent
                customer service is available. If you have a question or need
                more help, you can contact us by phone, email or chat.
              </p>
              <p className="text-gray-600">
                Call us at <strong>+800 - 123 45 67</strong> or write us at
                email to service@refurbed.at
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our top products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Mobile phones",
                icon: "/blob_images/smartphones.webp",
              },
              {
                name: "Tablets",
                icon: "/blob_images/tablets.webp",
              },
              {
                name: "Laptops",
                icon: "/blob_images/laptops.webp",
              },
              {
                name: "Smartwatches",
                icon: "/blob_images/smartwatches.webp",
              },
              {
                name: "Monitors",
                icon: "/blob_images/monitors.webp",
              },
              {
                name: "Desktops",
                icon: "/blob_images/desktops.webp",
              },
              {
                name: "Cameras",
                icon: "/blob_images/cameras.webp",
              },
              {
                name: "Printers",
                icon: "/blob_images/printers.webp",
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow cursor-pointer border-gray-200"
              >
                <CardContent className="p-6">
                  <div className="wbg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {/* <product.icon className="w-8 h-8 text-gray-600" /> */}
                    <img src={product.icon} />
                  </div>
                  <h3 className="font-medium text-sm">{product.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
