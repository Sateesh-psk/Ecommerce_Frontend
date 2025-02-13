import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-6 md:px-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Welcome to <span className="font-semibold text-blue-600">ShopKaro</span>, 
          your one-stop destination for quality products and seamless shopping.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Section: About Us Content */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At <span className="font-semibold">ShopKaro</span>, we aim to provide a hassle-free
              shopping experience by offering a curated selection of premium
              products across various categories. Our platform is designed to
              bring you convenience, value, and trust with every purchase.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our mission is to connect people with products that add value to
              their lives. We prioritize customer satisfaction, product
              quality, and sustainable practices to build long-term
              relationships with our community.
            </p>
          </div>

          {/* Right Section: Image */}
          <div className="flex justify-center">
            <img
              className="rounded-lg shadow-lg w-full md:w-3/4"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlS2twjCnURsrpghtE856SM-pE6pljPnLlA&s"
              alt="About Us"
            />
          </div>
        </div>

        {/* Vision and Values Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Our Vision and Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                We embrace technology to continually improve your shopping
                experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Quality
              </h3>
              <p className="text-gray-600">
                We are committed to offering only the best products for our
                customers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Trust
              </h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We are here to support you at
                every step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
