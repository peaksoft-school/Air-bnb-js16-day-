export default function DebugComponent({ data, label = 'Debug Data' }) {
   return (
      <div
         style={{ backgroundColor: '#eee', padding: '1rem', margin: '1rem 0' }}
      >
         <strong>{label}</strong>
         <pre style={{ overflowX: 'auto' }}>
            {JSON.stringify(data, null, 2)}
         </pre>
      </div>
   )
}
