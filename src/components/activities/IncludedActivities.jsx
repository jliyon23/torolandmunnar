const IncludedActivities = ({ activities }) => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
            Included in Your Package
          </p>
          <h2 className="text-4xl md:text-5xl font-primary text-primary mb-6">
            Rooted in Responsibility
          </h2>
          <div className="w-24 h-[2px] bg-secondary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {activities && activities.map((activity, index) => (
            <div
              key={activity.id}
              className="bg-background shadow-xl transition-all duration-700 transform hover:scale-105"
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary text-light px-3 py-1 text-xs font-secondary font-semibold">
                    INCLUDED
                  </span>
                  <span className="text-secondary font-secondary text-sm font-semibold">
                    {activity.duration}
                  </span>
                </div>
                
                <h3 className="text-2xl font-primary text-primary mb-2">
                  {activity.title}
                </h3>
                <p className="text-secondary font-secondary font-semibold mb-4">
                  {activity.subtitle}
                </p>
                <p className="text-main-text/80 font-secondary leading-relaxed mb-6">
                  {activity.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-4">
                    <span className="text-main-text/60">
                      <strong>Difficulty:</strong> {activity.difficulty}
                    </span>
                    <span className="text-main-text/60">
                      <strong>Group:</strong> {activity.groupSize}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IncludedActivities;
