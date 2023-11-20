# Temporal API using NodeJS

This is the default project was bootstrapped using hellow world example from Temporal.io

### Running this sample

** WARNING **

.env file is commited in this repository for testing porpuse, never commit and push sensitive data.

#### Requirements:

1. Have docker and docker compose installed
2. Have nodejs v18 installed.

#### Steps Docker: 

1. Clone the repository
2. Go to folder cd NodeJS-Temporal-Workflow
3. Run the command docker compose up, this will install and configure temporal cluster.

**Note:** 
 If you want to debug or continue developing, run docker compose with the file *docker-compose-dev.yaml* then run the api and worker.
 
- API:  ``` npm run dev ``` 
- Worker: ``` npm run start```
- Env: uncomment the line : #TEMPORAL_CONNECTION_URL=localhost:7233

#### Test:

1. You can import postman collection and postman enviroment from postman folder.


#### Sample Test:

http://localhost:6000/sign-message

**Request:**

```
{
    "message": "This is a test message",
    "referenceId": "abc11122abc"
}

```

**Response:**

```
{
    "message": "Message signing in progress",
    "referenceId": "abc11122abc"
}

```

http://localhost:6000/sign-message/abc11122abc



**Response:**

```
{
    "message": "Message signed successfully",
    "workflowStatus": "COMPLETED",
    "referenceId": "abc11122abc",
    "signedMessage": "X9FIzz4NaoGLeXcTwmoPi01GwSD+JxJPnwtY/YXkBLYzffN55zx1JIm9OWnyXbopruVc5P5HaXfrB2SfCdq06BN8suIvn7ajaMXqz6/9PO67w1J+ahPZ1sgJPvGyyc+X6mrMluK0HdTcwwkBSZAqi4ZCTxEwtCJ2oSK7onrGKNxJEjXToIXzbcmRyuNODVReF0eMku5yc8y9podPZ6buMP2XQhYnPmeOwQDqO38zEv96ff5R1MWDJKt42riuN3HsWQKZQ6JA34LelLQRuJ7OeExpMRz6aNILQ/14nTVkXCfLZ8Qw5m866+T3ktFveCKGrieTPPeVg6Us7Cj9n6ls1Q=="
}
```



The Workflow should return the signed message

![image](https://github.com/DDiscua/NodeJS-Temporal-Workflow/assets/31171755/93116258-b5c1-4153-b7f5-cab7a16b4e0a)

![image](https://github.com/DDiscua/NodeJS-Temporal-Workflow/assets/31171755/e615403b-09c0-4a72-8f40-6e04758121f0)


![image](https://github.com/DDiscua/NodeJS-Temporal-Workflow/assets/31171755/ba02e8b2-a073-4326-b0dc-47e48c9d6275)

![image](https://github.com/DDiscua/NodeJS-Temporal-Workflow/assets/31171755/442e22f1-e343-4189-97a6-80aa961010cc)
