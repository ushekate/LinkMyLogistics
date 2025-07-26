'use client';
import React, { useRef, useState, createContext, useContext } from 'react';


const OTPContext = createContext();

export function InputOTP({ length = 6, value = '', onChange, children }) {
  const [otp, setOtp] = useState(value.padEnd(length, '').slice(0, length).split(''));
  const inputsRef = useRef([]);

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/\D/, '');
    if (!val) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    onChange?.(newOtp.join(''));
    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      if (otp[index] === '') {
        if (index > 0) {
          newOtp[index - 1] = '';
          setOtp(newOtp);
          inputsRef.current[index - 1]?.focus();
        }
      } else {
        newOtp[index] = '';
        setOtp(newOtp);
      }
      onChange?.(newOtp.join(''));
    }
  };

  return (
    <OTPContext.Provider value={{ otp, setOtp, inputsRef, handleChange, handleKeyDown }}>
      <div className="flex gap-2 justify-center mt-1">
        {children}
      </div>
    </OTPContext.Provider>
  );
}

export function InputOTPGroup({ children }) {
  return <>{children}</>;
}

export function InputOTPSlot({ index }) {
  const { otp, inputsRef, handleChange, handleKeyDown } = useContext(OTPContext);
  return (
    <input
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={otp[index] || ''}
      onChange={(e) => handleChange(index, e)}
      onKeyDown={(e) => handleKeyDown(index, e)}
      ref={(el) => (inputsRef.current[index] = el)}
      className="w-[44px] h-[52px] text-[1.5rem] border border-[var(--secondary)]/50 bg-white text-center font-semibold text-[var(--secondary)] ring-1 ring-[var(--secondary)]/50 focus:ring-2 focus:ring-foreground"
    />
  );
}
