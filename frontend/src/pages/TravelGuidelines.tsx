// pages/TravelGuidelines.tsx
export default function TravelGuidelines() {
  return (
    <div className="min-h-screen bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-accent/10 rounded-full mb-4">
            <span className="text-4xl">🧭</span>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">Travel Guidelines</h1>
          <p className="text-lg text-gray-600">
            Essential information for a safe and enjoyable journey through Jharkhand.
          </p>
        </div>

        <div className="space-y-8">
          {/* Before You Travel */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-accent rounded-full"></span>
              Before You Travel
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl text-accent">📋</span>
                <div>
                  <h3 className="font-semibold text-primary mb-1">Plan Ahead</h3>
                  <p className="text-gray-600 text-sm">Book accommodations in advance, especially during peak seasons (Oct-Mar).</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl text-accent">💳</span>
                <div>
                  <h3 className="font-semibold text-primary mb-1">Payment Methods</h3>
                  <p className="text-gray-600 text-sm">Carry some cash; while digital payments are accepted, remote areas may prefer cash.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl text-accent">📞</span>
                <div>
                  <h3 className="font-semibold text-primary mb-1">Emergency Contacts</h3>
                  <p className="text-gray-600 text-sm">Save local emergency numbers: Police: 100, Ambulance: 108</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl text-accent">🌦️</span>
                <div>
                  <h3 className="font-semibold text-primary mb-1">Weather Check</h3>
                  <p className="text-gray-600 text-sm">Check weather forecasts before planning outdoor activities.</p>
                </div>
              </div>
            </div>
          </div>

          {/* During Your Stay */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-accent rounded-full"></span>
              During Your Stay
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">•</span>
                <p className="text-gray-600"><span className="font-medium">Respect Local Culture:</span> Dress modestly in rural and tribal areas. Ask permission before photographing people.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">•</span>
                <p className="text-gray-600"><span className="font-medium">Environmental Responsibility:</span> Don't litter. Carry reusable water bottles and bags.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">•</span>
                <p className="text-gray-600"><span className="font-medium">Stay Safe:</span> Avoid isolated areas after dark. Always inform someone about your travel plans.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">•</span>
                <p className="text-gray-600"><span className="font-medium">Health Precautions:</span> Carry basic first aid, mosquito repellent, and stay hydrated.</p>
              </li>
            </ul>
          </div>

          {/* Tribal Area Etiquette */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-accent rounded-full"></span>
              Tribal Area Etiquette
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600">When visiting tribal communities:</p>
              <ul className="list-disc ml-6 text-gray-600 space-y-2">
                <li>Always ask permission before entering villages or taking photographs</li>
                <li>Respect local customs and traditions</li>
                <li>Support local artisans by purchasing authentic handicrafts</li>
                <li>Do not touch religious or cultural artifacts without permission</li>
                <li>Learn a few words in local languages - it's appreciated!</li>
              </ul>
            </div>
          </div>

          {/* Important Numbers */}
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Important Contacts</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-accent font-semibold">Emergency</p>
                <p className="text-white/90">Police: 100</p>
                <p className="text-white/90">Ambulance: 108</p>
                <p className="text-white/90">Fire: 101</p>
              </div>
              <div>
                <p className="text-accent font-semibold">Tourism Helpline</p>
                <p className="text-white/90">+91 1234 567 890</p>
                <p className="text-white/90">Tourist Police: 1363</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}