# Object-Storage-Systems

## KHub_Practice Task 2: Object Storage Systems

#### Table of Contents
- Introduction
- Object Storage System
- Alternatives to Minio
- Setting up Minio Locally
- Using Minio with Your Tech Stack
- Project Flow
- Conclusion

### Introduction
The aim to demonstrate the power of Minio as an object storage system and its seamless integration with our chosen technology stack.In this endeavor, our primary goal is to explore and leverage Minio, an object storage system, to enhance our applications. 
**Using Minio along with the tech stack you have been learning, that is perform the following operations: Obtain files from and Store files to your Minio storage setup from an application frontend (React.js) and backend (Node.js and Python).**

### Object Storage System
An object storage system is a data storage architecture that manages and organizes data as discrete objects, each with a unique identifier. Unlike traditional file systems that use a hierarchical directory structure, object storage systems store data in a flat address space. This design offers advantages such as scalability, fault tolerance, and flexibility in managing vast amounts of unstructured data. Common use cases for object storage include cloud storage, backup and archiving, content distribution, and multimedia storage. Object storage systems are well-suited for scenarios where massive data sets need to be stored and accessed efficiently, and they excel at providing redundant and reliable data storage.

### Alternatives to Minio
**1. Amazon S3 (Simple Storage Service):** Amazon S3 is a widely used cloud-based object storage service provided by Amazon Web Services (AWS). It offers scalable and highly durable storage with robust security features.

**2. Google Cloud Storage:** Google Cloud Storage is Google's object storage service, providing a reliable and cost-effective solution for storing and retrieving data in the cloud, with features like data versioning and global accessibility.

**3. Azure Blob Storage:** Microsoft's Azure Blob Storage is an object storage service that offers secure and efficient data storage. It integrates seamlessly with other Azure services and provides various tiers for optimizing costs based on data access patterns.

### Setting up Minio Locally
To set up Minio locally:<img src="https://cpl.thalesgroup.com/sites/default/files/content/partners/logo/2020-08/logo.png">

**System Requirements:**
- Minio is compatible with various operating systems, including Windows, macOS, and Linux.
- Ensure that you have a supported version of Go (Golang) installed.
  
**Installation Steps:**
1. Download the Minio binary for your platform from the official website.
2. Extract the downloaded archive to a directory of your choice.
3. Open a terminal or command prompt and navigate to the directory where you extracted Minio. ##### Setting up Minio Locally
   
To set up Minio locally on Windows, follow these steps:

- **Download Minio Binary:**
   Download the Minio binary for Windows from the official Minio website. You can use a web browser or run the following command in PowerShell to download Minio to your system:

   ```powershell
   Invoke-WebRequest -Uri "https://dl.min.io/server/minio/release/windows-amd64/minio.exe" -OutFile "C:\minio.exe"
- **Set Environment Variables**:
Set the environment variables for Minio. In this example, we set the root user and password. You can customize these as needed:

```
setx MINIO_ROOT_USER admin
setx MINIO_ROOT_PASSWORD password
```
**Start Minio Server:**
Open a PowerShell window, navigate to the directory where you placed the Minio binary, and use the following command to start the Minio server:
```
C:\minio.exe server F:\Data --console-address ":9001"
```
Replace F:\Data with the path to the directory where you want to store your Minio data. Minio should now be running locally, and you can access it through a web browser at http://localhost:9000.
__These steps will help you set up Minio on your Windows system for local development.__

4. Run Minio with the desired configuration using a command like:
   ```
   ./minio server /path/to/data
   ```
   Here, `/path/to/data` is the directory where your Minio data will be stored.
   
**Accessing the Minio Web Interface:**
- Once Minio is running, you can access its web interface by opening a web browser and going to `http://localhost:9000` (by default). You can use this interface to manage your local Minio instance.
  
**Necessary Configurations:**
- You can download Minio from the official website: [Minio.io](https://min.io/). Simply go to the website, and you should find download options for various operating systems, including Windows, macOS, and Linux.
- Minio comes with a default configuration that should work for local development. For production use, you may need to set environment variables or modify the configuration file to secure your instance and define storage policies.

### Using Minio with Your Tech Stack
Minio is typically used as an object storage service and not typically considered a direct component of the tech stack. Instead, Minio is used to store and manage data in your applications.

__Tech Stack Components__

- **Frontend**: React.js
  - Use the Minio JavaScript library or SDK to interact with Minio for file uploads and downloads.
  
- **Backend**: Node.js and Python
  - Utilize Minio client libraries or SDKs to interact with Minio from the backend. We can use the Minio SDK for Node.js and Minio SDK for Python to perform operations like file uploads and downloads.
_Minio itself is not directly a part of your tech stack; instead, it's an external component used for storage and data management within your applications._

### Project Flow
The First thing is to create 2 folders named *client* and *server* The folder structure is as follows.

![WhatsApp Image 2023-10-23 at 21 20 14_58fd0a6b](https://github.com/Madhurithotakua/Object-Storage-Systems/assets/104493027/24f1cd62-1ed8-4895-9e90-6108fbc0c03e)

For frontend we have used *React.js*
Initially navigate to the frontend folder and open the terminal using``` ctrl + shift + ` ``` in vs code or click on new terminal Type cd client .It will navigate to the folder. Then type ``` npm install ```  The necessary files and node modules will be installed.

We run the frontend part using the command ``` npm start ``` 

This will be the webpage that has to be displayed on running the command and allowed to select or upload the documents,videos,images.

![WhatsApp Image 2023-10-21 at 14 45 12_48db0754](https://github.com/Madhurithotakua/Object-Storage-Systems/assets/104493027/b2d69cf4-ba31-4480-990e-bfb8c744bfe2)

After uploading the any of input by the user like video that will be stored in the minio server and visible in the output page as follows:

![WhatsApp Image 2023-10-21 at 14 45 13_a0f82c7a](https://github.com/Madhurithotakua/Object-Storage-Systems/assets/104493027/ec1ade3b-4662-4b8e-9ff0-f71ff75da106)

For backend we have used *Node.js*  and *python*
- Type cd server .It will navigate to the folder then run the backend part using command ``` python app.py ``` 
- Utilize Minio client libraries or SDKs to interact with Minio from the backend. We can use the Minio SDK for Node.js and Minio SDK for Python to perform operations like file uploads and downloads.
- This image represents the minio storage process
1. Video uploading to a Minio server involves sending the video file as an object via an API or compatible client tool.

2. The video file is typically divided into smaller data chunks, known as blocks, for efficient storage and retrieval.

3. Minio then stores these blocks as objects in a distributed and scalable object storage system.

4. Each object is assigned a unique key, such as a filename, and can be accessed using this key.

5. Minio's architecture allows for easy scalability, redundancy, and high availability in video storage and retrieval operations.
   
![WhatsApp Image 2023-10-21 at 14 45 13_a26b9cb0](https://github.com/Madhurithotakua/Object-Storage-Systems/assets/104493027/0bc66869-c0d5-4d3e-a1b7-df1f41bdb409)

### Conclusion
In conclusion, this project has been a valuable exploration of object storage systems and their real-world applications. We've not only gained a comprehensive understanding of what object storage is and how it differs from traditional file systems, but we've also examined potential alternatives. The hands-on experience of setting up Minio locally and integrating it with our tech stack has provided valuable insights into the power of object storage in modern application development. This project has equipped us with the skills to harness Minio's capabilities for efficient file management, a knowledge that can be applied to a variety of real-world scenarios.

*Senior Developer* - K.Keerthi  *Junior Devloper* - T.Madhuri
