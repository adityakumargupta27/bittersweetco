interface StatusUpdateData {
  orderNumber: string;
  customerName: string;
  status: string;
  statusLabel: string;
}

const STATUS_MESSAGES: Record<string, string> = {
  preparing: "Our team has started preparing your order. Fresh ingredients are being measured! 🧈",
  baking: "Your treats are in the oven! The kitchen smells amazing right now. 🔥",
  out_for_delivery: "Your order is on its way! Keep an eye out for our delivery partner. 🚗",
  cancelled: "Your order has been cancelled. If this was a mistake, please contact us.",
};

export function orderStatusUpdateTemplate(data: StatusUpdateData): string {
  const message = STATUS_MESSAGES[data.status] ?? "Your order status has been updated.";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#F8F2E8; font-family:'Inter',Arial,sans-serif; color:#2F1B12;">
  <div style="max-width:600px; margin:0 auto; padding:40px 20px;">
    <div style="text-align:center; padding-bottom:32px; border-bottom:2px solid #C8B38A;">
      <h1 style="font-family:'Playfair Display',Georgia,serif; font-size:28px; color:#2F1B12; margin:0;">The Bittersweet Co.</h1>
      <p style="font-size:12px; letter-spacing:3px; text-transform:uppercase; color:#7A7D57; margin-top:8px;">Order Update</p>
    </div>

    <div style="padding:32px 0;">
      <p style="font-size:16px; color:#2F1B12;">Hi ${data.customerName},</p>
      <p style="font-size:14px; color:#5B3A29; line-height:1.6;">${message}</p>
    </div>

    <div style="background:#2F1B12; border-radius:12px; padding:20px; text-align:center;">
      <p style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#C8B38A; margin:0 0 4px;">Status</p>
      <p style="font-family:'Playfair Display',Georgia,serif; font-size:22px; color:#C8B38A; margin:0;">${data.statusLabel}</p>
      <p style="font-size:12px; color:#F8F2E8; margin:8px 0 0; opacity:0.6;">Order ${data.orderNumber}</p>
    </div>

    <div style="text-align:center; padding:32px 0 0; border-top:1px solid #E8DDCF; margin-top:32px;">
      <p style="font-family:'Playfair Display',Georgia,serif; font-size:14px; color:#2F1B12;">The Bittersweet Co.</p>
      <p style="font-size:11px; color:#5B3A29; margin-top:4px;">Made with ♥ and Belgian cocoa</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
