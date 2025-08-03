const SimpleBackground = () => (
  <div className="absolute inset-0">
    {/* Enkel gradient med samma färger */}
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
      }}
    />

    {/* Valfri mycket subtil “noise”/textur ovanpå för djup (kan tas bort om du vill ha helt platt) */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23f)' opacity='0.02'/></svg>")`,
        backgroundSize: '200px 200px',
      }}
    />
  </div>
);
