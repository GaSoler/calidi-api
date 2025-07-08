1. Autenticação (Login e Registro)

Base: /auth
POST /auth/register → Registrar um novo usuário (cliente) -> ok
POST /auth/send-otp → Envia código OTP para Whatsapp -> ok
POST /auth/verify-otp → Verifica código OTP que usuário digitou, estando ok lança token JWT e refreshToken como cookie -> ok
POST /auth/logout → Encerrar a sessão do usuário -> ok
POST /auth/refresh → Renovar token JWT -> ok

2. Usuários

Base: /users
GET /users → Listar todos os usuários (somente admin)
GET /users/me → Buscar detalhes do usuário logado
PUT /users/me → Atualizar perfil do usuário logado
PUT /users/{id} → Atualizar perfil de um usuário
DELETE /users/{id} → Deletar conta de um usuário

3. Barbeiros

Base: /barbers
GET /barbers → Listar todos os barbeiros
GET /barbers/{id} → Ver perfil de um barbeiro
PUT /barbers/{id} → Atualizar informações do barbeiro
GET /barbers/{id}/appointments → Listar agendamentos de um barbeiro

4. Serviços

Base: /services
GET /services → Listar todos os serviços disponíveis -> ok
GET /services/{id} → Buscar detalhes de um serviço -> ok
POST /services → Criar um novo serviço (somente admin) -> ok
PUT /services/{id} → Atualizar informações do serviço (somente admin) -> ok
DELETE /services/{id} → Excluir um serviço (somente admin)

5. Agendamentos

Base: /appointments
GET /appointments → Listar todos os agendamentos (admin)
POST /appointments → Criar um novo agendamento
GET /appointments/{id} → Buscar detalhes de um agendamento
PUT /appointments/{id} → Atualizar status do agendamento (ex: confirmado, cancelado)
DELETE /appointments/{id} → Cancelar um agendamento

6. Disponibilidade de Barbeiros

Base: /availability
GET /availability/{barber_id} → Listar horários disponíveis de um barbeiro
POST /availability/{barber_id} → Definir horários disponíveis (somente barbeiro/admin)
DELETE /availability/{barber_id}/{slot_id} → Remover um horário disponível

7. Dashboard (Admin e Barbeiro)

Base: /dashboard
GET /dashboard/admin → Resumo geral de agendamentos e faturamento (somente admin)
GET /dashboard/barber/{id} → Resumo de agendamentos do barbeiro

8. Perfil do Usuário

Base: /profile
GET /profile → Buscar perfil do usuário autenticado
PUT /profile → Atualizar perfil do usuário autenticado

9. Configurações do Sistema (Admin)

Base: /settings
GET /settings → Buscar configurações gerais
PUT /settings → Atualizar configurações gerais (somente admin)