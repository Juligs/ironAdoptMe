
User.routes 

| HTTP Method | URI path         | Description            | JSON |
|-------------|------------------|------------------------|------|
| GET         | /                | Index page             |      |
| GET         | user/create      | User form render       |      |
| POST        | user/create      | User form handler      |      |
| GET         | /user/:id/edit   | User edit form render  |      |
| POST        | /user/:id/edit   | User edit form handler |      |
| POST        | /user/:id/delete | User delete            |      |




Api.routes

| HTTP Method | URI path               |         Description                    | JSON |
|-------------|----------------------- |----------------------------------------|------|
| GET         | `/api/pets `           | List pets of a shelter                 |    ✅  |       
| GET         | `/api/users`           | List users base on result from filters |  ✅    |
| GET         | `/api/comments`        | List comments of shelters              |  ✅    |
| POST        | `/api/events`          | List events created by shelters        | ✅     |

Pets.routes 

| HTTP Method | URI path               |         Description                 | JSON |
|-------------|----------------------- |------------------------------------ | ----------     |
| GET         | `/ `                   | Index page                          |      |       
| GET         | `/pets/:id/edit`       | Pets edit form render               |      |
| POST        | `/pets/:id/edit`       | Pets edit form handler              |      |
| GET         | `/pets/create`         | Pets form render                    |      |
| POST        | `/pets/create`         | Pets form handler                   |      |
| POST        | `/pets/:id/delete`     | Pets delete                         |      |

Comments.routes
| HTTP Method | URI path               |         Description                         | JSON |
|-------------|----------------------- |-------------------------------------------- |  ------    |
| POST        | `/comments/create`     | Route to create comments on shelter profiles|      |
| POST        | `/comments/:id/delete` | comments delete                             |      |

Events.routes 
 HTTP Method | URI path               |         Description                       | JSON |
|-------------|-----------------------|------------------------------------------ | ---------     |
| POST        | `/events/create`      | Route to create events on shelter profiles|      |
| POST        | `/events/:id/delete`  | events delete                             |      |



