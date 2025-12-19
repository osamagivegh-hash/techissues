$ErrorActionPreference = "Stop"

$AWS = "$env:APPDATA\Python\Python314\Scripts\aws.cmd"
if (-not (Test-Path $AWS)) {
    Write-Error "AWS CLI not found at $AWS"
    exit 1
}
# AWS Credentials - SET THESE AS ENVIRONMENT VARIABLES BEFORE RUNNING
# Do NOT commit actual credentials to version control
$ACCESS_KEY = $env:AWS_ACCESS_KEY_ID
$SECRET_KEY = $env:AWS_SECRET_ACCESS_KEY
$REGION = "us-east-1"

if (-not $ACCESS_KEY -or -not $SECRET_KEY) {
    Write-Error "AWS credentials not set. Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables."
    exit 1
}

Write-Host "Configuring AWS CLI..."
& $AWS configure set aws_access_key_id $ACCESS_KEY
& $AWS configure set aws_secret_access_key $SECRET_KEY
& $AWS configure set default.region $REGION

# S3 Bucket
$RANDOM_ID = Get-Random
$BUCKET_NAME = "techissues-frontend-$RANDOM_ID"
Write-Host "Creating S3 Bucket: $BUCKET_NAME"
& $AWS s3 mb "s3://$BUCKET_NAME"
& $AWS s3 website "s3://$BUCKET_NAME" --index-document index.html --error-document 404.html

# Policy
$POLICY = @"
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
"@
$POLICY | Out-File "s3_policy.json" -Encoding ASCII
# Disable Block Public Access
& $AWS s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://s3_policy.json # Might fail if Block Public Access is on by default
# So we run put-public-access-block first
& $AWS s3api put-public-access-block --bucket $BUCKET_NAME --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
Start-Sleep -Seconds 2 # Wait for propagation
& $AWS s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://s3_policy.json
Remove-Item "s3_policy.json"

# EC2
Write-Host "Creating EC2 Instance..."
$KEY_NAME = "techissues-key-$RANDOM_ID"
# Create Key Pair and save securely
$KEY_CONTENT = & $AWS ec2 create-key-pair --key-name $KEY_NAME --query 'KeyMaterial' --output text
$KEY_CONTENT | Set-Content -Path "$KEY_NAME.pem" -Encoding Ascii

$SG_NAME = "techissues-sg-$RANDOM_ID"
$SG_ID = & $AWS ec2 create-security-group --group-name $SG_NAME --description "Techissues App SG" --query 'GroupId' --output text
& $AWS ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 22 --cidr 0.0.0.0/0
& $AWS ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 80 --cidr 0.0.0.0/0
& $AWS ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 443 --cidr 0.0.0.0/0
& $AWS ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 4000 --cidr 0.0.0.0/0

$AMI_ID = & $AWS ec2 describe-images --owners 099720109477 --filters "Name=name,Values=ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*" --query 'SortBy(Images, &CreationDate)[-1].ImageId' --output text

$INSTANCE_ID = & $AWS ec2 run-instances --image-id $AMI_ID --count 1 --instance-type t2.micro --key-name $KEY_NAME --security-group-ids $SG_ID --query 'Instances[0].InstanceId' --output text

Write-Host "Waiting for Instance Running ($INSTANCE_ID)..."
& $AWS ec2 wait instance-running --instance-ids $INSTANCE_ID
$PUBLIC_IP = & $AWS ec2 describe-instances --instance-ids $INSTANCE_ID --query 'Reservations[0].Instances[0].PublicIpAddress' --output text

$CONFIG = @{
    BUCKET_NAME = $BUCKET_NAME
    INSTANCE_ID = $INSTANCE_ID
    PUBLIC_IP = $PUBLIC_IP
    KEY_FILE = "$KEY_NAME.pem"
    REGION = $REGION
}
$CONFIG | ConvertTo-Json | Out-File "aws-config.json"
Write-Host "Infrastructure Ready. Config saved to aws-config.json"
