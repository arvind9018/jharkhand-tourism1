// pages/guide/MyTours.tsx
import { useState } from 'react';

interface Tour {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  maxGroupSize: number;
  locations: string[];
  startTime: string;
  endTime: string;
  included: string[];
  excluded: string[];
  status: 'active' | 'inactive';
}

export default function MyTours() {
  const [tours, setTours] = useState<Tour[]>([
    { id: '1', name: 'Waterfall Trekking Tour', description: 'Explore the beautiful waterfalls of Jharkhand', duration: '1 Day', price: 1500, maxGroupSize: 10, locations: ['Hundru Falls', 'Dassam Falls'], startTime: '8:00 AM', endTime: '5:00 PM', included: ['Guide', 'Lunch', 'Transport'], excluded: ['Personal Expenses'], status: 'active' },
    { id: '2', name: 'Wildlife Safari Tour', description: 'Experience wildlife at Betla National Park', duration: '2 Days', price: 3500, maxGroupSize: 8, locations: ['Betla National Park'], startTime: '6:00 AM', endTime: '6:00 PM', included: ['Guide', 'Accommodation', 'Meals', 'Safari'], excluded: ['Camera Fee'], status: 'active' },
  ]);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8"><div><h1 className="text-4xl font-bold text-primary mb-2">My Tours</h1><p className="text-gray-600">Create and manage your tour packages</p></div><button onClick={() => setShowForm(true)} className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition flex items-center gap-2"><span>+</span> Add Tour</button></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="p-6"><h3 className="text-xl font-bold text-primary">{tour.name}</h3><p className="text-gray-600 mt-1">{tour.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-4"><div><p className="text-sm text-gray-500">Duration</p><p className="font-medium">{tour.duration}</p></div><div><p className="text-sm text-gray-500">Price</p><p className="font-bold text-accent">₹{tour.price}/person</p></div><div><p className="text-sm text-gray-500">Max Group</p><p className="font-medium">{tour.maxGroupSize} people</p></div><div><p className="text-sm text-gray-500">Time</p><p className="font-medium">{tour.startTime} - {tour.endTime}</p></div></div>
              <div className="mt-4"><p className="text-sm font-semibold text-primary">Locations:</p><div className="flex flex-wrap gap-2 mt-1">{tour.locations.map(loc => (<span key={loc} className="px-2 py-1 bg-gray-100 rounded text-xs">{loc}</span>))}</div></div>
              <div className="flex gap-2 mt-4"><button className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition">Edit</button><button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-500 hover:text-white transition">Delete</button></div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}