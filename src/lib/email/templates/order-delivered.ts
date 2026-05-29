interface DeliveredData {
  orderNumber: string;
  customerName: string;
}

export function orderDeliveredTemplate(data: DeliveredData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#F8F2E8; font-family:'Inter',Arial,sans-serif; color:#2F1B12;">
  <div style="max-width:600px; margin:0 auto; padding:40px 20px;">
    <div style="text-align:center; padding-bottom:32px; border-bottom:2px solid #C8B38A;">
      <h1 style="font-family:'Playfair Display',Georgia,serif; font-size:28px; color:#2F1B12; margin:0;">The Bittersweet Co.</h1>
      <p style="font-size:12px; letter-spacing:3px; text-transform:uppercase; color:#7A7D57; margin-top:8px;">Order Delivered</p>
    </div>

    <div style="padding:32px 0; text-align:center;">
      <p style="font-size:40px; margin:0;">🎉</p>
      <h2 style="font-family:'Playfair Display',Georgia,serif; font-size:24px; color:#2F1B12; margin:16px 0 0;">Your order has arrived!</h2>
    </div>

    <div style="padding:0 0 32px;">
      <p style="font-size:16px; color:#2F1B12;">Hi ${data.customerName},</p>
      <p style="font-size:14px; color:#5B3A29; line-height:1.6;">
        Your order <strong>${data.orderNumber}</strong> has been delivered! We hope every bite brings you joy. 🍫
      </p>
      <p style="font-size:14px; color:#5B3A29; line-height:1.6;">
        We'd love to hear what you think. Your feedback helps us bake even better treats!
      </p>
    </div>

    <!-- Review CTA -->
    <div style="text-align:center; padding:24px 0;">
      <a href="https://bittersweet.co/reviews" style="display:inline-block; background:#C8B38A; color:#2F1B12; padding:14px 32px; border-radius:999px; text-decoration:none; font-size:13px; letter-spacing:2px; text-transform:uppercase; font-weight:600;">
        Share Your Review
      </a>
    </div>

    <div style="text-align:center; padding:32px 0 0; border-top:1px solid #E8DDCF; margin-top:16px;">
      <p style="font-size:14px; color:#5B3A29;">Thank you for choosing us! 💛</p>
      <p style="font-family:'Playfair Display',Georgia,serif; font-size:14px; color:#2F1B12; margin-top:12px;">The Bittersweet Co.</p>
      <p style="font-size:11px; color:#5B3A29; margin-top:4px;">Made with ♥ and Belgian cocoa</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
