const PaidActivities = ({ activities }) => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
            Premium Experiences
          </p>
          <h2 className="text-4xl md:text-5xl font-primary text-primary mb-6">
            Our Conscious Hours
          </h2>
          <div className="w-24 h-[2px] bg-secondary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {activities && activities.map((activity, index) => (
            <div
              key={activity.id}
              className="bg-light shadow-xl transition-all duration-700 transform hover:scale-105"
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-secondary text-light px-3 py-1 text-xs font-secondary font-semibold">
                      PREMIUM
                    </span>
                    <span className="text-primary font-secondary text-sm font-semibold">
                      {activity.duration}
                    </span>
                  </div>
                  <span className="text-2xl font-primary text-primary">
                    {activity.price}
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
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm text-main-text/60">
                    <span>
                      <strong>Difficulty:</strong> {activity.difficulty}
                    </span>
                    <span>
                      <strong>Group:</strong> {activity.groupSize}
                    </span>
                  </div>
                  <button className="bg-primary text-light px-6 py-2 font-secondary font-semibold text-sm hover:bg-secondary transition-colors">
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaidActivities;
