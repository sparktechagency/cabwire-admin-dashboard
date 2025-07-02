import { Button, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResendOtpMutation, useVerifyEmailMutation } from '../../features/auth/authApi';

export default function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); // Changed to 60 seconds (1 minute)
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const getEmail = useSearchParams()[0].get('email');
  const timerRef = useRef(null); // Added ref to track the timer
  const [verifyEmail, { isLoading: isLoadingVerify }] = useVerifyEmailMutation();
  const [resendOTP, { isLoading: isLoadingResend }] = useResendOtpMutation();

  useEffect(() => {
    // Clear any existing timer when component unmounts or when resendTimer changes
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      timerRef.current = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else {
      setCanResend(true);
    }

    // Clean up the timer when the effect re-runs
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resendTimer]);

  // Handle OTP input change
  const handleOTPChange = (index, value) => {
    // Only allow numeric input
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle key press events
  const handleKeyPress = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') {
      handleVerifyOTP();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (pastedData.length <= 4) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length && i < 4; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);

      // Focus the next empty input or the last one
      const nextIndex = Math.min(pastedData.length, 3);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    const otpValue = otp.join('');

    if (otpValue.length !== 4) {
      message.error('Please enter complete 4-digit OTP');
      return;
    }
    setIsLoading(true);

    try {
      const response = await verifyEmail({ email: getEmail, oneTimeCode: parseFloat(otpValue) }).unwrap();
      if(response.success){
        navigate(`/auth/login/set_password?token=${response.data}`);
      }
    } catch (error) {
      message.error('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (!canResend) return;

    try {
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Call the resend OTP API
      const response = await resendOTP({ email: getEmail }).unwrap();
      
      if (response.success) {
        message.success('OTP sent successfully!');
        setResendTimer(60); // Reset to 60 seconds
        setCanResend(false);
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        message.error(response.message || 'Failed to resend OTP');
      }
    } catch (error) {
      message.error(error.data?.message || 'Failed to resend OTP. Please try again.');
    }
  };

  const isOTPComplete = otp.every(digit => digit !== '');

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="flex flex-col items-center w-full max-w-6xl md:flex-row gap-10">
        {/* Left Side - Image (Hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 xl:w-2/3">
          <img
            src={"/images/check_mail.png"}
            className={"object-contain w-full h-auto max-h-[90vh]"}
            alt="OTP Verification Illustration"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3">
          <div className="w-full max-w-md p-6 mx-auto border rounded-lg border-primary md:p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              {/* Security Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>

              {/* Heading */}
              <h3 className="text-3xl font-semibold text-center">Enter OTP</h3>
              <p className="text-sm font-normal text-center text-gray-600 md:text-base">
                Enter the 4-digit verification code sent to your registered mobile number
              </p>
            </div>

            {/* OTP Input Fields */}
            <div className="flex justify-center gap-3 mt-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={e => handleOTPChange(index, e.target.value)}
                  onKeyDown={e => handleKeyPress(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-xl font-semibold text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  autoComplete="off"
                />
              ))}
            </div>

            {/* Verify Button */}
            <div className="mt-8">
              <Button
                onClick={handleVerifyOTP}
                type="primary"
                className="w-full"
                size="large"
                loading={isLoadingVerify}
                disabled={!isOTPComplete || isLoadingVerify}
              >
                {isLoadingVerify ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </div>

            {/* Resend OTP */}
            <div className="mt-6 text-center">
              <p className="text-sm font-normal text-textSecondary">
                Didn't receive the code?{' '}
                {canResend ? (
                  <span
                    className="text-sm font-medium text-primary cursor-pointer hover:underline"
                    onClick={handleResendOTP}
                  >
                    {isLoadingResend ? 'Sending...' : 'Resend OTP'}
                  </span>
                ) : (
                  <span className="text-sm font-normal text-gray-400">
                    Resend in {resendTimer}s
                  </span>
                )}
              </p>
            </div>

            {/* Back to Login */}
            <button
              onClick={() => navigate('/auth/login')}
              className="flex items-center justify-center w-full gap-2 mt-6 text-base text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
            >
              <FaArrowLeftLong />
              <span>Back to log in</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}