import DefaultCarousel from './Curosal';
import React from 'react';


const Home = () => {
  return (

    <div>
      <DefaultCarousel />
      <div className='bg-gray-200  pl-4 pr-4'>
        <h1 className="text-3xl font-bold text-blue-900 mb-4 text-center">Welcome to the World of Containerization</h1>
        <p className='pl-2 mb-3 text-black text-center'>The two step process</p>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-gray-200 rounded-lg p-8 shadow">
            <h2 className="text-2xl font-bold mb-4">Step 1: Explore</h2>
            <p className="text-gray-700 mb-4">Gain valuable insights into the features offered by this platform</p>
            <a className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 w-32 h-10 px-4 rounded" href="/about">

              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500">Explore</span>
              </span></a>
          </div>
          <div className='bg-gray-200 rounded-lg p-8 shadow'>
            <h2 className="text-2xl font-bold mb-4">Step 2: Get Started</h2>
            <p className="text-gray-700 mb-4">Begin your journey by getting started with our platform</p>
            <a className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded  w-32 h-10" href="/service"><span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-green-400">GetStarted</span>
            </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
