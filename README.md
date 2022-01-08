# plantrDeployment

Slides presentation describing the architechture and how to apply (Dutch): https://docs.google.com/presentation/d/13NRcB_Zepy0HTVz7P_y4kztPtZJSCOFrOVckAs5vyPA/edit?usp=sharing
Architecture document: https://docs.google.com/document/d/1fQocwp75kKGl_7NZ_Xa818kJ4ql2lprKcRWqUFRhGGQ/edit?usp=sharing
# Apply sequence fresh cluster

##  Namespaces:
Kubectl apply -f Namespaces/namespace.yaml
(all context applied on plantr, to switch in kubectl get all> kubectl config set-context --current --camespace=plantr)

##  PVC and storageclass
Kubectl apply -f Storage/database-storage.yml
Kubectl apply -f Storage/kafka-storage.yml

##  MSSQL database 
Kubectl apply -f Database/mssql-deployment.yaml

##  Kafka and Zookeeper
Kubectl apply -f rabbitMQ/kafka.yml
Kubectl apply -f rabbitMQ/zookeeper.yml

##  Microservices service
Kubectl apply -f Services/Micro/auth-service.yaml
Kubectl apply -f Services/Micro/profile-service.yaml

##  Gateway
Kubectl apply -f Services/gateway-service.yml

##  Frontend 
Kubectl apply -f Services/plantr-frontend-service.yaml

##  Secrets
(!IMPORTANT!) Change the ip's within the yml to the ones assigned from the cluster, see slides (!IMPORTANT!)
Kubectl apply -f Secrets/Secrets.yml
After this step, delete the pods of the gateway, mssql, authservice and profileservice to apply these overrides

# Testing

## Auth service
Endpoint: Register
POST http://{IP of auth service}/api/User
Model:
{
  "userId": 0,
  "userName": "miguelsoto",
  "email": "string",
  "password": "johnnyiscool",
  "admin": true
}
Expected result: 200OK

Endpoint: Login
POST http://{IP of auth service}/api/Authentication
Model:
{
  "userId": 0,
  "userName": "miguelsoto",
  "email": "string",
  "password": "johnnyiscool",
  "admin": true
}
Expected result: 200OK + JWTtoken in body

## Gateway
Endpoint: Register
POST http://{IP of gateway}/register
Model:
{
  "userId": 0,
  "userName": "miguelsoto",
  "email": "string",
  "password": "johnnyiscool",
  "admin": true
}
Expected result: 200OK

Endpoint: Login
POST http://{IP of gateway}/login
Model:
{
  "userId": 0,
  "userName": "miguelsoto",
  "email": "string",
  "password": "johnnyiscool",
  "admin": true
}
Expected result: 200OK + JWTtoken in body

##  Kafka
Expect new record in DB profile after running register, check with Azure Data Studio

##  load testing pod autoscalers
using k6 CLI > k6Scripts/script.js > k6 run --vus 1000 --iterations 10000 script.js (do not forget to add the correct ip of the auth or gateway service)

# repositories used within the cluster
##  Frontend:
https://github.com/unlegendnl/PlantrFrontendComponent 
##  Gateway:
https://github.com/unlegendnl/plantrGateway 
##  Microservices: 
https://github.com/unlegendnl/PlantrBackendComponent 
https://github.com/unlegendnl/PlantrBackendComponentProfile

