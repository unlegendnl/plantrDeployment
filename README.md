# plantrDeployment

Slides presentation describing the architechture and how to apply (Dutch): https://docs.google.com/presentation/d/13NRcB_Zepy0HTVz7P_y4kztPtZJSCOFrOVckAs5vyPA/edit?usp=sharing

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
