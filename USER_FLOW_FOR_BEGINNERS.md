# User Module Overview for Beginners

This document provides a simple, easy-to-understand overview of the user flows in our Fridge Management System. It's designed to help newcomers understand how users interact with the system.

## User Journeys

### 1. Registration and Email Verification

**User Story**: As a new user, I want to create an account and verify my email so I can access the system.

**Flow**:

1. User visits the registration page
2. User enters their email, password, name, language preference, and timezone
3. User submits the registration form
4. System creates a new account (not yet verified)
5. System generates a 4-digit verification code
6. System sends the verification code to the user's email
7. User receives the email with the verification code
8. User enters the verification code on the verification page
9. System verifies the code and activates the account
10. User is now logged in and can access the system

### 2. Login

**User Story**: As a registered user, I want to log in to access my account.

**Flow**:

1. User visits the login page
2. User enters their email and password
3. User clicks the login button
4. System verifies the credentials
5. If valid, system generates access and refresh tokens
6. User is redirected to the dashboard
7. If invalid, system shows an error message

### 3. Password Recovery

**User Story**: As a user who forgot my password, I want to reset it securely.

**Flow**:

1. User clicks "Forgot Password" on the login page
2. User enters their email address
3. System sends a verification code to the user's email
4. User receives the email with the verification code
5. User enters the verification code on the verification page
6. If the code is correct, user is allowed to set a new password
7. User enters a new password
8. System updates the password
9. User can now log in with the new password

### 4. Profile Management

**User Story**: As a logged-in user, I want to view and edit my profile information.

**Flow**:

1. User logs in to the system
2. User navigates to the profile page
3. User can view their current profile information
4. User can click "Edit Profile" to modify their information
5. User can update their name, gender, birth date, country, language, and profile photo
6. User saves the changes
7. System updates the user's profile information

### 5. Password Change

**User Story**: As a logged-in user, I want to change my password for security reasons.

**Flow**:

1. User logs in to the system
2. User navigates to account settings or security settings
3. User selects "Change Password"
4. User enters their current password for verification
5. User enters a new password
6. User confirms the new password
7. System verifies the current password is correct
8. System updates the password
9. User receives confirmation that the password was changed

### 6. Account Deletion

**User Story**: As a registered user, I want to delete my account if I no longer wish to use the service.

**Flow**:

1. User logs in to the system
2. User navigates to account settings
3. User selects "Delete Account"
4. System asks for confirmation
5. User confirms the deletion
6. System permanently deletes the user's account and associated data
7. User is logged out and redirected to the homepage or registration page

## Key Security Features

- **Session Management**: The system uses JWT tokens to manage user sessions securely
- **Password Security**: Passwords are stored securely using strong hashing algorithms
- **Email Verification**: All accounts must be verified via email to ensure valid contact information
- **Rate Limiting**: The system protects against brute force attacks by limiting login attempts
- **Secure Communication**: All communication between the client and server is encrypted using HTTPS

## Important Notes for Developers

1. **Email Verification is Required**: Users cannot fully access the system until they verify their email address.

2. **Password Requirements**: Passwords must be 6-20 characters long.

3. **Token Refresh Mechanism**: Access tokens expire after a short period. The refresh token is used to obtain a new access token without requiring the user to log in again.

4. **Error Handling**: Always provide clear, user-friendly error messages to help users resolve issues.

5. **Responsive Design**: All user interfaces should work well on both desktop and mobile devices.

## Common User Issues and Solutions

| Issue | Solution |
|-------|----------|
| User didn't receive verification email | Provide a "Resend Code" option |
| User enters incorrect verification code | Allow multiple attempts with clear error messages |
| User forgets password | Provide the password recovery flow |
| User wants to change email address | Require verification of the new email |
| Session expired | Automatically refresh using refresh token or prompt for re-login |

## Visual Flow Diagram

```ascii
┌─────────────┐     ┌────────────────┐     ┌──────────────┐
│  Register   │────►│ Verify Email   │────►│ Access App   │
└─────────────┘     └────────────────┘     └──────────────┘
       │                                          ▲
       │                                          │
       │                                          │
       ▼                                          │
┌─────────────┐     ┌────────────────┐     ┌──────────────┐
│ Log Out     │◄────│ Use App        │◄────│ Log In       │
└─────────────┘     └────────────────┘     └──────────────┘
                           │                      ▲
                           ▼                      │
                    ┌────────────────┐     ┌──────────────┐
                    │ Forgot Password│────►│ Verify Email │
                    └────────────────┘     └──────────────┘
```

This document provides a high-level overview of the user flows. For technical details, please refer to the USER_MODULE_README.md and USER_FRONTEND_IMPLEMENTATION_GUIDE.md documents.
