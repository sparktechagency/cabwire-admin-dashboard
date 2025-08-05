import { Button, message, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTermsQuery, useTermsAndConditionMutation } from '../features/Rule/RuleApi';


const TermsConditions = () => {
  const router = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [updateSettings, { isLoading: updateLoading }] = useTermsAndConditionMutation();
  const { data, isLoading: termsLoading } = useGetTermsQuery();

  useEffect(() => {
    if (data?.data?.content) {
      let parsedContent = "";

      try {
        // Try to parse as JSON first
        parsedContent = JSON.parse(data.data.content);
      } catch (error) {
        // If not JSON, use as HTML string
        parsedContent = data.data.content;
      }

      // Set content and mark as loaded
      setContent(parsedContent);
      setIsContentLoaded(true);

    } else if (!termsLoading) {
      // If no data and not loading, mark as loaded with empty content
      setIsContentLoaded(true);
    }
  }, [data, termsLoading]);

  // Configuration object for Jodit Editor with memoization
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing your Terms & Conditions...",
      height: 500,
      buttons: ['bold', 'italic', 'underline', 'ul', 'ol', 'indent', 'outdent', 'image'],
      showPlaceholder: true,
      toolbarSticky: false,
      toolbarAdaptive: false,
      cleanHTML: {
        fillEmptyParagraph: false,
        replaceNBSP: false,
        removeEmptyElements: false
      }
    }),
    []
  );

  const handleSaveTermsConditions = async () => {
    if (!content || content.trim() === '') {
      message.warning("Please enter some content before saving");
      return;
    }

    setIsLoading(true);
    try {
      // Send content directly as HTML string
      const response = await updateSettings({
        content: content,
        type: "terms"
      }).unwrap();

      if (response?.success) {
        message.success(response?.message || "Terms and Conditions updated successfully");
      }
    } catch (error) {
      message.error("Failed to update Terms And Conditions");
      console.error("Error updating Terms And Conditions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render JoditEditor until content is loaded
  if (termsLoading || !isContentLoaded) {
    return (
      <section className="border p-4 rounded-lg mt-10 shadow">
        <div className="py-3 rounded flex justify-center items-center">
          <h3 className="text-xl font-medium text-primary pb-5"><Spin size='small' /></h3>
        </div>
      </section>
    );
  }

  return (
    <section className="border p-4 rounded-lg mt-10 shadow">
      <div className="">
        <div className="py-3 rounded">
          <h3 className="text-xl font-medium text-primary pb-5">
            Terms And Conditions
          </h3>
        </div>
      </div>

      <div className="mb-6">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => {
            console.log("Content changed:", newContent); // Debug log
            setContent(newContent);
          }}
          onChange={(newContent) => {
            setContent(newContent);
          }}
        />
      </div>

      <div className="flex justify-end">
        <Button
          loading={isLoading || updateLoading}
          type="primary"
          size="large"
          htmlType="submit"
          style={{ width: "300px" }}
          onClick={handleSaveTermsConditions}
        >
          {isLoading || updateLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </section>
  );
};

export default TermsConditions;