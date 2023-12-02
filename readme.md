# Ecommerce Project
## Feature List out
-Frontend
     -landing
        -sliders/banners
        -Category list
        -Brand list
        -Product list
    -Category/Brands/Search product List page
    -Product detail page
    -Static pages
    -Auth and Authorization
    -Cart page
    -Checkout/Payment

-CMS(contain management system) used by seller in daraz
    -Banner CRUD
    -CATEGORY CRUD
    -BRAND CRUD
    -USER CRUD
    -Product CRUD(1000,600)
    -Order View
    -Transactions
    -Offers CRUD

//we work on mvc pattern
    //routing
    -defining the path for the url to perform action
    -REST API
    -get,post,put,patch,delete
    CRUD=>
    Create    =>Post
    Read      =>get
    Update    =>put/patch
    delete    =>delete

    Rest is generally a token based communication
       -Representational Stateless Transfer

       -login====>API===>Process===>Response
//.get()

//to get freee domain 
register.com.np'


hoisting 
webhoisting
ohohosting


validation 
file uploading in express using multer
database


##SMTP
-gmail  

                cloud
            Internet(ISP)
Node SMTP,25
IMAP,POP3 =>
25,2525,465,587
127.0.0.1 ::1,localhost
                 form: admin@sandeshbhattarai.com.mp


Register ===> Url FE ====== Activation token =====> Email 
    FEURL =====> API Verify token ========> Respnose ACK
    Set Password ====== TOKEN, password ======> Activate User ---------> email
    Login API ======= username, password ========> Login (jwt token)
    loggedin profileGet  ===== jwt token ====> Verify =====> Access 

NoSql
Mongodb
couchDb

local setup
    -laptop
cloud setup
    -atlas server

-Mongodb Server
-Mongodb 

to run mongoDb server
mongosh


1step ==>Email register user
==>Verify email,verify user exist
====>
    resetToken:random string,
    resetExpiry:Date

    Category
        name/title
        description
        parentId--->Foreign Key
            ref-self
            parentId:{
                type:mongoose.Types.ObjectId,
                ref:'Category',
                nullble:true
            }
        status
        image
        createdBy

        



