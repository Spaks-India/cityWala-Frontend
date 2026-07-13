import { useState, useMemo } from 'react';

// Utility functions
const validatePasswordRequirements = (password, email, firstName = '', lastName = '') => {
  const requirements = {
    minLength: password.length >= 8,
    maxLength: password.length <= 128,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    noSpaces: !/\s/.test(password),
    notEmail: !email || !password.toLowerCase().includes(email.split('@')[0].toLowerCase()),
    notName: !includesName(password, firstName, lastName),
  };
  return requirements;
};

const includesName = (password, firstName, lastName) => {
  const passwordLower = password.toLowerCase();
  const firstNameTrim = firstName?.toLowerCase().trim();
  const lastNameTrim = lastName?.toLowerCase().trim();

  if (firstNameTrim && firstNameTrim.length > 2 && passwordLower.includes(firstNameTrim)) {
    return true;
  }
  if (lastNameTrim && lastNameTrim.length > 2 && passwordLower.includes(lastNameTrim)) {
    return true;
  }
  return false;
};

const calculateStrength = (password) => {
  if (!password) return 0;
  let strength = 0;

  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 0.5;
  if (/[A-Z]/.test(password)) strength += 0.5;
  if (/[a-z]/.test(password)) strength += 0.5;
  if (/[0-9]/.test(password)) strength += 0.5;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 0.5;

  return Math.min(Math.round(strength), 4);
};

const getStrengthLabel = (strength) => {
  if (strength <= 1) return 'Weak';
  if (strength === 2) return 'Fair';
  if (strength === 3) return 'Good';
  return 'Strong';
};

const getStrengthColor = (strength) => {
  if (strength <= 1) return '#dc3545';
  if (strength === 2) return '#fd7e14';
  if (strength === 3) return '#20c997';
  return '#198754';
};

export default function PasswordStrengthMeter({
  password = '',
  email = '',
  firstName = '',
  lastName = '',
  showMeter = true,
  showRequirements = true,
  onChange = () => { }
}) {
  const requirements = useMemo(
    () => validatePasswordRequirements(password, email, firstName, lastName),
    [password, email, firstName, lastName]
  );

  const strength = useMemo(() => calculateStrength(password), [password]);
  const strengthLabel = getStrengthLabel(strength);
  const strengthColor = getStrengthColor(strength);

  const allRequirementsMet = Object.values(requirements).every(v => v);

  const RequirementItem = ({ met, label }) => (
    <div className="d-flex align-items-center gap-2 mb-2">
      <span
        style={{
          color: met ? '#198754' : '#6c757d',
          fontSize: '18px',
          lineHeight: '1',
        }}
      >
        {met ? '✓' : '✗'}
      </span>
      <span
        style={{
          fontSize: '13px',
          color: met ? '#198754' : '#6c757d',
          textDecoration: met ? 'line-through' : 'none',
        }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div className="password-strength-meter">
      {/* Password Strength Meter */}
      {showMeter && password && (
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-muted">Password Strength</small>
            <small style={{ color: strengthColor, fontWeight: 'bold' }}>
              {strengthLabel}
            </small>
          </div>
          <div
            style={{
              height: '6px',
              backgroundColor: '#e9ecef',
              borderRadius: '3px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${(strength / 4) * 100}%`,
                backgroundColor: strengthColor,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      )}

      {/* Requirements Checklist */}
      {showRequirements && (
        <div className="password-requirements" style={{ marginTop: '15px' }}>
          <small className="d-block mb-3" style={{ fontWeight: 'bold', color: '#495057' }}>
            Password must contain:
          </small>

          <RequirementItem met={requirements.minLength} label="At least 8 characters" />
          <RequirementItem met={requirements.maxLength} label="Maximum 128 characters" />
          <RequirementItem met={requirements.uppercase} label="One uppercase letter (A–Z)" />
          <RequirementItem met={requirements.lowercase} label="One lowercase letter (a–z)" />
          <RequirementItem met={requirements.number} label="One number (0–9)" />
          <RequirementItem met={requirements.special} label="One special character (!@#$%^&* etc.)" />
          <RequirementItem met={requirements.noSpaces} label="No spaces" />
          <RequirementItem met={requirements.notEmail} label="Cannot contain your email" />
          <RequirementItem met={requirements.notName} label="Cannot contain your name" />

          {/* Status indicator */}
          {password && (
            <div className="mt-3 p-2 rounded" style={{
              backgroundColor: allRequirementsMet ? '#d1e7dd' : '#f8d7da',
              borderLeft: `3px solid ${allRequirementsMet ? '#198754' : '#dc3545'}`,
            }}>
              <small style={{ color: allRequirementsMet ? '#155724' : '#721c24' }}>
                {allRequirementsMet
                  ? '✓ Password is strong and meets all requirements'
                  : '✗ Password does not meet all requirements'}
              </small>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
