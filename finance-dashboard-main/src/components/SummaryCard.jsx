import React from "react";

const SummaryCard = (props) => {
  return (
    <div className={`${props.bg} p-5 rounded-2xl text-white shadow-lg backdrop-blur-lg bg-opacity-20 border border-white/10 flex justify-between items-center`}>
      
      <div>
        <p className="text-sm opacity-80">{props.title}</p>
        <h2 className="text-3xl font-bold mt-2">₹ {props.amount}</h2>
      </div>

      <div className="text-3xl">{props.icon}</div>
    </div>
  );
};

export default SummaryCard;