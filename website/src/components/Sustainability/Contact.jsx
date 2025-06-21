import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Phone } from "lucide-react";

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <nav className="text-sm text-gray-600">Home</nav>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>service-refurbed.de</span>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>0800 - 700 12 10</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-12">
          We are happy to help you
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Question to order */}
          <div className="bg-purple-100 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4">Question to order?</h2>
            <p className="text-gray-700 mb-6">
              Do you have a question about your order? For answer as quickly as
              possible, please create a new enquiry directly in the customer
              area.
            </p>
            <Button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg">
              Select order
            </Button>
          </div>

          {/* Questions about guarantee or returns */}
          <div className="bg-white border rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4">
              Questions about guarantee or returns?
            </h2>
            <p className="text-gray-700 mb-6">
              We have compiled a page with frequently asked questions and their
              answers. Maybe the answer to your question is included?
            </p>
            <Button
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-2 rounded-lg"
            >
              To the answers
            </Button>
          </div>

          {/* General request */}
          <div className="bg-white border rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4">General request?</h2>
            <p className="text-gray-700 mb-6">
              If you have any general questions, suggestions or problems, you
              are welcome to reach us by e-mail, telephone or via our contact
              form. Our team will process your request as soon as possible.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    * * First name
                  </label>
                  <Input className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    * * Surname
                  </label>
                  <Input className="w-full" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    * * E-mail
                  </label>
                  <Input type="email" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telephone n
                  </label>
                  <Input type="tel" className="w-full" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  * Message
                </label>
                <Textarea className="w-full h-32" />
              </div>

              <Button className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-2 rounded-lg">
                Send message
              </Button>
            </form>
          </div>

          {/* Individual B2B offers */}
          <div className="bg-white border rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4">Individual B2B offers</h2>
            <p className="text-gray-700 mb-2">
              If you would like to order more than 15 devices and receive an
              individual offer, then write your detailed request with your
              requirements using the following form:
            </p>
            <p className="text-gray-700 mb-6">https://business.refurbed.de</p>
            <Button
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-2 rounded-lg"
            >
              Individual B2B offers
            </Button>
          </div>

          {/* Accessible on all channels - spans full width */}
          <div className="lg:col-span-2 bg-white border rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4">
              Accessible on all channels
            </h2>
            <p className="text-gray-700">
              Use our contact form, call us at <strong>0800 - 700 12 10</strong>{" "}
              or write to us at:{" "}
              <a
                href="mailto:service.refurbed.de"
                className="text-purple-600 underline"
              >
                service.refurbed.de
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Chat Widget */}
      <div className="fixed bottom-6 left-6">
        <Button
          size="lg"
          className="bg-purple-700 hover:bg-purple-800 text-white rounded-full w-14 h-14 p-0"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
