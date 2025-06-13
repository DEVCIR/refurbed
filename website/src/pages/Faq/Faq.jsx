"use client";

import React, { useState } from "react";

// Utility function for class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Button Component
const Button = React.forwardRef(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-customPri text-customLightText hover:bg-customPriLight",
      secondary: "bg-customBg2 text-customDarkText hover:bg-customBg1",
      outline:
        "border border-customPri text-customPri hover:bg-customPri hover:text-customLightText",
      tertiary: "text-customPri underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// Card Components
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-customBg1 text-customDarkText shadow-sm",
      className
    )}
    {...props}
  />
));

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

// FAQ Accordion Component
const FAQAccordion = ({ title, icon, id, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        className="focus:outline-none border border-ui-02 p-6 flex items-center rounded w-full"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1 flex items-center">
          {icon && (
            <span className="text-content-01 w-8 h-8 min-w-8">{icon}</span>
          )}
          <span className="font-semibold text-customDarkText md:text-lg text-base ml-5 text-left">
            {title}
          </span>
        </div>
        <div className="flex items-center">
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <div className="border-b border-b-ui-02 divide-y">{children}</div>
        </div>
      )}
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-3 text-content-01" id={id}>
      <button
        className="w-full focus:outline-none cursor-pointer text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-baseline">
          <span>
            {isOpen ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="5" width="12" height="2" fill="#656975" />
              </svg>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.8327 6.83334H6.83268V11.8333H5.16602V6.83334H0.166016V5.16667H5.16602V0.166672H6.83268V5.16667H11.8327V6.83334Z"
                  fill="#656975"
                />
              </svg>
            )}
          </span>
          <span className="ml-3 font-semibold text-customDarkText text-base grow">
            {question}
          </span>
        </div>
      </button>
      {isOpen && (
        <div className="pt-2">
          <div className="m-0 text-sm leading-6">{answer}</div>
        </div>
      )}
    </div>
  );
};

// Main FAQ Page Component
const FAQPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-customBg1">
      <main className="flex-1">
        <div className="max-w-screen-xl px-4 md:px-10 lg:px-6 mx-auto">
          <div className="my-8">
            <h1 className="font-semibold text-2xl leading-10 text-customDarkText">
              Frequently Asked Questions
            </h1>
          </div>

          <div className="mb-10" id="purchase-faq">
            <h2 className="text-2xl text-customDarkText font-semibold mb-6">
              Shopping
            </h2>

            <FAQAccordion
              title="Condition of the products"
              id="condition"
              icon={
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9.5 12c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm4 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm4 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm4.5 1.5c0 .83-.67 1.5-1.5 1.5h-1.29l-.72 3.58c-.34 1.69-1.94 3.05-3.92 3.05H8.43c-1.98 0-3.58-1.36-3.92-3.05l-.72-3.58H2.5c-.83 0-1.5-.67-1.5-1.5V8c0-.83.67-1.5 1.5-1.5h16.23c.15-.55.57-1 1.27-1 1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2c0 .7.45 1.12 1 1.27V6.5c0 .83-.67 1.5-1.5 1.5h-1.29l-.72 3.58c-.1.5-.33.97-.67 1.42h4.68c.83 0 1.5.67 1.5 1.5z" />
                </svg>
              }
            >
              <FAQItem
                id="are_new"
                question="Are the products I buy on refurbed 'new'?"
                answer="No, the products are all 'as new.' This means: The products were used, have been completely refurbished, and look and function like new."
              />
              <FAQItem
                id="like_new"
                question="What does 'as good as new' and 'as good as new' mean?"
                answer="Technically, the products function as well as a new product: They contain no data from previous customers and have a valid software license. Unless otherwise stated, the battery has at least 80% of its original capacity. Regarding external product appearance, we distinguish between the quality criteria 'Excellent,' 'Very Good,' and 'Good.'"
              />
              <FAQItem
                id="certification"
                question="Do IPxx certifications also apply to refurbished devices?"
                answer="Although refurbished devices are completely renewed, IPxx certifications can no longer be guaranteed due to the refurbishing process. They are therefore excluded from the warranty conditions."
              />
            </FAQAccordion>

            <FAQAccordion
              title="Delivery, Warranty & Returns"
              id="shipping"
              icon={
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
              }
            >
              <FAQItem
                id="packaging"
                question="Are the products always delivered in the original packaging?"
                answer="If the original packaging is damaged or not available, the products can also be sent by the seller in a neutral white or brown box (or the dealer's own box), including protective material."
              />
              <FAQItem
                id="shipping_cost"
                question="Are there additional shipping costs when ordering?"
                answer="No. The shipping costs are always included in the displayed selling price. There are no additional costs. Return shipping is also free. However, if you want to order abroad, the dealer may have set a different selling price."
              />
              <FAQItem
                id="return_reason"
                question="Can I simply return the products (without giving a reason)?"
                answer="Within the 30-day test phase, a product can be returned without giving reasons. The dealer bears the costs for the return shipment."
              />
              <FAQItem
                id="warranty"
                question="What does the dealer's warranty (at least 12 months) mean?"
                answer="Each product includes a warranty of at least 12 months from the date of purchase by the respective dealer. This covers all defects that have occurred within the guaranteed period. The defective device is either repaired or replaced for the customer. If both are not possible, the device value will be refunded. Examples: The buttons no longer work, the screen constantly fails, the phone can no longer be charged, etc. Self-inflicted defects (phone is dropped) are not covered by the warranty."
              />
              <FAQItem
                id="returns"
                question="How does a return/exchange process work?"
                answer="You can find out how a return works in detail on our returns page."
              />
              <FAQItem
                id="return_cost"
                question="Who pays for the return in case of a warranty claim?"
                answer="In the event of a warranty claim, you will receive a free return label from the dealer. Only by using the free return label is the return shipment free of charge for you! Please do not send the product back independently without the return label."
              />
            </FAQAccordion>

            <FAQAccordion
              title="Battery & Accessories"
              id="battery"
              icon={
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM13 18h-2v-2h2v2zm0-4h-2V9h2v5z" />
                </svg>
              }
            >
              <FAQItem
                id="battery"
                question="What is the battery performance of the devices?"
                answer="Unless otherwise stated, the batteries in our products have at least 80% of their original capacity. During the refurbishment process, batteries that have less than 80% of their original capacity are automatically replaced. Some products can also be purchased with a completely new battery."
              />
              <FAQItem
                id="parts"
                question="Do we use original spare parts when repairing the devices?"
                answer="By default, our dealers use original manufacturer spare parts (OEM) for repairs. However, sometimes these parts are not available to our dealers because the manufacturer does not offer them for purchase. In order to still save our planet from electronic waste, we therefore allow our qualified dealers to use non-OEM parts that nevertheless have the same quality and specification as OEM parts, especially for mobile phones and tablets. This means that all our products function like new. We actively support the 'Right to Repair' movement, which urges manufacturers to make their products easier to repair and to provide dealers with more spare parts for refurbishment and repair."
              />
              <FAQItem
                id="accessories"
                question="Do the products always come with complete accessories?"
                answer="The product page of each product informs you about the accessories included in the delivery. The packaging, power supply and charging cable can be generic. Please also note that the scope of delivery of smartphones does not include a generic power supply in addition to the compatible USB-C-based cable. This corresponds to our commitment to further reduce electronic waste."
              />
              <FAQItem
                id="batteryWarning"
                question="What do the messages 'Important battery message' or 'Unknown component' mean on my iPhone?"
                answer="This type of warning has recently been displayed on newer Apple models when the battery or another component has not been replaced by Apple itself. However, you don't need to worry at all. These messages simply mean that a component on your device has been replaced by our dealer with an equivalent spare part and professionally installed so that you can use your refurbished iPhone for as long as possible. After 4 days, the message disappears from the lock screen, is then only visible in the settings and has no negative effects on the performance or battery capacity of your device."
              />
            </FAQAccordion>

            <FAQAccordion
              title="Dealer & Offer"
              id="merchants"
              icon={
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                </svg>
              }
            >
              <FAQItem
                id="where_buy"
                question="Do I buy products directly from refurbed?"
                answer="Your contractual partner is the respective dealer from whom you buy the product. Refurbed provides the platform for sellers and consumers."
              />
              <FAQItem
                id="seller"
                question="Who sells goods on refurbed?"
                answer="Only selected, experienced and professional dealers and refurbishers are allowed to sell on refurbed. Private individuals cannot offer devices."
              />
              <FAQItem
                id="prices"
                question="Why do the prices for a product change regularly?"
                answer="Our RRP refers to the average new device price of all offers listed on the online price comparison portal of Preisvergleich Internet Services AG ('Geizhals'), which we determine once a day at 04:15."
              />
            </FAQAccordion>

            <FAQAccordion
              title="Purchase"
              id="purchase"
              icon={
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
              }
            >
              <FAQItem
                id="quantities"
                question="Can I also buy larger product quantities?"
                answer="Yes, you can also buy larger quantities directly via the website. If you want to order more than 15 devices and receive an individual offer, please write your detailed request with your requirements to b2b@refurbed.de. However, we would like to point out that not all devices offered on the platform are available from our B2B partners."
              />
              <FAQItem
                id="b2b"
                question="How does a company purchase work with regard to VAT billing?"
                answer="Companies can shop normally via the refurbed website. The statutory VAT is shown on the invoice, unless explicitly stated in the purchasing process (e.g.: differential taxed products). In the case of cross-border deliveries (e.g. German dealer, Austrian business customer), the net amount is displayed, paid and the invoice issued accordingly with a verified VAT ID number."
              />
              <FAQItem
                id="buy_old"
                question="Does refurbed also buy old devices?"
                answer="Yes, we are very happy to buy your old device. You can find more information at refurbed BuyBack."
              />
              <FAQItem
                id="bartering"
                question="Can I exchange an old device for a refurbished one at refurbed?"
                answer="No, unfortunately we do not offer an exchange of devices."
              />
            </FAQAccordion>

            <FAQAccordion
              title="Account (customer account)"
              id="account"
              icon={
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              }
            >
              <FAQItem
                id="login"
                question="How can I log in to my account?"
                answer={
                  <>
                    If you already have an account:
                    <ol>
                      <li>
                        Click on the profile icon at the top of our page to go
                        to the login page
                      </li>
                      <li>Enter your email address and password</li>
                    </ol>
                    <br />
                    If you don't have an account yet, you can create one like
                    this:
                    <ol>
                      <li>
                        Click on the profile icon at the top of our page to go
                        to the login page
                      </li>
                      <li>Click "Create account"</li>
                      <li>Enter your email address and personal information</li>
                      <li>
                        Activate your account: You will receive an email from
                        us; please check your inbox
                      </li>
                    </ol>
                  </>
                }
              />
              <FAQItem
                id="benefits"
                question="What benefits does my account offer?"
                answer={
                  <>
                    Your account offers many benefits. There you can:
                    <ul>
                      <li>Access the shipping status of your orders</li>
                      <li>
                        Download invoices or purchase confirmations as PDF
                      </li>
                      <li>Check details of your order</li>
                      <li>Contact the dealer</li>
                    </ul>
                  </>
                }
              />
            </FAQAccordion>

            <FAQAccordion
              title="Extended warranty"
              id="extendedWarranty"
              icon={
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
              }
            >
              <FAQItem
                id="warranty_support"
                question="Who can I contact if I need support for the Extended Warranty?"
                answer="If you have questions about the Extended Warranty, you can contact Evy via support@evy.eu or via the chat function in your customer account Customer account."
              />
              <FAQItem
                id="warranty_info"
                question="Where can I find all information about my extended warranty?"
                answer="You can find more information about the extended warranty on the product pages. For smartphones, for example, these General Terms and Conditions apply (PDF)."
              />
              <FAQItem
                id="warranty_purchase"
                question="Why should I buy the Extended Warranty for my device?"
                answer="Unlike the statutory warranty, with your Extended Warranty the burden of proof for the defect is removed after the first 12 months of your purchase. This means that your device is covered by the policy if it fails completely or partially due to an internal defect resulting from an electrical, electronic, electromechanical or mechanical phenomenon. This means that you do not have to prove the cause of the defect. If your device is repairable, it will be repaired and returned to you in working condition. If the device cannot be repaired, you will receive an e-gift card for the replacement value, which you can use to purchase a device on the refurbed website or in the mobile app. In addition, you are also covered in the event of a battery discharge. Your device's battery will be replaced if its charging capacity falls below 80% of its original specification and you don't have to prove a defect."
              />
              <FAQItem
                id="warranty_cost"
                question="How much does the Extended Warranty cost?"
                answer="The price of the Extended Warranty depends on its scope and for which product you want to buy it. If available, you will see the prices on the respective product page."
              />
              <FAQItem
                id="warranty_cevice"
                question="Doesn't the device have a warranty from the beginning?"
                answer="Yes, your device falls under the statutory warranty in the first 12 months after purchase. Between the 12th and 24th month after purchase, the device is still covered by the statutory warranty, but you must prove the cause of damage of a defect. Only then can you make a claim. After 24 months, the statutory warranty has expired and your device and its battery are no longer covered, except under your policy."
              />
            </FAQAccordion>

            <FAQAccordion
              title="Invite friends"
              id="referFriend"
              icon={
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 5v8c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2zm-2 0H5v8h9V5zm-7 1h3v1h-3V6zm0 2h5v1h-5V8zm0 2h5v1h-5v-1zm9 4v8c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-8h2v8h9v-8h2zm-4-7h3v1h-3V7z" />
                </svg>
              }
            >
              <FAQItem
                id="referFriend1"
                question="How do I get my referral link?"
                answer="You can find your personal referral link by logging into 'My Account' and clicking on 'Invite Friends'. The link can be shared via WhatsApp, Facebook or email."
              />
              <FAQItem
                id="referFriend2"
                question="How long is my referral link valid?"
                answer="Your referral link is valid for 30 days. After that, you can generate a new one in your account."
              />
              <FAQItem
                id="referFriend3"
                question="When do I receive my referral bonus?"
                answer="The referral bonuses accumulate over a period of 30 days from the creation of your personal link. After this period has expired, you will receive all your rewards as a voucher."
              />
              <FAQItem
                id="referFriend4"
                question="How much can I earn through referrals?"
                answer="You receive €10 for each successful referral. Within the 30-day period, a maximum of 10 people can use your voucher link for a purchase, and the rewards accumulate during this period."
              />
              <FAQItem
                id="referFriend5"
                question="How long are my referral vouchers valid?"
                answer="Your referral vouchers are valid for 90 days from the date of issue."
              />
            </FAQAccordion>
          </div>

          <div className="mb-10">
            <div className="flex flex-col lg:flex-row gap-x-8 gap-y-8">
              <div className="flex-1">
                <section className="border border-ui-03 rounded-sm p-5 h-full">
                  <div className="flex flex-col h-full items-start justify-between">
                    <div>
                      <h3 className="text-customDarkText text-lg font-semibold">
                        Delivery status
                      </h3>
                      <p className="text-customDarkText text-sm">
                        Here you can find the estimated delivery date and
                        shipment tracking.
                      </p>
                    </div>
                    <Button variant="tertiary">Check delivery status</Button>
                  </div>
                </section>
              </div>

              <div className="flex-1">
                <section className="border border-ui-03 rounded-sm p-5 h-full">
                  <div className="flex flex-col h-full items-start justify-between">
                    <div className="text-customDarkText">
                      <h3 className="text-lg font-semibold">
                        Have you ordered something and need help?
                      </h3>
                      <p className="text-sm">
                        It is best to contact the refurbisher via your account.
                      </p>
                    </div>
                    <Button variant="tertiary">To the account</Button>
                  </div>
                </section>
              </div>

              <div className="flex-1">
                <section className="border border-ui-03 rounded-sm p-5 h-full">
                  <div className="flex flex-col h-full items-start justify-between">
                    <div className="text-customDarkText">
                      <h3 className="text-lg m-0 font-semibold">
                        Support & Service
                      </h3>
                      <p className="text-sm">
                        If you have any questions, feedback or problems, we are
                        happy to help.
                      </p>
                      <p className="text-sm">
                        Call us at <b>08007001210</b> or write to us:{" "}
                        <a
                          href="mailto:service@refurbed.de"
                          className="font-semibold text-customPri hover:text-customPriLight hover:underline"
                        >
                          service@refurbed.de
                        </a>
                      </p>
                    </div>
                    <Button variant="tertiary">Contact</Button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <section className="w-full bg-customPri py-12 md:py-16 lg:py-20">
          <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between gap-6 px-4 md:px-6">
            <div className="flex items-center gap-4 text-customLightText text-center md:text-left">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <div>
                <h3 className="text-xl font-bold">
                  Subscribe to our newsletter for the first time and save €15!
                </h3>
                <p className="text-sm">Never miss another offer.</p>
              </div>
            </div>
            <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-1 rounded-md border-none bg-customLightText px-4 py-2 text-customDarkText focus:ring-1 focus:ring-customPriLight"
              />
              <Button className="rounded-md bg-customPriLight px-6 py-2 text-customLightText hover:bg-customPri">
                Request a voucher
              </Button>
            </div>
          </div>
          <div className="container mx-auto mt-4 px-4 md:px-6 text-center md:text-right">
            <p className="text-xs text-customLightText/80">
              Information about the use of personal data can be found in our{" "}
              <a href="#" className="underline hover:text-customLightText">
                privacy policy
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FAQPage;
