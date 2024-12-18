import json
import boto3
from botocore.exceptions import ClientError
from decimal import Decimal
from boto3.dynamodb.conditions import Key

#DynamoDB
dynamodb = boto3.resource('dynamodb')
dynamodb_table = dynamodb.Table('SantaDynamoDB') #name of the dynamodb table


status_check_path = '/status'
SantaLetter_path = '/SantaLetter'

def lambda_handler(event, context):
    print('Request event: ', event)
    response = None

    #logic setup of which path to take
    try:
        http_method = event.get('httpMethod')
        path = event.get('path')

        #check SantaLetter website status

        #get SantaLetter
        if http_method == 'GET' and path == SantaLetter_path:
            Letter_id = event['queryStringParameters']['Letter_ID']
            response = get_SantaLetter(Letter_id)
        #post SantaLetter
        elif http_method == 'POST' and path == SantaLetter_path:
            response = save_SantaLetter(json.loads(event['body']))
        elif http_method == 'GET' and path == status_check_path:
            response = get_all()
        elif http_method == 'DELETE' and path == SantaLetter_path:
            Letter_id = event['queryStringParameters']['Letter_ID']
            response = delete_letter(Letter_id)
        else:
            response = build_response(404, f'404 Santa Not Found, {http_method}, {path}')

    except Exception as e:
        print('Error:', e)
        response = build_response(400, f'Error Santa didnt receive the letter: {e}')

    return response



#call a SantaLetter
def get_SantaLetter(SantaLetter_id):
    try:
        # Query the table by partition key (Letter_ID)
        response = dynamodb_table.query(
            KeyConditionExpression=Key('Letter_ID').eq(SantaLetter_id)
        )

        # Check if any items are returned
        if 'Items' in response and response['Items']:
            return build_response(200, response['Items'])  # Return the list of matching items
        else:
            return build_response(404, f'No letters found with Letter_ID {SantaLetter_id}')
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])

def delete_letter(Letter_id):
    try:
        # Query to check if the letter exists by Letter_ID
        response = dynamodb_table.query(
            KeyConditionExpression=Key('Letter_ID').eq(Letter_id)
        )

        # Ensure the response contains items and at least one item is found
        if "Items" in response and response['Items']:
            # Get the DATE_STAMP from the first item in the response
            letter = response['Items'][0]  # Assuming 'Letter_ID' is unique
            date_stamp = letter['DATE_STAMP']  # Use the correct sort key here

            # Delete the item using both Letter_ID and DATE_STAMP
            delete_response = dynamodb_table.delete_item(
                Key={
                    'Letter_ID': Letter_id,
                    'DATE_STAMP': date_stamp  # Correct sort key from the response
                }
            )

            # If the delete response is successful, it will not contain any error, so we return success.
            return build_response(200, {'Operation': 'DELETE', 'Message': 'SUCCESS'})

        else:
            # If no items found, return a 404 error response
            return build_response(404, f'Letter with Letter_ID {Letter_id} not found for deletion')

    except ClientError as e:
        # If there was an exception with DynamoDB, return an error response
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])

    except ClientError as e:
        # If there was an exception with DynamoDB, return an error response
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])


#save a SantaLetter
def save_SantaLetter(request_body):
    try:
        dynamodb_table.put_item(Item=request_body)
        body = {
            'Operation': 'SAVE',
            'Message': 'SUCCESS',
            'Item': request_body
        }
        return build_response(200, body)
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])


#Get all letters
def get_all():
    try:
        response = dynamodb_table.scan()
        body = {
            'Operation': 'SAVE',
            'Message': 'SUCCESS',
            'Item': response
        }
        return build_response(200, body)
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])

#count total number of letters in DynamoDB
# Perform the scan operation on the DynamoDB table

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            # Check if it's an int or a float
            if obj % 1 == 0:
                return int(obj)
            else:
                return float(obj)
        # Let the base class default method raise the TypeError
        return super(DecimalEncoder, self).default(obj)

def build_response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',  # Allows all origins, change to a specific domain if needed
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',  # Allow these methods
            'Access-Control-Allow-Headers': 'Content-Type',  # Allow headers like Content-Type
        },
        'body': json.dumps(body, cls=DecimalEncoder)
    }
