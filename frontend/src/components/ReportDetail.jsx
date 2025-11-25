import React from "react";
import "./ReportDetail.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const ReportDetail = ({ review }) => {
  if (!review) {
    return (
      <div className="report-no-selection">
        Select a review on the left to see the full analysis.
      </div>
    );
  }

  const responseText = review.llmResponse || "";

  // console.log("reportDetail => ",responseText)

  // Proper extraction of sections
  const errors = responseText.match(/🛑 Errors:([\s\S]*?)(?=🔧 Fixes:|💡 Suggestions:|📦 Corrected Code:|$)/)?.[1]?.trim();
  const fixes = responseText.match(/🔧 Fixes:([\s\S]*?)(?=💡 Suggestions:|📦 Corrected Code:|$)/)?.[1]?.trim();
  const suggestions = responseText.match(/💡 Suggestions:([\s\S]*?)(?=📦 Corrected Code:|$)/)?.[1]?.trim();
  const correctedCode = responseText.match(/📦 Corrected Code:([\s\S]*)/)?.[1]?.trim() || review.correctedCode;

  return (
    <div className="report-detail-wrapper">
      <div className="report-header">
        <h2>{review.filename || "Pasted Code Review"}</h2>
        <p>
          <span className="bold">Language:</span>{" "}
          {review.language || review.detectedLanguage || "Unknown"}{" "}
          <span className="separator">•</span>
          Reviewed on {new Date(review.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="report-content">
        <section>
          <h3 className="section-title">LLM REVIEW</h3>

          {errors && (
            <div className="review-box">
              <p className="review-heading error-heading">🛑 Errors</p>
              <pre className="code-block compact-block">{errors}</pre>
            </div>
          )}

          {fixes && (
            <div className="review-box">
              <p className="review-heading fix-heading">🔧 Fixes</p>
              <pre className="code-block compact-block">{fixes}</pre>
            </div>
          )}

          {suggestions && (
            <div className="review-box">
              <p className="review-heading suggestion-heading">💡 Suggestions</p>
              <pre className="code-block compact-block">{suggestions}</pre>
            </div>
          )}
        </section>

        <section>
          <h3 className="section-title">ORIGINAL CODE</h3>
          <SyntaxHighlighter
            language={review.detectedLanguage?.toLowerCase() || "cpp"}
            style={vscDarkPlus}
            className="code-highlight"
          >
            {review.code}
          </SyntaxHighlighter>
        </section>

        {correctedCode && (
          <section>
            <h3 className="section-title">CORRECTED CODE</h3>
            <SyntaxHighlighter
              language={review.detectedLanguage?.toLowerCase() || "cpp"}
              style={vscDarkPlus}
              className="code-highlight"
            >
              {correctedCode}
            </SyntaxHighlighter>
          </section>
        )}
      </div>
    </div>
  );
};

export default ReportDetail;
