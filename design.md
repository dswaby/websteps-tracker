### REST API

| URL               | HTTP Verb   | POST Body                     | Result                                                          |
|------------------ |-----------  |-----------------------------  |---------------------------------------------------------------- |
| /api/picture      | POST        | Image type JPG/JPEG PNG GIF   | Upload image file storing URL and                               |
| /api/pictures     | GET         | empty                         | Return all images and respective creation dates/optional notes  |
| /api/picture/:id  | DELETE      | empty                         | delete image file                                               |