# Using ChatGPT API in our project

## Context and Problem Statement

Using the ChatGPT API requires us to make a POST request to the api, and setup and utilize an OpenAI API key.

There are multiple ways we can implement this functionality to get fortunes from the ChatGPT API.

## Considered Options

- Having the API key in the repository.
- Using environment variables in the repository to hide the API key.
- Setting up a seperate backend to handle and route the requests to the ChatGPT API.

## Decision Outcome

Having the API key in the repository makes our API key publicly available, which we dont want.

Using environment variables still exposes the API key if we have the user make the fetch request from their browser.

Creating a seperate backend would require us to setup a server and configure it to handle https requests. We would also need to get an SSL certificate for this server so that it can utilize HTTPS for the requests since our site is deployed through GitHub pages, which is secured with HTTPS. The process for all of this is overall very time consuming and tedious to figure out.

Choice: We ended up scrapping the feature but leaving the function implementation in the code for future contributors to utilize/modify.
