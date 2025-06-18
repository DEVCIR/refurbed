"use client";

import { useState, useEffect } from "react";
import {
  CreditCard,
  MapPin,
  Truck,
  Check,
  ShoppingCart,
  ChevronRight,
  ChevronLeft,
  Minus,
  Plus,
  Shield,
  RotateCcw,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock data
const mockOrderData = {
  items: [
    {
      id: 1,
      name: "Technogym Excite Jog 700 Unity",
      description: "Warranty: 12 months | Silver, Good",
      currentPrice: 3699.0,
      quantity: 2,
      image: "/images/product.png",
      delivery: "23. June - 5. July",
      seller: "Used.com",
    },
  ],
  voucherApplied: false,
  discountAmount: 0,
};

const countries = [
  { code: "US", name: "United States", phone: "1" },
  { code: "DE", name: "Germany", phone: "49" },
  { code: "GB", name: "United Kingdom", phone: "44" },
  { code: "FR", name: "France", phone: "33" },
  { code: "IT", name: "Italy", phone: "39" },
  { code: "ES", name: "Spain", phone: "34" },
];

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState("cart");
  const [orderData, setOrderData] = useState(mockOrderData);
  const [formValid, setFormValid] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [billingType, setBillingType] = useState("individual");
  const [deliveryType, setDeliveryType] = useState("same");
  const [paymentType, setPaymentType] = useState("card");
  const [savedAddress, setSavedAddress] = useState("");
  const [country, setCountry] = useState("United States");
  const [city, setCity] = useState("San Francisco");

  const steps = [
    { id: "accessories", label: "Accessories" },
    { id: "cart", label: "Shopping basket" },
    { id: "checkout", label: "Cash register" },
  ];

  const features = [
    { icon: Shield, text: "Mind. 12 months warranty" },
    { icon: Truck, text: "Including shipping costs" },
    { icon: RotateCcw, text: "Free return shipping" },
    { icon: Calendar, text: "30 days right of return" },
  ];

  const benefits = [
    { icon: Shield, text: "Mind. 12 months warranty" },
    { icon: RotateCcw, text: "Free return shipping" },
    { icon: Calendar, text: "30 days money back" },
  ];

  useEffect(() => {
    // Simple form validation
    if (firstName && lastName && phoneNumber && address && city) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [firstName, lastName, phoneNumber, address, city]);

  const validateForm = () => {
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10,}$/.test(phoneNumber.replace(/\D/g, ""))) {
      errors.phoneNumber = "Please enter a valid phone number";
    }

    if (!address.trim()) {
      errors.address = "Address is required";
    }

    if (!city.trim()) {
      errors.city = "City is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateForm()) {
      setCurrentStep("payment");
    }
  };

  const handleBack = () => {
    if (currentStep === "checkout") {
      setCurrentStep("cart");
    } else if (currentStep === "payment") {
      setCurrentStep("checkout");
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      setOrderData((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item,
        ),
      }));
    }
  };

  const removeItem = (itemId) => {
    setOrderData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));
  };

  const originalPrice = orderData.items.reduce(
    (total, item) => total + item.currentPrice * item.quantity,
    0,
  );
  const savings = orderData.voucherApplied ? orderData.discountAmount : 0;
  const serviceCharge = 5.99;
  const total = originalPrice - savings + serviceCharge;

  if (currentStep === "cart") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Features Bar */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center space-x-8">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`text-sm ${step.id === currentStep ? "text-blue-600 font-semibold" : "text-gray-500"}`}
                      >
                        {step.label}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-24 h-0.5 mx-4 ${index === 0 ? "bg-blue-600" : "bg-gray-300"}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Product */}
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Shopping basket
              </h1>

              <Card>
                <CardContent className="p-6">
                  {orderData.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start space-x-4 mb-6 last:mb-0"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{item.description}</p>
                          <p>Delivery: {item.delivery}</p>
                          <p>Sales & Shipping: {item.seller}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900 mb-2">
                          €
                          {item.currentPrice.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <Button variant="ghost" className="text-blue-600">
                      + Discover accessories
                    </Button>
                  </div>

                  <div className="pt-4 border-t mt-4">
                    <Button
                      variant="ghost"
                      className="text-red-600"
                      onClick={() => removeItem(orderData.items[0].id)}
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Summary */}
            <div>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Summary
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {orderData.items.reduce(
                          (total, item) => total + item.quantity,
                          0,
                        )}{" "}
                        articles
                      </span>
                      <span className="font-semibold">
                        {originalPrice.toLocaleString("de-DE", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        €
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1">
                        <span className="text-gray-600">Service charge</span>
                        <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
                          i
                        </div>
                      </div>
                      <span className="font-semibold">
                        {serviceCharge.toFixed(2)} €
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping costs</span>
                      <span className="font-semibold text-green-600">
                        Included
                      </span>
                    </div>

                    <div className="pt-3 border-t border-green-300">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">
                          Total
                        </span>
                        <span className="text-xl font-bold text-gray-900">
                          {total.toLocaleString("de-DE", {
                            minimumFractionDigits: 2,
                          })}{" "}
                          €
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Price incl. VAT
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button variant="link" className="text-blue-600 p-0 h-auto">
                      Do you have a coupon code?
                    </Button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm text-gray-600"
                      >
                        <benefit.icon className="w-4 h-4 text-green-500" />
                        <span>{benefit.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                      onClick={() => setCurrentStep("checkout")}
                    >
                      Continue
                    </Button>
                    <div className="text-center text-sm text-gray-500">or</div>
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3">
                      PayPal Buy now
                    </Button>
                  </div>

                  <div className="mt-6 text-xs text-gray-500">
                    <p className="mb-2">
                      By logging in with express checkout methods, your shipping
                      address and preferred payment methods will be completed
                      automatically, while the security of your chosen payment
                      provider is guaranteed.
                    </p>
                    <p>
                      By completing the payment, you confirm that you have
                      accepted the terms and conditions and the privacy policy.
                      Used.com is your contractual partner and responsible for
                      legal obligations such as delivery, condition and
                      warranty. Refurbed provides the marketplace and technical
                      infrastructure.
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      Secure payment methods
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                        VISA
                      </div>
                      <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        MC
                      </div>
                      <div className="bg-pink-500 text-white px-2 py-1 rounded text-xs font-bold">
                        klarna
                      </div>
                      <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                        PayPal
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 text-white py-4 mt-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <span>Refurbed Marketplace GmbH</span>
              <span>General Terms and Conditions</span>
              <span>Data protection</span>
              <span>Impressum</span>
              <span>Legal notice</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Checkout step
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">re</span>
              </div>
              <span className="text-xl font-bold text-gray-900">furbed</span>
            </div>
            <Button variant="ghost" className="text-blue-600">
              Help
            </Button>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b mb-8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center space-x-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`text-sm ${step.id === currentStep ? "text-blue-600 font-semibold" : "text-gray-500"}`}
                    >
                      {step.label}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-24 h-0.5 mx-4 ${index <= 1 ? "bg-blue-600" : "bg-gray-300"}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight text-center">
          Delivery Info
          <span className="block w-20 mt-2 h-1 bg-blue-600 mx-auto"></span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          <div className="w-full lg:w-7/12 space-y-6">
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Billing address
                </h2>

                <div className="mb-4">
                  <Label
                    htmlFor="savedAddress"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </Label>
                  <Select value={savedAddress} onValueChange={setSavedAddress}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose one of your address" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name*
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      className={formErrors.firstName ? "border-red-500" : ""}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    {formErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name*
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      className={formErrors.lastName ? "border-red-500" : ""}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    {formErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone Number Field */}
                <div className="mb-4">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number*
                  </Label>
                  <div className="flex">
                    <Select defaultValue="+1">
                      <SelectTrigger className="w-36 rounded-r-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem
                            key={country.code}
                            value={`+${country.phone}`}
                          >
                            {country.code} +{country.phone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phoneNumber"
                      type="text"
                      placeholder="123-456-7890"
                      className={`rounded-l-none ${formErrors.phoneNumber ? "border-red-500" : ""}`}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                  {formErrors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.phoneNumber}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <Label
                    htmlFor="address"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Shipping Address*
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Enter here your address"
                    rows={3}
                    className={formErrors.address ? "border-red-500" : ""}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  {formErrors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label
                      htmlFor="country"
                      className="text-sm font-medium text-gray-700 mb-1"
                    >
                      Country*
                    </Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-700 mb-1"
                    >
                      City*
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter your city"
                      className={formErrors.city ? "border-red-500" : ""}
                      required
                    />
                    {formErrors.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.city}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                  <Truck className="w-5 h-5 mr-2 text-blue-600" />
                  Delivery address
                </h2>

                <RadioGroup
                  value={deliveryType}
                  onValueChange={setDeliveryType}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="same" id="same" />
                    <Label htmlFor="same" className="text-gray-700">
                      Delivery to the same address
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="another" id="another" />
                    <Label htmlFor="another" className="text-gray-700">
                      Delivery to another address
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                  <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                  Payment details
                </h2>

                <RadioGroup
                  value={paymentType}
                  onValueChange={setPaymentType}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="text-gray-700">
                      Online with bank card
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Cart items and order summary */}
          <div className="w-full lg:w-5/12">
            <div className="sticky top-8">
              {/* Cart Items */}
              <Card className="mb-6 transition-all duration-300 hover:shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                    <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
                    Cart Items
                  </h2>

                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {orderData.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start space-x-4 p-3 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-colors duration-200 rounded-md"
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-16 w-16 object-cover rounded-md"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 line-clamp-2">
                            {item.name}
                          </p>
                          {item.description && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center">
                              <span className="text-xs font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded">
                                ×{item.quantity}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              €{(item.currentPrice * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200 transition-all duration-300 hover:shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Order summary
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Original price</span>
                      <span className="text-gray-800">
                        €{originalPrice.toFixed(2)}
                      </span>
                    </div>

                    {orderData.voucherApplied && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Discount</span>
                        <span className="text-green-600">
                          -€{savings.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">Service charge</span>
                      <span className="text-gray-800">
                        €{serviceCharge.toFixed(2)}
                      </span>
                    </div>

                    <div className="pt-3 mt-3 border-t border-green-300">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-800">
                          Total
                        </span>
                        <span className="text-lg font-bold text-blue-600">
                          €{total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleContinueToPayment}
                    className={`mt-6 w-full py-3 px-4 rounded-md font-medium flex items-center justify-center transition-colors duration-300 transform hover:scale-[1.01] active:scale-[0.99] ${
                      formValid
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-300 text-white cursor-not-allowed"
                    }`}
                    disabled={!formValid}
                  >
                    Continue to payment
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <span>Refurbed Marketplace GmbH</span>
            <span>General Terms and Conditions</span>
            <span>Data protection</span>
            <span>Impressum</span>
            <span>Legal notice</span>
          </div>
        </div>
      </div>
    </div>
  );
}
