// key name (ek jagah defined – best practice)
const ADMIN_AUTH_KEY = "admin_logged_in";

// login function
export const loginAdmin = () => {
  localStorage.setItem(ADMIN_AUTH_KEY, "true");
};

// logout function
export const logoutAdmin = () => {
  localStorage.removeItem(ADMIN_AUTH_KEY);
};

// check function
export const isAdminAuthenticated = () => {
  return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
};
