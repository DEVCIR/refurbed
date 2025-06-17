import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  CheckCircle,
  Shield,
  DollarSign,
  Leaf,
  Users,
  Phone,
} from "lucide-react";

export default function RefurbedLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section>
        <img
          src="/hero_image.lg.jpg"
          alt="Refurbished electronic devices including headphones and smartphones"
          className="w-full my-5"
        />

        <main className="max-w-4xl py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your advantages at refurbed
          </h1>
          <p className="text-lg mb-6 opacity-90">
            Get high-quality refurbished and save up to 40% compared to a new
            device.
          </p>
          <p className="text-base opacity-80">
            We offer you expertly renewed electronic devices that are fully
            functional. Compared to new electronics, the carbon footprint. Our
            refurbished products are up to 70% more environmentally friendly
            than new ones. All our products come with a minimum 12-month
            warranty and a 30-day return guarantee.
          </p>
          <p className="text-sm mt-4 opacity-70">
            For example, used iPhones or second-hand kitchen appliances.
          </p>
        </main>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Better than used</h3>
              <p className="text-sm text-gray-600">
                All devices are 100% functional and tested by experts.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Min. 12 months warranty
              </h3>
              <p className="text-sm text-gray-600">
                All devices come with at least 12 months warranty.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Buy Refurbed, Save money
              </h3>
              <p className="text-sm text-gray-600">
                Save up to 40% compared to new devices.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-blue-600" />
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
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">30 days free trial</h2>
            <p className="text-gray-600 mb-8">
              If you don't like your device, you can return it within 30 days.
              We'll refund you the full price. No risk of charge from 30 days.
              If you are not satisfied after buying a refurbished device for any
              reason, you can return it within 30 days and get your money back.
            </p>
          </div>
        </div>
      </section>

      {/* Save Money Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Buy Refurbed, save money
            </h2>
            <p className="text-gray-600 mb-4">
              Refurbed products are up to 40% cheaper compared to new products.
            </p>
            <p className="text-gray-600">
              The money you save allows us to offer you certified products
              significantly cheaper than new ones and you can invest the money
              saved on something more purchasing your electronic devices. In
              addition, the device shipment is very fast compared to the new.
            </p>
          </div>
        </div>
      </section>

      {/* Environmental Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              More environmentally friendly than new
            </h2>
            <p className="text-gray-600 mb-8">
              Buying refurbed contributes and environmentally friendly, and you
              save up to 70% CO2 emissions.
            </p>
            <p className="text-gray-600 mb-8">
              Our goal is to make the world a more sustainable place with you.
              The CO2 footprint avoided instead of buying new. We invest for the
              environment and the future. We plant trees for every device sold
              and contribute to environmental projects.
            </p>
            <Button variant="outline" className="px-8">
              LEARN MORE
            </Button>
          </div>
        </div>
      </section>

      {/* Safe Buy Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                100% Safe buy from refurbed
              </h2>
              <p className="text-gray-600 mb-6">
                Our payment is secure and encrypted and tested dealers. You can
                choose from different payment methods such as PayPal, credit
                card, SEPA. You can pay also with Klarna and you are protected
                as a certified company.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <Users className="w-12 h-12 text-blue-400 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Tested dealers</h3>
              <p className="text-gray-600 text-sm">
                All our products come from certified and tested dealers. You can
                choose from different dealers and you can read reviews and
                ratings. The quality of the devices is always tested, you can
                choose additional quality. This makes refurbished better
                alternative to used or second-hand electronic.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Shipping by post</h3>
              <p className="text-gray-600 text-sm">
                Our devices are sent by post directly to your home or the
                desired delivery address. The shipping is fast and secure and
                you can track your package. You can also choose express shipping
                if you want to receive it in the European countries.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">
                Free refurbed customer service
              </h3>
              <p className="text-gray-600 text-sm">
                Your direct contact with us.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                If you have any questions, our customer service team is
                available to help. You can contact us by phone, email or chat.
                We are here to help you with every contact on the free.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Call us at <strong>0800 - 123 45 67</strong> or write us at{" "}
                <strong>service@refurbed.com</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Service Illustration */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Phone className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <Users className="w-12 h-12 text-purple-400 mx-auto" />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Free refurbed customer service
              </h2>
              <p className="text-gray-600">
                Your direct contact with us. If you have any questions or need
                more help, you can contact us by phone, email or chat.
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Mobile phones", icon: Phone },
              { name: "Tablets", icon: Phone },
              { name: "Laptops", icon: Phone },
              { name: "Smartphones", icon: Phone },
              { name: "Monitors", icon: Phone },
              { name: "Audio", icon: Phone },
              { name: "Desktops", icon: Phone },
              { name: "Cameras", icon: Phone },
            ].map((product, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <product.icon className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="font-medium">{product.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
