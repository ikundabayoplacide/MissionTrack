import React from "react";
import Revenue from "./Revenue";
import Plans from "./Plans";

const Subscriptions: React.FC = () => {
  return (
    <main className="w-full min-h-screen p-4 space-y-6">
      <Revenue />
      <Plans />
    </main>
  );
};

export default Subscriptions;
