import { useEffect, useState } from "react";
import { FadeUpAll } from "../../animations/gsapAnimations";
import { toast } from "sonner";
import axios from "axios";
import { API_BASE_URL } from "../../service";
import playStoreLogo from "../../assets/logos/play_store.svg";
import appStoreLogo from "../../assets/logos/app_store.svg";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    FadeUpAll(".fade-up");
  }, []);

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Invalid email format.");
      return;
    }

    if (!name) {
      toast.error("Please enter your name.");
      return;
    }

    setLoading(true);

    try {
      // First API call - Subscribe to newsletter
      const response = await axios.post(`${API_BASE_URL}/newsletter`, {
        email,
        name,
      });

      if (response.status === 200 || response.status === 201) {
        // Second API call - Send confirmation email
        try {
          const emailResponse = await axios.post(
            `${API_BASE_URL}/sendsubscriptionmail`,
            {
              email,
              name,
              role: "customer", // Set the role as customer
            }
          );

          if (emailResponse.status === 200) {
            toast.success("Successfully subscribed to the newsletter!");
          } else {
            // Subscription worked but email failed
            toast.success("Successfully subscribed to the newsletter!");
            toast.error("Confirmation email could not be sent.");
          }
        } catch (emailError) {
          // Subscription worked but email failed
          console.error("Email sending error:", emailError);
          toast.success("Successfully subscribed to the newsletter!");
          toast.error("Confirmation email could not be sent.");
        }

        // Clear inputs after success
        setEmail("");
        setName("");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-indigo-900">
      {/* Left Side */}
      <div className="w-full md:w-1/2 text-white p-8">
        <div className="flex items-start gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Sign up for our newsletter for the first time and save €10!
            </h2>
            <p className="text-base mt-1">Never miss an offer again.</p>
          </div>
        </div>

        <div className="mt-4">
          <input
            type="email"
            placeholder="Enter e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 mb-4 bg-indigo-900 text-white border border-white rounded-md placeholder-white focus:outline-none"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-gray-200 text-black font-semibold rounded-md disabled:opacity-70 hover:bg-[#caa9fc]"
          >
            {loading ? "Processing..." : "Request voucher"}
          </button>

          <p className="text-base mt-3">
            Information about the use of personal data can be found in our{" "}
            <a href="#" className="underline text-[#d3bef7]">
              Privacy policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 bg-gray-100 p-8 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-indigo-900 rounded-full flex items-center justify-center mb-3">
              <span className="text-white font-bold text-xl">re</span>
            </div>
            <div>
              <h3 className="text-2xl">Get the refurbed app</h3>
              <p className="text-lg mb-4">For iOS and Android</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <img src={playStoreLogo} alt="Google Play Store" className="h-12" />
            <img src={appStoreLogo} alt="Apple App Store" className="h-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
