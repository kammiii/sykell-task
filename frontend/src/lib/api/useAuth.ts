
const useAuth = () => {
  const isLoggedIn = true; // Replace with actual authentication logic
  const signOut = () => {
    // Logic to sign out the user
    console.log("User signed out");
  };

  return { isLoggedIn, signOut };
}
export default useAuth;
