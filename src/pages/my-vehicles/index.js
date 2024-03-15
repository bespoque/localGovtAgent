import React from "react";
import TransportEnumerationComponent from "../../components/transport-enumeration";
import SectionTitle from "../../components/section-title";

const MyVehicles = () => {
  return (
    <section>
      <div className="mb-10">
        <SectionTitle
          title="My Vehicles"
          subtitle="View your Vehicles"
        />
      </div>
      <TransportEnumerationComponent />
    </section>
  );
};

export default MyVehicles;
