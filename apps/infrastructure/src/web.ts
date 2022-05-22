import * as k8s from '@pulumi/kubernetes';
import { constants } from './commons';

const webLabels = {
  name: 'datasnok-web',
};

export const webDeployment = new k8s.apps.v1.Deployment('datasnok-web', {
  metadata: {
    namespace: constants.NAMESPACE,
    labels: webLabels,
  },
  spec: {
    selector: { matchLabels: webLabels },
    replicas: 1,
    template: {
      metadata: {
        namespace: constants.NAMESPACE,
        labels: webLabels,
      },
      spec: {
        imagePullSecrets: [
          {
            name: 'datasnok-imagepullsecret',
          },
        ],
        containers: [
          {
            name: 'datasnok-web',
            image: 'datasnok/datasnok:web',
            imagePullPolicy: 'Always',
            ports: [
              {
                containerPort: 80,
                name: 'http',
              },
            ],
          },
        ],
      },
    },
  },
});

export const webService = new k8s.core.v1.Service('datasnok-web', {
  metadata: {
    namespace: constants.NAMESPACE,
    labels: webDeployment.metadata.labels,
  },
  spec: {
    type: 'ClusterIP',
    ports: [
      {
        port: 80,
        targetPort: 'http',
        name: 'http',
      },
    ],
    selector: webLabels,
  },
});

export const webIngress = new k8s.networking.v1.Ingress(
  'datasnok-web-ingress',
  {
    metadata: {
      annotations: {
        'cert-manager.io/cluster-issuer': 'letsencrypt-prod',
        'nginx.ingress.kubernetes.io/backend-protocol': 'HTTP',
      },
      namespace: constants.NAMESPACE,
      labels: webLabels,
    },
    spec: {
      rules: [
        {
          host: 'v3.datasnok.cool',
          http: {
            paths: [
              {
                backend: {
                  service: {
                    name: webService.metadata.name,
                    port: {
                      number: 80,
                    },
                  },
                },
                pathType: 'Prefix',
                path: '/',
              },
            ],
          },
        },
      ],
      tls: [
        {
          hosts: ['v3.datasnok.cool'],
          secretName: 'datasnok-web-ingress-cert',
        },
      ],
    },
  }
);
