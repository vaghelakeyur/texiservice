/**
 * generateBookingPDF
 * Uses the browser's built-in print dialog (Save as PDF) to produce a
 * well-formatted booking confirmation — zero external dependencies.
 */
export function generateBookingPDF({ form, tripType, cabType, cabLabel, bookingId }) {
  const printWindow = window.open('', '_blank', 'width=800,height=700')
  if (!printWindow) return

  // Format date nicely
  const dateObj = form.date ? new Date(form.date + 'T00:00:00') : null
  const formattedDate = dateObj
    ? dateObj.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : form.date

  // Format time nicely
  const formatTime = (t) => {
    if (!t) return ''
    const [h, m] = t.split(':').map(Number)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const hour = h % 12 || 12
    return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Booking Confirmation — ${bookingId}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Poppins', Arial, sans-serif;
      background: #f5f3ff;
      color: #0e0b1e;
      padding: 32px;
      min-height: 100vh;
    }

    .page {
      max-width: 720px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 40px rgba(124,58,237,0.12);
    }

    /* ── Header ── */
    .header {
      background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
      padding: 32px 40px 28px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .brand-icon {
      font-size: 42px;
      line-height: 1;
    }

    .brand-text h1 {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 0.3px;
      margin-bottom: 2px;
    }

    .brand-text p {
      font-size: 12px;
      opacity: 0.82;
      font-weight: 400;
    }

    .booking-id-box {
      text-align: right;
    }

    .booking-id-box .label {
      font-size: 11px;
      opacity: 0.75;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .booking-id-box .id {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 1.5px;
    }

    /* ── Status Banner ── */
    .status-banner {
      background: #f0fdf4;
      border-bottom: 2px solid #bbf7d0;
      padding: 14px 40px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .status-icon { font-size: 22px; }

    .status-text strong {
      display: block;
      font-size: 15px;
      font-weight: 700;
      color: #15803d;
    }

    .status-text span {
      font-size: 12px;
      color: #166534;
    }

    /* ── Body ── */
    .body {
      padding: 32px 40px 28px;
    }

    .section-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #7c3aed;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 2px solid #ede9fe;
    }

    /* ── Trip Type + Cab Chips ── */
    .chips {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: linear-gradient(135deg, #7c3aed, #06b6d4);
      color: #fff;
      font-size: 13px;
      font-weight: 600;
      padding: 6px 16px;
      border-radius: 30px;
      letter-spacing: 0.3px;
    }

    /* ── Details Grid ── */
    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 24px;
    }

    .detail-item {
      background: #faf9ff;
      border: 1px solid #ede9fe;
      border-radius: 10px;
      padding: 14px 16px;
    }

    .detail-item.full { grid-column: 1 / -1; }

    .detail-item .item-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #9ca3af;
      margin-bottom: 4px;
    }

    .detail-item .item-value {
      font-size: 14px;
      font-weight: 600;
      color: #0e0b1e;
      word-break: break-word;
    }

    /* ── Route Visual ── */
    .route-visual {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #f5f3ff;
      border: 1.5px solid #ddd6fe;
      border-radius: 12px;
      padding: 18px 20px;
      margin-bottom: 24px;
    }

    .route-point {
      flex: 1;
      text-align: center;
    }

    .route-point .rp-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #7c3aed;
      margin-bottom: 4px;
    }

    .route-point .rp-value {
      font-size: 14px;
      font-weight: 700;
      color: #0e0b1e;
    }

    .route-arrow {
      font-size: 22px;
      color: #7c3aed;
      flex-shrink: 0;
      font-weight: 700;
    }

    /* ── Notes ── */
    .notes-box {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 10px;
      padding: 14px 16px;
      margin-bottom: 24px;
    }

    .notes-box .item-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #d97706;
      margin-bottom: 4px;
    }

    .notes-box p {
      font-size: 13px;
      color: #92400e;
      line-height: 1.6;
    }

    /* ── Contact Row ── */
    .contact-row {
      display: flex;
      gap: 12px;
      margin-bottom: 28px;
      flex-wrap: wrap;
    }

    .contact-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: #ede9fe;
      color: #5b21b6;
      font-size: 13px;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 30px;
    }

    /* ── Terms ── */
    .terms {
      background: #f8f7ff;
      border-radius: 10px;
      padding: 14px 16px;
      margin-bottom: 8px;
    }

    .terms .section-label { margin-bottom: 8px; }

    .terms ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .terms li {
      font-size: 12px;
      color: #6b7280;
      display: flex;
      align-items: flex-start;
      gap: 6px;
      line-height: 1.5;
    }

    .terms li::before {
      content: '•';
      color: #7c3aed;
      font-weight: 700;
      flex-shrink: 0;
    }

    /* ── Footer ── */
    .footer {
      background: #0e0b1e;
      padding: 20px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    .footer p {
      font-size: 12px;
      color: rgba(255,255,255,0.55);
    }

    .footer .footer-brand {
      font-size: 13px;
      font-weight: 700;
      color: #f5c518;
    }

    /* ── Watermark ── */
    .watermark {
      text-align: center;
      padding: 12px;
      font-size: 11px;
      color: #d1d5db;
    }

    /* ── Print rules ── */
    @media print {
      body { padding: 0; background: #fff; }
      .page {
        box-shadow: none;
        border-radius: 0;
        max-width: 100%;
      }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="page">

    <!-- Header -->
    <div class="header">
      <div class="brand">
        <div class="brand-icon">🚖</div>
        <div class="brand-text">
          <h1>RK Taxi Service</h1>
          <p>Reliable · Safe · Affordable · Available 24/7</p>
        </div>
      </div>
      <div class="booking-id-box">
        <div class="label">Booking ID</div>
        <div class="id">${bookingId}</div>
      </div>
    </div>

    <!-- Status -->
    <div class="status-banner">
      <div class="status-icon">✅</div>
      <div class="status-text">
        <strong>Booking Request Received</strong>
        <span>Our team will call you at +91 ${form.phone} within 15 minutes to confirm.</span>
      </div>
    </div>

    <!-- Body -->
    <div class="body">

      <!-- Trip chips -->
      <div class="chips">
        <span class="chip">🚘 ${tripType}</span>
        <span class="chip">🚗 ${cabLabel}</span>
        <span class="chip">👥 ${form.passengers} Passenger${Number(form.passengers) > 1 ? 's' : ''}</span>
      </div>

      <!-- Route -->
      <div class="section-label">Route</div>
      <div class="route-visual">
        <div class="route-point">
          <div class="rp-label">📍 Pickup</div>
          <div class="rp-value">${form.pickup}</div>
        </div>
        <div class="route-arrow">→</div>
        <div class="route-point">
          <div class="rp-label">🏁 Drop</div>
          <div class="rp-value">${form.drop}</div>
        </div>
      </div>

      <!-- Details -->
      <div class="section-label">Booking Details</div>
      <div class="details-grid">
        <div class="detail-item">
          <div class="item-label">👤 Passenger Name</div>
          <div class="item-value">${form.name}</div>
        </div>
        <div class="detail-item">
          <div class="item-label">📞 Phone Number</div>
          <div class="item-value">+91 ${form.phone}</div>
        </div>
        <div class="detail-item">
          <div class="item-label">📅 Travel Date</div>
          <div class="item-value">${formattedDate}</div>
        </div>
        <div class="detail-item">
          <div class="item-label">⏰ Pickup Time</div>
          <div class="item-value">${formatTime(form.time)}</div>
        </div>
        <div class="detail-item">
          <div class="item-label">🚗 Vehicle Type</div>
          <div class="item-value">${cabLabel}</div>
        </div>
        <div class="detail-item">
          <div class="item-label">🗓️ Issued On</div>
          <div class="item-value">${new Date().toLocaleString('en-IN')}</div>
        </div>
      </div>

      ${form.notes ? `
      <!-- Notes -->
      <div class="notes-box">
        <div class="item-label">📝 Special Instructions</div>
        <p>${form.notes}</p>
      </div>
      ` : ''}

      <!-- Contact -->
      <div class="section-label">Contact Us</div>
      <div class="contact-row">
        <span class="contact-pill">📞 +91 84608 11110</span>
        <span class="contact-pill">✉️ support@taxiaapki.com</span>
        <span class="contact-pill">📍 Rajkot, Gujarat</span>
      </div>

      <!-- Terms -->
      <div class="terms">
        <div class="section-label">Terms & Conditions</div>
        <ul>
          <li>All fares are for AC vehicles only. Toll, tax & parking charges are extra.</li>
          <li>Night charges (10% extra) apply between 10:00 PM and 6:00 AM.</li>
          <li>Free cancellation up to 1 hour before scheduled pickup time.</li>
          <li>Driver details will be shared via WhatsApp / call before the trip.</li>
          <li>This document is a booking request confirmation, not a final invoice.</li>
        </ul>
      </div>

    </div><!-- /body -->

    <!-- Footer -->
    <div class="footer">
      <p>© ${new Date().getFullYear()} RK Taxi Service. All rights reserved.</p>
      <div class="footer-brand">🚖 RK Taxi Service</div>
    </div>

    <div class="watermark">This is a computer-generated document. No signature required.</div>

  </div><!-- /page -->

  <!-- Auto-trigger print dialog -->
  <script>
    window.onload = function () {
      setTimeout(function () { window.print() }, 400)
    }
  </script>
</body>
</html>`

  printWindow.document.write(html)
  printWindow.document.close()
}
