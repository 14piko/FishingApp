<a name='assembly'></a>
# FishingApp

## Contents

- [AuthorizationController](#T-FishingApp-Controllers-AuthorizationController 'FishingApp.Controllers.AuthorizationController')
  - [#ctor(context)](#M-FishingApp-Controllers-AuthorizationController-#ctor-FishingApp-Data-FishingAppContext- 'FishingApp.Controllers.AuthorizationController.#ctor(FishingApp.Data.FishingAppContext)')
  - [GenerateToken(loginDTO)](#M-FishingApp-Controllers-AuthorizationController-GenerateToken-FishingApp-Models-DTO-LoginDTO- 'FishingApp.Controllers.AuthorizationController.GenerateToken(FishingApp.Models.DTO.LoginDTO)')
- [Entity](#T-FishingApp-Models-Entity 'FishingApp.Models.Entity')
- [Fish](#T-FishingApp-Models-Fish 'FishingApp.Models.Fish')
- [FishController](#T-FishingApp-Controllers-FishController 'FishingApp.Controllers.FishController')
  - [#ctor()](#M-FishingApp-Controllers-FishController-#ctor-FishingApp-Data-FishingAppContext,AutoMapper-IMapper- 'FishingApp.Controllers.FishController.#ctor(FishingApp.Data.FishingAppContext,AutoMapper.IMapper)')
  - [Delete(id)](#M-FishingApp-Controllers-FishController-Delete-System-Int32- 'FishingApp.Controllers.FishController.Delete(System.Int32)')
  - [Get()](#M-FishingApp-Controllers-FishController-Get 'FishingApp.Controllers.FishController.Get')
  - [GetById(id)](#M-FishingApp-Controllers-FishController-GetById-System-Int32- 'FishingApp.Controllers.FishController.GetById(System.Int32)')
  - [Post(fishDto)](#M-FishingApp-Controllers-FishController-Post-FishingApp-Models-DTO-FishDTOInsertUpdate- 'FishingApp.Controllers.FishController.Post(FishingApp.Models.DTO.FishDTOInsertUpdate)')
  - [Put(id,fishDto)](#M-FishingApp-Controllers-FishController-Put-System-Int32,FishingApp-Models-DTO-FishDTOInsertUpdate- 'FishingApp.Controllers.FishController.Put(System.Int32,FishingApp.Models.DTO.FishDTOInsertUpdate)')
  - [SearchFishPaginator(page,condition)](#M-FishingApp-Controllers-FishController-SearchFishPaginator-System-Int32,System-String- 'FishingApp.Controllers.FishController.SearchFishPaginator(System.Int32,System.String)')
  - [SetImage(id,image)](#M-FishingApp-Controllers-FishController-SetImage-System-Int32,FishingApp-Models-DTO-ImageDTO- 'FishingApp.Controllers.FishController.SetImage(System.Int32,FishingApp.Models.DTO.ImageDTO)')
- [FishDTOInsertUpdate](#T-FishingApp-Models-DTO-FishDTOInsertUpdate 'FishingApp.Models.DTO.FishDTOInsertUpdate')
  - [#ctor()](#M-FishingApp-Models-DTO-FishDTOInsertUpdate-#ctor-System-String,System-Nullable{System-DateTime},System-Nullable{System-DateTime},System-String- 'FishingApp.Models.DTO.FishDTOInsertUpdate.#ctor(System.String,System.Nullable{System.DateTime},System.Nullable{System.DateTime},System.String)')
- [FishDTORead](#T-FishingApp-Models-DTO-FishDTORead 'FishingApp.Models.DTO.FishDTORead')
  - [#ctor()](#M-FishingApp-Models-DTO-FishDTORead-#ctor-System-Int32,System-String,System-Nullable{System-DateTime},System-Nullable{System-DateTime},System-String,System-String- 'FishingApp.Models.DTO.FishDTORead.#ctor(System.Int32,System.String,System.Nullable{System.DateTime},System.Nullable{System.DateTime},System.String,System.String)')
- [Fishing](#T-FishingApp-Models-Fishing 'FishingApp.Models.Fishing')
- [FishingAppContext](#T-FishingApp-Data-FishingAppContext 'FishingApp.Data.FishingAppContext')
  - [Fish](#P-FishingApp-Data-FishingAppContext-Fish 'FishingApp.Data.FishingAppContext.Fish')
  - [Fishing](#P-FishingApp-Data-FishingAppContext-Fishing 'FishingApp.Data.FishingAppContext.Fishing')
  - [River](#P-FishingApp-Data-FishingAppContext-River 'FishingApp.Data.FishingAppContext.River')
  - [User](#P-FishingApp-Data-FishingAppContext-User 'FishingApp.Data.FishingAppContext.User')
  - [OnModelCreating(modelBuilder)](#M-FishingApp-Data-FishingAppContext-OnModelCreating-Microsoft-EntityFrameworkCore-ModelBuilder- 'FishingApp.Data.FishingAppContext.OnModelCreating(Microsoft.EntityFrameworkCore.ModelBuilder)')
- [FishingAppController](#T-FishingApp-Controllers-FishingAppController 'FishingApp.Controllers.FishingAppController')
  - [#ctor(context,mapper)](#M-FishingApp-Controllers-FishingAppController-#ctor-FishingApp-Data-FishingAppContext,AutoMapper-IMapper- 'FishingApp.Controllers.FishingAppController.#ctor(FishingApp.Data.FishingAppContext,AutoMapper.IMapper)')
  - [_context](#F-FishingApp-Controllers-FishingAppController-_context 'FishingApp.Controllers.FishingAppController._context')
  - [_mapper](#F-FishingApp-Controllers-FishingAppController-_mapper 'FishingApp.Controllers.FishingAppController._mapper')
- [FishingAppExtensions](#T-FishingApp-Extensions-FishingAppExtensions 'FishingApp.Extensions.FishingAppExtensions')
  - [AddFishingAppCORS(Services)](#M-FishingApp-Extensions-FishingAppExtensions-AddFishingAppCORS-Microsoft-Extensions-DependencyInjection-IServiceCollection- 'FishingApp.Extensions.FishingAppExtensions.AddFishingAppCORS(Microsoft.Extensions.DependencyInjection.IServiceCollection)')
  - [AddFishingAppSecurity(Services)](#M-FishingApp-Extensions-FishingAppExtensions-AddFishingAppSecurity-Microsoft-Extensions-DependencyInjection-IServiceCollection- 'FishingApp.Extensions.FishingAppExtensions.AddFishingAppSecurity(Microsoft.Extensions.DependencyInjection.IServiceCollection)')
  - [AddFishingAppSwaggerGen(Services)](#M-FishingApp-Extensions-FishingAppExtensions-AddFishingAppSwaggerGen-Microsoft-Extensions-DependencyInjection-IServiceCollection- 'FishingApp.Extensions.FishingAppExtensions.AddFishingAppSwaggerGen(Microsoft.Extensions.DependencyInjection.IServiceCollection)')
- [FishingAppMappingProfile](#T--FishingAppMappingProfile '.FishingAppMappingProfile')
  - [#ctor()](#M-FishingAppMappingProfile-#ctor 'FishingAppMappingProfile.#ctor')
  - [FilePath(e)](#M-FishingAppMappingProfile-FilePath-FishingApp-Models-User- 'FishingAppMappingProfile.FilePath(FishingApp.Models.User)')
  - [FilePathFish(e)](#M-FishingAppMappingProfile-FilePathFish-FishingApp-Models-Fish- 'FishingAppMappingProfile.FilePathFish(FishingApp.Models.Fish)')
- [FishingController](#T-EdunovaAPP-Controllers-FishingController 'EdunovaAPP.Controllers.FishingController')
  - [#ctor()](#M-EdunovaAPP-Controllers-FishingController-#ctor-FishingApp-Data-FishingAppContext,AutoMapper-IMapper- 'EdunovaAPP.Controllers.FishingController.#ctor(FishingApp.Data.FishingAppContext,AutoMapper.IMapper)')
  - [Delete()](#M-EdunovaAPP-Controllers-FishingController-Delete-System-Int32- 'EdunovaAPP.Controllers.FishingController.Delete(System.Int32)')
  - [Get()](#M-EdunovaAPP-Controllers-FishingController-Get 'EdunovaAPP.Controllers.FishingController.Get')
  - [GetById()](#M-EdunovaAPP-Controllers-FishingController-GetById-System-Int32- 'EdunovaAPP.Controllers.FishingController.GetById(System.Int32)')
  - [Post()](#M-EdunovaAPP-Controllers-FishingController-Post-FishingApp-Models-DTO-FishingDTOInsertUpdate- 'EdunovaAPP.Controllers.FishingController.Post(FishingApp.Models.DTO.FishingDTOInsertUpdate)')
  - [Put()](#M-EdunovaAPP-Controllers-FishingController-Put-System-Int32,FishingApp-Models-DTO-FishingDTOInsertUpdate- 'EdunovaAPP.Controllers.FishingController.Put(System.Int32,FishingApp.Models.DTO.FishingDTOInsertUpdate)')
  - [SearchFishingPaginator()](#M-EdunovaAPP-Controllers-FishingController-SearchFishingPaginator-System-Int32,System-String- 'EdunovaAPP.Controllers.FishingController.SearchFishingPaginator(System.Int32,System.String)')
- [FishingDTOInsertUpdate](#T-FishingApp-Models-DTO-FishingDTOInsertUpdate 'FishingApp.Models.DTO.FishingDTOInsertUpdate')
  - [#ctor()](#M-FishingApp-Models-DTO-FishingDTOInsertUpdate-#ctor-System-Nullable{System-DateTime},System-Nullable{System-Int32},System-Nullable{System-Int32},System-Nullable{System-Int32},System-Nullable{System-Int32},System-Nullable{System-Decimal}- 'FishingApp.Models.DTO.FishingDTOInsertUpdate.#ctor(System.Nullable{System.DateTime},System.Nullable{System.Int32},System.Nullable{System.Int32},System.Nullable{System.Int32},System.Nullable{System.Int32},System.Nullable{System.Decimal})')
- [FishingDTORead](#T-FishingApp-Models-DTO-FishingDTORead 'FishingApp.Models.DTO.FishingDTORead')
  - [#ctor()](#M-FishingApp-Models-DTO-FishingDTORead-#ctor-System-Int32,System-Nullable{System-DateTime},System-String,System-String,System-String,System-String,System-Nullable{System-Int32},System-Nullable{System-Decimal}- 'FishingApp.Models.DTO.FishingDTORead.#ctor(System.Int32,System.Nullable{System.DateTime},System.String,System.String,System.String,System.String,System.Nullable{System.Int32},System.Nullable{System.Decimal})')
- [ImageDTO](#T-FishingApp-Models-DTO-ImageDTO 'FishingApp.Models.DTO.ImageDTO')
  - [#ctor()](#M-FishingApp-Models-DTO-ImageDTO-#ctor-System-String- 'FishingApp.Models.DTO.ImageDTO.#ctor(System.String)')
- [LoginDTO](#T-FishingApp-Models-DTO-LoginDTO 'FishingApp.Models.DTO.LoginDTO')
- [OibValidator](#T-FishingApp-Validations-OibValidator 'FishingApp.Validations.OibValidator')
- [River](#T-FishingApp-Models-River 'FishingApp.Models.River')
- [RiverController](#T-FishingApp-Controllers-RiverController 'FishingApp.Controllers.RiverController')
  - [#ctor()](#M-FishingApp-Controllers-RiverController-#ctor-FishingApp-Data-FishingAppContext,AutoMapper-IMapper- 'FishingApp.Controllers.RiverController.#ctor(FishingApp.Data.FishingAppContext,AutoMapper.IMapper)')
  - [Delete()](#M-FishingApp-Controllers-RiverController-Delete-System-Int32- 'FishingApp.Controllers.RiverController.Delete(System.Int32)')
  - [Get()](#M-FishingApp-Controllers-RiverController-Get 'FishingApp.Controllers.RiverController.Get')
  - [GetById()](#M-FishingApp-Controllers-RiverController-GetById-System-Int32- 'FishingApp.Controllers.RiverController.GetById(System.Int32)')
  - [Post()](#M-FishingApp-Controllers-RiverController-Post-FishingApp-Models-DTO-RiverDTOInsertUpdate- 'FishingApp.Controllers.RiverController.Post(FishingApp.Models.DTO.RiverDTOInsertUpdate)')
  - [Put()](#M-FishingApp-Controllers-RiverController-Put-System-Int32,FishingApp-Models-DTO-RiverDTOInsertUpdate- 'FishingApp.Controllers.RiverController.Put(System.Int32,FishingApp.Models.DTO.RiverDTOInsertUpdate)')
  - [SearchRiverPaginator()](#M-FishingApp-Controllers-RiverController-SearchRiverPaginator-System-Int32,System-String- 'FishingApp.Controllers.RiverController.SearchRiverPaginator(System.Int32,System.String)')
- [RiverDTOInsertUpdate](#T-FishingApp-Models-DTO-RiverDTOInsertUpdate 'FishingApp.Models.DTO.RiverDTOInsertUpdate')
  - [#ctor()](#M-FishingApp-Models-DTO-RiverDTOInsertUpdate-#ctor-System-String,System-String- 'FishingApp.Models.DTO.RiverDTOInsertUpdate.#ctor(System.String,System.String)')
- [RiverDTORead](#T-FishingApp-Models-DTO-RiverDTORead 'FishingApp.Models.DTO.RiverDTORead')
  - [#ctor()](#M-FishingApp-Models-DTO-RiverDTORead-#ctor-System-Int32,System-String,System-String- 'FishingApp.Models.DTO.RiverDTORead.#ctor(System.Int32,System.String,System.String)')
- [User](#T-FishingApp-Models-User 'FishingApp.Models.User')
- [UserController](#T-FishingApp-Controllers-UserController 'FishingApp.Controllers.UserController')
  - [#ctor()](#M-FishingApp-Controllers-UserController-#ctor-FishingApp-Data-FishingAppContext,AutoMapper-IMapper- 'FishingApp.Controllers.UserController.#ctor(FishingApp.Data.FishingAppContext,AutoMapper.IMapper)')
  - [Delete()](#M-FishingApp-Controllers-UserController-Delete-System-Int32- 'FishingApp.Controllers.UserController.Delete(System.Int32)')
  - [Get()](#M-FishingApp-Controllers-UserController-Get 'FishingApp.Controllers.UserController.Get')
  - [GetById()](#M-FishingApp-Controllers-UserController-GetById-System-Int32- 'FishingApp.Controllers.UserController.GetById(System.Int32)')
  - [Post()](#M-FishingApp-Controllers-UserController-Post-FishingApp-Models-DTO-UserDTOInsertUpdate- 'FishingApp.Controllers.UserController.Post(FishingApp.Models.DTO.UserDTOInsertUpdate)')
  - [Put()](#M-FishingApp-Controllers-UserController-Put-System-Int32,FishingApp-Models-DTO-UserDTOInsertUpdate- 'FishingApp.Controllers.UserController.Put(System.Int32,FishingApp.Models.DTO.UserDTOInsertUpdate)')
  - [SearchUserPaginator()](#M-FishingApp-Controllers-UserController-SearchUserPaginator-System-Int32,System-String- 'FishingApp.Controllers.UserController.SearchUserPaginator(System.Int32,System.String)')
  - [SetImage()](#M-FishingApp-Controllers-UserController-SetImage-System-Int32,FishingApp-Models-DTO-ImageDTO- 'FishingApp.Controllers.UserController.SetImage(System.Int32,FishingApp.Models.DTO.ImageDTO)')
- [UserDTOInsertUpdate](#T-FishingApp-Models-DTO-UserDTOInsertUpdate 'FishingApp.Models.DTO.UserDTOInsertUpdate')
  - [#ctor()](#M-FishingApp-Models-DTO-UserDTOInsertUpdate-#ctor-System-String,System-String,System-String,System-String,System-String,System-String,System-String- 'FishingApp.Models.DTO.UserDTOInsertUpdate.#ctor(System.String,System.String,System.String,System.String,System.String,System.String,System.String)')
- [UserDTORead](#T-FishingApp-Models-DTO-UserDTORead 'FishingApp.Models.DTO.UserDTORead')
  - [#ctor()](#M-FishingApp-Models-DTO-UserDTORead-#ctor-System-Int32,System-String,System-String,System-String,System-String,System-String,System-String,System-String,System-String- 'FishingApp.Models.DTO.UserDTORead.#ctor(System.Int32,System.String,System.String,System.String,System.String,System.String,System.String,System.String,System.String)')

<a name='T-FishingApp-Controllers-AuthorizationController'></a>
## AuthorizationController `type`

##### Namespace

FishingApp.Controllers

##### Summary

This controller provides authorization functionality.
It allows users to log in and generate JWT tokens based on valid credentials.

<a name='M-FishingApp-Controllers-AuthorizationController-#ctor-FishingApp-Data-FishingAppContext-'></a>
### #ctor(context) `constructor`

##### Summary

Constructor for the AuthorizationController that initializes the database context.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| context | [FishingApp.Data.FishingAppContext](#T-FishingApp-Data-FishingAppContext 'FishingApp.Data.FishingAppContext') | The database context used for accessing user data. |

<a name='M-FishingApp-Controllers-AuthorizationController-GenerateToken-FishingApp-Models-DTO-LoginDTO-'></a>
### GenerateToken(loginDTO) `method`

##### Summary

Generates a JWT token for the user after a successful login.
It checks the user's credentials in the database and creates a JWT token if they are valid.

##### Returns

Returns a JWT token if the credentials are valid; otherwise, returns an error.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| loginDTO | [FishingApp.Models.DTO.LoginDTO](#T-FishingApp-Models-DTO-LoginDTO 'FishingApp.Models.DTO.LoginDTO') | DTO object containing login data (email and password). |

<a name='T-FishingApp-Models-Entity'></a>
## Entity `type`

##### Namespace

FishingApp.Models

##### Summary

Base class for all entities in the FishingApp.
Contains a unique identifier property 'Id' which is auto-generated.
All entities in the application should inherit from this class.

<a name='T-FishingApp-Models-Fish'></a>
## Fish `type`

##### Namespace

FishingApp.Models

##### Summary

Represents a fish entity in the FishingApp.
Inherits from the Entity class and includes properties such as Name, HuntStart, HuntEnd, and Description.

<a name='T-FishingApp-Controllers-FishController'></a>
## FishController `type`

##### Namespace

FishingApp.Controllers

##### Summary

This controller manages CRUD operations for the Fish entity.

<a name='M-FishingApp-Controllers-FishController-#ctor-FishingApp-Data-FishingAppContext,AutoMapper-IMapper-'></a>
### #ctor() `constructor`

##### Summary

This controller manages CRUD operations for the Fish entity.

##### Parameters

This constructor has no parameters.

<a name='M-FishingApp-Controllers-FishController-Delete-System-Int32-'></a>
### Delete(id) `method`

##### Summary

Deletes a fish by its ID.

##### Returns

Returns a success message if deleted; otherwise, returns a not found error.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The ID of the fish to delete. |

<a name='M-FishingApp-Controllers-FishController-Get'></a>
### Get() `method`

##### Summary

Retrieves all fish from the database.

##### Parameters

This method has no parameters.

<a name='M-FishingApp-Controllers-FishController-GetById-System-Int32-'></a>
### GetById(id) `method`

##### Summary

Retrieves a fish by its ID.

##### Returns

Returns the fish if found; otherwise, returns a not found error.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The ID of the fish to retrieve. |

<a name='M-FishingApp-Controllers-FishController-Post-FishingApp-Models-DTO-FishDTOInsertUpdate-'></a>
### Post(fishDto) `method`

##### Summary

Adds a new fish to the database.

##### Returns

Returns a success message and the created fish DTO.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| fishDto | [FishingApp.Models.DTO.FishDTOInsertUpdate](#T-FishingApp-Models-DTO-FishDTOInsertUpdate 'FishingApp.Models.DTO.FishDTOInsertUpdate') | The DTO object containing the fish data to insert. |

<a name='M-FishingApp-Controllers-FishController-Put-System-Int32,FishingApp-Models-DTO-FishDTOInsertUpdate-'></a>
### Put(id,fishDto) `method`

##### Summary

Updates an existing fish by its ID.

##### Returns

Returns a success message if updated; otherwise, returns a not found error.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The ID of the fish to update. |
| fishDto | [FishingApp.Models.DTO.FishDTOInsertUpdate](#T-FishingApp-Models-DTO-FishDTOInsertUpdate 'FishingApp.Models.DTO.FishDTOInsertUpdate') | The DTO object containing the updated fish data. |

<a name='M-FishingApp-Controllers-FishController-SearchFishPaginator-System-Int32,System-String-'></a>
### SearchFishPaginator(page,condition) `method`

##### Summary

Searches for fish with pagination and conditions.

##### Returns

Returns a list of fish matching the search criteria.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| page | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The page number for pagination. |
| condition | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The search condition to filter fish. |

<a name='M-FishingApp-Controllers-FishController-SetImage-System-Int32,FishingApp-Models-DTO-ImageDTO-'></a>
### SetImage(id,image) `method`

##### Summary

Sets an image for a fish by its ID.

##### Returns

Returns a success message if the image is uploaded successfully; otherwise, returns an error.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The ID of the fish to set the image for. |
| image | [FishingApp.Models.DTO.ImageDTO](#T-FishingApp-Models-DTO-ImageDTO 'FishingApp.Models.DTO.ImageDTO') | The DTO object containing the base64 image data. |

<a name='T-FishingApp-Models-DTO-FishDTOInsertUpdate'></a>
## FishDTOInsertUpdate `type`

##### Namespace

FishingApp.Models.DTO

##### Summary

Represents a Data Transfer Object (DTO) for inserting or updating fish data.

<a name='M-FishingApp-Models-DTO-FishDTOInsertUpdate-#ctor-System-String,System-Nullable{System-DateTime},System-Nullable{System-DateTime},System-String-'></a>
### #ctor() `constructor`

##### Summary

Represents a Data Transfer Object (DTO) for inserting or updating fish data.

##### Parameters

This constructor has no parameters.

<a name='T-FishingApp-Models-DTO-FishDTORead'></a>
## FishDTORead `type`

##### Namespace

FishingApp.Models.DTO

##### Summary

Represents a Data Transfer Object (DTO) for reading fish data.
Contains properties for fish attributes including ID, name, hunt timings, description, and an optional image.

<a name='M-FishingApp-Models-DTO-FishDTORead-#ctor-System-Int32,System-String,System-Nullable{System-DateTime},System-Nullable{System-DateTime},System-String,System-String-'></a>
### #ctor() `constructor`

##### Summary

Represents a Data Transfer Object (DTO) for reading fish data.
Contains properties for fish attributes including ID, name, hunt timings, description, and an optional image.

##### Parameters

This constructor has no parameters.

<a name='T-FishingApp-Models-Fishing'></a>
## Fishing `type`

##### Namespace

FishingApp.Models

##### Summary

Represents a fishing event in the FishingApp.
Inherits from the Entity class and includes properties such as Date, User, Fish, River, Quantity, and Weight.

<a name='T-FishingApp-Data-FishingAppContext'></a>
## FishingAppContext `type`

##### Namespace

FishingApp.Data

##### Summary

The [FishingAppContext](#T-FishingApp-Data-FishingAppContext 'FishingApp.Data.FishingAppContext') class is the Entity Framework Core database context for the FishingApp.
It manages the database connections and the entities used within the application.
This context includes DbSet properties for Users, Rivers, Fishes, and Fishings.

<a name='P-FishingApp-Data-FishingAppContext-Fish'></a>
### Fish `property`

##### Summary

Gets or sets the Fishes in the database.

<a name='P-FishingApp-Data-FishingAppContext-Fishing'></a>
### Fishing `property`

##### Summary

Gets or sets the Fishing records in the database.

<a name='P-FishingApp-Data-FishingAppContext-River'></a>
### River `property`

##### Summary

Gets or sets the Rivers in the database.

<a name='P-FishingApp-Data-FishingAppContext-User'></a>
### User `property`

##### Summary

Gets or sets the Users in the database.

<a name='M-FishingApp-Data-FishingAppContext-OnModelCreating-Microsoft-EntityFrameworkCore-ModelBuilder-'></a>
### OnModelCreating(modelBuilder) `method`

##### Summary

Configures the model relationships for the Fishing entity.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| modelBuilder | [Microsoft.EntityFrameworkCore.ModelBuilder](#T-Microsoft-EntityFrameworkCore-ModelBuilder 'Microsoft.EntityFrameworkCore.ModelBuilder') | The model builder used to configure the model. |

<a name='T-FishingApp-Controllers-FishingAppController'></a>
## FishingAppController `type`

##### Namespace

FishingApp.Controllers

##### Summary

An abstract class serving as the base for all controllers in the application. 
It provides common access to the database context and the mapper.

<a name='M-FishingApp-Controllers-FishingAppController-#ctor-FishingApp-Data-FishingAppContext,AutoMapper-IMapper-'></a>
### #ctor(context,mapper) `constructor`

##### Summary

Constructor that initializes the database context and AutoMapper.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| context | [FishingApp.Data.FishingAppContext](#T-FishingApp-Data-FishingAppContext 'FishingApp.Data.FishingAppContext') | The database context for data access. |
| mapper | [AutoMapper.IMapper](#T-AutoMapper-IMapper 'AutoMapper.IMapper') | The mapper for converting between models and DTOs. |

<a name='F-FishingApp-Controllers-FishingAppController-_context'></a>
### _context `constants`

##### Summary

Gets the database context for accessing the application's data.

<a name='F-FishingApp-Controllers-FishingAppController-_mapper'></a>
### _mapper `constants`

##### Summary

Enables mapping between models and DTO objects.

<a name='T-FishingApp-Extensions-FishingAppExtensions'></a>
## FishingAppExtensions `type`

##### Namespace

FishingApp.Extensions

##### Summary

This static class contains extension methods for configuring services in the FishingApp.
It includes methods for setting up Swagger, CORS policies, and JWT-based authentication.

<a name='M-FishingApp-Extensions-FishingAppExtensions-AddFishingAppCORS-Microsoft-Extensions-DependencyInjection-IServiceCollection-'></a>
### AddFishingAppCORS(Services) `method`

##### Summary

Adds CORS policy to allow any origin, method, and header.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| Services | [Microsoft.Extensions.DependencyInjection.IServiceCollection](#T-Microsoft-Extensions-DependencyInjection-IServiceCollection 'Microsoft.Extensions.DependencyInjection.IServiceCollection') | The service collection to add the CORS policy to. |

<a name='M-FishingApp-Extensions-FishingAppExtensions-AddFishingAppSecurity-Microsoft-Extensions-DependencyInjection-IServiceCollection-'></a>
### AddFishingAppSecurity(Services) `method`

##### Summary

Adds JWT-based authentication to the service collection.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| Services | [Microsoft.Extensions.DependencyInjection.IServiceCollection](#T-Microsoft-Extensions-DependencyInjection-IServiceCollection 'Microsoft.Extensions.DependencyInjection.IServiceCollection') | The service collection to add the authentication to. |

<a name='M-FishingApp-Extensions-FishingAppExtensions-AddFishingAppSwaggerGen-Microsoft-Extensions-DependencyInjection-IServiceCollection-'></a>
### AddFishingAppSwaggerGen(Services) `method`

##### Summary

Adds Swagger generation with custom settings for the FishingApp API.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| Services | [Microsoft.Extensions.DependencyInjection.IServiceCollection](#T-Microsoft-Extensions-DependencyInjection-IServiceCollection 'Microsoft.Extensions.DependencyInjection.IServiceCollection') | The service collection to add the Swagger generation to. |

<a name='T--FishingAppMappingProfile'></a>
## FishingAppMappingProfile `type`

##### Namespace



<a name='M-FishingAppMappingProfile-#ctor'></a>
### #ctor() `constructor`

##### Summary

Defines the mapping configuration for the FishingApp domain objects to their respective DTOs.

##### Parameters

This constructor has no parameters.

<a name='M-FishingAppMappingProfile-FilePath-FishingApp-Models-User-'></a>
### FilePath(e) `method`

##### Summary

Retrieves the file path for a user image based on the user's ID.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| e | [FishingApp.Models.User](#T-FishingApp-Models-User 'FishingApp.Models.User') | The user object to get the file path for. |

<a name='M-FishingAppMappingProfile-FilePathFish-FishingApp-Models-Fish-'></a>
### FilePathFish(e) `method`

##### Summary

Retrieves the file path for a fish image based on the fish's ID.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| e | [FishingApp.Models.Fish](#T-FishingApp-Models-Fish 'FishingApp.Models.Fish') | The fish object to get the file path for. |

<a name='T-EdunovaAPP-Controllers-FishingController'></a>
## FishingController `type`

##### Namespace

EdunovaAPP.Controllers

##### Summary

Controller for managing fishing operations such as retrieval, creation, updating, and deletion.
Allows authorized users to access the data.

<a name='M-EdunovaAPP-Controllers-FishingController-#ctor-FishingApp-Data-FishingAppContext,AutoMapper-IMapper-'></a>
### #ctor() `constructor`

##### Summary

Controller for managing fishing operations such as retrieval, creation, updating, and deletion.
Allows authorized users to access the data.

##### Parameters

This constructor has no parameters.

<a name='M-EdunovaAPP-Controllers-FishingController-Delete-System-Int32-'></a>
### Delete() `method`

##### Summary

Deletes a fishing record by ID.

##### Parameters

This method has no parameters.

<a name='M-EdunovaAPP-Controllers-FishingController-Get'></a>
### Get() `method`

##### Summary

Retrieves all fishing records, but returns different results depending on the user role (Admin or User).

##### Parameters

This method has no parameters.

<a name='M-EdunovaAPP-Controllers-FishingController-GetById-System-Int32-'></a>
### GetById() `method`

##### Summary

Retrieves a specific fishing record by ID.

##### Parameters

This method has no parameters.

<a name='M-EdunovaAPP-Controllers-FishingController-Post-FishingApp-Models-DTO-FishingDTOInsertUpdate-'></a>
### Post() `method`

##### Summary

Creates a new fishing record based on the submitted DTO object.

##### Parameters

This method has no parameters.

<a name='M-EdunovaAPP-Controllers-FishingController-Put-System-Int32,FishingApp-Models-DTO-FishingDTOInsertUpdate-'></a>
### Put() `method`

##### Summary

Updates an existing fishing record by ID.

##### Parameters

This method has no parameters.

<a name='M-EdunovaAPP-Controllers-FishingController-SearchFishingPaginator-System-Int32,System-String-'></a>
### SearchFishingPaginator() `method`

##### Summary

Searches for fishing records using pagination, filtered by condition.

##### Parameters

This method has no parameters.

<a name='T-FishingApp-Models-DTO-FishingDTOInsertUpdate'></a>
## FishingDTOInsertUpdate `type`

##### Namespace

FishingApp.Models.DTO

##### Summary

Represents a Data Transfer Object (DTO) for inserting or updating fishing records.
Contains properties for the fishing date, user ID, fish ID, river ID, quantity, and weight.
Validation attributes are applied to ensure required fields and constraints on quantity.

<a name='M-FishingApp-Models-DTO-FishingDTOInsertUpdate-#ctor-System-Nullable{System-DateTime},System-Nullable{System-Int32},System-Nullable{System-Int32},System-Nullable{System-Int32},System-Nullable{System-Int32},System-Nullable{System-Decimal}-'></a>
### #ctor() `constructor`

##### Summary

Represents a Data Transfer Object (DTO) for inserting or updating fishing records.
Contains properties for the fishing date, user ID, fish ID, river ID, quantity, and weight.
Validation attributes are applied to ensure required fields and constraints on quantity.

##### Parameters

This constructor has no parameters.

<a name='T-FishingApp-Models-DTO-FishingDTORead'></a>
## FishingDTORead `type`

##### Namespace

FishingApp.Models.DTO

##### Summary

Represents a Data Transfer Object (DTO) for reading fishing records.
Contains properties for the fishing record ID, date, user details (first and last name),
fish name, river name, quantity, and weight.

<a name='M-FishingApp-Models-DTO-FishingDTORead-#ctor-System-Int32,System-Nullable{System-DateTime},System-String,System-String,System-String,System-String,System-Nullable{System-Int32},System-Nullable{System-Decimal}-'></a>
### #ctor() `constructor`

##### Summary

Represents a Data Transfer Object (DTO) for reading fishing records.
Contains properties for the fishing record ID, date, user details (first and last name),
fish name, river name, quantity, and weight.

##### Parameters

This constructor has no parameters.

<a name='T-FishingApp-Models-DTO-ImageDTO'></a>
## ImageDTO `type`

##### Namespace

FishingApp.Models.DTO

##### Summary

Represents a Data Transfer Object (DTO) for image data.
Contains a required property for a Base64 encoded image string.

<a name='M-FishingApp-Models-DTO-ImageDTO-#ctor-System-String-'></a>
### #ctor() `constructor`

##### Summary

Represents a Data Transfer Object (DTO) for image data.
Contains a required property for a Base64 encoded image string.

##### Parameters

This constructor has no parameters.

<a name='T-FishingApp-Models-DTO-LoginDTO'></a>
## LoginDTO `type`

##### Namespace

FishingApp.Models.DTO

##### Summary

Represents a Data Transfer Object (DTO) for user login credentials.
Contains properties for the user's email and password.

<a name='T-FishingApp-Validations-OibValidator'></a>
## OibValidator `type`

##### Namespace

FishingApp.Validations

##### Summary

Custom validation attribute for validating Croatian OIB (Personal Identification Number).
It checks if the OIB is in the correct format (11 digits) and performs a checksum validation.

<a name='T-FishingApp-Models-River'></a>
## River `type`

##### Namespace

FishingApp.Models

##### Summary

Represents a river in the FishingApp.
Inherits from the Entity class and includes properties such as Name and Length.

<a name='T-FishingApp-Controllers-RiverController'></a>
## RiverController `type`

##### Namespace

FishingApp.Controllers

##### Summary

Controller for managing river operations such as retrieval, creation, updating, and deletion.

<a name='M-FishingApp-Controllers-RiverController-#ctor-FishingApp-Data-FishingAppContext,AutoMapper-IMapper-'></a>
### #ctor() `constructor`

##### Summary

Controller for managing river operations such as retrieval, creation, updating, and deletion.

##### Parameters

This constructor has no parameters.

<a name='M-FishingApp-Controllers-RiverController-Delete-System-Int32-'></a>
### Delete() `method`

##### Summary

Deletes a river by ID.

##### Parameters

This method has no parameters.

<a name='M-FishingApp-Controllers-RiverController-Get'></a>
### Get() `method`

##### Summary

Retrieves all rivers.

##### Parameters

This method has no parameters.

<a name='M-FishingApp-Controllers-RiverController-GetById-System-Int32-'></a>
### GetById() `method`

##### Summary

Retrieves a specific river by ID.

##### Parameters

This method has no parameters.

<a name='M-FishingApp-Controllers-RiverController-Post-FishingApp-Models-DTO-RiverDTOInsertUpdate-'></a>
### Post() `method`

##### Summary

Creates a new river based on the submitted DTO object.

##### Parameters

This method has no parameters.

<a name='M-FishingApp-Controllers-RiverController-Put-System-Int32,FishingApp-Models-DTO-RiverDTOInsertUpdate-'></a>
### Put() `method`

##### Summary

Updates an existing river by ID.

##### Parameters

This method has no parameters.

<a name='M-FishingApp-Controllers-RiverController-SearchRiverPaginator-System-Int32,System-String-'></a>
### SearchRiverPaginator() `method`

##### Summary

Searches for rivers using pagination, filtered by condition.

##### Parameters

This method has no parameters.

<a name='T-FishingApp-Models-DTO-RiverDTOInsertUpdate'></a>
## RiverDTOInsertUpdate `type`

##### Namespace

FishingApp.Models.DTO

##### Summary

Represents a Data Transfer Object (DTO) for inserting or updating river information.
Contains properties for the river's name and length.

<a name='M-FishingApp-Models-DTO-RiverDTOInsertUpdate-#ctor-System-String,System-String-'></a>
### #ctor() `constructor`

##### Summary

Represents a Data Transfer Object (DTO) for inserting or updating river information.
Contains properties for the river's name and length.

##### Parameters

This constructor has no parameters.

<a name='T-FishingApp-Models-DTO-RiverDTORead'></a>
## RiverDTORead `type`

##### Namespace

FishingApp.Models.DTO

##### Summary

Represents a Data Transfer Object (DTO) for reading river information.
Contains properties for the river's identifier, name, and length.

<a name='M-FishingApp-Models-DTO-RiverDTORead-#ctor-System-Int32,System-String,System-String-'></a>
### #ctor() `constructor`

##### Summary

Represents a Data Transfer Object (DTO) for reading river information.
Contains properties for the river's identifier, name, and length.

##### Parameters

This constructor has no parameters.

<a name='T-FishingApp-Models-User'></a>
## User `type`

##### Namespace

FishingApp.Models

##### Summary

Represents a user in the FishingApp.
Inherits from the Entity class and includes properties such as Email, Password, First Name, Last Name, Role, OIB, and License Number.

<a name='T-FishingApp-Controllers-UserController'></a>
## UserController `type`

##### Namespace

FishingApp.Controllers

##### Summary

Controller for managing users with operations such as retrieving, creating, updating, and deleting users.

<a name='M-FishingApp-Controllers-UserController-#ctor-FishingApp-Data-FishingAppContext,AutoMapper-IMapper-'></a>
### #ctor() `constructor`

##### Summary

Controller for managing users with operations such as retrieving, creating, updating, and deleting users.

##### Parameters

This constructor has no parameters.

<a name='M-FishingApp-Controllers-UserController-Delete-System-Int32-'></a>
### Delete() `method`

##### Summary

Deletes a user by ID.

##### Parameters

This method has no parameters.

<a name='M-FishingApp-Controllers-UserController-Get'></a>
### Get() `method`

##### Summary

Retrieves all users.

##### Parameters

This method has no parameters.

<a name='M-FishingApp-Controllers-UserController-GetById-System-Int32-'></a>
### GetById() `method`

##### Summary

Retrieves a user by ID.

##### Parameters

This method has no parameters.

<a name='M-FishingApp-Controllers-UserController-Post-FishingApp-Models-DTO-UserDTOInsertUpdate-'></a>
### Post() `method`

##### Summary

Creates a new user based on the submitted DTO object.

##### Parameters

This method has no parameters.

<a name='M-FishingApp-Controllers-UserController-Put-System-Int32,FishingApp-Models-DTO-UserDTOInsertUpdate-'></a>
### Put() `method`

##### Summary

Updates an existing user by ID.

##### Parameters

This method has no parameters.

<a name='M-FishingApp-Controllers-UserController-SearchUserPaginator-System-Int32,System-String-'></a>
### SearchUserPaginator() `method`

##### Summary

Searches for users using pagination, filtered by condition.

##### Parameters

This method has no parameters.

<a name='M-FishingApp-Controllers-UserController-SetImage-System-Int32,FishingApp-Models-DTO-ImageDTO-'></a>
### SetImage() `method`

##### Summary

Sets the user's image by ID.

##### Parameters

This method has no parameters.

<a name='T-FishingApp-Models-DTO-UserDTOInsertUpdate'></a>
## UserDTOInsertUpdate `type`

##### Namespace

FishingApp.Models.DTO

##### Summary

Represents a Data Transfer Object (DTO) for inserting or updating user information.
Contains properties for the user's first name, last name, email, password, OIB, license number, and role.
Validation attributes ensure required fields are filled and OIB is valid.

<a name='M-FishingApp-Models-DTO-UserDTOInsertUpdate-#ctor-System-String,System-String,System-String,System-String,System-String,System-String,System-String-'></a>
### #ctor() `constructor`

##### Summary

Represents a Data Transfer Object (DTO) for inserting or updating user information.
Contains properties for the user's first name, last name, email, password, OIB, license number, and role.
Validation attributes ensure required fields are filled and OIB is valid.

##### Parameters

This constructor has no parameters.

<a name='T-FishingApp-Models-DTO-UserDTORead'></a>
## UserDTORead `type`

##### Namespace

FishingApp.Models.DTO

##### Summary

Represents a Data Transfer Object (DTO) for reading user information.
Contains properties for the user's ID, first name, last name, email, password, OIB,
license number, role, and an optional image.

<a name='M-FishingApp-Models-DTO-UserDTORead-#ctor-System-Int32,System-String,System-String,System-String,System-String,System-String,System-String,System-String,System-String-'></a>
### #ctor() `constructor`

##### Summary

Represents a Data Transfer Object (DTO) for reading user information.
Contains properties for the user's ID, first name, last name, email, password, OIB,
license number, role, and an optional image.

##### Parameters

This constructor has no parameters.
