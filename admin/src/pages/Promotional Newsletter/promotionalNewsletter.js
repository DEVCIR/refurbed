import { API_BASE_URL } from "../../Service";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

export default function PromotionalNewsletter() {
  const [activeTab, setActiveTab] = useState("compose");
  const [newsletterType, setNewsletterType] = useState("promotional");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState([]);
  const [scheduledTime, setScheduledTime] = useState("");
  const [newsletters, setNewsletters] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [promotionalCount, setPromotionalCount] = useState(0);
  const [subscriberCount, setSubscriberCount] = useState(0);

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      color: "#333",
      minHeight: "100vh",
      backgroundColor: "#f5f7f9",
    },
    header: {
      backgroundColor: "#2563eb",
      color: "white",
      padding: "1.5rem 0",
      marginBottom: "1.5rem",
    },
    headerContainer: {
      width: "90%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 1rem",
    },
    title: {
      fontSize: "1.75rem",
      fontWeight: "bold",
      margin: 0,
    },
    mainContainer: {
      width: "90%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 1rem",
    },
    notification: {
      padding: "0.75rem 1rem",
      borderRadius: "0.25rem",
      marginBottom: "1rem",
    },
    successNotification: {
      backgroundColor: "#dcfce7",
      color: "#166534",
    },
    errorNotification: {
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
    },
    tabContainer: {
      display: "inline-flex",
      backgroundColor: "white",
      padding: "0.25rem",
      borderRadius: "0.5rem",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      marginBottom: "1.5rem",
    },
    tabButton: {
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      border: "none",
      fontSize: "0.875rem",
      cursor: "pointer",
      margin: "0 0.125rem",
      fontFamily: "inherit",
      transition: "all 0.2s ease",
    },
    activeTabButton: {
      backgroundColor: "#2563eb",
      color: "white",
    },
    inactiveTabButton: {
      backgroundColor: "transparent",
      color: "#333",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "0.5rem",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      padding: "1.5rem",
      marginBottom: "1.5rem",
    },
    formGroup: {
      marginBottom: "1rem",
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "500",
      color: "#4b5563",
    },
    input: {
      width: "100%",
      padding: "0.5rem",
      borderRadius: "0.25rem",
      border: "1px solid #d1d5db",
      outline: "none",
      fontSize: "0.875rem",
      fontFamily: "inherit",
    },
    textarea: {
      width: "100%",
      padding: "0.5rem",
      borderRadius: "0.25rem",
      border: "1px solid #d1d5db",
      outline: "none",
      resize: "vertical",
      fontSize: "0.875rem",
      fontFamily: "inherit",
      minHeight: "100px",
    },
    contentTextarea: {
      height: "250px",
    },
    buttonGroup: {
      display: "flex",
      gap: "0.75rem",
      marginTop: "1rem",
    },
    button: {
      padding: "0.5rem 1rem",
      borderRadius: "0.25rem",
      border: "none",
      fontWeight: "500",
      cursor: "pointer",
      fontSize: "0.875rem",
      fontFamily: "inherit",
      transition: "background-color 0.2s ease",
    },
    primaryButton: {
      backgroundColor: "#2563eb",
      color: "white",
    },
    successButton: {
      backgroundColor: "#10b981",
      color: "white",
    },
    secondaryButton: {
      backgroundColor: "#e5e7eb",
      color: "#374151",
    },
    typeToggle: {
      display: "flex",
      marginBottom: "1rem",
    },
    typeButton: {
      padding: "0.5rem 1rem",
      border: "none",
      fontWeight: "500",
      cursor: "pointer",
      fontSize: "0.875rem",
      fontFamily: "inherit",
    },
    typeButtonLeft: {
      borderTopLeftRadius: "0.25rem",
      borderBottomLeftRadius: "0.25rem",
    },
    typeButtonRight: {
      borderTopRightRadius: "0.25rem",
      borderBottomRightRadius: "0.25rem",
    },
    activeTypeButton: {
      backgroundColor: "#2563eb",
      color: "white",
    },
    inactiveTypeButton: {
      backgroundColor: "#e5e7eb",
      color: "#374151",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHead: {
      backgroundColor: "#f3f4f6",
      textAlign: "left",
    },
    tableCell: {
      padding: "0.75rem 1rem",
      borderTop: "1px solid #e5e7eb",
    },
    tableCellHeader: {
      padding: "0.75rem 1rem",
      fontWeight: "500",
    },
    tableRow: {
      transition: "background-color 0.2s ease",
    },
    tableRowHover: {
      backgroundColor: "#f9fafb",
    },
    badge: {
      display: "inline-block",
      padding: "0.25rem 0.5rem",
      borderRadius: "9999px",
      fontSize: "0.75rem",
      fontWeight: "500",
    },
    promoBadge: {
      backgroundColor: "#fce7f3",
      color: "#9d174d",
    },
    infoBadge: {
      backgroundColor: "#dbeafe",
      color: "#1e40af",
    },
    sentStatus: {
      color: "#16a34a",
    },
    scheduledStatus: {
      color: "#ea580c",
    },
    dashboardGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "1.5rem",
    },
    statsCard: {
      backgroundColor: "white",
      borderRadius: "0.5rem",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      padding: "1.5rem",
    },
    statsTitle: {
      fontSize: "1.125rem",
      fontWeight: "600",
      marginBottom: "1rem",
    },
    statsContent: {
      height: "250px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    statsFlexContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    statsDivider: {
      height: "4rem",
      width: "1px",
      backgroundColor: "#d1d5db",
      margin: "0 2rem",
    },
    statsMetric: {
      textAlign: "center",
    },
    statsValue: {
      fontSize: "3rem",
      fontWeight: "bold",
    },
    statsBlue: {
      color: "#2563eb",
    },
    statsGreen: {
      color: "#10b981",
    },
    statsPurple: {
      color: "#8b5cf6",
    },
    statsLabel: {
      color: "#6b7280",
      marginTop: "0.5rem",
    },
    previewContainer: {
      marginBottom: "1.5rem",
    },
    previewHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
    },
    previewTitle: {
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    previewContent: {
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      padding: "1rem",
    },
    previewSubject: {
      marginBottom: "0.5rem",
      fontWeight: "bold",
    },
    previewBody: {
      borderTop: "1px solid #d1d5db",
      paddingTop: "0.5rem",
      whiteSpace: "pre-wrap",
    },
    // New styles for email chips
    emailChipsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
      marginTop: "0.5rem",
      padding: "0.5rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.25rem",
      minHeight: "50px",
    },
    emailChip: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#e5e7eb",
      borderRadius: "9999px",
      padding: "0.25rem 0.75rem",
      fontSize: "0.875rem",
    },
    removeEmailButton: {
      backgroundColor: "transparent",
      border: "none",
      color: "#4b5563",
      cursor: "pointer",
      marginLeft: "0.5rem",
      fontSize: "1rem",
      padding: "0 0.25rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    emailInputContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "0.5rem",
    },
    emailInput: {
      flex: "1",
      padding: "0.5rem",
      borderRadius: "0.25rem",
      border: "1px solid #d1d5db",
      outline: "none",
      fontSize: "0.875rem",
      fontFamily: "inherit",
    },
    addEmailButton: {
      padding: "0.5rem 1rem",
      borderRadius: "0.25rem",
      border: "none",
      fontWeight: "500",
      cursor: "pointer",
      fontSize: "0.875rem",
      fontFamily: "inherit",
      backgroundColor: "#2563eb",
      color: "white",
      marginLeft: "0.5rem",
    },
    loadingIndicator: {
      padding: "1rem",
      textAlign: "center",
      color: "#6b7280",
    },
  };

  if (window.innerWidth >= 768) {
    styles.dashboardGrid.gridTemplateColumns = "1fr 1fr";
  }

  // Fetch emails from API
  useEffect(() => {
    const fetchEmails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/newsletter/emails`);
        if (!response.ok) {
          throw new Error("Failed to fetch emails");
        }
        const data = await response.json();
        setEmails(data);
      } catch (error) {
        console.error("Error fetching emails:", error);
        showNotification("Failed to load email list", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, []);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/newsletter-promotional",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch newsletters");
        }
        const data = await response.json();
        console.log("data ", data);
        // Store the data directly as an array, not as a string
        setNewsletters(data);
      } catch (error) {
        console.error("Error fetching newsletters:", error);
        showNotification("Failed to load newsletter history", "error");
      }
    };

    if (activeTab === "history") {
      fetchNewsletters();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch promotional emails count
        const promoResponse = await fetch(
          "http://127.0.0.1:8000/newsletter-promotional/count",
        );
        if (!promoResponse.ok) {
          throw new Error("Failed to fetch promotional email count");
        }
        const promoData = await promoResponse.json();
        setPromotionalCount(promoData.count || 0);

        // Fetch subscriber emails count
        const subResponse = await fetch(
          "http://127.0.0.1:8000/newsletter/count",
        );
        if (!subResponse.ok) {
          throw new Error("Failed to fetch subscriber count");
        }
        const subData = await subResponse.json();
        setSubscriberCount(subData.count || 0);
      } catch (error) {
        console.error("Error fetching counts:", error);
        showNotification("Failed to load email counts", "error");
      }
    };

    if (activeTab === "analytics") {
      fetchCounts();
    }
  }, [activeTab]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddEmail = () => {
    if (!emailInput) return;

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    if (!emails.includes(emailInput)) {
      setEmails([...emails, emailInput]);
      setEmailInput("");
    } else {
      showNotification("Email already in list", "error");
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleSend = async (schedule = false) => {
    setIsSending(true);
    if (!subject || !content || emails.length === 0) {
      showNotification(
        "Please fill all required fields and add at least one recipient",
        "error",
      );
      return;
    }

    try {
      // First, save to newsletter_promotional table
      const newsletterResponse = await fetch(
        "http://127.0.0.1:8000/newsletter-promotional",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject_line: subject,
            content: content,
            recipients: emails,
            schedule_date: scheduledTime,
          }),
        },
      );

      if (!newsletterResponse.ok) {
        const errorData = await newsletterResponse.json();
        throw new Error(errorData.message || "Failed to save newsletter");
      }

      // Then send the actual emails
      for (const email of emails) {
        const sendResponse = await fetch(
          `${API_BASE_URL}/send-promotional-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              subject,
              content,
              email,
            }),
          },
        );

        if (!sendResponse.ok) {
          console.error(`Failed to send to ${email}`);
        }
      }

      if (!schedule) {
        const newsletterData = await newsletterResponse.json();
        await fetch(
          `http://127.0.0.1:8000/newsletter-promotional/${newsletterData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sending_date: new Date().toISOString(),
            }),
          },
        );
      }

      showNotification(
        schedule
          ? "Newsletter scheduled successfully!"
          : "Newsletter sent successfully!",
      );
      toast.success("Email successfully sent");

      // Reset form
      setSubject("");
      setContent("");
      setScheduledTime("");
      setEmails([]);
    } catch (error) {
      console.error("Error:", error);
      showNotification(
        error.message || "An error occurred while sending the newsletter.",
        "error",
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEmail();
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "compose":
        return (
          <div style={styles.card}>
            {showPreview ? (
              <div style={styles.previewContainer}>
                <div style={styles.previewHeader}>
                  <h3 style={styles.previewTitle}>Newsletter Preview</h3>
                  <button
                    onClick={() => setShowPreview(false)}
                    style={{ ...styles.button, ...styles.secondaryButton }}
                  >
                    Back to Edit
                  </button>
                </div>
                <div style={styles.previewContent}>
                  <div style={styles.previewSubject}>
                    {subject || "(No subject)"}
                  </div>
                  <div style={styles.previewBody}>
                    {content || "(No content)"}
                  </div>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <div style={styles.label}>Recipients ({emails.length})</div>
                  <div style={styles.emailChipsContainer}>
                    {emails.map((email, index) => (
                      <div key={index} style={styles.emailChip}>
                        {email}
                        <button
                          onClick={() => handleRemoveEmail(email)}
                          style={styles.removeEmailButton}
                          title="Remove email"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div style={styles.formGroup}>
                  <div style={styles.typeToggle}>
                    <button
                      onClick={() => setNewsletterType("promotional")}
                      style={{
                        ...styles.typeButton,
                        ...styles.typeButtonLeft,
                        ...(newsletterType === "promotional"
                          ? styles.activeTypeButton
                          : styles.inactiveTypeButton),
                      }}
                    >
                      Promotional
                    </button>
                    <button
                      onClick={() => setNewsletterType("informational")}
                      style={{
                        ...styles.typeButton,
                        ...styles.typeButtonRight,
                        ...(newsletterType === "informational"
                          ? styles.activeTypeButton
                          : styles.inactiveTypeButton),
                      }}
                    >
                      Informational
                    </button>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Subject Line*</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      style={styles.input}
                      placeholder="Enter newsletter subject"
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Content*</label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      style={{ ...styles.textarea, ...styles.contentTextarea }}
                      placeholder="Write your newsletter content here..."
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Recipients*</label>
                    {isLoading ? (
                      <div style={styles.loadingIndicator}>
                        Loading email list...
                      </div>
                    ) : (
                      <>
                        <div style={styles.emailInputContainer}>
                          <input
                            type="email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            style={styles.emailInput}
                            placeholder="Add email address"
                          />
                          <button
                            onClick={handleAddEmail}
                            style={styles.addEmailButton}
                          >
                            Add
                          </button>
                        </div>
                        <div style={styles.emailChipsContainer}>
                          {emails.map((email, index) => (
                            <div key={index} style={styles.emailChip}>
                              {email}
                              <button
                                onClick={() => handleRemoveEmail(email)}
                                style={styles.removeEmailButton}
                                title="Remove email"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                          {emails.length === 0 && (
                            <div
                              style={{ color: "#6b7280", fontStyle: "italic" }}
                            >
                              No recipients added
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Schedule (optional)</label>
                    <input
                      type="datetime-local"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.buttonGroup}>
                    <button
                      onClick={() => handleSend(false)}
                      style={{ ...styles.button, ...styles.primaryButton }}
                      disabled={isLoading}
                    >
                      {isSending ? "Sending..." : "Send Now"}
                    </button>
                    <button
                      onClick={() => setShowPreview(true)}
                      style={{ ...styles.button, ...styles.secondaryButton }}
                      disabled={isLoading}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      case "history":
        return (
          <div style={{ ...styles.card, padding: 0, overflow: "hidden" }}>
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.tableCellHeader}>Subject</th>
                  <th style={styles.tableCellHeader}>Content</th>
                  <th style={styles.tableCellHeader}>Recipients</th>
                  <th style={styles.tableCellHeader}>Scheduled Date</th>
                  <th style={styles.tableCellHeader}>Sent Date</th>
                </tr>
              </thead>
              <tbody>
                {newsletters && newsletters.length > 0 ? (
                  newsletters.map((newsletter) => {
                    // Safely parse recipients
                    let recipients = [];
                    try {
                      recipients = newsletter.recipients
                        ? JSON.parse(newsletter.recipients)
                        : [];
                    } catch (e) {
                      console.error("Error parsing recipients:", e);
                      recipients = ["Invalid data"];
                    }

                    return (
                      <tr key={newsletter.id} style={styles.tableRow}>
                        <td style={styles.tableCell}>
                          {newsletter.subject_line}
                        </td>
                        <td style={styles.tableCell}>{newsletter.content}</td>
                        <td style={styles.tableCell}>
                          {recipients.map((email, index) => (
                            <div key={index}>{email}</div>
                          ))}
                        </td>
                        <td style={styles.tableCell}>
                          {newsletter.schedule_date
                            ? new Date(
                                newsletter.schedule_date,
                              ).toLocaleString()
                            : "—"}
                        </td>
                        <td style={styles.tableCell}>
                          {newsletter.sending_date
                            ? new Date(newsletter.sending_date).toLocaleString()
                            : "—"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ ...styles.tableCell, textAlign: "center" }}
                    >
                      No newsletters found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      case "analytics":
        return (
          <div
            style={{
              ...styles.dashboardGrid,
              gridTemplateColumns: window.innerWidth >= 768 ? "1fr 1fr" : "1fr",
            }}
          >
            {/* Subscriber Emails Card - LEFT */}
            <div
              style={{
                ...styles.statsCard,
                background: "linear-gradient(135deg, #eafdf7 0%, #ffffff 100%)",
              }}
            >
              <h3 style={{ ...styles.statsTitle, color: "#047857" }}>
                Subscriber Emails
              </h3>
              <div style={{ ...styles.statsContent, position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(52,211,153,0.1) 0%, rgba(255,255,255,0) 70%)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 0,
                  }}
                ></div>
                <div
                  style={{
                    ...styles.statsMetric,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      ...styles.statsValue,
                      color: "#10b981",
                      fontSize: "3.5rem",
                      textShadow: "0 2px 10px rgba(16, 185, 129, 0.2)",
                    }}
                  >
                    {subscriberCount}
                  </div>
                  <div
                    style={{
                      ...styles.statsLabel,
                      fontWeight: "500",
                      color: "#047857",
                      fontSize: "1rem",
                    }}
                  >
                    Active Subscribers
                  </div>
                </div>
              </div>
            </div>

            {/* Promotional Emails Card - RIGHT */}
            <div
              style={{
                ...styles.statsCard,
                background: "linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%)",
              }}
            >
              <h3 style={{ ...styles.statsTitle, color: "#4338ca" }}>
                Promotional Emails
              </h3>
              <div style={{ ...styles.statsContent, position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(167,139,250,0.1) 0%, rgba(255,255,255,0) 70%)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 0,
                  }}
                ></div>
                <div
                  style={{
                    ...styles.statsMetric,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      ...styles.statsValue,
                      ...styles.statsPurple,
                      fontSize: "3.5rem",
                      textShadow: "0 2px 10px rgba(139, 92, 246, 0.2)",
                    }}
                  >
                    {promotionalCount}
                  </div>
                  <div
                    style={{
                      ...styles.statsLabel,
                      fontWeight: "500",
                      color: "#6d28d9",
                      fontSize: "1rem",
                    }}
                  >
                    Total Promotional Emails
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <Toaster position="top-right" richColors />
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <h1 style={styles.title}>Newsletter Management</h1>
        </div>
      </header>

      <div style={styles.mainContainer}>
        {notification && (
          <div
            style={{
              ...styles.notification,
              ...(notification.type === "error"
                ? styles.errorNotification
                : styles.successNotification),
            }}
          >
            {notification.message}
          </div>
        )}

        <div style={styles.tabContainer}>
          <button
            onClick={() => setActiveTab("compose")}
            style={{
              ...styles.tabButton,
              ...(activeTab === "compose"
                ? styles.activeTabButton
                : styles.inactiveTabButton),
            }}
          >
            Compose Newsletter
          </button>
          <button
            onClick={() => setActiveTab("history")}
            style={{
              ...styles.tabButton,
              ...(activeTab === "history"
                ? styles.activeTabButton
                : styles.inactiveTabButton),
            }}
          >
            History
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            style={{
              ...styles.tabButton,
              ...(activeTab === "analytics"
                ? styles.activeTabButton
                : styles.inactiveTabButton),
            }}
          >
            Analytics
          </button>
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
}
