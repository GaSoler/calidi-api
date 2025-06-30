export async function sendOtpViaWhatsapp(phone: string, code: string) {
	// Simulação de envio
	console.log(`📲 Enviando OTP para ${phone}: Código = ${code}`);

	// Em produção, substitua este bloco com a chamada real da API
	await new Promise((resolve) => setTimeout(resolve, 500)); // simula atraso
}
