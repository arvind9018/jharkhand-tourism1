// pages/owner/MyProperties.tsx
import { useState } from 'react';

interface Property {
  id: string;
  name: string;
  type: 'homestay' | 'cottage' | 'farmhouse';
  location: string;
  pricePerNight: number;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  images: string[];
  amenities: string[];
  status: 'active' | 'inactive' | 'booked';
}

export default function MyProperties() {
  const [properties, setProperties] = useState<Property[]>([
    { id: '1', name: 'Mountain View Homestay', type: 'homestay', location: 'Netarhat', pricePerNight: 1200, capacity: 4, bedrooms: 2, bathrooms: 2, rating: 4.6, images: [], amenities: ['WiFi', 'Parking', 'Meals'], status: 'active' },
    { id: '2', name: 'Riverside Cottage', type: 'cottage', location: 'Dassam Falls', pricePerNight: 1500, capacity: 3, bedrooms: 1, bathrooms: 1, rating: 4.8, images: [], amenities: ['WiFi', 'Kitchen', 'Parking'], status: 'active' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const handleDelete = (id: string) => { setProperties(properties.filter(p => p.id !== id)); };

  const amenitiesList = ['WiFi', 'Parking', 'Meals', 'Kitchen', 'AC', 'Hot Water', 'Guide Service', 'Pickup', 'Laundry', 'TV'];

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8"><div><h1 className="text-4xl font-bold text-primary mb-2">My Properties</h1><p className="text-gray-600">Manage your homestays and properties</p></div><button onClick={() => { setEditingProperty(null); setShowForm(true); }} className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition flex items-center gap-2"><span>+</span> Add Property</button></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gray-200 relative"><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div><div className="absolute bottom-2 left-2 bg-accent text-white px-2 py-1 rounded text-xs capitalize">{property.type}</div></div>
              <div className="p-4"><h3 className="text-xl font-bold text-primary">{property.name}</h3><p className="text-sm text-gray-600 mb-2">📍 {property.location}</p><div className="flex justify-between items-center mb-3"><span className="text-accent font-bold">₹{property.pricePerNight}/night</span><span className="text-sm">⭐ {property.rating}</span></div>
              <div className="flex flex-wrap gap-2 mb-4">{property.amenities.slice(0, 3).map(amenity => (<span key={amenity} className="px-2 py-1 bg-gray-100 rounded text-xs">{amenity}</span>))}</div>
              <div className="flex gap-2"><button onClick={() => { setEditingProperty(property); setShowForm(true); }} className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition">Edit</button><button onClick={() => handleDelete(property.id)} className="px-4 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-500 hover:text-white transition">Delete</button></div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}