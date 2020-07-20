module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
  ) => {
    const errors = {};
    if (username.trim() === '') {
      errors.username = 'Username must not be empty';
    }
    if (email.trim() === '') {
      errors.email = 'Email must not be empty';
    } else {
      const emailRegEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!email.match(emailRegEx)) {
        errors.email = 'Email must be a valid email address';
      }
    }
    if (password === '') {
      errors.password = 'Password must not empty';
    } else if (password) {
        const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!password.match(passwordRegEx)) {
          errors.password = 'Password must be a valid password: Minimum eight characters, at least one letter and one number';
        }
    } 
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };
  
  module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === '') {
      errors.username = 'Username must not be empty';
    }
    if (password.trim() === '') {
      errors.password = 'Password must not be empty';
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };
  