import "../style/Skiresortcard.css"
import React from "react";
function Skiresortcard({resort,temp,description,snow,busy,src}) {
  console.log(resort.name)
    const MY_ACCESS_KEY = "7ZRNVRYDAj2LhFsIzZYj4jaGhns6RB8-b2UEdgAfUBM"

    const howBusy = () =>{
        if(busy <= 10){
            return  <p className="text-medium font-small font-bold uppercase tracking-widest text-green-900">
                    It is not that busy
                    </p>
        }
        else if(busy<=20){
            return  <p className="text-medium font-small font-bold uppercase tracking-widest text-yellow-900">
                It is kind of busy
                </p>
        }
        else{
            return  <p className="text-medium font-small font-bold uppercase tracking-widest text-red-900">
                It is busy
                </p>
        }
    }
  return (
      <div className="skiresort">
        <a href={resort.website} className="group relative block bg-black">
            <img
                alt={resort.name}
                src={src}
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-8">
                <p className="text-sm font-medium uppercase tracking-widest text-blue-800">
                Temp: {temp}F {description}
                </p>
                <p className="text-sm font-small uppercase tracking-widest text-blue-800">
                {snow} inch snow in last 3 hours
                </p>
                {howBusy()}
                <p className="text-2xl font-bold text-white">{resort.name}</p>

                <div className="mt-64">
                <div
                    className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm text-white">
                        Click to be sent to ski resort website
                    </p>
                </div>
                </div>
            </div>
        </a>
      </div>
  );
}

export default Skiresortcard;
