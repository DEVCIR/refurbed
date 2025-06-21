export default function ReturnExchange() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900">
              Home
            </a>
            <span>›</span>
            <span className="text-gray-900">Questions and Answers</span>
            <div className="ml-auto flex items-center space-x-6 text-sm">
              <a href="#" className="hover:text-gray-900">
                Product conditions
              </a>
              <a href="#" className="hover:text-gray-900">
                Warranty conditions
              </a>
              <a href="#" className="hover:text-gray-900">
                How it works
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Return or exchange product
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <p className="text-lg text-gray-700 mb-8">
            How to request repair, return or exchange:
          </p>

          {/* Step 1 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Contact our partner in your refurbed account
            </h2>
            <p className="text-gray-700 mb-2">
              Select your order in your refurbed account and click "Contact
              Dealer." Provide the reason for your request.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Tip: Describe your request carefully and upload photos to get help
              faster.
            </p>

            {/* Account Interface Screenshot */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <img
                src="/images/refurbed-account.png"
                alt="Refurbed account interface showing order details"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Receive the shipping label
            </h2>
            <p className="text-gray-700">
              You will receive a label for your free return shipment. Important:
              Once you have received the label, send the package within 14 days.
            </p>
          </div>

          {/* Step 3 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Delete personal information and log out everywhere
            </h2>
            <p className="text-gray-700 mb-4">
              Before you ship your product, it is best to make a backup. Then
              reset it to factory settings and sign out of your accounts,
              including iCloud with Apple and Google account on Android.
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-800 underline">
              This allows you to log out of iCloud and Google account.
            </a>
          </div>

          {/* Step 4 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Printing the label and prepare the package
            </h2>
            <p className="text-gray-700 mb-4">
              Attach the printed label to the package.
            </p>
            <p className="text-gray-700 mb-4">
              Pack the product secure: If you no longer have the original
              packaging, please use a stable and secure packaging. Take a
              cardboard box, for example, fill the free spaces with padding
              materials.
            </p>
            <p className="text-gray-700">
              Important: Please avoid padded envelopes, as they do not protect
              well enough. If you need a repair or exchange, just insert the
              affected device. Do not add accessories.
            </p>
          </div>

          {/* Step 5 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Bring the parcel to the transport company
            </h2>
            <p className="text-gray-700 mb-4">
              The responsible transport company is on the shipping label.
            </p>
            <p className="text-gray-700 mb-4">
              Free shipping is only guaranteed if you send the package with this
              company.
            </p>
            <p className="text-gray-700 mb-4">
              Also surely use the seller's shipping label. Because only then
              does the seller bear the transport risk.
            </p>
            <p className="text-gray-700">
              Important: Keep the tracking number and confirmation of your
              package task. This allows you to track the package and have proof
              if it does not arrive at the recipient.
            </p>
          </div>

          {/* Step 6 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Testing and Solution
            </h2>
            <p className="text-gray-700 mb-4">
              Upon receipt of the package, professionals will evaluate the
              condition of the product.
            </p>
            <p className="text-gray-700 mb-4">
              Traders can only present a solution after this process. You also
              need to make sure that it is the original product.
            </p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Repair or Replacement
              </h3>
              <p className="text-gray-700 mb-4">
                The seller determines whether an exchange or a repair is
                possible. Repairs last 2 to 7 working days.
              </p>
              <p className="text-gray-700 mb-4">
                If a repair or exchange is not possible, you will receive a
                refund. Once the 30-day trial period has expired, the amount of
                the refund corresponds to the current product value.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Refund
              </h3>
              <p className="text-gray-700">
                Once professionals have checked the product, you will get the
                money back in 2 to 5 working days.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Information Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Delivery Status Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delivery status
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              Here you will find the estimated delivery date and tracking.
            </p>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
            >
              Request delivery status
            </a>
          </div>

          {/* Support Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              You have ordered something and need help?
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              It is best to contact the refurbisher through your account.
            </p>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
            >
              To the account
            </a>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Support & service
            </h3>
            <p className="text-gray-700 text-sm mb-2">
              If you have any questions, feedback and problems, we are happy to
              assist you.
            </p>
            <p className="text-gray-700 text-sm mb-4">
              Call us at <strong>08007001210</strong> or write to us at:
            </p>
            <a
              href="mailto:service@refurbed.de"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              service@refurbed.de
            </a>
            <div className="mt-4">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
