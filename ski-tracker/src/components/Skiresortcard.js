import "../style/Skiresortcard.css"
import React from "react";
function Skiresortcard({resort,temp,description,snow}) {
  console.log(resort.name)
    const MY_ACCESS_KEY = "7ZRNVRYDAj2LhFsIzZYj4jaGhns6RB8-b2UEdgAfUBM"
    let website = "#"
    console.log(resort.website)
  return (
      <div className="skiresort">
        <a href={resort.website} className="group relative block bg-black">
            <img
                alt={resort.name}
                src={"https://images.unsplash.com/photo-1600332303625-c7d287a9f4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"}
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-8">
                <p className="text-sm font-medium uppercase tracking-widest text-blue-800">
                Temp: {temp}F {description}
                </p>
                <p className="text-sm font-small uppercase tracking-widest text-blue-800">
                {snow} inch snow in last 3 hours
                </p>
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
