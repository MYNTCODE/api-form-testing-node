import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message, Button, Upload } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Document, Page, pdfjs } from "react-pdf";
import jsPDF from "jspdf";
import Logout from "../components/Logout";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const [editedUserName, setEditedUserName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedJobPosition, setEditedJobPosition] = useState("");
  const [editedSummaryTitle, setEditedSummaryTitle] = useState("");
  const [editedSummaryDescription, setEditedSummaryDescription] = useState("");
  const [editedWorkExperience, setEditedWorkExperience] = useState("");
  const [editedWorkDeatials, setEditedWorkDetials] = useState("");
  const [editedSkillTitle, setEditedSkillTitle] = useState("");
  const [editedSkillDetails, setEditedSkillDetails] = useState("");

  // const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const downloadAsPDF = async () => {
    try {
      const pdfDoc = new jsPDF();

      pdfDoc.text(`User Information: ${userData.fullName}`, 10, 10);
      pdfDoc.text(`User ID: ${userData.user_id}`, 10, 20);
      pdfDoc.text(`Full Name: ${userData.fullName}`, 10, 30);
      pdfDoc.text(`Email: ${userData.email}`, 10, 40);
      pdfDoc.text(`Phone Number: ${userData.phoneNumber}`, 10, 50);
      pdfDoc.text(`Job Position: ${userData.job_position || "N/A"}`, 10, 60);
      pdfDoc.text(
        `Summary Description: ${userData.summary_description}`,
        10,
        70
      );
      pdfDoc.text(`Work Experience: ${userData.work_experience}`, 10, 80);
      pdfDoc.text(`skill: ${userData.skill_title}`, 10, 90);

      // Photo from profile
      // if (userData.user_photo) {
      //   const userPhoto = await fetch(userData.user_photo);
      //   const photoBlob = await userPhoto.blob();
      //   const photoDataURL = URL.createObjectURL(photoBlob);
      //   pdfDoc.addImage(photoDataURL, "PNG", 10, 90, 40, 40);
      // }

      const blob = pdfDoc.output("blob");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "UserProfile.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error creating PDF:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!params.user_id) {
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/users/${params.user_id}`
        );
        if (response.data.status === "error") {
          throw new Error(response.data.message);
        }

        setUserData(response.data.data);
        setEditedUserName(response.data.data.fullName);
        setEditedPhone(response.data.data.phoneNumber);
        setEditedEmail(response.data.data.email);
        setEditedJobPosition(response.data.data.job_position);
        setEditedSummaryTitle(response.data.data.summary_title);
        setEditedSummaryDescription(response.data.data.summary_description);
        setEditedWorkExperience(response.data.data.work_experience);
        setEditedWorkDetials(response.data.data.work_detial);
        setEditedSkillTitle(response.data.data.skill_title);
        setEditedSkillDetails(response.data.data.skill_detial);

        console.log("user data", response.data.data);
        console.log("userId after API call:", params.user_id);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchUserData();
  }, [params.user_id]);

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${params.user_id}`,
        {
          fullName: editedUserName,
          phoneNumber: editedPhone,
          email: editedEmail,
          job_position: editedJobPosition,
          summary_description: editedSummaryDescription,
          work_experience: editedWorkExperience,
          skill_title: editedSkillTitle,
        }
      );

      if (response.status === 200) {
        // อัพเดท userData หลังจากทำการแก้ไข
        setUserData((prevUserData) => ({
          ...prevUserData,
          fullName: editedUserName,
          phoneNumber: editedPhone,
          email: editedEmail,
          job_position: editedJobPosition,
          summary_description: editedSummaryDescription,
          work_experience: editedWorkExperience,
          skill_title: editedSkillTitle,
        }));

        message.success("Successfully updated your profile.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // const handleDeletePhoto = async () => {
  //   try {
  //     setIsDeleting(true);
  //     setDeleteError(null);

  //     const response = await axios.delete(
  //       `http://localhost:3000/users/${params.user_id}`
  //     );

  //     if (response.status === 200) {
  //       // อัพเดท userData หลังจากทำการลบรูป
  //       setUserData((prevUserData) => ({
  //         ...prevUserData,
  //         user_photo: null,
  //       }));

  //       message.success("Successfully deleted user photo");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting photo:", error);
  //     setDeleteError("An error occurred while deleting the photo");
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // };

  return (
    <div className="container mx-auto bg-white">
      <h1 className="text-3xl font-bold mb-6">User Profile Page</h1>
      {userData ? (
        <>
          <form onSubmit={handleEditSubmit}>
            <div>
              <div className=" flex justify-center">
                <img
                  className=" w-[20%] gap-14 rounded-full "
                  src={userData.user_photo}
                  alt="User"
                />
              </div>{" "}
              <div className="ml-[-20px] pl-10 pt-10">
                <label className=" w-[100px]">
                  Full Name
                  <input
                    className="rounded-lg bg-white text-black border ml-4 px-4 h-11 w-[500px] border-grey300 focus:border-blue600 focus:outline-none"
                    id
                    type="text"
                    name="edited_fullName"
                    value={editedUserName}
                    onChange={(e) => setEditedUserName(e.target.value)}
                  />{" "}
                </label>
              </div>
              <div className="">
                <label className="ml-12">
                  Email
                  <input
                    className="rounded-lg bg-white w-[500px] mt-10 text-black border ml-4 px-4 h-11  border-grey300 focus:border-blue600 focus:outline-none"
                    type="text"
                    name="edited_email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                </label>{" "}
              </div>
              <div className="pt-10">
                <label className="ml-[-16px]">
                  Phone Number
                  <input
                    className="rounded-lg bg-white w-[500px] text-black border ml-4 px-4 h-11  border-grey300 focus:border-blue600 focus:outline-none"
                    type="text"
                    name="edited_phomeNumber"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                  />
                </label>{" "}
              </div>
              <div className="pt-10">
                <label className="ml-[-2px]">
                  Job Position
                  <input
                    className="rounded-lg bg-white w-[500px] text-black border ml-4 px-4 h-11  border-grey300 focus:border-blue600 focus:outline-none"
                    type="text"
                    name="edited_job_position"
                    value={editedJobPosition}
                    onChange={(e) => setEditedJobPosition(e.target.value)}
                  />
                </label>{" "}
              </div>
              <div className="pt-10">
                <label className="flex justify-center ml-[-75px]">
                  Summary Description
                  <textarea
                    className="rounded-lg  bg-white w-[500px] text-black border ml-4 px-4 h-11  border-grey300 focus:border-blue600 focus:outline-none"
                    type="textarea"
                    name="edited_summary_describtion"
                    placeholder="Mention your role, experience & most importantly - your biggest achievements, best qualities and skills."
                    value={editedSummaryDescription}
                    onChange={(e) =>
                      setEditedSummaryDescription(e.target.value)
                    }
                  />
                </label>
              </div>
              <div className="pt-10">
                <label className="flex justify-center ml-[-50px]">
                  Work Experience
                  <input
                    className="rounded-lg  bg-white w-[500px] ml-4 text-black border px-4 h-11  border-grey300 focus:border-blue600 focus:outline-none"
                    placeholder="Show your relevant experience."
                    name="edited_workExperience"
                    value={editedWorkExperience}
                    onChange={(e) => setEditedWorkExperience(e.target.value)}
                  />
                </label>
              </div>
              <div className="pt-10">
                <label className="flex justify-center ml-8">
                  Skill
                  <input
                    type="text"
                    className="rounded-lg  bg-white w-[500px] ml-4 text-black border px-4 h-11  border-grey300 focus:border-blue600 focus:outline-none"
                    placeholder="Important skills that show you fit the position. Make sure they match the key skills mentioned in the job listing."
                    name="edited_skill_detail"
                    value={editedSkillTitle}
                    onChange={(e) => setEditedSkillTitle(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="pt-10">
              <button type="submit">Save</button>
            </div>
          </form>

          <p className=" cursor-pointer pt-5 underline" onClick={downloadAsPDF}>
            Download as PDF
          </p>
          <div className="flex justify-center pt-10 pb-10">
            <Logout />
          </div>

          {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
