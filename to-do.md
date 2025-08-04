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

## Autenticação
**Base:** `/auth`

- [X] `POST /auth/register` – Registrar um novo usuário (cliente)
- [X] `POST /auth/send-otp` – Enviar código OTP para o WhatsApp
- [X] `POST /auth/verify-otp` – Verificar código OTP e gerar JWT + refreshToken via cookie
- [X] `POST /auth/refresh` – Renovar o token JWT
- [X] `POST /auth/logout` – Encerrar a sessão do usuário

## Usuários
**Base:** `/users`

- [X] `GET /users` – Listar todos os usuarios (CUSTOMER)
- [X] `GET /user/:id` – Listar usuário específico (cliente)
- [X] `POST /users` – Criar novo usuário via admin
- [X] `PATCH /users/:id` – Alterar informações do cliente
- [X] `DELETE /users/:id` – Deletar usuário
- [X] `GET /users/me` – Retornar informações do usuário logado
- [X] `PATCH /users/me` – Alterar informações do usuário logado

## Barbeiros
**Base:** `/barber`

- [ ] `GET /barbers` – Listar todos os usuarios (barbeiros)
- [ ] `GET /barbers/:id` – Listar usuário específico (barbeiro)
- [ ] `POST /barbers` – Criar novo barbeiro via admin
- [ ] `PATCH /barbers/:id` – Alterar informações do barbeiro
- [ ] `DELETE /barbers/:id` – Deletar barbeiro

## Disponibilidade
**Base:** `/barber-availability`

- [ ] `GET /barbers` – Listar todos os usuarios (barbeiros)
- [ ] `GET /barbers/:id` – Listar usuário específico (barbeiro)
- [ ] `POST /barbers` – Criar novo barbeiro via admin
- [ ] `PATCH /barbers/:id` – Alterar informações do barbeiro
- [ ] `DELETE /barbers/:id` – Deletar barbeiro

## Serviços
**Base:** `/barber-availability`

- [X] `GET /services` – Listar todos os serviços
- [X] `GET /services/:id` – Listar serviço específico
- [X] `POST /services` – Criar novo serviço
- [X] `PATCH /services/:id` – Alterar informações do serviço
- [X] `DELETE /services/:id` – Deletar serviço
Obs: Adicionar opção de status?? (Active / Inactive)

## Categoria Serviços
**Base:** `/category-service`

- [ ] `GET /services` – Listar todos os serviços
- [ ] `GET /services/:id` – Listar serviço específico
- [ ] `POST /services` – Criar novo serviço
- [ ] `PATCH /services/:id` – Alterar informações do serviço
- [ ] `DELETE /services/:id` – Deletar serviço





## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;





CUSTOMER
  - ListAvailableServicesUseCase - OK
  - ListAvailableBarbersUseCase - OK
  - ListAvailableTimesUseCase - OK
  - CreateAppointmentUseCase - OK
  - ListAppointmentsUseCase - OK
  - CancelAppointmentUseCase - OK
  - RescheduleAppointmentUseCase - OK
  - GetAppointmentDetailsUseCase - OK
  - GetNextAppointmentDetails - OK


BARBER
  - ListMyAppointmentsUseCase
  - ConfirmAppointmentUseCase
  - FinishAppointmentUseCase
  - CancelAppointmentUseCase (barber perspective)
  - BlockScheduleUseCase

ADMIN
  - CreateUserUseCase
  - EditUserUseCase
  - DeleteUserUseCase
  - ListUsersByRoleUseCase
  - CreateServiceUseCase
  - EditServiceUseCase
  - DeleteServiceUseCase
  - ListAllAppointmentsUseCase
  - GenerateReportUseCase
  - CreateAppointmentForCustomerUseCase






