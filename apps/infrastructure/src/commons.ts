
import * as pulumi from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';
import * as dotenv from 'dotenv';

dotenv.config();
export const config = new pulumi.Config();

export const appLabels = { app: 'datasnok' };

export const constants = {
  API_PORT: '3100',
  POSTGRES_PORT: '5432',
  NAMESPACE: 'datasnok'
};