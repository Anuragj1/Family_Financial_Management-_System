export const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const decoded = JSON.parse(atob(token.split(".")[1]));
    if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login
        return false;
    }
    return true;
};
    