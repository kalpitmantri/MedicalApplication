# SDE( Applications ) - Innovaccer

## This is a project for Hacker Camp 19 by Innovaccer
Please find the problem statement [here](https://www.innovaccer.com/media/hackercamp/SDE-Intern-(Applications).pdf).

#### DESCRIPTION

 -    Built a rest Api in Node.js by leveraging Node.js + MongoDB.
 -    ORM Used Mongoose.
 -  A restful Api built for serving as a Backend for a Medical App.

#### REQUIREMENTS

 - Node.js 10.12.0
 - MongoDb
 - [ApiMedic](https://apimedic.com/) API keys for using its API.
 - Google API Key for using google place API.
 - [Infermediac](https://api.infermedica.com/) API keys for extacting symptoms from general text.

#### INSTALLATION INSTRUCTIONS
-   Clone or download the repo. into any fresh temporary folder.
-   Cd into that root folder you just cloned locally.
-   Open terminal in the current folder and to install all dependencies type
    ```
    npm install
    ```
-   Now typing
    ```
    npm start
    ```
    will start a server !
    
    App should now be running on **localhost:3000**
         
### Dependencies 
 - For dependencies refer Package.json


### For Testing (Postman)

-   Postman extension can be used for testing !
-   Supercharge your API workflow with Postman! Build, test, and document your APIs faster.
-   You can now fire up postman and then perform several operations on the REST API.

## How  it Works!!  
### Available API Routes

| Routes        | Description           | 
| ------------- |:-------------:|
| [`GET/getSymptoms/`](#1-fetch-list-of-symptoms)    | Fetch list of symptoms (API 1) |
| [`GET/getMedicalConditions/`](#2--fetch-medical-conditions-for-given-symptom)     | Fetch Medical Conditions for Given Symptom (API 2)     
| [`POST/search/`](#3--for-a-given-medical-conditiondiagnosis-list-down-the-treatment-options)|  For a given medical condition/diagnosis,List down the treatment options. (API 3)  |    
| [`GET/nearbyDoctors/`](#4--gets-list-of-nearby-doctors-by-given-location) |  Gets list of nearby doctors by given location (API 4) |
| [`POST/trackSymptom/`](#5--extracts-symptoms-from-a-text-and-returns-the-medical-conditions) |  Extracts symptoms from a text and returns the medical conditions. (API 5)  |

----------

### 1. Fetch list of Symptoms
Send Get request to fetch the list of Symptoms from Apimedic's API in JSON format
```
Method: GET 
URL: /getSymptoms/
Produces: application/json
```
  #### Example :
  - **Request** : /getSymptoms/
  - **Response**:
    ````
    Symptoms: [
        ....
        {
            "ID": 10,
            "Name": "Abdominal pain"
        },
        {
            "ID": 238,
            "Name": "Anxiety"
        },
        {
            "ID": 104,
            "Name": "Back pain"
        },
        {
            "ID": 75,
            "Name": "Burning eyes"
        },
        {
            "ID": 46,
            "Name": "Burning in the throat"
        },
        ....
    ]
    ````

----

### 2 . Fetch Medical Conditions for Given Symptom 
Fetches the list of different **issues** and **specialization** for a given symptom by sending get request to Apimedic's API

It requires parameters `symptomName` , `gender` and `year_of_birth`
```
Method: GET 
URL: /getMedicalConditions/
Produces: application/json
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| symptomName   | String |Required  |Name of the symptom for which medical conditions are needed to be fetched |
| gender | String |Required     | Gender of Patient |
| year_of_birth | Integer |Required     | Patient's year of  birth |

#### Example :
- **Request :** `/getMedicalConditions?gender=male&year_of_birth=1988&symptomName=Back Pain`

- **Response:**
    ````
    [
        {
            "Issue": {
                "ID": 103,
                "Name": "Slipped disc",
                "Accuracy": 90,
                "Icd": "M51.2",
                "IcdName": "Other specified intervertebral disc displacement",
                "ProfName": "Disc herniation",
                "Ranking": 1
            },
            "Specialisation": [
                {
                    "ID": 15,
                    "Name": "General practice",
                    "SpecialistID": 0
                },
                {
                    "ID": 31,
                    "Name": "Orthopedics",
                    "SpecialistID": 0
                },
                {
                    "ID": 41,
                    "Name": "Rheumatology",
                    "SpecialistID": 0
                }
            ]
        },
        {
            "Issue": {
                "ID": 488,
                "Name": "Strain of the back muscles",
                "Accuracy": 72,
                "Icd": "T09.2;M54.5;S39.9",
                "IcdName": "Dislocation, sprain and strain of unspecified joint and ligament of trunk;Low back pain;Unspecified injury of abdomen, lower back and pelvis",
                "ProfName": "Muscle tightness in back",
                "Ranking": 2
            },
            "Specialisation": [
                {
                    "ID": 15,
                    "Name": "General practice",
                    "SpecialistID": 0
                }
            ]
        },
        ....
    ]
    ````
----
### 3 . For a given medical condition/diagnosis, List down the treatment options

For a given medical condition/diagnosis, list down the treatment options like “Self-care”, “Medications”, “Medical Procedure”, “Specialists” , by scraping the web
```
Method: POST
URL: /search/
Produces: application/json
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| issue   | String |Required    | Name of any issue for which we want to fetch treatment information from web |

#### Example :
- **Request:**  `/search/anxiety`

- **Response:**
````
{
    "Self-care": {
        "Avoid alcohol": {
            "text": "May be harmful and aggravate certain conditions.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=anxiety+disorder+avoid+alcohol&stick=H4sIAAAAAAAAAOMQFeLQz9U3SCspLlLi1U_XNzRMqijPLTQpMtvFxGgAAKKMqdcfAAAA&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEAQ"
        },
        "Reduce caffeine intake": {
            "text": "Reduces risk of aggravating certain conditions.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=anxiety+disorder+reduce+caffeine+intake&stick=H4sIAAAAAAAAAOMQFeLQz9U3SCspLlLi1U_XNzRMqqwwKMs1KdvFxGgAAIu6S1kfAAAA&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEAU"
        },
        "Physical exercise": {
            "text": "Aerobic activity for 20–30 minutes 5 days a week improves cardiovascular health. If injured, pursuing an activity that avoids the injured muscle group or joint can help maintain physical function while recovering.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=anxiety+disorder+physical+exercise&stick=H4sIAAAAAAAAAOMQFeLQz9U3SCspLlLiBLEMLcvNMnYxMRoAAAZOoHUbAAAA&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEAY"
        },
        "Stress management": {
            "text": "Pursuing an enjoyable activity or verbalising frustration to reduce stress and improve mental health.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=anxiety+disorder+stress+management&stick=H4sIAAAAAAAAAOMQFeLQz9U3SCspLlLiBLEMc8rKqnYxMRoAAJ52adsbAAAA&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEAc"
        },
        "Quitting smoking": {
            "text": "Quitting smoking tobacco.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=anxiety+disorder+quitting+smoking&stick=H4sIAAAAAAAAAOMQFeLQz9U3SCspLlLiBLEMC1MKjXYxMRoAALP8ELkbAAAA&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEAg"
        },
        "Relaxation techniques": {
            "text": "Deep breathing, meditation, yoga, rhythmic exercise and other activities that reduce symptoms of stress",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=anxiety+disorder+relaxation+techniques&stick=H4sIAAAAAAAAAOMQFeLQz9U3SCspLlLiBLFM48tyc3cxMRoAAMbKFjYbAAAA&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEAk"
        },
        "Healthy diet": {
            "text": "A diet that provides essential nutrients and adequate calories, while avoiding excess sugar, carbohydrates and fatty foods.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=anxiety+disorder+healthy+diet&stick=H4sIAAAAAAAAAOMQFeLQz9U3SCspLlLi0U_XNyw0y7JMqzAx3MXEaAAAbOkNIB4AAAA&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEAo"
        }
    },
    "Therapies": {
        "Cognitive behavioral therapy": {
            "text": "A talk therapy focused on modifying negative thoughts, behaviours and emotional responses associated with psychological distress.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=anxiety+disorder+cognitive+behavioral+therapy&stick=H4sIAAAAAAAAAOMQFeLQz9U3SCspLlLiArGMTEtyiop2MTEaAABXFGxvHAAAAA&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEAw"
        },
        "Meditation": {
            "text": "Improves mental health and helps with relaxation.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=anxiety+disorder+meditation&stick=H4sIAAAAAAAAAOMQFeLQz9U3SCspLlICs0wNzXN2MTEaAACJI6zvGgAAAA&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEA0"
        },
        "Psychotherapy": {
            "text": "Treatment of mental or behavioural disorders through talk therapy.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=anxiety+disorder+psychotherapy&stick=H4sIAAAAAAAAAOMQFeLQz9U3SCspLlICs8zMLc12MTEaAABKp1pKGgAAAA&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEA4"
        }
    },
    "Medications": {
        "Selective Serotonin Reuptake Inhibitor (SSRI)": {
            "text": "Eases symptoms of depressed mood and anxiety.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=anxiety+disorder+selective+serotonin+reuptake+inhibitor+(ssri)&stick=H4sIAAAAAAAAAOMQFeLQz9U3SCspLlICs8yTDHJ2MTEaAABm57GiGgAAAA&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEBA"
        },
        "Anxiolytic": {
            "text": "Relieves anxiety and tension. May promote sleep.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=anxiety+disorder+anxiolytic&stick=H4sIAAAAAAAAAOMQFeLQz9U3SCspLlICswwNy6p2MTEaAACYlkJAGgAAAA&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEBE"
        },
        "Antidepressant": {
            "text": "Prevents or relieves depression and elevates mood.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=anxiety+disorder+antidepressant&stick=H4sIAAAAAAAAAOMQFeLQz9U3SCspLlJiB7GqDAp3MTEaAADsLeAYGQAAAA&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEBI"
        },
        "Sedative": {
            "text": "Causes drowsiness, calmness and dulled senses. Some types may become addictive.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=anxiety+disorder+sedative&stick=H4sIAAAAAAAAAOMQFeLQz9U3SCspLlLiBLEMi4rN0nYxMRoAAM8KKEobAAAA&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEBM"
        },
        "Nerve pain medication": {
            "text": "Blocks pain caused by damaged nerves.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=anxiety+disorder+nerve+pain+medication&stick=H4sIAAAAAAAAAOMQFeLQz9U3SCspLlLi1U_XNzRMNi6ryDVNMt_FxGgAAJ02JQMfAAAA&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEBQ"
        }
    },
    "Specialists": {
        "Clinical Psychologist": {
            "text": "Treats mental disorders primarily with talk therapy.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=clinical+psychologist+near+me&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEBY"
        },
        "Psychiatrist": {
            "text": "Treats mental disorders primarily with medications.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=psychiatrist+near+me&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEBc"
        },
        "Primary Care Provider (PCP)": {
            "text": "Prevents, diagnoses and treats diseases.",
            "url": "https://www.google.com/search?site=async/health_imex_contents&q=primary+care+provider+(pcp)+near+me&sa=X&ved=2ahUKEwigr6K_34veAhXEL48KHfP8CjoQ0EB6BAgBEBg"
        }
    }
}
````    
---
### 4 . Gets list of nearby doctors by given location
Gets the list containing `name`, `location `, `address`, `open now` and `rating` of Nearby Doctors.
It requires  parameters `latitude`and `longitude` of current location.
- Used Google Place API for getting nearby places
```
Method: GET 
URL: /nearbyDoctors/
Produces: application/json
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
|  latitude  | Integer |Required    |Latitude Value of Current Location |
|   longitude| Integer |Required     |Longitude Value of Current Location |

#### Example :
- **Request :** `/nearbyDoctors?latitude=24.5766516&longitude=73.7259036`
- **Response:**
    ````
    [
        ....
        {
            "name": "R.K.Hospital & Test Tube Baby Center",
            "location": {
                "lat": 24.591822,
                "lng": 73.69409600000002
            },
            "address": "5 A, Opp. RSEB, Madhuban, Udaipur",
            "openNow": false,
            "rating": 4.8
        },
        {
            "name": "Raj Vinayak Laparoscopic Surgical Hospital",
            "location": {
                "lat": 24.601596,
                "lng": 73.687298
            },
            "address": "404-II, Hitawala Complex, Udaipur",
            "openNow": true
        },
        {
            "name": "Deerghayu Life Style Clinic",
            "location": {
                "lat": 24.5934706,
                "lng": 73.6932957
            },
            "address": "NH 76, Madhuban, Udaipur",
            "openNow": true,
            "rating": 3
        },
        ....
    ]    
    ````

----
### 5 . Extracts symptoms from a text and returns the medical conditions.
takes a text like “I’m having a back pain”, and extracts symptoms and based on those symptoms returns the medical conditions

 - Used  [Infermediac](https://api.infermedica.com/)  API for doing this.
 - This is limited to fetch conditions for only symptoms available in Apimedic's API

```
Method: POST
URL: /trackSymptom/
Produces: application/json
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
|  searchText  | String |Required   |General text from which symptom is extracted |
|   gender| String |Required     |Gender of the patient |
|   year_of_birth| String |Required     |Patient's year of birth |

#### Example :
 -  **Request :**`/trackSymptom?year_of_birth=1988&gender=male&searchText=I am having back pain`

- **Response:**

    ````
    {
        Symptom: Back Pain,
        MedicalConditions:
        [
            ....
            {
                "Issue": {
                    "ID": 103,
                    "Name": "Slipped disc",
                    "Accuracy": 90,
                    "Icd": "M51.2",
                    "IcdName": "Other specified intervertebral disc displacement",
                    "ProfName": "Disc herniation",
                    "Ranking": 1
                },
                "Specialisation": [
                    {
                        "ID": 15,
                        "Name": "General practice",
                        "SpecialistID": 0
                    },
                    {
                        "ID": 31,
                        "Name": "Orthopedics",
                        "SpecialistID": 0
                    },
                    {
                        "ID": 41,
                        "Name": "Rheumatology",
                        "SpecialistID": 0
                    }
                ]
            },
            ....
        ]
    }   
    ````
