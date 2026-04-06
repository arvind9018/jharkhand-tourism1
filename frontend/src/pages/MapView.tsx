// src/pages/MapView.tsx
import { useEffect, useRef, useState } from "react"
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { OSM } from 'ol/source'
import { fromLonLat, toLonLat } from 'ol/proj'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style'
import Overlay from 'ol/Overlay'
import { defaults as defaultControls } from 'ol/control'
import 'ol/ol.css'

// Sample data for Jharkhand destinations
const destinations = [
  { id: 1, name: "Netarhat", coords: [84.2667, 23.4833], type: "hill", district: "Latehar", description: "Queen of Chotanagpur, known for breathtaking sunsets" },
  { id: 2, name: "Hundru Falls", coords: [85.65, 23.45], type: "waterfall", district: "Ranchi", description: "Spectacular waterfall plunging from 98 meters" },
  { id: 3, name: "Dassam Falls", coords: [85.52, 23.13], type: "waterfall", district: "Ranchi", description: "Scenic waterfall on Kanchi River" },
  { id: 4, name: "Betla National Park", coords: [84.18, 23.88], type: "wildlife", district: "Latehar", description: "Famous tiger reserve and wildlife sanctuary" },
  { id: 5, name: "Parasnath Hill", coords: [86.13, 23.96], type: "pilgrimage", district: "Giridih", description: "Highest peak in Jharkhand, Jain pilgrimage site" },
  { id: 6, name: "Tagore Hill", coords: [85.32, 23.37], type: "culture", district: "Ranchi", description: "Historical hill associated with Rabindranath Tagore" },
  { id: 7, name: "Jonha Falls", coords: [85.58, 23.28], type: "waterfall", district: "Ranchi", description: "Beautiful waterfall surrounded by lush forests" },
  { id: 8, name: "Panchghagh Falls", coords: [85.7, 23.2], type: "waterfall", district: "Khunti", description: "Series of five waterfalls" },
]

// Style functions for different feature types
const getPointStyle = (type: string) => {
  const colors: Record<string, { fill: number[], stroke: number[] }> = {
    waterfall: { fill: [0, 123, 255], stroke: [0, 86, 179] },
    hill: { fill: [40, 167, 69], stroke: [28, 116, 48] },
    wildlife: { fill: [255, 193, 7], stroke: [199, 151, 5] },
    pilgrimage: { fill: [111, 66, 193], stroke: [77, 46, 135] },
    culture: { fill: [253, 126, 20], stroke: [202, 101, 16] },
    default: { fill: [108, 117, 125], stroke: [76, 81, 86] }
  }
  
  const colorSet = colors[type] || colors.default
  
  return new Style({
    image: new CircleStyle({
      radius: 8,
      fill: new Fill({ color: `rgba(${colorSet.fill.join(',')}, 0.8)` }),
      stroke: new Stroke({ color: `rgb(${colorSet.stroke.join(',')})`, width: 2 })
    })
  })
}

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<any>(null)
  const [vectorSource, setVectorSource] = useState<VectorSource | null>(null)
  const [layers, setLayers] = useState({
    destinations: true,
    waterfalls: true,
    wildlife: true,
    trekking: false,
    ecoZones: false,
    homestays: false
  })

  // Filter features based on selected layers
  const filterFeaturesByLayers = (source: VectorSource) => {
    const features = source.getFeatures()
    
    features.forEach(feature => {
      const type = feature.get('type')
      let shouldShow = false
      
      if (layers.destinations && (type === 'hill' || type === 'culture' || type === 'pilgrimage')) {
        shouldShow = true
      }
      if (layers.waterfalls && type === 'waterfall') {
        shouldShow = true
      }
      if (layers.wildlife && type === 'wildlife') {
        shouldShow = true
      }
      
      // Set style based on visibility
      if (shouldShow) {
        feature.setStyle(getPointStyle(type))
      } else {
        feature.setStyle(new Style({})) // Hide feature
      }
    })
  }

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return

    // Create vector source for destinations
    const source = new VectorSource()
    
    // Add destinations as features
    destinations.forEach(dest => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(dest.coords)),
        id: dest.id,
        name: dest.name,
        type: dest.type,
        district: dest.district,
        description: dest.description,
        coords: dest.coords
      })
      source.addFeature(feature)
    })

    setVectorSource(source)

    // Create vector layer with styling
    const vectorLayer = new VectorLayer({
      source: source,
      style: (feature) => getPointStyle(feature.get('type'))
    })

    // Create popup overlay
    const popupOverlay = new Overlay({
      element: popupRef.current!,
      positioning: 'bottom-center',
      offset: [0, -10],
      autoPan: true,
      
    })

    // Initialize map
    const olMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
          visible: true
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([85.3, 23.5]),
        zoom: 7
      }),
      controls: defaultControls({
        zoom: true,
        rotate: false,
        attribution: true
      }),
      overlays: [popupOverlay]
    })

    // Handle map clicks
    olMap.on('click', (evt) => {
      const feature = olMap.forEachFeatureAtPixel(evt.pixel, (feature) => feature)
      if (feature) {
        const coordinates = (feature.getGeometry() as Point).getCoordinates()
        const name = feature.get('name')
        const type = feature.get('type')
        const district = feature.get('district')
        const description = feature.get('description')
        const coords = feature.get('coords')
        
        setSelectedDestination({ 
          id: feature.get('id'),
          name, 
          type, 
          district, 
          description,
          coords,
          coordinates 
        })
        popupOverlay.setPosition(coordinates)
        
        // Show popup
        if (popupRef.current) {
          popupRef.current.style.display = 'block'
        }
      } else {
        popupOverlay.setPosition(undefined)
        setSelectedDestination(null)
        if (popupRef.current) {
          popupRef.current.style.display = 'none'
        }
      }
    })

    // Change cursor on hover
    olMap.on('pointermove', (evt) => {
      const pixel = olMap.getEventPixel(evt.originalEvent)
      const hit = olMap.hasFeatureAtPixel(pixel)
      mapRef.current!.style.cursor = hit ? 'pointer' : ''
    })

    setMap(olMap)

    return () => {
      olMap.setTarget(undefined)
    }
  }, [])

  // Handle layer visibility changes - UPDATE MAP DYNAMICALLY
  useEffect(() => {
    if (vectorSource) {
      filterFeaturesByLayers(vectorSource)
    }
  }, [layers, vectorSource])

  // Zoom controls
  const handleZoomIn = () => {
    if (map) {
      const view = map.getView()
      view.setZoom(view.getZoom()! + 1)
    }
  }

  const handleZoomOut = () => {
    if (map) {
      const view = map.getView()
      view.setZoom(view.getZoom()! - 1)
    }
  }

  const handleReset = () => {
    if (map) {
      map.getView().setCenter(fromLonLat([85.3, 23.5]))
      map.getView().setZoom(7)
    }
  }

  const handleLayerToggle = (layer: keyof typeof layers) => {
    setLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }))
  }

  // Get directions - Open Google Maps
  const handleGetDirections = () => {
    if (!selectedDestination) return
    
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude
          const destLat = selectedDestination.coords[1]
          const destLng = selectedDestination.coords[0]
          
          // Open Google Maps with directions
          const googleMapsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/${destLat},${destLng}/`
          window.open(googleMapsUrl, '_blank')
        },
        (error) => {
          // If location access denied or error, open without current location
          console.log('Location error:', error)
          const destLat = selectedDestination.coords[1]
          const destLng = selectedDestination.coords[0]
          const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${destLat},${destLng}`
          window.open(googleMapsUrl, '_blank')
        }
      )
    } else {
      // Geolocation not supported, open map with destination only
      const destLat = selectedDestination.coords[1]
      const destLng = selectedDestination.coords[0]
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${destLat},${destLng}`
      window.open(googleMapsUrl, '_blank')
    }
  }

  return (
    <div className="bg-secondary min-h-screen px-6 sm:px-10 py-8">

      {/* HEADER */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-primary">
          GIS Map & Smart Navigation
        </h1>
        <p className="mt-2 max-w-2xl">
          Explore Jharkhand using interactive GIS maps with routes,
          eco-sensitive zones, nearby attractions, and smart navigation.
        </p>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* LEFT PANEL – CONTROLS */}
        <aside className="bg-white rounded-xl shadow p-5">
          <h2 className="font-bold text-primary mb-4">
            Map Layers
          </h2>

          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={layers.destinations}
                onChange={() => handleLayerToggle('destinations')}
                className="w-4 h-4 text-accent focus:ring-accent rounded"
              />
              <span>Tourist Destinations (Hills, Culture, Pilgrimage)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={layers.waterfalls}
                onChange={() => handleLayerToggle('waterfalls')}
                className="w-4 h-4 text-accent focus:ring-accent rounded"
              />
              <span>Waterfalls</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox"
                checked={layers.wildlife}
                onChange={() => handleLayerToggle('wildlife')}
                className="w-4 h-4 text-accent focus:ring-accent rounded"
              />
              <span>Wildlife</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={layers.trekking}
                onChange={() => handleLayerToggle('trekking')}
                className="w-4 h-4 text-accent focus:ring-accent rounded"
              />
              <span>Trekking Routes</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={layers.ecoZones}
                onChange={() => handleLayerToggle('ecoZones')}
                className="w-4 h-4 text-accent focus:ring-accent rounded"
              />
              <span>Eco-Sensitive Zones</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={layers.homestays}
                onChange={() => handleLayerToggle('homestays')}
                className="w-4 h-4 text-accent focus:ring-accent rounded"
              />
              <span>Homestays</span>
            </label>
          </div>

          <hr className="my-4" />

          <h2 className="font-bold text-primary mb-2">
            Legend
          </h2>

          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-blue-500"></span>
              Waterfall
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green-500"></span>
              Hill Station
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
              Wildlife
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-purple-500"></span>
              Pilgrimage
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-orange-500"></span>
              Culture
            </li>
          </ul>
        </aside>

        {/* MAP AREA */}
        <div className="lg:col-span-2 relative">
          <div 
            ref={mapRef} 
            className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg bg-gray-100"
          />
          
          {/* Popup element */}
          <div 
            ref={popupRef} 
            className="absolute bg-white rounded-lg shadow-lg p-3 text-sm hidden z-20"
            style={{ minWidth: '220px', display: 'none' }}
          >
            {selectedDestination && (
              <>
                <h3 className="font-bold text-primary">{selectedDestination.name}</h3>
                <p className="text-gray-600 text-xs mt-1">📍 District: {selectedDestination.district}</p>
                <p className="text-gray-600 text-xs capitalize">🏷️ Type: {selectedDestination.type}</p>
                {selectedDestination.description && (
                  <p className="text-gray-500 text-xs mt-1">{selectedDestination.description}</p>
                )}
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <button 
                    onClick={handleGetDirections}
                    className="w-full bg-accent text-white text-xs py-1.5 rounded-lg hover:bg-accent-dark transition"
                  >
                    Get Directions →
                  </button>
                </div>
              </>
            )}
          </div>

          {/* MAP OVERLAY BUTTONS */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 space-y-2 z-10">
            <button 
              onClick={handleZoomIn}
              className="block w-8 h-8 text-center hover:bg-gray-100 rounded transition font-bold"
              title="Zoom In"
            >
              +
            </button>
            <button 
              onClick={handleZoomOut}
              className="block w-8 h-8 text-center hover:bg-gray-100 rounded transition font-bold"
              title="Zoom Out"
            >
              −
            </button>
            <button 
              onClick={handleReset}
              className="block w-8 h-8 text-center hover:bg-gray-100 rounded transition"
              title="Reset View"
            >
              ↺
            </button>
          </div>
        </div>

        {/* RIGHT PANEL – INFO */}
        <aside className="bg-white rounded-xl shadow p-5">
          <h2 className="font-bold text-primary mb-3">
            Location Info
          </h2>

          <p className="text-sm text-gray-600">
            Click on any destination marker to view details and get directions.
          </p>

          {selectedDestination ? (
            <div className="mt-4 border rounded-lg p-3">
              <p className="font-semibold text-accent text-lg">{selectedDestination.name}</p>
              <p className="text-gray-600 text-sm mt-1">📍 {selectedDestination.district}</p>
              <p className="text-gray-600 text-sm capitalize">🏷️ {selectedDestination.type}</p>
              {selectedDestination.description && (
                <p className="text-gray-500 text-sm mt-2">{selectedDestination.description}</p>
              )}
              
              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-500 font-semibold">📍 Coordinates:</p>
                <p className="text-xs text-gray-500">
                  Lat: {selectedDestination.coords?.[1]?.toFixed(4)}<br />
                  Lng: {selectedDestination.coords?.[0]?.toFixed(4)}
                </p>
              </div>
              
              <button 
                onClick={handleGetDirections}
                className="mt-4 w-full bg-accent text-white py-2 rounded-lg hover:bg-accent-dark transition flex items-center justify-center gap-2"
              >
                <span>📍</span>
                Get Directions
                <span>→</span>
              </button>
            </div>
          ) : (
            <div className="mt-4 border rounded-lg p-3 text-sm text-gray-500">
              <p className="font-semibold">No location selected</p>
              <p className="text-xs mt-1">Click on any marker to see details and get directions</p>
            </div>
          )}
        </aside>
      </div>

      {/* FOOT NOTE */}
      <p className="mt-8 text-sm text-center text-gray-600">
        * Interactive map powered by OpenLayers with OpenStreetMap data. Click on markers for details and directions.
        <br />Click "Get Directions" to open Google Maps with route from your current location.
      </p>
    </div>
  )
}