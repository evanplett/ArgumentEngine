# <a name="TOC">Table Of Contents</a>
1. [Data Structures](#data-structures)
2. [Show Statements](#show-statements)
3. [Show Statement From Id](#show-statement-from-id)
4. [Show Statement Tree From Id](#show-statement-tree-from-id)

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
# <a name="show-statements">Show Statements</a> <sup><small>[top](#TOC)</small></sup>

## URL

> /statement

## Method
> GET

## URL Params
* Required: NONE
* Optional:
 * limit=[int] // default of 100
 * after_id=[int] // default of 0

## Data Params
> NONE

## Success Response

* **Code**: 200
* **Content**: 

``` 
{
   statements : [array of [Statement - Complete]]
}
```

## Error Response

* **Code**: 404
* **Content**: 

``` 
{
   error : "No Statements found."
}
```
*_Note_*: this error occurs when there are no ids after the specified ```after_id```.

## Sample Call
```javascript
$.ajax({
  url: "/statement?limit=50&after_id=30", 
  dataType: "json", 
  type : "GET", 
  success : function(r) { console.log(r); }
});
```


***
# <a name="show-statement-from-id">Show Statement From Id</a> <sup><small>[top](#TOC)</small></sup>

## URL

> /statement/id

## Method
> GET

## URL Params
* Required: id=[int]
* Optional: NONE

## Data Params
> NONE

## Success Response

* **Code**: 200
* **Content**: 

``` 
[Statement - Complete]
```

## Error Response

* **Code**: 404
* **Content**: 

``` 
{
   error : "No Statement found."
}
```

## Sample Call
```javascript
$.ajax({
  url: "/statement/15", 
  dataType: "json", 
  type : "GET", 
  success : function(r) { console.log(r); }
});
```









***
# <a name="show-statement-tree-from-id">Show Statement Tree From Id</a> <sup><small>[top](#TOC)</small></sup>

## URL

> /statement/id/tree

## Method
> GET

## URL Params
* Required: id=[int]
* Optional:
 * max_depth=[int] // default of 100

## Data Params
> NONE

## Success Response

* **Code**: 200
* **Content**: 

``` 
[Statement - Tree Node]
```

## Error Response

* **Code**: 404
* **Content**: 

```javascript
{
   error : "No Statements found."
}
```

## Sample Call
```javascript
$.ajax({
  url: "/statement/15/tree?max_depth=50", 
  dataType: "json", 
  type : "GET", 
  success : function(r) { console.log(r); }
});
```
