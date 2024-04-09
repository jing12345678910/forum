import server from "../server";

export const homeApi = {
  getMember: async (token) => {
    try {
      const response = await server.get("/member", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response && response.data) {
        return response.data;
      } else {
        console.error(
          "Error fetching member data: Response or data is undefined"
        );
        return null;
      }
    } catch (error) {
      console.error("Error fetching member data:", error);
      return null;
    }
  },

  getPostDataByPage: async (page, perPage) => {
    try {
      const url = `/post?page=${page}&per_page=${perPage}`;
      const { data } = await server.get(url);
      return data;
    } catch (error) {
      console.error("Error fetching Post data:", error.message);
      return [];
    }
  },

  getPostDataBy10: async (page, perPage) => {
    try {
      const url = `/post?page=${page}&per_page=${perPage}`;
      const response = await server.get(url);
      if (response && response.data) {
        console.log("Page:", page);
        console.log("PerPage:", perPage);
        return response.data;
      } else {
        console.error("Error: No data received");
        return [];
      }
    } catch (error) {
      console.error("Error fetching Post data:", error.message);
      return [];
    }
  },
};
