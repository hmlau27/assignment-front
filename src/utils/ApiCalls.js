import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:8080/auth",
});

const carApi = axios.create({
  baseURL: "http://localhost:8080/car",
});

const rentApi = axios.create({
  baseURL: "http://localhost:8080/rent",
});

const accessToken = window.localStorage.getItem("accessToken");

export async function getAllCars() {
  try {
    const response = await carApi.get("/getAll");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching cars : " + error.message);
  }
}

export async function getAvailableCars(rentStart, rentEnd) {
  try {
    const response = await carApi.get(
      `/get?rentStart=${rentStart}&rentEnd=${rentEnd}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching cars : " + error.message);
  }
}

export async function registerUser(user) {
  try {
    await authApi.post("/sign-up", user);

    return "User registered successfully. Please proceed to login.";
  } catch (error) {
    return "Error register account : " + error.response.data;
  }
}

export async function loginUser(credentials) {
  try {
    const response = await authApi.post("/sign-in", credentials);
    return response.data;
  } catch (error) {
    throw new Error("Login failed : " + error.message);
  }
}

export async function bookCar(email, carId, rentStart, rentEnd) {
  try {
    const response = await rentApi.post(
      `/email/${email}/car/${carId}?rentStart=${rentStart}&rentEnd=${rentEnd}`,
      null,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching cars : " + error.message);
  }
}

export async function addCar(car) {
  try {
    await carApi.post("/add", car, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    return "Car added successfully.";
  } catch (error) {
    return "Error adding car : " + error.message;
  }
}

export async function removeCar(carId) {
  try {
    await carApi.delete(`/delete/${carId}`, null, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    return "Car removed successfully.";
  } catch (error) {
    return "Error removing car : " + error.message;
  }
}
