export const Features = () => {
  return (
    <section className="py-16" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center">Key Features</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-900">
              Course Management
            </h3>
            <p className="mt-4 text-rose-700">
              Easily create and manage courses with interactive content.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-900">
              Interactive Assignments
            </h3>
            <p className="mt-4 text-rose-700">
              Assign tasks and receive real-time feedback on your progress.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-900">
              User Dashboard
            </h3>
            <p className="mt-4 text-rose-700">
              Track your progress and achievements with an interactive
              dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
