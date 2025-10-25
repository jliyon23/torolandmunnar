import { useState, useEffect } from 'react';
import { supabaseHelpers } from '../config/supabase';

/**
 * Debug Panel Component
 * Add this to your app temporarily to see what data is being fetched
 * 
 * Usage: Import and add <DebugPanel /> somewhere in your app (like Home.jsx)
 */
const DebugPanel = () => {
  const [debugData, setDebugData] = useState({
    activities: [],
    rooms: [],
    testimonials: [],
    team: [],
    blogs: [],
    images: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [activities, rooms, testimonials, team, blogs, images] = await Promise.all([
        supabaseHelpers.getActivities(),
        supabaseHelpers.getRooms(),
        supabaseHelpers.getTestimonials(),
        supabaseHelpers.getTeamMembers(),
        supabaseHelpers.getBlogs(),
        supabaseHelpers.getImages(),
      ]);

      setDebugData({
        activities: activities || [],
        rooms: rooms || [],
        testimonials: testimonials || [],
        team: team || [],
        blogs: blogs || [],
        images: images || [],
      });
    } catch (error) {
      console.error('Debug fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAllData();
    }
  }, [isOpen]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
    }}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: '#4F46E5',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        {isOpen ? '✖ Close Debug' : '🔍 Debug Data'}
      </button>

      {/* Debug Panel */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          right: '0',
          backgroundColor: 'white',
          border: '2px solid #4F46E5',
          borderRadius: '8px',
          padding: '20px',
          width: '500px',
          maxHeight: '600px',
          overflowY: 'auto',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        }}>
          <h2 style={{ margin: '0 0 20px 0', color: '#4F46E5' }}>
            Database Debug Panel
          </h2>

          {loading ? (
            <p>Loading data...</p>
          ) : (
            <>
              <button
                onClick={fetchAllData}
                style={{
                  backgroundColor: '#10B981',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: '20px',
                }}
              >
                🔄 Refresh Data
              </button>

              {/* Activities */}
              <Section
                title="Activities"
                count={debugData.activities.length}
                publishedCount={debugData.activities.filter(a => a.is_published).length}
              >
                {debugData.activities.map(activity => (
                  <Item key={activity.id}>
                    <strong>{activity.title}</strong>
                    <div>Published: {activity.is_published ? '✅' : '❌'}</div>
                    <div>Image: {activity.image_url ? '✅' : '❌'}</div>
                    <div style={{ fontSize: '11px', color: '#666', wordBreak: 'break-all' }}>
                      {activity.image_url?.substring(0, 50)}...
                    </div>
                  </Item>
                ))}
              </Section>

              {/* Rooms */}
              <Section
                title="Rooms"
                count={debugData.rooms.length}
                publishedCount={debugData.rooms.filter(r => r.is_published).length}
              >
                {debugData.rooms.map(room => (
                  <Item key={room.id}>
                    <strong>{room.title}</strong>
                    <div>Published: {room.is_published ? '✅' : '❌'}</div>
                    <div>Image: {room.image ? '✅' : '❌'}</div>
                    <div style={{ fontSize: '11px', color: '#666', wordBreak: 'break-all' }}>
                      {room.image?.substring(0, 50)}...
                    </div>
                  </Item>
                ))}
              </Section>

              {/* Testimonials */}
              <Section
                title="Testimonials"
                count={debugData.testimonials.length}
                publishedCount={debugData.testimonials.filter(t => t.is_published).length}
              >
                {debugData.testimonials.map(test => (
                  <Item key={test.id}>
                    <strong>{test.author}</strong>
                    <div>Published: {test.is_published ? '✅' : '❌'}</div>
                    <div>Rating: {test.rating}/5</div>
                  </Item>
                ))}
              </Section>

              {/* Team */}
              <Section
                title="Team Members"
                count={debugData.team.length}
                publishedCount={debugData.team.filter(t => t.is_published).length}
              >
                {debugData.team.map(member => (
                  <Item key={member.id}>
                    <strong>{member.name}</strong>
                    <div>Role: {member.role}</div>
                    <div>Published: {member.is_published ? '✅' : '❌'}</div>
                  </Item>
                ))}
              </Section>

              {/* Blogs */}
              <Section
                title="Blogs"
                count={debugData.blogs.length}
                publishedCount={debugData.blogs.filter(b => b.is_published).length}
              >
                {debugData.blogs.map(blog => (
                  <Item key={blog.id}>
                    <strong>{blog.title}</strong>
                    <div>Published: {blog.is_published ? '✅' : '❌'}</div>
                    <div>Image: {blog.image_url ? '✅' : '❌'}</div>
                  </Item>
                ))}
              </Section>

              {/* Images */}
              <Section
                title="Images Library"
                count={debugData.images.length}
              >
                {debugData.images.slice(0, 5).map(img => (
                  <Item key={img.id}>
                    <strong>{img.name}</strong>
                    <div style={{ fontSize: '11px', color: '#666', wordBreak: 'break-all' }}>
                      {img.url?.substring(0, 50)}...
                    </div>
                  </Item>
                ))}
                {debugData.images.length > 5 && (
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                    ... and {debugData.images.length - 5} more
                  </div>
                )}
              </Section>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const Section = ({ title, count, publishedCount, children }) => (
  <div style={{
    marginBottom: '20px',
    padding: '12px',
    backgroundColor: '#F9FAFB',
    borderRadius: '4px',
    border: '1px solid #E5E7EB',
  }}>
    <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#1F2937' }}>
      {title}: {count} total
      {publishedCount !== undefined && ` (${publishedCount} published)`}
    </h3>
    {count === 0 ? (
      <p style={{ margin: 0, color: '#6B7280', fontSize: '14px' }}>No items found</p>
    ) : (
      <div>{children}</div>
    )}
  </div>
);

const Item = ({ children }) => (
  <div style={{
    padding: '8px',
    backgroundColor: 'white',
    marginBottom: '8px',
    borderRadius: '4px',
    fontSize: '13px',
    border: '1px solid #E5E7EB',
  }}>
    {children}
  </div>
);

export default DebugPanel;
