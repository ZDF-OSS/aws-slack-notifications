# AWS CDK Slack Messenger Example

This GitHub repository contains an AWS CDK example application that provisions AWS resources, including an SNS topic and a Lambda function, following AWS best practices. The app serves as a Slack messenger, where messages published to the SNS topic trigger the Lambda function, populating the Slack channel with the message content.

## Prerequisites

Before you get started, make sure you have the following prerequisites set up:

1. AWS CLI: Ensure you have the AWS Command Line Interface installed and configured with the necessary credentials.

2. AWS CDK: Install the AWS Cloud Development Kit (CDK) using the following command:

   ```
   npm install -g aws-cdk
   ```

3. Slack Webhook: You will need to configure a Slack webhook before deploying the application. Set up the webhook in the `lib/zdf_aws-notifications-stack.ts` file.

## Getting Started

Follow the steps below to deploy and run the Slack Messenger application:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/aws-cdk-slack-messenger.git
   cd aws-cdk-slack-messenger
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Configure the Slack webhook:

   Open the `lib/zdf_aws-notifications-stack.ts` file and replace `<SLACK_WEBHOOK_URL>` with the actual Slack webhook URL provided by your Slack workspace.

4. Deploy the application:

   ```
   cdk deploy
   ```

   The CDK will deploy the necessary AWS resources based on the configuration specified in the `lib/zdf_aws-notifications-stack.ts` file.

5. Test the Slack Messenger:

   Publish a message to the SNS topic created by the CDK stack. This message will trigger the Lambda function, and the message content will be sent to the Slack channel using the configured webhook.

## Clean Up

To avoid incurring unnecessary AWS costs, you can remove the deployed resources after testing the Slack Messenger:

```
cdk destroy
```

This will delete all the AWS resources provisioned by the CDK stack.

## Contributing

We welcome contributions to improve this example application. If you encounter any issues or have suggestions for enhancements, please feel free to create an issue or submit a pull request.

## License

This AWS CDK Slack Messenger example is open-source and distributed under the [MIT License](LICENSE). Feel free to use, modify, and share it as per the terms of the license.

## Acknowledgments

This example application follows AWS best practices for provisioning resources and integrating with Slack. It was inspired by real-world use cases and various AWS and CDK documentation and examples. Special thanks to the AWS CDK and Slack developer communities for their valuable contributions.
