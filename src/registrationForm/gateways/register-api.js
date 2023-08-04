import AxiosClient from "utils/AxiosClient";
// we can call axios client using async await as shown in 2nd func to optimise code further

async function fetchUser() {
  try {
    const { data } = await AxiosClient("/api/fetch/user", "GET");
    return data;
  } catch (e) {
    console.log("E is i", e);
    throw new Error();
  }
}

async function fetchSelectOption(type, id) {
  const url = id ? `/api/fetch/${type}/${id}` : `/api/fetch/${type}`;
  try {
    console.log("inside try block============== ");
    const { data } = await AxiosClient(url, "GET");
    return data;
  } catch (e) {
    console.log("E is i", e);
    throw new Error();
  }
}

async function saveUserData(payload) {
  try {
    const { data } = await AxiosClient("/api/formdata/save", "POST", payload);
    return data;
  } catch (e) {
    throw new Error();
  }
}
export { fetchSelectOption, saveUserData, fetchUser };
