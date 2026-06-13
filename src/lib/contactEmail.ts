function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMessageHtml(message: string): string {
  return escapeHtml(message).replace(/\n/g, "<br />");
}

export function buildContactEmail({
  name,
  email,
  message,
  brand,
}: {
  name: string;
  email: string;
  message: string;
  brand: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = formatMessageHtml(message);
  const sentAt = new Date().toLocaleString("ro-RO", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const subject = `Mesaj nou de la ${name} · ${brand}`;

  const text = [
    `Mesaj nou de pe ${brand}`,
    "",
    `Nume: ${name}`,
    `Email: ${email}`,
    "",
    message,
    "",
    `Trimis: ${sentAt}`,
    "",
    "Raspunde direct la acest email pentru a contacta vizitatorul.",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="ro">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#050507;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#050507;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#0c0c0f;border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 20px;background:linear-gradient(135deg,rgba(124,58,237,0.18) 0%,rgba(5,5,7,0) 70%);border-bottom:1px solid rgba(255,255,255,0.06);">
                <div style="font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:10px;">
                  Contact form
                </div>
                <div style="font-size:24px;font-weight:700;line-height:1.2;color:#f4f4f5;letter-spacing:-0.02em;">
                  Mesaj nou de la ${safeName}
                </div>
                <div style="margin-top:8px;font-size:14px;line-height:1.5;color:rgba(255,255,255,0.45);">
                  Cineva ți-a scris pe <span style="color:#c4b5fd;">${escapeHtml(brand)}</span>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 28px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding-bottom:14px;">
                      <div style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:6px;">
                        Nume
                      </div>
                      <div style="font-size:15px;font-weight:600;color:#f4f4f5;">${safeName}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:20px;">
                      <div style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:6px;">
                        Email
                      </div>
                      <a href="mailto:${safeEmail}" style="font-size:15px;font-weight:500;color:#a78bfa;text-decoration:none;">
                        ${safeEmail}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 28px 24px;">
                <div style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:10px;">
                  Mesaj
                </div>
                <div style="padding:16px 18px;border-radius:14px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);font-size:15px;line-height:1.7;color:rgba(255,255,255,0.78);">
                  ${safeMessage}
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:0 28px 28px;">
                <table role="presentation" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="border-radius:999px;background:linear-gradient(135deg,#7c3aed 0%,#5b21b6 100%);">
                      <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: mesaj de pe ${brand}`)}"
                         style="display:inline-block;padding:12px 20px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                        Raspunde lui ${safeName}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 28px 22px;border-top:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);">
                <div style="font-size:12px;line-height:1.6;color:rgba(255,255,255,0.28);">
                  Trimis pe ${escapeHtml(sentAt)} · ${escapeHtml(brand)}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}
