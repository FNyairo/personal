'use client';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useState } from 'react';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ISO Alpha-2 → approximate [lon, lat] centroids
const COUNTRY_COORDS: Record<string, [number, number]> = {
  FI: [25.7, 64.0], GB: [-1.5, 52.4], US: [-95.7, 37.1], KE: [37.9, 0.0],
  DE: [10.5, 51.2], SE: [18.6, 59.3], NO: [8.5, 60.5], PL: [19.1, 51.9],
  IN: [78.9, 20.6], NG: [8.0, 9.1], ET: [40.5, 8.0], ZA: [25.1, -29.0],
  AU: [133.8, -25.3], CA: [-96.8, 56.1], FR: [2.2, 46.2], JP: [138.3, 36.2],
  CN: [104.2, 35.9], BR: [-51.9, -14.2], NL: [5.3, 52.1], EE: [25.0, 58.6],
};

type CountryData = { countryCode: string; country: string; count: number };

export default function VisitorMap({ data }: { data: CountryData[] }) {
  const [tooltip, setTooltip] = useState('');
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="relative">
      {/* Simple tooltip */}
      {tooltip && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-navy-800 text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 pointer-events-none">
          {tooltip}
        </div>
      )}
      <ComposableMap
        projectionConfig={{ scale: 140 }}
        style={{ width: '100%', height: 'auto', background: 'transparent' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const match = data.find((d) => d.countryCode === geo.properties.ISO_A2);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: match ? `rgba(59,130,246,${0.2 + 0.7 * (match.count / maxCount)})` : '#1E293B',
                      stroke: '#0F172A',
                      strokeWidth: 0.5,
                      outline: 'none',
                    },
                    hover: { fill: '#14B8A6', outline: 'none', cursor: 'pointer' },
                    pressed: { fill: '#0D9488', outline: 'none' },
                  }}
                  onMouseEnter={() =>
                    setTooltip(match ? `${match.country}: ${match.count} visit${match.count > 1 ? 's' : ''}` : '')
                  }
                  onMouseLeave={() => setTooltip('')}
                />
              );
            })
          }
        </Geographies>

        {/* Markers for top visitors */}
        {data.slice(0, 15).map((d) => {
          const coords = COUNTRY_COORDS[d.countryCode];
          if (!coords) return null;
          const r = Math.max(4, Math.min(14, 4 + (d.count / maxCount) * 10));
          return (
            <Marker key={d.countryCode} coordinates={coords}>
              <circle r={r} fill="#3B82F6" fillOpacity={0.7} stroke="#60A5FA" strokeWidth={1} />
              <title>{d.country}: {d.count}</title>
            </Marker>
          );
        })}
      </ComposableMap>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
        <div className="w-3 h-3 rounded-full bg-electric-500/30" />
        <span>Fewer visits</span>
        <div className="w-3 h-3 rounded-full bg-electric-500" />
        <span>More visits</span>
      </div>
    </div>
  );
}
