# Using axios to fetch, manipulate and delete data



https://github.com/user-attachments/assets/aadb06ac-85cf-4909-9737-1f5c555a2b28


## Note:

### Delete all endpoint
Delete All endpoint is not available in the api. If the number of Todos is less (in range 0-5), we can use foreach loop to iterate the delete endpoint which takes id of Todos. But it is not standard procedure to achieve the functionality.
So, we are just deleting html elements for now.

### Manipulation
We have utilised http requests to manipulate data, but as the data at json placeholder can not be manipulated at backend, we are also manipulating elements from DOM. In real project, we can retrive data after every manipulation to show consistent and accurate data.
