src/domain/use-cases
 use-cases/
  customers/
    - ListAvailableServicesUseCase
    - ListAvailableBarbersUseCase
    - ListAvailableTimesUseCase
    - CreateAppointmentUseCase
    - GetAppointmentDetailsUseCase
    - RescheduleAppointmentUseCase
    - ListCancelReasonsUseCase
    - CancelAppointmentUseCase
    - ListAppointmentsUseCase

  barbers/
    - ListMyAppointmentsUseCase
    - ConfirmAppointmentUseCase
    - FinishAppointmentUseCase
    - CancelAppointmentUseCase (barber perspective)
    - BlockScheduleUseCase

  admins/
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

src/http/controllers
 controllers/
  customers/
    - appointments.controller.ts
    - profile.controller.ts
    - services.controller.ts

  barbers/
    - appointments.controller.ts
    - schedule.controller.ts

  admins/
    - users.controller.ts
    - services.controller.ts
    - reports.controller.ts
    - appointments.controller.ts

src/repositories
 repositories/
  appointments/
    - appointments-repository.ts
    - prisma-appointments-repository.ts

  services/
    - services-repository.ts

  users/
    - users-repository.ts

  barbers/
    - barber-availability-repository.ts

  schedule-blocks/
    - schedule-blocks-repository.ts


📁 src
├── 📁 domain
│   ├── 📁 use-cases
│   │   ├── 📁 auth               ← Login, validar código, refresh token, etc.
│   │   ├── 📁 customers          ← Agendamentos feitos pelo cliente
│   │   ├── 📁 barbers            ← Agenda do barbeiro, aceitar/cancelar agendamentos
│   │   ├── 📁 admins             ← Gestão geral: usuários, serviços, etc.
│   │   └── 📁 shared             ← Casos de uso compartilhados entre roles (ex: listar serviços)
│
├── 📁 infra
│   └── 📁 http
│       ├── 📁 controllers
│       │   ├── 📁 auth
│       │   ├── 📁 customers
│       │   ├── 📁 barbers
│       │   ├── 📁 admins
│       │   └── 📁 shared
Cada pasta lida com os casos de uso que aquela role pode acionar. A pasta shared entra para cobrir os pontos de intersecção — por exemplo:

ListServicesUseCase

ListBarbersUseCase

Esses são úteis para customer, admin e talvez até barber, então ficariam em shared.

E claro, a pasta auth cuida de:

AuthenticateWithCodeUseCase

LoginWithUsernameUseCase

RefreshTokenUseCase

LogoutUseCase (se for necessário)

Se quiser, posso te ajudar agora a mapear os casos de uso de autenticação também.

✅ Como pode ficar a divisão:
📁 auth/
Responsável exclusivamente por autenticação/autorização:

AuthenticateWithCodeUseCase

LoginWithUsernameUseCase

GenerateTokenUseCase (ou RefreshTokenUseCase)

LogoutUseCase (se houver)

Talvez VerifyTokenUseCase se precisar validar token direto

📁 shared/
Aqui você coloca ações comuns a qualquer usuário autenticado, como:

GetProfileUseCase

UpdateProfileUseCase

ListAvailableServicesUseCase

ListBarbersUseCase

GetBarberDetailsUseCase

GetCustomerDetailsUseCase (pode ser útil pra admin ou para o próprio customer)

GetAvailabilityForBarberUseCase

⚠️ Por que isso é uma boa ideia?
Clareza de acesso: você sabe exatamente o que está liberado para qualquer usuário autenticado.

Organização por contexto de uso, e não por modelo do banco (como user, service etc).

Facilidade de manutenção: se no futuro mudar a lógica de perfil, você sabe que está isolada em shared.

✅ Como fazer isso da forma limpa:
📁 shared/use-cases/ListBarbersUseCase.ts
Único use case centralizado.

Responsável apenas pela lógica: consulta no repositório e retorna o resultado.

📁 admin/controllers/barbers/list.ts
Usa ListBarbersUseCase internamente.

Pode adicionar regras específicas de permissão ou filtros extras, se necessário.

📁 customer/controllers/barbers/list.ts
Usa o mesmo ListBarbersUseCase.

Se o comportamento for idêntico ao do admin, é só importar e usar igual.

