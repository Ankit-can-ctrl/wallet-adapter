// @ts-nocheck
import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";
import image4 from "../assets/4.png";
import image5 from "../assets/5.png";
import image6 from "../assets/6.png";
const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-semibold">Solana</span>
          </div>

          {/* Navigation Links */}
          {/* <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Product
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Explore
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
          </div> */}

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <button className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-float-slower" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl animate-float-medium" />

          {/* Floating Wallet Cards - Left Side */}
          <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg transform rotate-12 animate-float-1 backdrop-blur-sm border border-blue-300/50">
            <div className="w-full h-full flex items-center justify-center p-2">
              <img
                src={image1}
                alt="wallet"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="absolute top-40 left-32 w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl shadow-lg transform -rotate-6 animate-float-2 backdrop-blur-sm border border-yellow-300/50">
            <div className="w-full h-full flex items-center justify-center p-2">
              <img
                src={image2}
                alt="wallet"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="absolute top-64 left-20 w-24 h-24 bg-gradient-to-br from-red-100 to-pink-200 rounded-2xl shadow-lg transform rotate-6 animate-float-3 backdrop-blur-sm border border-red-300/50">
            <div className="w-full h-full flex items-center justify-center p-2">
              <img
                src={image3}
                alt="wallet"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="absolute bottom-32 left-40 w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl shadow-lg transform -rotate-12 animate-float-4 backdrop-blur-sm border border-teal-300/50">
            <div className="w-full h-full flex items-center justify-center p-2">
              <img
                src={image4}
                alt="wallet"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Floating Wallet Cards - Right Side */}
          <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-lg transform -rotate-12 animate-float-5 backdrop-blur-sm border border-purple-300/50">
            <div className="w-full h-full flex items-center justify-center p-2">
              <img
                src={image5}
                alt="wallet"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="absolute top-20 right-52 w-20 h-20 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl shadow-lg transform rotate-12 animate-float-6 backdrop-blur-sm border border-cyan-300/50">
            <div className="w-full h-full flex items-center justify-center p-2">
              <img
                src={image6}
                alt="wallet"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="absolute bottom-40 right-32 w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl shadow-lg transform rotate-6 animate-float-7 backdrop-blur-sm border border-orange-300/50">
            <div className="w-full h-full flex items-center justify-center p-3">
              <svg
                className="w-full h-full text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
          </div>

          {/* Blockchain Network Lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <line
              x1="10%"
              y1="20%"
              x2="90%"
              y2="30%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-pulse-line"
            />
            <line
              x1="15%"
              y1="60%"
              x2="85%"
              y2="40%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-pulse-line"
              style={{ animationDelay: "1s" }}
            />
            <line
              x1="20%"
              y1="80%"
              x2="80%"
              y2="60%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-pulse-line"
              style={{ animationDelay: "2s" }}
            />
          </svg>

          {/* Crypto Icons Floating */}
          <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center animate-float-8 border border-gray-200">
            <svg
              className="w-8 h-8 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z" />
            </svg>
          </div>

          <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center animate-float-9 border border-gray-200">
            <svg
              className="w-8 h-8 text-purple-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative max-w-4xl mx-auto text-center z-10">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-white border-4 border-black rounded-2xl flex items-center justify-center shadow-lg">
              <div className="text-5xl font-bold">19</div>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-sm font-medium text-gray-600 mb-4 tracking-wider uppercase">
            Building on Solana
          </p>

          {/* Main Headline */}
          <h1 className="text-7xl tracking-tighter md:text-8xl font-bold text-black mb-8 leading-tight">
            It's time.
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed">
            Connect in seconds, send airdrops, move SOL, and stay on top of your
            balance and transaction history—all from one streamlined dashboard.
          </p>

          {/* CTA Button */}
          <button className="px-8 py-4 bg-black text-white text-lg font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl">
            Get started
          </button>
        </div>

        {/* Preview Image Container */}
        <div className="max-w-6xl mx-auto mt-20">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-200 via-blue-200 to-cyan-200">
            <div className="aspect-video flex items-center justify-center">
              <div className="text-gray-500 text-lg">Dashboard Preview</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
