import drone from '../assets/drone.png'
import headphone from '../assets/headphone.png'
import iphone from '../assets/iphone.png'


const categories = [
  {
    id: 1,
    title: 'ProductName',
    details: 'Product Details:',
    image: drone, // Drone placeholder
  },
  {
    id: 2,
    title: 'ProductName',
    details: 'Product Details:',
    image: headphone, // Headphones
  },
  {
    id: 3,
    title: 'ProductName',
    details: 'Product Details:',
    image: iphone, // Phone
  },
  {
    id: 4,
    title: 'ProductName',
    details: 'Product Details:',
    image: drone, // Drone placeholder
  },
];

const ProductCategories = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      {categories.map((category) => (
        <div 
          key={category.id} 
          className="bg-[#f4f4f6] rounded-3xl p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden group"
        >
          <div className="space-y-2 max-w-[60%]">
            <h3 className="text-2xl font-serif tracking-tight text-gray-900">{category.title}</h3>
            <p className="text-sm font-medium text-gray-900">{category.details}</p>
          </div>
          
          <div className="pt-8">
            <a href="#explore" className="inline-flex items-center text-sm font-medium text-gray-900 hover:underline">
              Explore Category <span className="ml-1">→</span>
            </a>
          </div>

          {/* Absolute positioned product image matching the bottom-right corner crop */}
          <div className="absolute right-0 bottom-0 w-1/2 h-1/2 md:h-3/5 flex items-end justify-end">
            <img 
              src={category.image} 
              alt={category.title} 
              className="object-contain max-h-full max-w-full transform translate-x-4 translate-y-4 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

const Hero = () => {
  return (
    <section className="my-9 max-w-6xl bg-[#f4f4f6] rounded-2xl  mx-auto px-6 py-5 md:px-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      {/* Left Content */}
      <div className="md:col-span-5 space-y-6 mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-gray-900 leading-tight">
          High-quality tech <br /> 
          <span className="italic">gadets</span> & accessories
        </h1>
        <div className="flex items-center space-x-4 pt-2">
          <a href='/products' className="bg-black text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
            Browse
          </a>
          <a href="/about" className="border border-gray-400 text-black text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-50 transition-colors">
            About Us
          </a>
        </div>
      </div>

      {/* Right Image Container */}
      <div className="md:grid md:col-span-6 rounded-3xl p-8 flex items-center justify-center min-h-[300px] overflow-hidden relative hidden md:block">
        <img 
          src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80" 
          alt="Phones Showcase" 
          className="h-90 rounded-xl object-contain transform translate-y-4 "
        />
      </div>
    </section>
  );
};

const Testimonial = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:px-12 text-center">
      <h2 className="text-3xl font-serif text-gray-900 mb-12">What our customers are saying</h2>
      
      <div className="flex items-center justify-between gap-4">
        {/* Left Arrow */}
        <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors shrink-0">
          ←
        </button>

        {/* Testimonial Card */}
        <div className="bg-[#f4f4f6] rounded-3xl p-8 md:p-12 max-w-3xl w-full flex flex-col md:flex-row gap-8 items-center text-left relative">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shrink-0 bg-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80" 
              alt="Customer" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </div>
          
          <div className="flex flex-col justify-between h-48 w-full py-2">
            <div className="space-y-4">
              <div className="text-2xl text-gray-800">
                <span className="inline-block transform rotate-45 text-xl font-light">↑</span>
              </div>
              <p className="text-lg font-medium text-gray-900">Customer Review</p>
            </div>
            
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-gray-500">Customer Name</p>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors shrink-0">
          →
        </button>
      </div>
    </section>
  );
};


export const Home = () => {
  return (
    <div>
        <Hero />
        <ProductCategories />
        <Testimonial />
    </div>
  )
}

