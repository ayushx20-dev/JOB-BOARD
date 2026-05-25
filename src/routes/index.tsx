import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Find Your Next Role
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        Browse hundreds of jobs from top companies.
      </p>
      <Link
        to="/jobs"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold"
      >
        Browse Jobs →
      </Link>
    </div>
  );
}