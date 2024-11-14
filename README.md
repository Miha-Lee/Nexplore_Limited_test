<pre>
 Nexplore Limited Test Setup Guide

 Frontend: React, Typescript, Vite, Ant Design
 Backend: Express, Node, Postgres, Typescript
 Test: Jest

 Small reminder: Before we start the frontend project, I prefer we start the backend server first, otherwise, 
 there will be some exceptions at the frontend, which will affect the Fetching todo items or Unit Test. 

 Backend Setup Guide:
 1. We need to go to the backend folder, and locate to the sql folder, inside the folder, you are able to see the "todo.sql" file, 
    which we will copy to pgadmin and execute the query.
 
    <img width="820" alt="sql" src="https://github.com/user-attachments/assets/6bf668ef-534a-4046-b0bb-9a405215c463">
 2. Next, we copy this sql syntax and paste it to the pgadmin. And run the sql query.
 
    <img width="758" alt="pgadmin 1" src="https://github.com/user-attachments/assets/e4c6a901-a83c-482d-b3c4-6510c240879f">
 
    <img width="758" alt="pgadmin 2" src="https://github.com/user-attachments/assets/65f8055a-cc62-45ac-a340-1e4b0aaa3d16">
 3. We need to setup the ".env" file, which we are going to copy the variables 
    from the ".env.example" first and replace with the pgadmin values.
 
    <img width="822" alt="env" src="https://github.com/user-attachments/assets/5664a36d-8175-46eb-a3a7-3110e89acfa5">

    <img width="758" alt="pgadmin 3" src="https://github.com/user-attachments/assets/68abcc43-7008-4bdd-9fda-8e32ffa0999f">

    <img width="758" alt="pgadmin 4" src="https://github.com/user-attachments/assets/0e6ab5f5-97e7-4266-af0b-1de4d8dcacc1">
 4. After we finished steps above, we can go to the backend root folder and run "npm install".
 
    <img width="400" alt="backend" src="https://github.com/user-attachments/assets/140de006-e327-4cbd-8c94-0ab80cfbdfe4">
 5. When we finished the downloading of the dependencies, we can run "npm run dev" to launch the backend server. 
 
    <img width="400" alt="npm run dev" src="https://github.com/user-attachments/assets/9a27db2e-d393-4aa8-9f27-9e067fddc233">
 6. One last small reminder, I prefer we see the words of "App is listening 3000", then we launch the frontend.
    
    <img width="588" alt="3000" src="https://github.com/user-attachments/assets/c82e710f-4b8b-4214-9b33-de5923a8cc2d">

 
Frontend Setup Guide:
1. After we finished the backend server setup, we can "cd" into frontend root folder. And run "npm install".
 
   <img width="374" alt="frontend" src="https://github.com/user-attachments/assets/57e9de07-f337-4105-b52a-7c12c432cb5e">
2. When we finished the installation of frontend dependencies, we run "npm run dev" to launch the frontend.
 
  <img width="381" alt="frontend npm run dev" src="https://github.com/user-attachments/assets/42359fa6-e321-4035-a567-890684fe55f9">


Demos:
 
</pre>
