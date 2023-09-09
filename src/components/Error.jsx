import React from "react";

function Error() {
  return (
    <div className="flex justify-center h-full">
      <h3 className="my-64">
        <span className="text-4xl font-bold text-red-600">OOps!</span>
        <span className="text-4xl mx-3 font-bold">Something went wrong</span>
      </h3>
    </div>
  );
}

export default Error;
