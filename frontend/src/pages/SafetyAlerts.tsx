// pages/SafetyAlerts.tsx
import { useState } from 'react';

export default function SafetyAlerts() {
  const [activeFilter, setActiveFilter] = useState('all');

  const alerts = [
    {
      id: 1,
      type: 'weather',
      severity: 'high',
      title: 'Heavy Rainfall Alert',
      location: 'Netarhat Region',
      message: 'Heavy rainfall expected in Netarhat area. Trekking routes may be slippery.',
      time: '2 hours ago',
      icon: '🌧️'
    },
    {
      id: 2,
      type: 'crowd',
      severity: 'medium',
      title: 'High Tourist Density',
      location: 'Hundru Falls',
      message: 'Peak tourist hours expected. Plan your visit early morning or late afternoon.',
      time: '5 hours ago',
      icon: '👥'
    },
    {
      id: 3,
      type: 'road',
      severity: 'medium',
      title: 'Road Maintenance',
      location: 'Ranchi - Netarhat Road',
      message: 'Road repair work ongoing. Expect delays of 30-45 minutes.',
      time: '1 day ago',
      icon: '🚧'
    },
    {
      id: 4,
      type: 'wildlife',
      severity: 'low',
      title: 'Wildlife Sighting',
      location: 'Betla National Park',
      message: 'Elephant herd spotted near safari route. Maintain safe distance.',
      time: '1 day ago',
      icon: '🐘'
    }
  ];

  const filteredAlerts = activeFilter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === activeFilter);

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-accent/10 rounded-full mb-4">
            <span className="text-4xl">⚠️</span>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">Safety & Alerts</h1>
          <p className="text-lg text-gray-600">
            Stay informed about current conditions and safety updates across Jharkhand.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {['all', 'weather', 'crowd', 'road', 'wildlife'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full capitalize ${
                activeFilter === filter
                  ? 'bg-accent text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              } transition`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Alerts Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${
                alert.severity === 'high' ? 'border-red-500' :
                alert.severity === 'medium' ? 'border-yellow-500' :
                'border-green-500'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{alert.icon}</span>
                  <div>
                    <h3 className="font-bold text-primary">{alert.title}</h3>
                    <p className="text-sm text-gray-500">{alert.location}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(alert.severity)}`}>
                  {alert.severity.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{alert.message}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{alert.time}</span>
                <button className="text-accent text-sm hover:underline">View Details →</button>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Tips */}
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">General Safety Tips</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">📞</div>
              <p className="font-medium">Save emergency numbers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💧</div>
              <p className="font-medium">Stay hydrated</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">👥</div>
              <p className="font-medium">Travel in groups</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📍</div>
              <p className="font-medium">Share your location</p>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Emergency Contacts</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Police</p>
              <p className="text-xl font-bold text-primary">100</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Ambulance</p>
              <p className="text-xl font-bold text-primary">108</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Fire</p>
              <p className="text-xl font-bold text-primary">101</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}