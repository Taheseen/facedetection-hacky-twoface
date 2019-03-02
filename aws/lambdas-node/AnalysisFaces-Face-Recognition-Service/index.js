'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const rekognition = new AWS.Rekognition()

console.log('Loading function :: AnalysisFaces-Face-Recognition-Service');

exports.lambda_handler = (event, context, callback) => {
    try {
        const base64 = event.base64;

        const buffer = Buffer.from(base64, 'base64');
        
        rekognizeFacesByImage(buffer).then((data) => {
            const faceMatches = data["FaceMatches"];

            if (faceMatches.length > 0) {
                for (let i= 0; i < faceMatches.length; i++) {
                    let match = faceMatches[i];
                    let faceId = match['Face']['FaceId'];
                    
                    dynamodbGetItem(faceId).then((data) => {
                        if (data.Item) {
                            const fullName = data['Item']['FullName']['S'];
                            console.log("person found ::", fullName);
                            callback(null, fullName);
                        } else {
                            console.log("no match found in person lookup");
                            callback(null, "no match found");
                        }
                    }).catch((error) => {
                        console.error("dynamodbGetItem :: error ::", error);
                        callback(error, null);
                    });
                }
            } else {
                console.log("no match found in face rekognize");
                callback(null, "no match found");
            }
        }).catch((error) => {
            console.error("rekognizeFacesByImage :: error ::", error);
            callback(error, null);
        });
    } catch(error) {
        console.error("AnalysisFaces-Face-Recognition-Service :: lambda_handler :: error ::", error);
        callback(error, null);
    }
}

function rekognizeFacesByImage(imageBytes) {
  const params = {
        CollectionId: "twofacerekognition", 
        FaceMatchThreshold: 80, 
        Image: {
            Bytes: imageBytes
        },
        MaxFaces: 1
    };
    return rekognition.searchFacesByImage(params).promise();
};

function dynamodbGetItem(key) {
    const params = {
        Key: {
            "RekognitionId": {
                S: key
            }
        }, 
        TableName: "twofacedynamodb"
    };
    return dynamodb.getItem(params).promise()
}
