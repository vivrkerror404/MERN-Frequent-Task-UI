import axios from "axios";

async function AxiosClient(endpoint, method = "GET", data = {}) {
  const axiosInstance = await axios.create({
    baseURL: "http://localhost:5000", // Set the base URL
  });

  try {
    const response = await axiosInstance[method?.toLowerCase()](endpoint, data);
    console.log(response.data, "----------------");
    return response.data;
  } catch (error) {
    console.error("error============" ,error);
    throw new Error();
  }
}

export default AxiosClient;
