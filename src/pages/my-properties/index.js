import React from "react";
import TransportEnumerationComponent from "../../components/transport-enumeration";
import SectionTitle from "../../components/section-title";

const MyProperties = () => {
  return (
    <section>
      <div className="mb-10">
        <SectionTitle
          title="My Properties"
          subtitle="View your Properties"
        />
      </div>
      <TransportEnumerationComponent />
    </section>
  );
};

export default MyProperties;
