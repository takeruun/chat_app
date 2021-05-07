output=`aws ecs describe-services --cluster chat-cluster --services chat-service | jq ".services[0].networkConfiguration"`

subnets=`echo $output | jq -r '.awsvpcConfiguration.subnets|join(",")'`
echo $subnets
securityGroups=`echo $output | jq -r '.awsvpcConfiguration.securityGroups|join(",")'`
echo $securityGroups
assignPublicIp=`echo $output | jq -r '.awsvpcConfiguration.assignPublicIp'`

aws ecs run-task \
  --cluster chat-cluster \
  --task-definition chat-task \
  --launch-type FARGATE \
  --overrides file://run_task_db_create.json \
  --network-configuration "awsvpcConfiguration={subnets=[${subnets}],securityGroups=[${securityGroups}],assignPublicIp=${assignPublicIp}}"