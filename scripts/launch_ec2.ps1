$ErrorActionPreference = "Stop"
$AWS = "$env:APPDATA\Python\Python314\Scripts\aws.cmd"
$KEY_NAME = "techissues-key-44242414"
$SG_NAME = "techissues-sg-44242414"
$REGION = "us-east-1"
$BUCKET_NAME = "techissues-frontend-44242414"

$SG_ID = & $AWS ec2 describe-security-groups --group-names $SG_NAME --query 'SecurityGroups[0].GroupId' --output text

# Fetch AMI dynamically again
$AMI_ID = & $AWS ec2 describe-images --owners 099720109477 --filters "Name=name,Values=ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*" --query 'SortBy(Images, &CreationDate)[-1].ImageId' --output text

Write-Host "Using AMI: $AMI_ID"

$INSTANCE_ID = & $AWS ec2 run-instances --image-id $AMI_ID --count 1 --instance-type t2.micro --key-name $KEY_NAME --security-group-ids $SG_ID --query 'Instances[0].InstanceId' --output text

Write-Host "Instance: $INSTANCE_ID"
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
Write-Host "EC2 Launched."
