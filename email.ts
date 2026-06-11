import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function enviarEmailAprovacao({
  para,
  nomeAprovador,
  nomeCliente,
  tituloConteudo,
  linkAprovacao,
  agencyName,
  agencyColor = '#534AB7',
}: {
  para: string
  nomeAprovador: string
  nomeCliente: string
  tituloConteudo: string
  linkAprovacao: string
  agencyName: string
  agencyColor?: string
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f5f5f5;font-family:Inter,Arial,sans-serif;">
      <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="background:${agencyColor};padding:24px 32px;">
          <h1 style="color:#fff;margin:0;font-size:20px;font-weight:600;">${agencyName}</h1>
          <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px;">Aprovação de conteúdo</p>
        </div>
        <div style="padding:32px;">
          <p style="color:#374151;font-size:15px;margin:0 0 8px;">Olá, <strong>${nomeAprovador}</strong>!</p>
          <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 24px;">
            Um novo conteúdo foi enviado para sua aprovação referente ao cliente <strong>${nomeCliente}</strong>.
          </p>
          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-bottom:24px;">
            <p style="color:#6b7280;font-size:12px;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.05em;">Conteúdo</p>
            <p style="color:#111827;font-size:15px;font-weight:500;margin:0;">${tituloConteudo}</p>
          </div>
          <a href="${linkAprovacao}" style="display:inline-block;background:${agencyColor};color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:15px;font-weight:500;">
            Ver e aprovar conteúdo →
          </a>
          <p style="color:#9ca3af;font-size:12px;margin:24px 0 0;line-height:1.6;">
            Ou acesse diretamente:<br>
            <a href="${linkAprovacao}" style="color:${agencyColor};">${linkAprovacao}</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  return resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: para,
    subject: `[${agencyName}] Conteúdo aguardando sua aprovação: ${tituloConteudo}`,
    html,
  })
}
