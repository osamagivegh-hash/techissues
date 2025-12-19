$ErrorActionPreference = "Stop"
$AWS = "$env:APPDATA\Python\Python314\Scripts\aws.cmd"
$BUCKET_NAME = "techissues-frontend-44242414" 
$KEY_NAME = "techissues-key-44242414"
$SG_NAME = "techissues-sg-44242414"
$REGION = "us-east-1"

Write-Host "Fixing S3..."
& $AWS s3api put-public-access-block --bucket $BUCKET_NAME --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
Start-Sleep -Seconds 5
$POLICY = @"
{
    "Version": "2012-10-17",
    "Statement": [{ "Sid": "PublicReadGetObject", "Effect": "Allow", "Principal": "*", "Action": "s3:GetObject", "Resource": "arn:aws:s3:::$BUCKET_NAME/*" }]
}
"@
$POLICY | Out-File "s3_policy.json" -Encoding ASCII
& $AWS s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://s3_policy.json
Remove-Item "s3_policy.json"

$SG_ID = & $AWS ec2 describe-security-groups --group-names $SG_NAME --query 'SecurityGroups[0].GroupId' --output text

Write-Host "Launching EC2..."
$AMI_ID = "ami-080e1f13689e07408" # Ubuntu 22.04 us-east-1

$INSTANCE_ID = & $AWS ec2 run-instances --image-id $AMI_ID --count 1 --instance-type t2.micro --key-name $KEY_NAME --security-group-ids $SG_ID --query 'Instances[0].InstanceId' --output text

Write-Host "Waiting for Instance Running ($INSTANCE_ID)..."
& $AWS ec2 wait instance-running --instance-ids $INSTANCE_ID
$PUBLIC_IP = & $AWS ec2 describe-instances --instance-ids $INSTANCE_ID --query 'Reservations[0].Instances[0].PublicIpAddress' --output text

$CONFIG = @{
    BUCKET_NAME = $BUCKET_NAME
    INSTANCE_ID = $INSTANCE_ID
    PUBLIC_IP   = $PUBLIC_IP
    KEY_FILE    = "$KEY_NAME.pem"
    REGION      = $REGION
}
$CONFIG | ConvertTo-Json | Out-File "aws-config.json"
Write-Host "Infrastructure Fixed and Ready."
