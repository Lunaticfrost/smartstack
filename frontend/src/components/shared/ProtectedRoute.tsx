import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    // Check if authentication state is fully resolved
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }
  }, [isAuthenticated, loading, router]);

  // Persist authentication across page reloads
  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");

    // If token exists but authentication state is not set,
    // you might want to dispatch an action to restore authentication
    if (token && !isAuthenticated && !loading) {
      // Dispatch action to verify token and restore auth state
      // Example: dispatch(verifyToken(token));
    }
  }, [isAuthenticated, loading]);

  // Show loading state while authentication is being verified
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render children only if authenticated
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
