# <a name="TOC">Table Of Contents</a>
1. [Data Structures](#data-structures)
2. Create
 1. [Create Statement](#create-statement)
3. Read
 1. [Show Statements](#show-statements)
 2. [Show Statement From Id](#show-statement-from-id)
 3. [Show Statement Tree From Id](#show-statement-tree-from-id)
4. Update
5. Delete

***
# <a name="data-structures">Data Structures</a> <sup><small>[top](#TOC)</small></sup>

## Statement - Complete
```
{
   id=[int] // The id of the statement
   text=[string] // The text of the statement
   supportingArguments=[array of [Argument]] // The arguments for which this statement is a conclusion
   supportedArguments=[array of [Argument]] // The arguments for which this statement is a premise
}
```

## Statement - Tree

### <a name="statement-tree-node">Statement - Tree Node</a>
```javascript
{
  statement_id=[int] // The id of the statement
  text=[string] // The text of the statement
  supportingArguments=[array of [Argument - Tree Node]
}
```
***
# Create
## <u><a name="create-statement">Create Statement</a></u> <sup><small>[top](#TOC)</small></sup>

### URL

> /statement

### Method
> POST

### URL Params
* Required: NONE
* Optional: NONE

### Data Params
```
{
 text: [string]
}
```

### Success Response

* **Code**: 200
* **Content**: 

``` 
{
   statement : [Statement - Complete]
}
```

### Error Response

* **Code**: 400
* **Content**: 

``` 
{
   error : "Unable to create statement."
}
```

### Sample Call
```javascript
$.ajax({
  url: "/statement", 
  dataType: "json", 
  data: {text: "This is a statement"}, 
  type : "POST", 
  success : function(r) { console.log(r); }
});
```


***
# Read
## <u><a name="show-statements">Show Statements</a></u> <sup><small>[top](#TOC)</small></sup>

### URL

> /statement

### Method
> GET

### URL Params
* Required: NONE
* Optional:
 * limit=[int] // default of 100
 * after_id=[int] // default of 0

### Data Params
> NONE

### Success Response

* **Code**: 200
* **Content**: 

``` 
{
   statements : [array of [Statement - Complete]]
}
```

### Error Response

* **Code**: 404
* **Content**: 

``` 
{
   error : "No Statements found."
}
```
*_Note_*: this error occurs when there are no ids after the specified ```after_id```.

### Sample Call
```javascript
$.ajax({
  url: "/statement?limit=50&after_id=30", 
  dataType: "json", 
  type : "GET", 
  success : function(r) { console.log(r); }
});
```



## <u><a name="show-statement-from-id">Show Statement From Id</a></u> <sup><small>[top](#TOC)</small></sup>

### URL

> /statement/id

### Method
> GET

### URL Params
* Required: id=[int]
* Optional: NONE

### Data Params
> NONE

### Success Response

* **Code**: 200
* **Content**: 

``` 
[Statement - Complete]
```

### Error Response

* **Code**: 404
* **Content**: 

``` 
{
   error : "No Statement found."
}
```

### Sample Call
```javascript
$.ajax({
  url: "/statement/15", 
  dataType: "json", 
  type : "GET", 
  success : function(r) { console.log(r); }
});
```

## <u><a name="show-statement-tree-from-id">Show Statement Tree From Id</a></u> <sup><small>[top](#TOC)</small></sup>

### URL

> /statement/id/tree

### Method
> GET

### URL Params
* Required: id=[int]
* Optional:
 * max_depth=[int] // default of 100

### Data Params
> NONE

### Success Response

* **Code**: 200
* **Content**: 

``` 
[Statement - Tree Node]
```

### Error Response

* **Code**: 404
* **Content**: 

```javascript
{
   error : "No Statements found."
}
```

### Sample Call
```javascript
$.ajax({
  url: "/statement/15/tree?max_depth=50", 
  dataType: "json", 
  type : "GET", 
  success : function(r) { console.log(r); }
});
```
