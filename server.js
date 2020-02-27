const exp=require("express");
const app=exp();
const path=require("path");
const multer=require("multer");
const xlsxtojson=require("xlsx-to-json-lc");
const xlstojson=require("xls-to-json-lc");
const  nodemailer = require('nodemailer');
app.use(exp.static(path.join(__dirname,'./dist/prj1')));
//multers disk storage settings
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, `${new Date().getTime()}_${file.originalname}`)
    }
   });
   // upload middleware
const upload = multer({ storage: storage});

//marks
//multers disk storage settings
var storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, `${new Date().getTime()}_${file.originalname}`)
    }
   });
   // upload middleware
const upload1 = multer({ storage: storage1});



const mc=require("mongodb").MongoClient;
var dbo;
var year;
var branch;
var yearcode;
var ye;
var id;

const dbUrl="mongodb://sravanth:sravanth@cluster0-shard-00-00-f9nts.mongodb.net:27017,cluster0-shard-00-01-f9nts.mongodb.net:27017,cluster0-shard-00-02-f9nts.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mc.connect(dbUrl,{useUnifiedTopology:true,useNewUrlParser:true},
            (error,client)=>{
                if(error)
                {
                    console.log("err in db connection",error)
                }
                else{
                    dbo=client.db("project");
                    console.log("connect")
                }
            })
//post req handler for id
app.use(exp.json())
app.post('/generate',(request,response)=>{
    console.log(request.body);
    dbo.collection("generateid").find({year:request.body.year,branchname:request.body.branchname}).toArray((error,data)=>{
        if(error){
            console.log("error in finding",error)
        }
        else if(data.length==0)
        {
            dbo.collection("generateid").insertOne(request.body,(error,sucess)=>{
                if(error)
                {
                    console.log("error in post",error)
                }
                else{
                    response.send({message:"id saved sucessfully"})
                }
             })
        }
        else {
            response.send({message:"id generated already"})
        }
    })
  
    
})
//get request id
app.get('/read',(request,response)=>{
    dbo.collection("generateid").find().toArray(
        (error,dataArray)=>{
            if(error)
            {
                console.log("err in reading",error);
            }
            //if array is empty
            else if(dataArray.length==0)
            {
              response.send({message:"no data foundd"})  
            }
            //if array has data
            else{
                response.send({message:dataArray})
            }
        }
    )
});

//post req handler for register student
app.use(exp.json())
app.post('/register',(request,response)=>{
    console.log(request.body);
    dbo.collection("generateid").find({year:request.body.year,branchname:request.body.department}).toArray((error,res)=>{
        // console.log(result);
        let result=res[0]
        console.log(result);
        
        if(error){
             console.log("error in finding",error)
         }
         else if(result.length==0)
         {
            response.send({message:"generateid first"})
         }
         else{
            year=JSON.stringify(result.year);
            yearcode=year.split("");
            //console.log(year);
            console.log(result.branchname)
            branch=result.branchname;
            //console.log(branchname);
            ye=yearcode[2]+yearcode[3];
            
            id=(ye+branch+result.branchcode)
            console.log("id is",id);
            let ct=++result.count;
             if(result.count<=9){
                request.body.studentid=id+"00"+ct;
                request.body.password=id+"00"+ct
                console.log(request.body.studentid);
                console.log(request.body.password);
             }
             else if(result.count<=99)
             {
                request.body.studentid=id+"0"+ct ;
                request.body.password=id+"0"+ct
                console.log(request.body.studentid);
                console.log(request.body.password);
             }
             else{
                request.body.studentid=id+ct
                request.body.password=id+ct
                console.log(request.body.studentid);
                console.log(request.body.password);
                
                
             }
             dbo.collection("studentR").insertOne(request.body,(error,success)=>{
                 console.log(request.body);
                if(error){
                    console.log("error in insert",error)
                }
                else{
                    dbo.collection("generateid").updateOne({year:request.body.year,branchname:request.body.department},
                        {$set:{count:ct}},(error,suc)=>{
                            if(error){
                                console.log("error in update",error);
                                
                            }
                            else{
                                const transport = nodemailer.createTransport({
                                
                                    service: 'gmail',
                                    auth: {
                                        user: 'sravanth.datla@gmail.com',
                                        pass: 'Ait@asia7977',
                                    }
                                
                                });
                                const mailOptions = {
                                    from: 'sravanth.datla@gmail.com',
                                    to: 'prashanthreddy5666@gmail.com',
                                    subject: 'student id and password',
                                    text: `username and password :${request.body.studentid}`
                                };
                                transport.sendMail(mailOptions, (error, info) => {
                                    if (error) {
                                        console.log(error);
                                    }else{
                                        console.log(`Message sent: ${info.response}`);
                                        response.send({message:"updated"})
                                    }
                                   
                                });
                                // response.send({message:"updated"})
                            }
                        })
                   
                }
            }) 
         }
     })
    })
app.get('/read1/:department',(request,response)=>{
    dbo.collection("studentR").find({department:request.params.department}).toArray(
        (error,dataArray)=>{
            if(error)
            {
                console.log("err in reading",error);
            }
            //if array is empty
            else if(dataArray.length==0)
            {
              response.send({message:"no data foundd"})  
            }
            //if array has data
            else{
                response.send({message:dataArray})
            }
        }
    )
});

//delete
app.delete('/remove/:ph',(request,response)=>{
    console.log(request.params);
    let phn=Number(request.params.ph);
    dbo.collection("studentR").deleteOne({ph:phn},
        (error,sucess)=>{
         if(error)
         {
           console.log("err in delete",error)
         }
         else{
             response.send({message:'success'})
         }

    })
});
app.put('/update',(request,response)=>{
        console.log("data is",request.body)
        //update emp obj
        dbo.collection("studentR").updateOne({ph:request.body.ph},
            {$set:{fn:request.body.fn,
                   ln:request.body.ln,
                    m:request.body.m,
                    email:request.body.email,
                    year:request.body.year,
                    course:request.body.course,
                    ad:request.body.ad,
                    ssc:request.body.ssc,
                  inter:request.body.inter}
    },(error,sucess)=>{
        if(error)
        {
            console.log("err in update",error)
        }
        else{
           response.send({message:"success"})
        }
    })
    });
    
   //sort  by year
    app.post('/readbyyear',(request,response)=>{
        console.log(request.body)
        let ye=(+request.body.year)
        // let de=(request.body.department)
        dbo.collection("studentR").find({year:ye,department:request.body.department}).toArray(
            (error,dataArray)=>{
                if(error)
                {
                    console.log("err in reading",error);
                }
                //if array is empty
                else if(dataArray===null)
                {   
                  response.send({message:"nodatafound"})  
                }
                //if array has data
                else{
                    response.send({message:dataArray})
                }
            }
        )
    });
    
    
      // attenddance convert excel to json route
    app.post("/uploadattendence",upload.single('attendance'),(req,res)=>{
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx')
        {
        exceltojson = xlsxtojson;
        } else {
        exceltojson = xlstojson;
        }
        try {
        exceltojson({
        input: req.file.path, //the same path where we uploaded our file
        output: null, //since we don't need output.json
        lowerCaseHeaders:true
        }, function(err,result){
        if(err) {
        return res.json({error_code:1,err_desc:err, data: null});
        }
        dbo.collection("attendence").insertMany(result, (err, data) => {
        console.log(data);
        res.json({error_code:0,err_desc:null, data:
       data["ops"],"message":"Attendence Sheet uploaded successfully"});
        });
       
        });
        } catch (e){
        res.json({error_code:1,err_desc:"Corupted excel file"});
        }
        });

         // marks convert excel to json route
    app.post('/uploadmarks',upload.single('marks'),(req,res)=>{
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx')
        {
        exceltojson = xlsxtojson;
        } else {
        exceltojson = xlstojson;
        }
        try {
        exceltojson({
        input: req.file.path, //the same path where we uploaded our file
        output: null, //since we don't need output.json
        lowerCaseHeaders:true
        }, function(err,result){
        if(err) {
        return res.json({error_code:1,err_desc:err, data: null});
        }
        dbo.collection("marks").insertMany(result, (err, data) => {
        console.log(data);
        res.json({error_code:0,err_desc:null, data:
       data["ops"],"message":"Marks Sheet uploaded successfully"});
        });
       
        });
        } catch (e){
        res.json({error_code:1,err_desc:"Corupted excel file"});
        }
        });

        //attendance
        app.get('/getattendence',(request,response)=>{
            dbo.collection("attendence").find().toArray(
                (error,dataArray)=>{
                    if(error)
                    {
                        console.log("err in reading",error);
                    }
                    //if array is empty
                    else if(dataArray.length==0)
                    {
                      response.send({message:"no data foundd"})  
                    }
                    //if array has data
                    else{
                        response.send({message:dataArray})
                    }
                }
            )
        });

        //marks get request
         
         app.get('/getmarks',(request,response)=>{
            dbo.collection("marks").find().toArray(
                (error,dataArray)=>{
                    if(error)
                    {
                        console.log("err in reading",error);
                    }
                    //if array is empty
                    else if(dataArray.length==0)
                    {
                      response.send({message:"no data foundd"})  
                    }
                    //if array has data
                    else{
                        response.send({message:dataArray})
                    }
                }
            )
        });


        //login reqest handler
        app.post('/login',(request,response)=>{
            //read object
             console.log(request.body);
             dbo.collection("studentR").findOne({studentid:request.body.id},(error,studobj)=>{
                 if(error){
                     console.log("error in finding",error)
                 }
                 else if(studobj==null){
                     response.send({message:"invalid-studentid"})
                 }
                 else{
                     if(request.body.password!==studobj.password){
                         response.send({message:"invalid-password"})
                     }
                     else{
                         response.send({message:"successful-login",name:studobj})
                     }
                 }
             })
        })

        //get request handler to get attendence one studentdata
app.get('/readStudentAttendance/:studentid',(request,response)=>{
    //read data from collection and convert to array
    console.log(request.params.studentid);
    
dbo.collection("attendence").find({studentid:request.params.studentid}).toArray((error,dataArray)=>{
    if(error)
    {
console.log("error in reading",error);
    }
    else if(dataArray.length==0)
    {
        response.send({message:"no data found"})
    }
    else
    {
        response.send({message:dataArray})
    }

})
})

//get request handler to get marks one studentdata
app.get('/readStudentMarks/:studentid',(request,response)=>{
    //read data from collection and convert to array
    console.log(request.params.studentid);
    
dbo.collection("marks").find({studentid:request.params.studentid}).toArray((error,dataArray)=>{
    if(error)
    {
console.log("error in reading",error);
    }
    else if(dataArray.length==0)
    {
        response.send({message:"no data found"})
    }
    else
    {
        response.send({message:dataArray})
    }

})
})
        

        



//port number
const port=1000;
app.listen(port,()=>{console.log(`server listening on ${port}..`)})
