export default function SectionLabel({ children }) {
  return (
    <div style={{
      display: 'inline-block',
      color: '#00D4A8',
      fontSize: '11px',
      fontWeight: 600,
      fontFamily: "'Space Grotesk', sans-serif",
      letterSpacing: '2.5px',
      textTransform: 'uppercase',
      marginBottom: '20px',
    }}>
      {children}
    </div>
  );
}
