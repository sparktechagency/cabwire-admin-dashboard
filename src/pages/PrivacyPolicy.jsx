import { Button, message, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPrivacyQuery, usePrivecyPolicyMutation } from '../features/Rule/RuleApi';


const PrivacyPolicy = ({ placeholder }) => {
  const router = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateSettings, { isLoading: updateLoading }] = usePrivecyPolicyMutation();
  const { data, isLoading: privacyLoading } = useGetPrivacyQuery();

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

    } else if (!privacyLoading) {
      // If no data and not loading, mark as loaded with empty content
      setIsContentLoaded(true);
    }
  }, [data, privacyLoading]);

  // Configuration object for Jodit Editor with memoization
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing your privacy policy...",
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

  const handleSavePrivacyPolicy = async () => {
    setIsLoading(true);
    try {
      const response = await updateSettings({
        content: JSON.stringify(content),
        type: "privacy"
      }).unwrap();

      if (response.success) {
        message.success(response?.message || "Privacy Policy updated successfully");
      }
    } catch (error) {
      message.error("Failed to update Privacy Policy");
      console.error("Error updating privacy policy:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (privacyLoading || !isContentLoaded) {
    return (
      <section className="border p-4 rounded-lg mt-10 shadow">
        <div className="py-3 rounded">
          <h3 className="text-xl font-medium text-primary pb-5"><Spin size='small' /></h3>
        </div>
      </section>
    );
  }

  return (
    <section className="border p-4 rounded-lg mt-10 shadow">
      <div className="">
        <div className="py-3 rounded">
          <h3 className="text-xl font-medium text-primary pb-5">Privacy and Policy</h3>
        </div>
      </div>

      <div className="mb-6">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>

      <div className="flex justify-end">
        <Button
          loading={isLoading || updateLoading}
          type="primary"
          size="large"
          htmlType="submit"
          style={{ width: "300px" }}
          onClick={handleSavePrivacyPolicy}
        >
          {isLoading || updateLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </section>
  );
};

export default PrivacyPolicy;