import { useState } from "react";

const flights = [
  { id: 1, from: "ASU", to: "MAD", fromCity: "Asunción", toCity: "Madrid", date: "26 Dic", airline: "Air Europa UX24", dep: "14:10", arr: "05:10+1", duration: "11h", price: 1250, pax: "Familia", note: "ida/vuelta pp", direct: true, color: "#E8976D", url: "https://www.skyscanner.es/transporte/vuelos/asu/mad/261226/270110/config/9579-2612261410--32680-0-13870-2612270510%7C13870-2701102345--32680-0-9579-2701110730?adultsv2=1&cabinclass=economy&childrenv2=&ref=home&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false" },
  { id: 2, from: "BCN", to: "SIN", fromCity: "Barcelona", toCity: "Singapur", date: "29 Dic", airline: "Turkish TK1852+TK168", dep: "07:40", arr: "08:45+1", duration: "~19h", price: 626.9, pax: "Todos", note: "Escala IST 4h", direct: false, color: "#6DC8E8", url: "https://www.skyscanner.es/transport_deeplink/4.0/ES/es-ES/USD/ctes/1/9772.16292.2026-12-29/air/trava/flights" },
  { id: 3, from: "SIN", to: "BKK", fromCity: "Singapur", toCity: "Bangkok", date: "1 Ene", airline: "Scoot TR610", dep: "16:00", arr: "17:25", duration: "2h25", price: 105, pax: "Todos", note: "", direct: true, color: "#E8D46D", url: "https://www.kiwi.com/es/booking/?affilid=skyscanner_es&currency=usd&flightsId=1884075651530000d523acba_0" },
  { id: 4, from: "BKK", to: "CNX", fromCity: "Bangkok", toCity: "Chiang Mai", date: "4 Ene", airline: "LionAir SL510", dep: "11:30", arr: "12:45", duration: "1h15", price: 48, pax: "Todos", note: "⚠️ Sale de DMK", direct: true, color: "#A6E86D", url: "https://www.skyscanner.es/transporte/vuelos/bkkt/cnx/270104/config/11052-2701041130--31488-0-10658-2701041245?adultsv2=1&cabinclass=economy&childrenv2=&ref=home&rtn=0&outboundaltsenabled=false&inboundaltsenabled=false&preferdirects=false" },
  { id: 5, from: "CNX", to: "BKK", fromCity: "Chiang Mai", toCity: "Bangkok", date: "7 Ene", airline: "VietJet VZ109", dep: "17:20", arr: "18:40", duration: "1h20", price: 57, pax: "Todos", note: "", direct: true, color: "#E86D9A", url: "https://www.skyscanner.es/transporte/vuelos/cnx/bkkt/270107/config/10658-2701071720--31250-0-9970-2701071840?adultsv2=1&cabinclass=economy&childrenv2=&ref=home&rtn=0&outboundaltsenabled=false&inboundaltsenabled=false&preferdirects=false" },
  { id: 6, from: "BKK", to: "BCN", fromCity: "Bangkok", toCity: "Barcelona", date: "8 Ene", airline: "Air China CA960+CA845", dep: "19:30", arr: "07:35+1", duration: "18h05", price: 539, pax: "Benjamin", note: "⚠️ Escala PEK 1h30", direct: false, color: "#9A6DE8", url: "https://www.skyscanner.es/transporte/vuelos/bkkt/bcn/270108/config/9970-2701081930--32690-1-9772-2701090735?adultsv2=1&cabinclass=economy&childrenv2=&ref=home&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false" },
  { id: 7, from: "MAD", to: "ASU", fromCity: "Madrid", toCity: "Asunción", date: "10 Ene", airline: "Air Europa UX23", dep: "23:45", arr: "07:30+1", duration: "11h45", price: null, pax: "Familia", note: "Incluido en ida/vuelta", direct: true, color: "#E8976D", url: "https://www.skyscanner.es/transporte/vuelos/asu/mad/261226/270110/config/9579-2612261410--32680-0-13870-2612270510%7C13870-2701102345--32680-0-9579-2701110730?adultsv2=1&cabinclass=economy&childrenv2=&ref=home&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false" },
];

const stays = [
  { city: "Barcelona", country: "🇪🇸", dates: "27-28 Dic", nights: 2, emoji: "🏙️", gradient: "linear-gradient(135deg, #2D1B69, #E94560)" },
  { city: "Singapur", country: "🇸🇬", dates: "30-31 Dic", nights: 2, emoji: "🦁", gradient: "linear-gradient(135deg, #0F3443, #34E89E)" },
  { city: "Bangkok", country: "🇹🇭", dates: "1-3 Ene", nights: 3, emoji: "🛕", gradient: "linear-gradient(135deg, #C33764, #E8B84E)" },
  { city: "Chiang Mai", country: "🇹🇭", dates: "4-6 Ene", nights: 3, emoji: "🐘", gradient: "linear-gradient(135deg, #134E5E, #71B280)" },
  { city: "Bangkok", country: "🇹🇭", dates: "7 Ene", nights: 1, emoji: "🛕", gradient: "linear-gradient(135deg, #C33764, #E8B84E)" },
  { city: "Madrid", country: "🇪🇸", dates: "9-10 Ene", nights: 2, emoji: "🏛️", gradient: "linear-gradient(135deg, #4A1942, #C74B50)", note: "Solo familia" },
];

const pending = [
  "Tren/vuelo BCN ↔ MAD (familia)",
  "Alojamientos (todos los destinos)",
];

const FlightCard = ({ f, isSelected, onClick }) => (
  <div onClick={onClick} style={{
    background: isSelected ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${isSelected ? f.color : "rgba(255,255,255,0.08)"}`,
    borderRadius: 16,
    padding: "16px 20px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
  }}>
    {isSelected && <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 3,
      background: f.color,
    }} />}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: f.color, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>{f.date}</span>
      <span style={{
        fontSize: 10, padding: "3px 8px", borderRadius: 20,
        background: f.pax === "Todos" ? "rgba(108,200,232,0.15)" : f.pax === "Familia" ? "rgba(232,151,109,0.15)" : "rgba(154,109,232,0.15)",
        color: f.pax === "Todos" ? "#6DC8E8" : f.pax === "Familia" ? "#E8976D" : "#9A6DE8",
        fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
      }}>{f.pax}</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
      <span style={{ fontSize: 28, fontWeight: 800, color: "#fff", fontFamily: "'Space Mono', monospace", letterSpacing: -1 }}>{f.from}</span>
      <div style={{ flex: 1, position: "relative", height: 20, display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${f.color}, rgba(255,255,255,0.2))` }} />
        <span style={{ fontSize: 18, margin: "0 6px", filter: "grayscale(0.3)" }}>✈️</span>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, rgba(255,255,255,0.2), ${f.color})` }} />
      </div>
      <span style={{ fontSize: 28, fontWeight: 800, color: "#fff", fontFamily: "'Space Mono', monospace", letterSpacing: -1 }}>{f.to}</span>
    </div>
    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>
      {f.airline} · {f.duration} {f.direct ? "directo" : "· con escala"}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{f.dep} → {f.arr}</span>
      {f.price && <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: "'Space Mono', monospace" }}>${f.price}</span>}
    </div>
    {f.note && <div style={{
      marginTop: 8, fontSize: 11, color: f.note.startsWith("⚠️") ? "#E8B84E" : "rgba(255,255,255,0.4)",
      fontFamily: "'JetBrains Mono', monospace",
    }}>{f.note}</div>}
    {f.url && <div style={{ marginTop: 8, fontSize: 11, color: "rgba(255,255,255,0.25)", textAlign: "right" }}>🔗 Ver en buscador</div>}
  </div>
);

export default function TripDashboard() {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const totalVuelos = flights.filter(f => f.price).reduce((s, f) => s + f.price, 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      color: "#fff",
      fontFamily: "'Outfit', 'Helvetica Neue', sans-serif",
      padding: "32px 24px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
          Dic 2026 — Ene 2027
        </div>
        <h1 style={{
          fontSize: 44, fontWeight: 800, margin: 0, letterSpacing: -2,
          background: "linear-gradient(135deg, #6DC8E8, #E8D46D, #E86D9A, #9A6DE8)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          SIN · BKK · CNX
        </h1>
        <div style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
          Singapur → Bangkok → Chiang Mai
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32 }}>
        {[
          { label: "Noches", value: 14, sub: "26 dic — 9 ene" },
          { label: "Ciudades", value: 5, sub: "BCN·SIN·BKK·CNX·MAD" },
          { label: "Total vuelos", value: `$${totalVuelos.toFixed(0)}`, sub: "por persona" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14, padding: "16px 12px", textAlign: "center",
          }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Stays */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 13, letterSpacing: 3, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Estadías</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {stays.map((s, i) => (
            <div key={i} style={{
              background: s.gradient, borderRadius: 16, padding: "20px 16px",
              position: "relative", overflow: "hidden", minHeight: 120,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              <div style={{ position: "absolute", top: 10, right: 14, fontSize: 36, opacity: 0.25 }}>{s.emoji}</div>
              <div>
                <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 2 }}>{s.country} {s.dates}</div>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>{s.city}</div>
              </div>
              <div style={{
                fontSize: 12, fontWeight: 600, background: "rgba(0,0,0,0.25)",
                display: "inline-flex", gap: 8, alignItems: "center", padding: "4px 10px", borderRadius: 20, width: "fit-content",
                fontFamily: "'JetBrains Mono', monospace",
              }}>{s.nights} {s.nights === 1 ? "noche" : "noches"}{s.note ? ` · ${s.note}` : ""}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 13, letterSpacing: 3, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Vuelos</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {flights.map((f) => (
            <FlightCard key={f.id} f={f} isSelected={selectedFlight === f.id} onClick={() => { setSelectedFlight(f.id); if (f.url) window.open(f.url, '_blank'); }} />
          ))}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 13, letterSpacing: 3, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Desglose de costos <span style={{ opacity: 0.5 }}>(por persona)</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Vuelos */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#6DC8E8" }}>✈️ Vuelos</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "'Space Mono', monospace" }}>${totalVuelos.toFixed(0)}</span>
            </div>
            {flights.filter(f => f.price).map((f, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 0",
                borderBottom: i < flights.filter(fl => fl.price).length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}>
                <div>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{f.from} → {f.to}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>{f.date}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", fontFamily: "'Space Mono', monospace" }}>${f.price}</span>
              </div>
            ))}
          </div>

          {/* Estadías */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#E8D46D" }}>🏨 Estadías</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono', monospace" }}>Por definir</span>
            </div>
            {stays.map((s, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 0",
                borderBottom: i < stays.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}>
                <div>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{s.city}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>{s.nights}n · {s.dates}</span>
                </div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", fontFamily: "'JetBrains Mono', monospace" }}>—</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grand Total Bar */}
        <div style={{
          marginTop: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 14, padding: "16px 20px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Total por persona</span>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#fff", fontFamily: "'Space Mono', monospace" }}>${totalVuelos.toFixed(0)}</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>+ estadías</span>
          </div>
        </div>
      </div>

      {/* Pending */}
      <div style={{
        background: "rgba(232,184,78,0.06)", border: "1px solid rgba(232,184,78,0.15)",
        borderRadius: 16, padding: 20,
      }}>
        <h2 style={{ fontSize: 13, letterSpacing: 3, color: "#E8B84E", textTransform: "uppercase", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>⚠️ Pendientes</h2>
        {pending.map((p, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "8px 0",
            borderBottom: i < pending.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8B84E", opacity: 0.6 }} />
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
