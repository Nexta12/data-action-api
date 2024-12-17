
require('dotenv').config();
const express = require('express');
const connectDB = require('./server/database/connection');
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const session = require("express-session");
const { initialize } = require('./utils/passport');
const passport = require("passport");
const MongoStore = require("connect-mongo");
const fileUpload = require("express-fileupload");
const path = require('path')
const app = express();

const PORT = process.env.PORT || 3000;

//connect DB
connectDB();

initialize(passport);

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'))

app.use(
    cors({
      origin: process.env.FRONTEND_BASE_URL,
      methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
      credentials: true,
    }),
  );

  // Configure Content Security Policy of helmet
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "https://res.cloudinary.com"], // Allow images from Cloudinary
      },
    }),
  );

  // Load body parser
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json())


    //  file upload Config
    app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: path.join(__dirname, "tmp"),
        createParentPath: true,
        limits: {
          fileSize: 6 * 1024 * 1024 * 8, // 6mb max
        },
      }),
    );

  app.use(
    session({
      secret: process.env.SESSION_SECRETE,
      resave: false,
      saveUninitialized: false,
      rolling: true, // Refresh the session expiration on activity
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 10800,
        autoRemove: 'native',
      }),
      cookie: {
        maxAge: 10800000, // 3 hours
      },
    }),
  );

  
  // Load passport middlewares
  app.use(passport.initialize());
  app.use(passport.session());



app.get("/", (req, res)=>{

    res.send("Server Running smoothly")
})

app.use('/api/secure', require('./server/routes/auth.routes'))
app.use('/api/user', require('./server/routes/user.routes'))
app.use('/api/consultation', require("./server/routes/consultation.routes"))
app.use('/api/training', require("./server/routes/training.routes"))
app.use('/api/contact', require('./server/routes/contact.routes'))
app.use('/api/service', require('./server/routes/service.routes'))
app.use('/api/course', require('./server/routes/course.routes'))

app.listen(PORT, ()=> console.log(`Server running on: http://localhost:${PORT}`))