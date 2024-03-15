import React, { useState, useRef, useEffect } from "react";
import url from "../../config/url";
import axios from "axios";
import setAuthToken from "../../functions/setAuthToken";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SectionTitle from "../../components/dashboard/section-title";
import Widget1 from "../../components/dashboard/widget-1";
import * as Icons from "../../components/Icons/index";
import TransportEnumerationComponent from "../../components/transport-enumeration";
import { SideModal } from "../../components/modals/Modal";
import ResidentEnumerationForm from "../../components/Form/ResidentEnumeration";
import CommercialEnumerationForm from "../../components/Form/CommercialEnumeration";
import { fetchProperty, getPropertyCategory } from "../../services/general";
import PropertyResidentEnumeration from "../../components/property-enumeration";
const PropertyEnumeration = () => {
  const { register, errors, handleSubmit, formState } = useForm();
  const [state, setState] = useState({
    addResidentialProperty: false,
    addCommercialProperty: false,
  });

  setAuthToken();

  const [propertyCategory, setPropertyCategory] = useState(null);
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchProperty({ category: "Residential" });
        const category = await getPropertyCategory();
        setPropertyCategory(category.residential);
        console.log("result", result);
      } catch (error) {}
    };

    fetchDataAsync();
  }, []);

  const closeResidentialPropertyForm = () => {
    console.log("close");
    setState((prev) => {
      return {
        ...prev,
        addResidentialProperty: false,
      };
    });
  };

  const closeCommercialPropertyForm = () => {
    console.log("close");
    setState((prev) => {
      return {
        ...prev,
        addCommercialProperty: false,
      };
    });
  };

  return (
    <section>
      <SectionTitle
        title="Property Enumeration"
        subtitle="Select Property Type"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div
          onClick={() => {
            setState((prev) => {
              return {
                ...prev,
                addResidentialProperty: true,
              };
            });
          }}
        >
          <Widget1
            color="teal"
            title="Residential Property"
            right={<Icons.ResidentialProperty />}
          />
        </div>

        <div
          onClick={() => {
            setState((prev) => {
              return {
                ...prev,
                addCommercialProperty: true,
              };
            });
          }}
        >
          <Widget1
            color="emerald"
            title="Commercial Property "
            right={<Icons.CommercialProperty />}
          />
        </div>
      </div>

      <div className="my-8">
        {/* <StatsCard /> */}
        {/* <TransportEnumerationComponent /> */}
        <PropertyResidentEnumeration />
      </div>
      {state.addResidentialProperty && (
        <SideModal
          title="Add Residential Property"
          onClick={closeResidentialPropertyForm}
          // onClick={() => {
          //   {closeResidentialPropertyForm}
          //   setState((prev) => {
          //     return {
          //       ...prev,
          //       addResidentialProperty: false,
          //     };
          //   });
          // }}
        >
          <div className="mt-5">
            <ResidentEnumerationForm onClose={closeResidentialPropertyForm} />
          </div>
        </SideModal>
      )}
      {state.addCommercialProperty && (
        <SideModal
          title="Add Commercial Property"
          onClick={() => {
            setState((prev) => {
              return {
                ...prev,
                addCommercialProperty: false,
              };
            });
          }}
        >
          <div className="mt-5">
            <CommercialEnumerationForm onClose={closeCommercialPropertyForm} />
          </div>
        </SideModal>
      )}
    </section>
  );
};

export default PropertyEnumeration;
