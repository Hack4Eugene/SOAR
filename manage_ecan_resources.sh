#! /bin/bash
echo;echo;echo;
###############

PROFILE=$AWS_PROFILE

if [[ -z $PROFILE ]]; then 
	echo 'ERR INVALID PROFILE'; echo
	echo 'Set AWS_PROFILE while running script - AWS_PROFILE=xxxxxx manage_ecan_resources.sh or'
	echo 'Set AWS_PROFILE globally - export AWS_PROFILE=xxxxx'
	exit -1; 
fi

echo 'Welcome' $PROFILE; echo
echo '###################'; echo

echo 'Current State of ECAN resources'; echo
echo '###################'; echo
aws ec2 describe-instances \
--filter 'Name=tag:Name,Values=["ECAN_SERVICE", "ECAN_DB"]' \
--query "Reservations[*].Instances[0].{ Name: Tags[?Key=='Name'].Value, ID: InstanceId, State: State.Name, Security_Groups:SecurityGroups, network: { dns: PublicDnsName, ip: PublicIpAddress } }" \
--output json \
--profile $PROFILE;

echo;echo;echo;
###############

COMMAND=''

PS3='Please enter your choice (option number): '
options=("Start Instances" "Stop Instances" "Quit - I just wanted instance state")
while [[ -z $COMMAND ]]; do
	select opt in "${options[@]}"
	do
		echo 'You chose:' $opt
	    case $opt in
	        "Start Instances")
				COMMAND='aws ec2 start-instances --instance-ids i-01ef9fe5ca2de86f8 i-0a17afa5e6458757b --profile $PROFILE --output json'
	            break;
	            ;;
	        "Stop Instances")
				COMMAND='aws ec2 stop-instances --instance-ids i-01ef9fe5ca2de86f8 i-0a17afa5e6458757b --profile $PROFILE --output json'
	            break;
	            ;;
	        "Quit - I just wanted instance state")
	            break
	            ;;
	        *) echo invalid option;
	    esac
	done
done

echo running: $COMMAND
eval $COMMAND
