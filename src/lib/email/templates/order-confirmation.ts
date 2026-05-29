interface OrderConfirmationData {
  orderNumber: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  pincode: string;
}

export function orderConfirmationTemplate(data: OrderConfirmationData): string {
  const itemRows = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #E8DDCF;">${item.name}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #E8DDCF; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #E8DDCF; text-align: right;">₹${item.price * item.quantity}</td>
      </tr>
    `,
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#F8F2E8; font-family: 'Inter', Arial, sans-serif; color:#2F1B12;">
  <div style="max-width:600px; margin:0 auto; padding:40px 20px;">
    <!-- Header -->
    <div style="text-align:center; padding-bottom:32px; border-bottom:2px solid #C8B38A;">
      <h1 style="font-family:'Playfair Display',Georgia,serif; font-size:28px; color:#2F1B12; margin:0;">The Bittersweet Co.</h1>
      <p style="font-size:12px; letter-spacing:3px; text-transform:uppercase; color:#7A7D57; margin-top:8px;">Order Confirmation</p>
    </div>

    <!-- Greeting -->
    <div style="padding:32px 0;">
      <p style="font-size:16px; color:#2F1B12;">Hi ${data.customerName},</p>
      <p style="font-size:14px; color:#5B3A29; line-height:1.6;">
        Thank you for your order! We've received it and our bakers are getting ready. Your treats will be baked fresh and delivered with love. 🍫
      </p>
    </div>

    <!-- Order Number -->
    <div style="background:#2F1B12; border-radius:12px; padding:20px; text-align:center; margin-bottom:24px;">
      <p style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#C8B38A; margin:0 0 4px;">Order Number</p>
      <p style="font-family:'Playfair Display',Georgia,serif; font-size:24px; color:#F8F2E8; margin:0;">${data.orderNumber}</p>
    </div>

    <!-- Items -->
    <table style="width:100%; border-collapse:collapse; font-size:14px;">
      <thead>
        <tr style="border-bottom:2px solid #C8B38A;">
          <th style="text-align:left; padding:8px 0; color:#7A7D57; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Item</th>
          <th style="text-align:center; padding:8px 0; color:#7A7D57; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Qty</th>
          <th style="text-align:right; padding:8px 0; color:#7A7D57; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Total</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>

    <!-- Totals -->
    <div style="padding:16px 0; font-size:14px;">
      <div style="display:flex; justify-content:space-between; padding:4px 0; color:#5B3A29;">
        <span>Subtotal</span><span>₹${data.subtotal}</span>
      </div>
      ${data.discount > 0 ? `<div style="display:flex; justify-content:space-between; padding:4px 0; color:#7A7D57;"><span>Discount</span><span>-₹${data.discount}</span></div>` : ""}
      <div style="display:flex; justify-content:space-between; padding:4px 0; color:#5B3A29;">
        <span>Delivery</span><span>${data.deliveryFee === 0 ? "Free" : `₹${data.deliveryFee}`}</span>
      </div>
      <div style="display:flex; justify-content:space-between; padding:12px 0 0; border-top:2px solid #C8B38A; font-family:'Playfair Display',Georgia,serif; font-size:18px; color:#2F1B12;">
        <span>Total</span><span>₹${data.total}</span>
      </div>
    </div>

    <!-- Delivery -->
    <div style="background:#F0E9DD; border-radius:12px; padding:16px; margin:16px 0; font-size:13px; color:#5B3A29;">
      <p style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#7A7D57; margin:0 0 8px;">Delivery Address</p>
      <p style="margin:0;">${data.addressLine1}</p>
      ${data.addressLine2 ? `<p style="margin:0;">${data.addressLine2}</p>` : ""}
      <p style="margin:0;">${data.city} - ${data.pincode}</p>
    </div>

    <!-- Payment -->
    <div style="background:#F0E9DD; border-radius:12px; padding:16px; margin:16px 0; font-size:13px;">
      <p style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#7A7D57; margin:0 0 4px;">Payment</p>
      <p style="margin:0; color:#2F1B12;">Cash on Delivery</p>
    </div>

    <!-- Footer -->
    <div style="text-align:center; padding:32px 0 0; border-top:1px solid #E8DDCF; margin-top:24px;">
      <p style="font-family:'Playfair Display',Georgia,serif; font-size:14px; color:#2F1B12;">The Bittersweet Co.</p>
      <p style="font-size:11px; color:#5B3A29; margin-top:4px;">Made with ♥ and Belgian cocoa</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
