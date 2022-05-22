# Infastructure

Requires: 
- A Kubernetes install available over internet
- cert-manager installed

## Setting up Kubernetes on Ubuntu with MicroK8s

1. Install [MicroK8s](https://microk8s.io/)
```sh
sudo snap install microk8s --classic
microk8s status --wait-ready
microk8s enable dashboard dns ingress rbac
```

2. Install [cert-manager](https://cert-manager.io/docs/installation/)
```sh
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.8.0/cert-manager.yaml
```

## Setting up cluster resources
1. Set up the Let's Encrypt ClusterIssuer
```sh
kubectl apply -f letsencrypt-prod.yaml
```

2. Set up Ingress for the API server
```sh
kubectl apply -f kube-apiserver-ingress.yaml
```

3. Set up base resources (namespace and ServiceAccount)
```sh
kubectl apply -f setup-resources.yaml
```

4. Retrieve the Service Account Token for the created account
```sh
kubectl describe secret <secret-name> -n <namespace-name>
```

The token has full access to the created namespace, and can be used for CI/CD pipelines.