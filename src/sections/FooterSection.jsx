export default function FooterSection() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '40px clamp(20px, 5vw, 60px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px',
      maxWidth: '1100px',
      margin: '0 auto',
      width: '100%',
    }}>
      <span style={{ fontWeight: 700, fontSize: '15px', color: '#FFFFFF' }}>
        Space<span style={{ color: '#00D4A8' }}>Calc</span>
      </span>

      <div style={{ display: 'flex', gap: '28px' }}>
        {['Privacy', 'Terms', 'Contact'].map(link => (
          <a key={link} href="#" style={{ fontSize: '13px', color: '#444450', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.target.style.color = '#FFFFFF'}
            onMouseLeave={e => e.target.style.color = '#444450'}
          >
            {link}
          </a>
        ))}
      </div>

      <span style={{ fontSize: '12px', color: '#333340' }}>
        © {new Date().getFullYear()} SpaceCalc
      </span>
    </footer>
  );
}
