'use strict';

const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

console.log('Loading function :: dummy');

exports.handler = (event, context, callback) => {
    try {
        const userName = event['body-json'].userName;
        const videoStream = event['body-json'].videoStream
        
        const params = {
            FunctionName: "arn:aws:lambda:eu-west-1:468780546504:function:AnalysisFaces-Face-Recognition-Service", 
            InvocationType: "RequestResponse", 
            LogType: "Tail", 
            Payload: JSON.stringify({
                base64: videoStream
            })
        };
        
        lambdaInvoke(videoStream).then((data) => {
            if (data.StatusCode == 200) {
                const fullName = data.Payload.replace(/['"]+/g, '');
                console.log("lambda.invoke :: fullName ::", fullName);
                if (userName == fullName) {
                    console.log(`lambda.invoke :: match found :: ${userName} == ${fullName}`);
                    callback(null, 'match found');
                } else {
                    console.error("lambda.invoke :: no match found :: data ::", data);
                    callback('ERROR :: no match found', null);
                }
            } else {
                console.error("lambda.invoke :: no 200 StatusCode :: data ::", data);
                callback('ERROR :: no 200 StatusCode', null);
            }
        }).catch((error) => {
            console.error("lambda.invoke :: error ::", error);
            callback('ERROR :: ', error);
        });;

    } catch (error) {
        console.error("dummy :: lambda_handler :: error ::", error);
        callback(error);
    }
};

function lambdaInvoke(payload) {
    const params = {
        FunctionName: "arn:aws:lambda:eu-west-1:468780546504:function:AnalysisFaces-Face-Recognition-Service", 
        InvocationType: "RequestResponse", 
        LogType: "Tail", 
        Payload: JSON.stringify({
            base64: payload
        })
    };
    return lambda.invoke(params).promise();
}