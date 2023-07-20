import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { SnsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
export class ZdfAwsNotificationsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const webhookurl = 'https://hooks.slack.com/services/xxx/xxx/xxx'

    const role = new iam.Role(
      this,
      'slack-lambda-role',
      {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        description: `Lambda role that sends slack notifications.`,
        managedPolicies: [
          cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
            'service-role/AWSLambdaBasicExecutionRole',
          ),
        ],
      },
    );

    const snsTopic = new cdk.aws_sns.Topic(this, 'notification-sns', {
      displayName: 'Notification Messages',
      topicName: 'notifications-to-channel',      
    })
    const slackLambda = new lambda.Function(this, 'slack-notification-lambda-function', {
      runtime: Runtime.PYTHON_3_9,
      handler: 'index.handler',
      description: `Lambda that sends a slack notification.`,
      role: role,
      architecture: Architecture.ARM_64,
      environment: {
        WEBHOOK_URL: webhookurl
      },
      code: lambda.Code.fromInline(`
import boto3
import os
import json
import urllib3
http = urllib3.PoolManager()
WEBHOOK_URL = os.getenv("WEBHOOK_URL")
client = boto3.client("cloudformation")


def send_message(message: str):
    slack_message = {
        'text': message
    }
    response = http.request('PUT', WEBHOOK_URL, body=json.dumps(slack_message))
    return response


def handler(event, context):
     message = event['Records'][0]['Sns']['Message']
     send_message(message)

`),
    });
    slackLambda.addEventSource(new SnsEventSource(snsTopic))
  }
}
