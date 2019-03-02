from __future__ import print_function

import boto3
import io
from PIL import Image

print('Loading function :: AnalysisFaces-Face-Recognition-Service')

dynamodb = boto3.client('dynamodb')
s3 = boto3.resource('s3')
rekognition = boto3.client('rekognition')

def lambda_handler(event, context):
    
    # Get the object from the event
    bucket_mame = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    try:
        # TODO: write code...
        print('Analysis bucketName', bucketName)
        print('Analysis fileKey', fileKey)
    
        object = s3.Object(Bucket=bucketName, Key=fileKey)

        print('Analysis object', object)
        
        object.download_file("/tmp/analysis.jpg")
        
        image = Image.open("/tmp/analysis.jpg")
        
        print('Analysis image', image)
    except Exception as e:
        print(e)
        print("Error processing {} from bucket {}. ".format(fileKey, bucketName)) 
        raise e
      
    

    # stream = io.BytesIO()
    # object.download_fileobj(stream)

    # image.save(stream,format="JPEG")
    # image_binary = stream.getvalue()

"""
    response = rekognition.search_faces_by_image(
        CollectionId='twofacerekognition',
        Image={'Bytes':image_binary}                                       
    )
        
    for match in response['FaceMatches']:
        print (match['Face']['FaceId'],match['Face']['Confidence'])
            
        face = dynamodb.get_item(
            TableName='twofacedynamodb',  
            Key={'RekognitionId': {'S': match['Face']['FaceId']}}
            )
        
        if 'Item' in face:
            print (face['Item']['FullName']['S'])
        else:
            print ('no match found in person lookup')
    
    def lambda_handler(event, context):
        # TODO implement
        return {
            'statusCode': 200,
            'body': json.dumps('Hello from Lambda!')
        }
"""