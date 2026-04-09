import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(serverUrl + "/api/user/currentuser", {
      withCredentials: true,
    });
    // console.log(result.data)
    dispatch(setUserData(result.data));
  } catch (error) {
    console.log(error);
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      serverUrl + "/api/notes/generate-notes",
      payload,
      { withCredentials: true },
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error)
  }
};



export const downloadPDF = async (result) => {
  try {
    const response = await axios.post(
      serverUrl + "/api/pdf/generate-pdf",
      { result },
      {
        responseType: "blob",
        withCredentials: true,
      }
    );

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    // ✅ dynamic filename (optional)
    const fileName = `${result?.topic || "ExamNotes"}-${Date.now()}.pdf`;
    link.setAttribute("download", fileName);

    // ✅ IMPORTANT (browser compatibility)
    document.body.appendChild(link);
    link.click();

    // ✅ cleanup
    link.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("PDF download failed:", error);
    throw error; // 🔥 original error forward karo
  }
};
