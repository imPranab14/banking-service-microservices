@echo off

wt ^
  new-tab --title "API-GATEWAY" cmd /k "cd /d D:\Project\Git_Backend\banking-service-microservices\api-gateway && npm run start" ^
  ; new-tab --title "AUTH-SERVICE" cmd /k "cd /d D:\Project\Git_Backend\banking-service-microservices\auth-service && npm run start" ^
  ; new-tab --title "ACCOUNT-SERVICE" cmd /k "cd /d D:\Project\Git_Backend\banking-service-microservices\account-service && npm run start" ^
  ; new-tab --title "TRANSACTION-SERVICE" cmd /k "cd /d D:\Project\Git_Backend\banking-service-microservices\transaction-service && npm run start"
