    
    
    
    /*
    params = {
        Image: {
            S3Object: {
                Bucket: name,
                Name: key
            }
        },
        MaxLabels: 30,
        MinConfidence: 50
    };
    
    
    
    rekognition.detectLabels(params, function(err, data) {
        console.log('rekognition.detectLabels callback function');
        if (err) {
            console.log("detectLabels :: ERROR ::", err);
        } else {
            console.log("detectLabels :: DATA ::", data);
            
            let params = {
                Attributes: ["ALL"],
                Image: {
                    S3Object: {
                        Bucket: name, 
                        Name: key
                    }
                }
            };

            rekognition.detectFaces(params, function(err, data) {
                console.log('rekognition.detectFaces callback function');
                if (err) {
                    console.log("detectFaces :: ERROR ::", err, err.stack);
                } else {
                    console.log("detectFaces :: DATA ::", data);
                }
            });
        }
    });
    
     console.log('params', params);

    s3.getObject(params, function(err, data) {
        console.log('s3.getObject callback function');
        if (err) {
            console.log("ERROR ::", err, err.stack);
        } else {
            console.log("DATA ::", data); 
        }
    });
    
     
    /*
    let params = {
      Bucket: name, 
      MaxKeys: 2
    };

    s3.listObjects(params, function(err, data) {
        console.log('s3.listObjects callback function');
       if (err) {
           console.log("listObjects :: ERROR ::", err);
       } else {
           console.log("listObjects :: DATA ::", data);
       }
    });
    */
