# App

Schedule appointment barber app

## Padrão de Resposta REST

### Sucesso (2xx)
```json
{
  "data": {
    "user": {
      "id": 123,
      "name": "Teste"
    }
  }
  "error": null
}
```

### Erro (4xx, 5xx)
```json
{
  "data": null
  "error": {
    "message": "Service not found",
    "code": "SERVICE_NOT_FOUND",
    "status": 404,
    "details": null  
  }
}
```

## Endpoints Necessários

## 🔐 Autenticação
**Base:** `/auth`

- [ ] `POST /auth/register` – Registrar um novo usuário (cliente)
- [ ] `POST /auth/send-otp` – Enviar código OTP para o WhatsApp
- [ ] `POST /auth/verify-otp` – Verificar código OTP e gerar JWT + refreshToken via cookie
- [ ] `POST /auth/logout` – Encerrar a sessão do usuário
- [ ] `POST /auth/refresh` – Renovar o token JWT


## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;






















