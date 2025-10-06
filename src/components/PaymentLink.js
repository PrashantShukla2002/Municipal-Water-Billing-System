import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function PaymentLink({ link }) {
  if (!link) return null;
  
  return (
    <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        <p style={{ wordBreak: 'break-all' }}>
          Link:{' '}
          <a href={link.url} target="_blank" rel="noreferrer">
            {link.url}
          </a>
        </p>
      </div>
      <div style={{ width: 120, height: 120 }}>
        <QRCodeSVG value={link.url} />
      </div>
    </div>
  );
}
