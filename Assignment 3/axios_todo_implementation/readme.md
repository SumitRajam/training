# Using axios to fetch, manipulate and delete data




https://github.com/user-attachments/assets/1dd16366-63f2-41d9-97d4-bd172dcb671c





## Note:

### Delete all endpoint
Delete All endpoint is not available in the api. If the number of Todos is less (in range 0-5), we can use foreach loop to iterate the delete endpoint which takes id of Todos. But it is not standard procedure to achieve the functionality.
So, we are just deleting html elements from DOM for now.

### Manipulation
We have utilised http requests to manipulate data, but as the data at json placeholder can not be manipulated at backend, so we are just showing the response that we get from certain endpoint and also manipulating elements from DOM for showing changes visualy. In real project, we can retrive data after every manipulation to show consistent and accurate data.
