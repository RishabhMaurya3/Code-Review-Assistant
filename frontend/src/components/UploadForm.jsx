// import React, { useState } from "react";
// import {
//   createReviewFromText,
//   createReviewFromFile,
// } from "../api/reviewApi";
// import Loader from "./Loader";
// import "./UploadForm.css";

// const LANGUAGE_OPTIONS = [
//   { value: "auto", label: "Auto detect" },
//   { value: "C++", label: "C++" },
//   { value: "C", label: "C" },
//   { value: "C#", label: "C#" },
//   { value: "Java", label: "Java" },
//   { value: "JavaScript", label: "JavaScript" },
//   { value: "TypeScript", label: "TypeScript" },
//   { value: "Python", label: "Python" },
//   { value: "Go", label: "Go" },
//   { value: "Rust", label: "Rust" },
//   { value: "PHP", label: "PHP" },
//   { value: "Ruby", label: "Ruby" },
//   { value: "Kotlin", label: "Kotlin" },
//   { value: "Swift", label: "Swift" },
//   { value: "Other", label: "Other / Not listed" },
// ];

// const UploadForm = ({ onNewReview }) => {
//   const [code, setCode] = useState("");
//   const [language, setLanguage] = useState("auto");
//   const [file, setFile] = useState(null);
//   const [mode, setMode] = useState("text");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       let review;

//       if (mode === "text") {
//         if (!code.trim()) {
//           setError("Please paste some code to review.");
//           setLoading(false);
//           return;
//         }
//         review = await createReviewFromText({ code, language });
//       } else {
//         if (!file) {
//           setError("Please select a file to upload.");
//           setLoading(false);
//           return;
//         }
//         review = await createReviewFromFile(file, language);
//       }

//       onNewReview(review);
//       setCode("");
//       setFile(null);
//       setLanguage("auto");
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to submit code.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="upload-form-wrapper">
//       <div className="upload-header">
//         <h2>Submit Code for Review</h2>
//         <div className="mode-toggle">
//           <button
//             type="button"
//             className={mode === "text" ? "active" : ""}
//             onClick={() => setMode("text")}
//           >
//             Paste
//           </button>
//           <button
//             type="button"
//             className={mode === "file" ? "active" : ""}
//             onClick={() => setMode("file")}
//           >
//             Upload
//           </button>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="upload-form">
//         <div className="input-group">
//           <label>Language</label>
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//           >
//             {LANGUAGE_OPTIONS.map((opt) => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {mode === "text" ? (
//           <div className="input-group">
//             <label>Code</label>
//             <textarea
//               placeholder="Paste your code here..."
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//             />
//           </div>
//         ) : (
//           <div className="input-group">
//             <label>Code File</label>
//             <input
//               type="file"
//               accept=".js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.cs,.go,.rs,.php,.rb,.kt,.swift,.txt"
//               onChange={(e) => setFile(e.target.files[0])}
//             />
//           </div>
//         )}

//         {error && <p className="error-box">{error}</p>}

//         {loading ? (
//           <Loader label="Asking the model to review your code..." />
//         ) : (
//           <button type="submit" className="submit-btn">
//             🚀 Run Code Review
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default UploadForm;
// import React, { useState } from "react";
// import {
//   createReviewFromText,
//   createReviewFromFile,
// } from "../api/reviewApi";
// import Loader from "./Loader";
// import "./UploadForm.css"; // Import the custom CSS

// const LANGUAGE_OPTIONS = [
//   { value: "auto", label: "Auto detect" },
//   { value: "C++", label: "C++" },
//   { value: "C", label: "C" },
//   { value: "C#", label: "C#" },
//   { value: "Java", label: "Java" },
//   { value: "JavaScript", label: "JavaScript" },
//   { value: "TypeScript", label: "TypeScript" },
//   { value: "Python", label: "Python" },
//   { value: "Go", label: "Go" },
//   { value: "Rust", label: "Rust" },
//   { value: "PHP", label: "PHP" },
//   { value: "Ruby", label: "Ruby" },
//   { value: "Kotlin", label: "Kotlin" },
//   { value: "Swift", label: "Swift" },
//   { value: "Other", label: "Other / Not listed" },
// ];

// const UploadForm = ({ onNewReview }) => {
//   const [code, setCode] = useState("");
//   const [language, setLanguage] = useState("auto");
//   const [file, setFile] = useState(null);
//   const [mode, setMode] = useState("text");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       let review;

//       if (mode === "text") {
//         if (!code.trim()) {
//           setError("Please paste some code to review.");
//           setLoading(false);
//           return;
//         }
//         review = await createReviewFromText({ code, language });
//       } else {
//         if (!file) {
//           setError("Please select a file to upload.");
//           setLoading(false);
//           return;
//         }
//         review = await createReviewFromFile(file, language);
//       }

//       onNewReview(review);
//       setCode("");
//       setFile(null);
//       setLanguage("auto");
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to submit code.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="upload-form-wrapper">
//       <div className="upload-header">
//         <h2>Submit Code for Review</h2>
//         <div className="mode-toggle">
//           <button
//             type="button"
//             className={mode === "text" ? "active" : ""}
//             onClick={() => setMode("text")}
//           >
//             Paste
//           </button>
//           <button
//             type="button"
//             className={mode === "file" ? "active" : ""}
//             onClick={() => setMode("file")}
//           >
//             Upload
//           </button>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="upload-form">
//         <div className="input-group">
//           <label>Language</label>
//           <select value={language} onChange={(e) => setLanguage(e.target.value)}>
//             {LANGUAGE_OPTIONS.map((opt) => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {mode === "text" ? (
//           <div className="input-group">
//             <label>Code</label>
//             <textarea
//               placeholder="Paste your code here..."
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//             />
//           </div>
//         ) : (
//           <div className="input-group file-input-group">
//             <label>Code File</label>
//             <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//           </div>
//         )}

//         {error && <p className="error-box">{error}</p>}

//         {loading ? (
//           <Loader label="Asking the model to review your code..." />
//         ) : (
//           <div className="submit-area">
//             <button type="submit" className="submit-btn">
//               🚀 Run Code Review
//             </button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default UploadForm;


import React, { useState } from "react";
import {
  createReviewFromText,
  createReviewFromFile,
} from "../api/reviewApi";
import Loader from "./Loader";
import "./UploadForm.css"; // Import the custom CSS

const LANGUAGE_OPTIONS = [
  { value: "auto", label: "Auto detect" },
  { value: "C++", label: "C++" },
  { value: "C", label: "C" },
  { value: "C#", label: "C#" },
  { value: "Java", label: "Java" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Python", label: "Python" },
  { value: "Go", label: "Go" },
  { value: "Rust", label: "Rust" },
  { value: "PHP", label: "PHP" },
  { value: "Ruby", label: "Ruby" },
  { value: "Kotlin", label: "Kotlin" },
  { value: "Swift", label: "Swift" },
  { value: "Other", label: "Other / Not listed" },
];

const UploadForm = ({ onNewReview }) => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("auto");
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("text");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let review;

      if (mode === "text") {
        if (!code.trim()) {
          setError("Please paste some code to review.");
          setLoading(false);
          return;
        }
        review = await createReviewFromText({ code, language });
      } else {
        if (!file) {
          setError("Please select a file to upload.");
          setLoading(false);
          return;
        }
        review = await createReviewFromFile(file, language);
      }

      onNewReview(review);
      setCode("");
      setFile(null);
      setLanguage("auto");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to submit code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-form-wrapper">
      <div className="upload-header">
        <h2>Submit Code for Review</h2>
        <div className="mode-toggle">
          <button
            type="button"
            className={mode === "text" ? "active" : ""}
            onClick={() => setMode("text")}
          >
            Paste
          </button>
          <button
            type="button"
            className={mode === "file" ? "active" : ""}
            onClick={() => setMode("file")}
          >
            Upload
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="input-group full-width">
          <label>Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {mode === "text" ? (
          <div className="input-group">
            <label>Code</label>
            <textarea
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        ) : (
          <div className="input-group full-width file-input-group">
            <label>Code File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        )}

        {error && <p className="error-box">{error}</p>}

        {loading ? (
          <Loader label="Asking the model to review your code..." />
        ) : (
          <div className="submit-area">
            <button type="submit" className="submit-btn">
              🚀 Run Code Review
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadForm;
