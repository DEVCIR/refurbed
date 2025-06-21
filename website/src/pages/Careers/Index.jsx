import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  MapPin,
  Users,
  Globe,
  Heart,
  Droplets,
  Leaf,
  Recycle,
  Star,
  Map,
} from "lucide-react";

function Careers() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/images/refurbed-logo.png"
                alt="refurbed logo"
                className="h-10"
              />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                About us
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Life at refurbed
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                People at refurbed
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Interview process
              </a>
            </nav>

            {/* CTA Button */}
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              View current jobs
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Team Photo */}
      <section className="relative">
        <div className="w-full">
          <img
            src="/images/team-photo.png"
            alt="Team photo of refurbed employees"
            className="w-full h-[600px] object-cover"
          />
        </div>
      </section>

      {/* Our Top Facts Section */}
      <section className="bg-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Our Top Facts
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Team Members */}
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold">{"> 300"}</div>
                <div className="text-sm opacity-90">Team members</div>
              </div>
            </div>

            {/* Nationalities */}
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold">{"> 45"}</div>
                <div className="text-sm opacity-90">Nationalities</div>
              </div>
            </div>

            {/* Dogs */}
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold">37</div>
                <div className="text-sm opacity-90">Dogs</div>
              </div>
            </div>

            {/* Water Saved */}
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold">{"> 3 Bln.l"}</div>
                <div className="text-sm opacity-90">Water Saved</div>
              </div>
            </div>
          </div>

          {/* Second Row of Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* CO2 Saved */}
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold">{"> 178,000 t"}</div>
                <div className="text-sm opacity-90">CO2 saved</div>
              </div>
            </div>

            {/* Electronic Waste */}
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold">56 t</div>
                <div className="text-sm opacity-90">Electronic Waste Saved</div>
              </div>
            </div>

            {/* App Rating */}
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold">4.7</div>
                <div className="text-sm opacity-90">Average App Rating</div>
              </div>
            </div>

            {/* Countries */}
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Map className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold">27</div>
                <div className="text-sm opacity-90">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center justify-items-center">
            {/* EY Award */}
            <div className="text-center">
              <img
                src="/images/ey-logo.png"
                alt="EY International Scale-up and Start-Up since 2022"
                className="h-24 mx-auto"
              />
              <p className="text-sm font-semibold text-gray-800 mt-2">
                International Scale-up and Start-Up since
              </p>
              <p className="text-lg font-bold text-gray-900">2022</p>
            </div>

            {/* LinkedIn Top Startups */}
            <div className="text-center">
              <img
                src="/images/linkedin-award.png"
                alt="LinkedIn Top Startups Österreich 2022"
                className="h-32 mx-auto"
              />
            </div>

            {/* kununu Award */}
            <div className="text-center">
              <img
                src="/images/kununu-logo.png"
                alt="kununu logo"
                className="h-12 mx-auto mb-4"
              />
              <p className="text-sm font-semibold text-gray-800">
                Top employer in the DACH region since
              </p>
              <p className="text-lg font-bold text-gray-900">2023</p>
            </div>

            {/* Austrian Retail Innovation Award */}
            <div className="text-center">
              <img
                src="/images/retail-award.png"
                alt="Austrian Retail Innovation Award 2022"
                className="h-32 mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Environmental Protection
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Youtube className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <MapPin className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <div className="text-sm text-gray-300">
                <p className="mb-2">© Refurbed Marketplace GmbH</p>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="hover:text-white transition-colors">
                    T&C
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Imprint
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Careers;
