import api from "./api";

class LocationService {
  getAllLocations() {
    return api.get("/locations", { withCredentials: true });
  }

  createLocation(name, description, token) {
    return api.post(
      "/locations/add",
      {
        name: name,
        description: description,
      },
      { withCredentials: true,
        headers: { "X-CSRF-TOKEN": token } }
    );
  }

  removeLocation (name, token) {
    return api.put(
      `/locations/delete`,
      {
        name: name,
      },
      {
        headers: { "X-CSRF-TOKEN": token },
      }
    );
  }
}

export default new LocationService();
