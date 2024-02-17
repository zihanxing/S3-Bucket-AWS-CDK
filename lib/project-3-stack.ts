// import { Duration, Stack, StackProps } from 'aws-cdk-lib';
// import * as sns from 'aws-cdk-lib/aws-sns';
// import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
// import { Construct } from 'constructs';

// export class Project3Stack extends Stack {
//   constructor(scope: Construct, id: string, props?: StackProps) {
//     super(scope, id, props);

//     const queue = new sqs.Queue(this, 'Project3Queue', {
//       visibilityTimeout: Duration.seconds(300)
//     });

//     const topic = new sns.Topic(this, 'Project3Topic');

//     topic.addSubscription(new subs.SqsSubscription(queue));
//   }
// }


import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

// define a new class that extends cdk.Stack to create bucket
// with bucket ownership enforced and block public access
export class Project3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const s3Bucket = new s3.Bucket(this, 'exampleBucket', {
      // Define properties for the bucket
      // set the bucket ownership to bucket owner enforced
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      // block public access to the bucket
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      // set the encryption key for the bucket
      encryptionKey: new kms.Key(this, 's3BucketKMSKey'),
    });

    s3Bucket.grantRead(new iam.AccountRootPrincipal());
  }
}

const app = new cdk.App();
new Project3Stack(app, 'S3BucketStack');
app.synth();

