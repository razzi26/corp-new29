import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="container mx-auto px-4 py-24 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-4">404</h1>
        <p className="text-lg text-white/80 mb-6">Page not found</p>
        <Link
          to="/"
          className="inline-flex items-center rounded-lg bg-white text-[hsl(var(--brand-end))] px-5 py-3 font-semibold shadow hover:shadow-md transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
