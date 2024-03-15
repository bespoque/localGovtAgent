import { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IconTabs } from "../tabs";
import Spinner from "../spiner";
import Widget from "../widget";
import { fetchProperty,getPropertyCategory } from "../../services/general";
import { PropertyEnumerationTable } from "../tables/propertyEnumeration";



const PropertyResidentEnumeration = () => {

    const [state, setState] = useState({
        allResidentialEnumeration: [],
        allEnumerationsData: [],
        pendingInvoiceData: [],
        completedInvoiceData: [],
      });
    useEffect(() => {
        console.log('Property Resident Enumeration')
        const fetchDataAsync = async () => {
          try {
            const residentialProperties = await fetchProperty({category:'Residential'});
            setState((prevState) => {
                return {
                  ...prevState,
                  allResidentialEnumeration: [...residentialProperties],
                };
              });
          console.log('result',residentialProperties)
          } catch (error) {}
        };
    
        fetchDataAsync();
      }, []);

      const [propertyCategory, setPropertyCategory] = useState(null)
  let allResidentialEnumeration = state.allResidentialEnumeration;
  console.log('allResidentialEnumeration',allResidentialEnumeration)


  const tabsWithIcons = [
    {
      index: 0,
      title: (
        <>
          <span className="ml-2">All Properties</span>
        </>
      ),
      content: (
        <>
          <PropertyEnumerationTable item={allResidentialEnumeration} />
        </>
      ),
    },
    {
      index: 1,
      title: (
        <>
          <span className="ml-2">All Enumerations</span>
        </>
      ),
      content: (
        <>
          {/* <PendingTransportEnumerationTable item={allEnumerations} /> */}
        </>
      ),
    },
    {
      index: 2,
      content: (
        <>
          {/* <PendingTransportEnumerationTable item={pendingInvoice} /> */}
        </>
      ),
      title: (
        <>
          <span className="ml-2">All Residential Properties</span>
        </>
      ),
    },
    {
      index: 3,
      title: (
        <>
          <span className="ml-2">Completed Enumerations</span>
        </>
      ),
      content: (
        <>
          {/* <PendingTransportEnumerationTable item={completedInvoice} /> */}
        </>
      ),
    },
  ];


    return (  
        <>
        {/* {isLoading && <Spinner isVisible={true} />} */}
        <Widget>
            <div className="flex flex-wrap">
            <div className="w-full">
                {allResidentialEnumeration && (
                <IconTabs tabs={tabsWithIcons}  />
                )}
            </div>
            </div>
        </Widget>
        </>
     );
}
 
export default PropertyResidentEnumeration;