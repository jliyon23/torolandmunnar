import { useState, useEffect } from 'react';
import { supabaseHelpers } from '../../config/supabase';

const EnquiriesManager = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, contacted, completed
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    try {
      const data = await supabaseHelpers.getEnquiries();
      setEnquiries(data || []);
    } catch (error) {
      console.error('Error loading enquiries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await supabaseHelpers.updateEnquiryStatus(id, status);
      await loadEnquiries();
      alert('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const deleteEnquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      await supabaseHelpers.deleteEnquiry(id);
      await loadEnquiries();
      setSelectedEnquiry(null);
      alert('Enquiry deleted successfully!');
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      alert('Failed to delete enquiry');
    }
  };

  const filteredEnquiries =
    filter === 'all'
      ? enquiries
      : enquiries.filter((e) => e.status === filter);

  const statusColors = {
    pending: 'bg-orange-100 text-orange-700',
    contacted: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Enquiries</h1>
        <p className="text-gray-600">Manage customer enquiries and bookings</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white shadow-md mb-6">
        <div className="flex border-b border-gray-200">
          {[
            { key: 'all', label: 'All', count: enquiries.length },
            { key: 'pending', label: 'Pending', count: enquiries.filter((e) => e.status === 'pending').length },
            { key: 'contacted', label: 'Contacted', count: enquiries.filter((e) => e.status === 'contacted').length },
            { key: 'completed', label: 'Completed', count: enquiries.filter((e) => e.status === 'completed').length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-6 py-4 font-medium transition-all border-b-2 ${
                filter === tab.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label} <span className="ml-2 text-sm">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries List */}
      <div className="bg-white shadow-md">
        {filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p>No enquiries found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className="p-6 hover:bg-gray-50 transition cursor-pointer"
                onClick={() => setSelectedEnquiry(enquiry)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{enquiry.name}</h3>
                      <span className={`px-3 py-1 text-xs font-medium ${statusColors[enquiry.status || 'pending']}`}>
                        {enquiry.status || 'pending'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{enquiry.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{enquiry.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{enquiry.check_in_date} - {enquiry.check_out_date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{enquiry.guests} guests</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Received: {new Date(enquiry.created_at).toLocaleString()}
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-800">Enquiry Details</h3>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Info */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal Information
                </h4>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4">
                  <div>
                    <label className="text-sm text-gray-600">Name</label>
                    <p className="font-medium">{selectedEnquiry.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="font-medium">{selectedEnquiry.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <p className="font-medium">{selectedEnquiry.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Guests</label>
                    <p className="font-medium">{selectedEnquiry.guests}</p>
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Trip Details
                </h4>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4">
                  <div>
                    <label className="text-sm text-gray-600">Check-in</label>
                    <p className="font-medium">{selectedEnquiry.check_in_date}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Check-out</label>
                    <p className="font-medium">{selectedEnquiry.check_out_date}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {selectedEnquiry.message && (
                <div>
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Message
                  </h4>
                  <div className="bg-gray-50 p-4">
                    <p className="text-gray-700">{selectedEnquiry.message}</p>
                  </div>
                </div>
              )}

              {/* Status & Actions */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Update Status</h4>
                <div className="flex gap-3">
                  <button
                    onClick={() => updateStatus(selectedEnquiry.id, 'pending')}
                    className={`flex-1 py-2 px-4 transition ${
                      selectedEnquiry.status === 'pending'
                        ? 'bg-orange-500 text-white'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => updateStatus(selectedEnquiry.id, 'contacted')}
                    className={`flex-1 py-2 px-4 transition ${
                      selectedEnquiry.status === 'contacted'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    Contacted
                  </button>
                  <button
                    onClick={() => updateStatus(selectedEnquiry.id, 'completed')}
                    className={`flex-1 py-2 px-4 transition ${
                      selectedEnquiry.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
              <button
                onClick={() => deleteEnquiry(selectedEnquiry.id)}
                className="bg-red-500 text-white px-6 py-2 hover:bg-red-600 transition"
              >
                Delete Enquiry
              </button>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="bg-gray-200 text-gray-700 px-6 py-2 hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiriesManager;
