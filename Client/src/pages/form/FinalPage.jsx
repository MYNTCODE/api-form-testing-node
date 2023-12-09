import React from "react";
const FinalPage = ({ onSubmit, onPrev, formData, setFormData }) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Create a preview URL for the selected image
    const previewURL = URL.createObjectURL(selectedFile);
    setImagePreview(previewURL);
  };

  const handleFormSubmit = async () => {
    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append("file", file);

      for (const key in formData) {
        formDataWithFile.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        body: formDataWithFile,
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        onSubmit();
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upload your profile picture</h1>

      <div className=" flex-col ml-16">
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Selected file preview"
            className="max-w-full max-h-64 mb-4"
          />
        )}

        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="mt-4 "
        />
      </div>
      <div className="mt-6">
        <button onClick={onPrev} className="bg-slate-50 mr-4">
          Previous
        </button>
        <button onClick={handleFormSubmit} className="bg-slate-50">
          Submit
        </button>
      </div>
    </div>
  );
};

export default FinalPage;
