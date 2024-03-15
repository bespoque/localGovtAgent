import axios from "axios";
import url from "../config/url";


export const fetchLga = async () => {
    try {
      const response = await axios.post(`${url.BASE_URL}state/lga`);
      const lgaName = response.data.data.map((item) => item);
      return lgaName;
    } catch (error) {}
  };

export const fetchVehicles = async () => {
  try {
    const response = await axios.get(`${url.BASE_URL}enumeration/vehicle-category`);
    const vehicleCategory = response.data.map((item) => item);
    return vehicleCategory;
  } catch (error) {
    
  }
}

export const fetchParks = async () => {
  try {
    const response = await axios.get(`${url.BASE_URL}enumeration/parks`);
    console.log('parks',response)
    const parks = response.data.map((item) => item);
    return parks;
  } catch (error) {
    
  }
}

export const fetchUnions = async () => {
  try {
    const response = await axios.get(`${url.BASE_URL}enumeration/unions`);
    console.log('unions',response)

    const unions = response.data.map((item) => item);
    return unions;
  } catch (error) {
    
  }
}

  export const fetchProperty = async (data) => {
    console.log('property payload',data)
    try {
      const response = await axios.get(`${url.BASE_URL}enumeration/property/fetch-all`,{params:data});  
      const properties = response.data.data.map((item) => item);
      // console.log('properties',response.data.data)
      // console.log('properties',response)
      return properties;
    } catch (error) { }
  }


export const getPropertyCategories = async () => {
  console.log('getPropertyCategories');
  try {
    const response = await axios.get(`${url.BASE_URL}enumeration/property/category`);

    // Filter data by category "Residential"
    const residentialCategory = response.data.data.filter((item) => item.category === 'Residential');

    // Filter data by category "Commercial"
    const commercialCategory = response.data.data.filter((item) => item.category === 'Commercial');

    return {
      residential: residentialCategory,
      commercial: commercialCategory,
    };
  } catch (error) {
    console.error('Error fetching property categories:', error);
    // Handle the error if needed
    return {
      residential: [],
      commercial: [],
    };
  }
};
