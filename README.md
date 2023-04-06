This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This app is using firebase as the backend database provider for the app to run.
So to run the project locally a firebase account and project should be created and the config file needs to be generated.

## Getting Started

Step 1. Clone this project code into local machine and cd into nextblogger folder and open a terminal.

Step 2. Run the npm install command from terminal to install all the dependencies required.

# Setting up firebase

Step 1. create a new firebase project by clicking on Add Project option.

![image](https://user-images.githubusercontent.com/66959845/230272184-c60aff17-9984-4286-af40-2a5684084706.png)

Step 2. provide a name and click on continue. and follow the steps as shown below in images.
  1.   ![image](https://user-images.githubusercontent.com/66959845/230272378-09cc4b36-f268-4778-a87c-1a6bfc0e6e2b.png)
  
  2.   ![image](https://user-images.githubusercontent.com/66959845/230272720-76c352d2-8764-455a-9a46-551b8ce66c78.png)

  3.   ![image](https://user-images.githubusercontent.com/66959845/230272792-c2a07b2b-d0af-4228-b76e-c39829a274a4.png)
 
  4.   ![image](https://user-images.githubusercontent.com/66959845/230272914-ed0bf7e4-1c10-4240-a985-7ae2d9321e77.png)


Step 3. Now we need to register our app and enable user authentication and firestore

Click on the  web icon as shown below to register the app.

![image](https://user-images.githubusercontent.com/66959845/230273118-1704644a-79de-48e3-bdbb-c9f97182e4d9.png)

Provide a name of the app and click on "register app" button.

![image](https://user-images.githubusercontent.com/66959845/230273237-4c9ae50b-6144-40ce-b52a-644ae471bc41.png)

Now Scroll down to the bottom of the page and click on "continue to console" button

Now we need to enable the user authentication and firestore.

1. Click on build and then authentication fron the left nav bar.

![image](https://user-images.githubusercontent.com/66959845/230273485-f5e967c4-9e2d-4262-af9c-9b8307964cc8.png)

2. Click on get started.

3. Click on email/password option.

![image](https://user-images.githubusercontent.com/66959845/230273811-5d9d0784-2178-4473-95ff-6d4005e42a04.png)

4. Click on enable and then save.

![image](https://user-images.githubusercontent.com/66959845/230273873-b04da0f8-c44a-4d34-89bd-b65d44d98f69.png)

this should setup the required authentication method for user authentication.


Now we set up the firestore database.

1. Click on build and then firestore database from the left nav bar.

![image](https://user-images.githubusercontent.com/66959845/230273685-8f3f2fd0-78c9-4d8a-a332-f6ac095d0970.png)

2. Click on create database button.

![image](https://user-images.githubusercontent.com/66959845/230274021-ceed5272-023e-4ead-a8fa-5762571f3bad.png)

3. Click on start in test mode and click next (note this is just for quick setup and to remove the hassle of setting up rules. it is recommended to start with production mode and configure proper read/write rules)

![image](https://user-images.githubusercontent.com/66959845/230274243-90298fc8-3732-4fa7-b95e-da00374a5785.png)

4. Select a location and click on enable ( the location is the DC / avaialability zone where firebase will provision the db resources)

![image](https://user-images.githubusercontent.com/66959845/230274408-aeacece7-17f9-4096-a6a0-f870dc5d8686.png)

This should setup the firestore database for the app to run.

# Adding the firebase config file.

Step 1. Navigate to the firebase console and click on the settings icon >> Project settings as shown below.
![image](https://user-images.githubusercontent.com/66959845/230270885-1d31b875-b7fe-4c6a-b15d-5bc303b8d933.png)

Step 2. Scroll down to the bottom of the page and click on config and copy the config highlighted. This config is required to be able to connect the firebase from the app. (note the api keys are hidden in this image for privacy purposes).
![image](https://user-images.githubusercontent.com/66959845/230271401-0ba63442-1a7c-4190-8ac0-c1e1bfa986c3.png)

Step 3. Navigate to the folder /nextblogger/firebase and create a file named "config.js" and paste the copied config from the firebase page as instructed in step 2 above. Finally at the end of the file add the following line (please refer to the image below) :

export default firebaseConfig;

![image](https://user-images.githubusercontent.com/66959845/230271807-b4464d09-232f-4c61-b46b-a9bbd0d4a700.png)


# Running the development server

If all the steps are perfomed correctly as mentioned above the firebase and the app should be able to run properly.

Use the following command in the terminal to run the development server.

npm run dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

