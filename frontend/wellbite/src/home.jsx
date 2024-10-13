import React from "react";
import { Link } from "react-router-dom";

const Home =()=>{
    return (
        <section className="w-screen h-screen bg-temp_food_bg bg-center bg-cover bg-clip-border">
    <div className="bg-[#212121] bg-opacity-[60%] h-full w-full">
      <div className="w-full h-[10%] bg-inhet sticky flex justify-between px-12 place-items-center">
        <h1 className="font-futura text-white text-4xl">WellBite</h1>
      <Link to={'/dashboard'}><button className="hover:-translate-y-1 hover:bg-gray-200 hover:text-black transition border-2 hover:scale-110 bg-transparent rounded-lg px-4 py-2 text-white ease-in-out">Login</button></Link>
      </div>

      <div className="w-full h-[80%] place-items-center justify-center">
        <div className="w-full h-[60%] flex justify-center place-items-center">
          <p className="font-futura text-center text-gray-200 text-4xl">A Dietary Tracker that helps patients easily<br/>manage dietary restrictions by tracking meals,<br/> offering personalized dietary safety check. Stay<br/> on track and share progress with healthcare<br/> providers effortlessly.</p>
        </div>
        <div className="w-full h-[30%] justify-center flex flex-col place-items-center">
          <h1 className="text-gray-200 text-2xl underline">Get Started</h1>
          <div className="w-[26%] h-full flex justify-between place-items-center">
            <Link to={'/docsignup'} className="bg-[#4F5DF9] transition ease-in-out bg-opacity-[40%] hover:scale-110 border-[#4F5DF9] rounded-xl border-2 text-white text-xl px-6 py-4 hover:-translate-y-1 hover:bg-opacity-100 hover:text-white">I am a Doctor</Link>
            <button className="bg-[#69e371] transition ease-in-out hover:-translate-y hover:bg-opacity-100 hover:text-white bg-opacity-[40%] border-[#4FF95A] rounded-xl hover:scale-110 border-2 text-white text-xl px-6 py-4">I am a Patient</button>
          </div>
        </div>
      </div>
    </div>
   </section>
    );
};

export default Home;