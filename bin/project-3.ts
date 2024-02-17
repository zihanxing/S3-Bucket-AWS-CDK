#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Project3Stack } from '../lib/project-3-stack';

const app = new cdk.App();
new Project3Stack(app, 'Project3Stack');
