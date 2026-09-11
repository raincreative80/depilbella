# depilbella

Crie um site de agendamento profissional completo para o SPA **PelomenosMZ**. O objetivo é um produto “pronto para uso” (front-end + back-end + painel admin) que permita aos clientes reservar serviços de depilação e outros tratamentos, escolher local e profissional, e enviar o agendamento diretamente para o WhatsApp da secretária do local escolhido. O pagamento será presencial (no local). O site deve ser multilíngue (Português e Inglês) e responsivo (desktop e mobile). Design: moderno e luxuoso. Paleta de cores obrigatória: **Branco, Castanho-claro, Castanho-escuro, Creme**.

**Resumo do negócio**

* Nome: PelomenosMZ
* Slogan (usar no header e metatags): **“Pele suave, confiança renovada.”**
* Locais (cada local tem uma secretária distinta — as notificações de agendamento vão para o WhatsApp da secretária correspondente):

  1. Avenida Malhangalene — secretária WhatsApp: {{WHATSAPP_MALHANGALENE}} (substituir pelo número real)
  2. CMC, Próx. Ao Barição — secretária WhatsApp: {{WHATSAPP_CMC}}
  3. Matola, cruzamento da Mozal, N4 — secretária WhatsApp: {{WHATSAPP_MATOLA}}

**Serviços (exibir nome + descrição curta + duração estimada + preço quando aplicável)**

* Hollywood — 2500 MT
* Remoção de verrugas — preço por avaliação (mostrar “Preço sob avaliação”)
* Remoção de tatuagem — preço varia (mostrar “Preço sob avaliação”)
* Depilação a cera:

  * Axilas — 500 MT
  * Virilha completa — 700 MT
  * Abdomen — 500 MT
  * Peito — 400 MT
  * Costas — 500 MT
  * Braços — 750 MT
  * Meia Perna — 700 MT
  * Perna Inteira — 1000 MT
  * Queixo — 250 MT
  * Buço — 250 MT
* Outros:

  * Clareamento íntimo / Vajacial
  * Rejuvenescimento Vaginal
  * Limpeza de pele / Fototerapia
  * Lipocavitação
  * Lipolazer HD
  * Protocolo para Acne
    *(estes itens: mostrar como “Solicitar avaliação / preço sob consulta”)*

**Funcionalidades obrigatórias (UX / regras de negócio)**

1. Processo de agendamento:

   * Cliente escolhe idioma (pt/en) → escolhe local (manual ou por geolocalização sugerida) → escolhe serviço → escolhe profissional (opcional: “Qualquer profissional”) → escolha data e horário (mostrar horários disponíveis em tempo real) → preencher Nome, Telefone (obrigatório) e observações.
   * Pré-reserva sem pagamento. Ao finalizar, o sistema envia automaticamente uma mensagem ao WhatsApp da secretária do local escolhido contendo os detalhes do agendamento e link para abrir conversa com o cliente.
   * Ao agendar, gerar também um SMS/email opcional de confirmação (configurável).
2. WhatsApp:

   * Integração com **WhatsApp Business API** (ou Twilio/360dialog se for necessário). Mensagem automática deve conter: nome do cliente, serviço, data/hora, local, profissional escolhido e um link “Abrir conversa” diretamente com o número da secretária.
   * Template de mensagem (enviar como texto pronto para WhatsApp):

     ```
     Novo agendamento PelomenosMZ:
     Cliente: {NOME}
     Telefone: {TELEFONE}
     Serviço: {SERVIÇO}
     Local: {LOCAL}
     Profissional: {PROFISSIONAL}
     Data/Hora: {DATA_HORA}
     Observações: {OBS}
     ```
3. Google Maps:

   * Cada local deve ter botão “Ver no Google Maps” que abre a localização no Maps.
   * Na seleção de local, sugerir o local mais próximo com base na localização do usuário (opcional) mas permitir seleção manual.
4. Perfil de profissionais:

   * Cada profissional terá: foto, nome, especialidades, tempo médio por serviço, dias/horários de trabalho. (Reserve um slot para cada profissional — você definirá a contagem depois.)
5. Painel Admin (Back-end para o spa):

   * Login seguro (2 roles: Admin / Secretária do local).
   * Dashboard com métricas: atendimentos por dia/semana/mês/ano; serviço mais requisitado; profissional com mais agendamentos; taxa de conversão (visita → agendamento).
   * Calendário de agendamentos (filtrável por local/profissional/status).
   * Gerenciar serviços, profissinais, locais e horários (o dev pode editar serviços manualmente).
   * Exportar agendamentos para CSV / Excel.
   * Histórico e status dos agendamentos (Confirmado / Pendente / Cancelado / Concluído).
   * Envio automático de notificações (WhatsApp) para secretárias ao novo agendamento.
6. Relacionamento com o cliente:

   * Pós-agendamento: opção para enviar lembrete automático via WhatsApp 24h antes (configurável).
   * Área de avaliações: cliente pode avaliar após atendimento (estrelas + comentário). As avaliações aparecem no admin e, se aprovado, na página pública.
7. SEO & Conteúdo:

   * Subpágina “Dicas de beleza” (blog) com templates de artigos otimizados (pt/en). Links para Instagram e TikTok.
   * Meta tags dinâmicas por página, sitemap, robots.txt.
8. Multilinguismo:

   * Todas as interfaces (públicas e admin) disponíveis em Português e Inglês. Arquitetura i18n (por exemplo, JSON para cada idioma).
9. Acessibilidade & Performance:

   * WCAG básico (contraste, labels, navegação por teclado).
   * Padrões de performance (carregamento rápido, imagens otimizadas, lazy-load).
10. Segurança & Privacidade:

    * Proteção de dados (GDPR-like / local). Página de Política de Privacidade e Termos. Back-end com autenticação JWT/HTTPS.
11. Integrações / Hosting (sugestões técnicas):

    * Front-end: React (Next.js) com SSR/SSG para SEO ou similar; TailwindCSS (estética luxuosa).
    * Back-end: Node.js (NestJS ou Express) ou Laravel (PHP) — API REST/GraphQL.
    * Banco de dados: PostgreSQL (agendamentos, clientes, serviços, profissionais).
    * Deploy: Vercel (front) / Render / DigitalOcean / Railway (back). Dockerize para produção.
    * WhatsApp: WhatsApp Business API / Twilio / 360dialog (especifique no setup).
    * Autenticação: Auth0 / NextAuth / JWT.
    * Analytics: Google Analytics + Google Search Console.
12. Painel de configuração:

    * Permitir configurar: números de WhatsApp por local, templates de mensagem, dias e horários de cada profissional, tempo por serviço, políticas de cancelamento, e lembretes.
13. UX/UI Design:

    * Design automático pela IA com look “moderno + luxuoso”. Usar paleta: Branco (fundo principal), Castanho-claro (destaques/ícones), Castanho-escuro (headers / texto principal), Creme (cards / fundos secundários).
    * Tipografia elegante, imagens de alta qualidade (opcional: placeholders), botões claros para CTA (“Agendar Agora”, “Ver horários”, “Falar no WhatsApp”).
    * Mobile first: garante que o fluxo de agendamento seja simples e rápido no telemóvel.
14. Testes & QA:

    * Testes de fluxo de agendamento (incl. notificações WhatsApp), testes de carga básicos, testes de internacionalização.
15. Documentação & Entrega:

    * Gerar README com instruções para: configurar números WhatsApp, variáveis de ambiente, deploy, como adicionar/editar serviços e profissionais.
    * Incluir instruções para trocar logo e domínio.
16. Dados & Modelagem (sugestão simplificada de entidades):

    * Service { id, name, description, price, duration_min, price_type (fixed/consulta) }
    * Location { id, name, address, lat, lng, whatsapp_number, secretary_name }
    * Professional { id, name, photo, specialties[], schedule[], location_id }
    * Appointment { id, client_name, client_phone, service_id, professional_id, location_id, datetime, status, notes, created_at }
    * UserAdmin { id, name, email, role, password_hash, location_id (if secretary) }
17. Templates de mensagens (WhatsApp):

    * Novo agendamento (para secretária): ver seção “WhatsApp” acima.
    * Confirmação ao cliente (opcional):

      ```
      Obrigada, {NOME}! Seu agendamento PelomenosMZ foi recebido:
      Serviço: {SERVIÇO}
      Local: {LOCAL}
      Data/Hora: {DATA_HORA}
      Chegue 10 minutos antes. Pagamento no local.
      ```
18. Requisitos especiais:

    * Agendamento deve cair no WhatsApp correto com informações completas. Se a secretária não responder em X minutos, enviar notificação por email para admin (configurável).
    * Arquitetura preparada para adicionar canais de pagamento online futuramente (mas por ora: pagamento presencial).
19. Entregáveis esperados:

    * Repositório Git com front-end, back-end e scripts Docker.
    * Documentação de setup.
    * Painel admin funcional com dashboards e relatórios.
    * Testes básicos de fluxo.

**Observações finais para a IA / desenvolvedor**

* Use placeholders para números e logos que o cliente substituirá depois.
* Garanta que todo texto esteja pronto para tradução (i18n).
* Forneça instruções claras para substituir os números de WhatsApp das secretárias: {{WHATSAPP_MALHANGALENE}}, {{WHATSAPP_CMC}}, {{WHATSAPP_MATOLA}}.
* Priorize entrega de um MVP que permita agendamentos e envio para WhatsApp no primeiro deploy; extras (export, relatórios avançados) podem ser entregues em sprints subsequentes.


🕒 FUNCIONAMENTO

-Dias abertos: Segunda-feira a Sábado
-Encerrado: Domingo
-Horário: das 08h30 às 19h00
-Tempo médio de cada serviço: 47 minutos

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://depilbella.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1aa5854c-6b66-4a67-89e2-10bc0733501a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
