// pages/guide/GuideSchedule.tsx
import { useState } from 'react';

interface ScheduledTour {
  id: string;
  tourName: string;
  date: string;
  startTime: string;
  endTime: string;
  customerName: string;
  customerPhone: string;
  numberOfPeople: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingPoint: string;
  notes: string;
}

interface AvailabilitySlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export default function GuideSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [selectedTour, setSelectedTour] = useState<ScheduledTour | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const [scheduledTours, setScheduledTours] = useState<ScheduledTour[]>([
    { id: '1', tourName: 'Waterfall Trekking Tour', date: '2024-04-15', startTime: '08:00', endTime: '17:00', customerName: 'Rahul Sharma', customerPhone: '9876543210', numberOfPeople: 4, status: 'upcoming', meetingPoint: 'Hotel Lobby', notes: 'Vegetarian lunch requested' },
    { id: '2', tourName: 'Wildlife Safari Tour', date: '2024-04-18', startTime: '06:00', endTime: '18:00', customerName: 'Priya Singh', customerPhone: '9876543211', numberOfPeople: 3, status: 'upcoming', meetingPoint: 'Park Entrance', notes: '' },
    { id: '3', tourName: 'Waterfall Trekking Tour', date: '2024-04-20', startTime: '08:00', endTime: '17:00', customerName: 'Amit Kumar', customerPhone: '9876543212', numberOfPeople: 6, status: 'upcoming', meetingPoint: 'Hotel Lobby', notes: '' },
    { id: '4', tourName: 'Cultural Heritage Tour', date: '2024-04-12', startTime: '09:00', endTime: '16:00', customerName: 'Sneha Gupta', customerPhone: '9876543213', numberOfPeople: 2, status: 'completed', meetingPoint: 'Museum', notes: '' },
  ]);

  const [availability, setAvailability] = useState<AvailabilitySlot[]>([
    { id: '1', date: '2024-04-15', startTime: '08:00', endTime: '17:00', isAvailable: false },
    { id: '2', date: '2024-04-16', startTime: '08:00', endTime: '17:00', isAvailable: true },
    { id: '3', date: '2024-04-17', startTime: '08:00', endTime: '17:00', isAvailable: true },
    { id: '4', date: '2024-04-18', startTime: '06:00', endTime: '18:00', isAvailable: false },
    { id: '5', date: '2024-04-19', startTime: '08:00', endTime: '17:00', isAvailable: true },
    { id: '6', date: '2024-04-20', startTime: '08:00', endTime: '17:00', isAvailable: false },
  ]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getToursForDate = (date: string) => {
    return scheduledTours.filter(tour => tour.date === date);
  };

  const getAvailabilityForDate = (date: string) => {
    const slot = availability.find(a => a.date === date);
    return slot ? slot.isAvailable : true;
  };

  const updateTourStatus = (tourId: string, newStatus: ScheduledTour['status']) => {
    setScheduledTours(scheduledTours.map(tour => 
      tour.id === tourId ? { ...tour, status: newStatus } : tour
    ));
    setSelectedTour(null);
  };

  const toggleAvailability = (date: string) => {
    setAvailability(availability.map(slot => 
      slot.date === date ? { ...slot, isAvailable: !slot.isAvailable } : slot
    ));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date().toISOString().split('T')[0];

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-32 bg-gray-50 rounded-lg"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const tours = getToursForDate(dateStr);
      const isAvailable = getAvailabilityForDate(dateStr);
      const isToday = dateStr === today;
      const isPast = dateStr < today;

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(dateStr)}
          className={`min-h-32 p-2 rounded-lg border cursor-pointer transition ${
            selectedDate === dateStr ? 'ring-2 ring-accent border-accent' : 'border-gray-200 hover:border-accent'
          } ${isPast ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="flex justify-between items-start mb-2">
            <span className={`text-sm font-semibold ${isToday ? 'text-accent' : 'text-gray-700'}`}>{day}</span>
            {!isPast && (
              <button
                onClick={(e) => { e.stopPropagation(); toggleAvailability(dateStr); }}
                className={`text-xs px-2 py-0.5 rounded-full ${isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              >
                {isAvailable ? 'Available' : 'Booked'}
              </button>
            )}
          </div>
          <div className="space-y-1">
            {tours.map(tour => (
              <div
                key={tour.id}
                onClick={(e) => { e.stopPropagation(); setSelectedTour(tour); }}
                className="text-xs p-1 bg-accent/10 rounded cursor-pointer hover:bg-accent/20"
              >
                <p className="font-medium truncate">{tour.tourName}</p>
                <p className="text-gray-500">{tour.startTime} - {tour.endTime}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  const upcomingTours = scheduledTours.filter(t => t.status === 'upcoming').sort((a, b) => a.date.localeCompare(b.date));
  const completedTours = scheduledTours.filter(t => t.status === 'completed');

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Tour Schedule</h1>
            <p className="text-gray-600">Manage your tour calendar and availability</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setViewMode('calendar')} className={`px-4 py-2 rounded-lg transition ${viewMode === 'calendar' ? 'bg-accent text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>📅 Calendar</button>
            <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-lg transition ${viewMode === 'list' ? 'bg-accent text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>📋 List</button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Upcoming Tours</p>
            <p className="text-3xl font-bold">{upcomingTours.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Completed Tours</p>
            <p className="text-3xl font-bold">{completedTours.length}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Available Days</p>
            <p className="text-3xl font-bold">{availability.filter(a => a.isAvailable).length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Customers</p>
            <p className="text-3xl font-bold">{scheduledTours.reduce((sum, t) => sum + t.numberOfPeople, 0)}</p>
          </div>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <button onClick={handlePrevMonth} className="px-4 py-2 rounded-lg hover:bg-gray-100 transition">← Previous</button>
              <h2 className="text-2xl font-bold text-primary">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <button onClick={handleNextMonth} className="px-4 py-2 rounded-lg hover:bg-gray-100 transition">Next →</button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-primary py-2">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {renderCalendar()}
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-primary">Upcoming Tours</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {upcomingTours.map((tour) => (
                <div key={tour.id} className="p-6 hover:bg-gray-50 transition cursor-pointer" onClick={() => setSelectedTour(tour)}>
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-primary">{tour.tourName}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <span>📅 {new Date(tour.date).toLocaleDateString()}</span>
                        <span>⏰ {tour.startTime} - {tour.endTime}</span>
                        <span>👥 {tour.numberOfPeople} guests</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">📍 Meeting Point: {tour.meetingPoint}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">{tour.status}</span>
                      <p className="text-sm text-gray-500 mt-2">Customer: {tour.customerName}</p>
                    </div>
                  </div>
                </div>
              ))}
              {upcomingTours.length === 0 && (
                <div className="p-12 text-center text-gray-500">No upcoming tours scheduled</div>
              )}
            </div>
          </div>
        )}

        {/* Add Availability Slot Button */}
        <div className="mt-8 flex justify-end">
          <button onClick={() => setShowAddSlot(true)} className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition flex items-center gap-2">
            <span>+</span> Add Availability
          </button>
        </div>
      </div>

      {/* Tour Details Modal */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">Tour Details</h2>
              <button onClick={() => setSelectedTour(null)} className="text-gray-500 hover:text-accent text-2xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div><p className="text-sm text-gray-500">Tour Name</p><p className="font-medium text-lg">{selectedTour.tourName}</p></div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-gray-500">Date</p><p className="font-medium">{new Date(selectedTour.date).toLocaleDateString()}</p></div>
                <div><p className="text-sm text-gray-500">Time</p><p className="font-medium">{selectedTour.startTime} - {selectedTour.endTime}</p></div>
              </div>
              <div><p className="text-sm text-gray-500">Customer</p><p className="font-medium">{selectedTour.customerName}</p><p className="text-sm text-gray-500">{selectedTour.customerPhone}</p></div>
              <div><p className="text-sm text-gray-500">Number of Guests</p><p className="font-medium">{selectedTour.numberOfPeople}</p></div>
              <div><p className="text-sm text-gray-500">Meeting Point</p><p className="font-medium">{selectedTour.meetingPoint}</p></div>
              {selectedTour.notes && <div><p className="text-sm text-gray-500">Notes</p><p className="text-gray-600">{selectedTour.notes}</p></div>}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-primary mb-2">Update Status</label>
                <div className="flex gap-2">
                  {['upcoming', 'completed', 'cancelled'].map(status => (
                    <button key={status} onClick={() => updateTourStatus(selectedTour.id, status as ScheduledTour['status'])} className={`px-4 py-2 rounded-lg capitalize transition ${selectedTour.status === status ? 'bg-accent text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{status}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Availability Modal */}
      {showAddSlot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">Add Availability</h2>
              <button onClick={() => setShowAddSlot(false)} className="text-gray-500 hover:text-accent text-2xl">✕</button>
            </div>
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddSlot(false); }}>
              <div><label className="block text-sm font-medium text-primary mb-1">Date</label><input type="date" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-primary mb-1">Start Time</label><input type="time" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent" required /></div>
                <div><label className="block text-sm font-medium text-primary mb-1">End Time</label><input type="time" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent" required /></div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-accent text-white py-2 rounded-lg font-semibold hover:bg-accent-dark transition">Add Slot</button>
                <button type="button" onClick={() => setShowAddSlot(false)} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}