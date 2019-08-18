# <a name="TOC">Table Of Contents</a>
1. [Data Structures](#data-structures)
2. [Show Arguments](#show-arguments)
3. [Show Argument From Id](#show-argument-from-id)
4. [Show Argument Tree From Id](#show-argument-tree-from-id)

***
# <a name="data-structures">Data Structures</a> <sup><small>[top](#TOC)</small></sup>

## Argument - Complete
```
{
   id=[int] // The id of the argument
   conclusion=[Statement] // The conclusion statement of the argument
   premises=[array of [Statement]] // An array of the premise statements of the Argument
   reasoning_method=[REASONING_METHOD] // The reasoning method that this argument uses
}
```
### Reasoning Method

"REASONING_METHOD" is a string of one of the following values:

* Abduction
* Deduction
* Induction

## Argument - Tree

### <a name="argument-tree-node">Argument - Tree Node</a>
```javascript
{
  argument_id=[int] // The id of the argument
  premises=[array of [Statement Tree Node]] // An array of the the premises of the Argument
  reasoning_method=[REASONING_METHOD] // The reasoning method that this argument uses
}
```


***
# <a name="show-arguments">Show Arguments</a> <sup><small>[top](#TOC)</small></sup>

## URL

> /argument

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
   arguments : [array of [Argument - Complete]]
}
```

## Error Response

* **Code**: 404
* **Content**: 

``` 
{
   error : "No Arguments found."
}
```
*_Note_*: this error occurs when there are no ids after the specified ```after_id```.

## Sample Call
```javascript
$.ajax({
  url: "/argument?limit=50&after_id=30", 
  dataType: "json", 
  type : "GET", 
  success : function(r) { console.log(r); }
});
```


***
# <a name="show-argument-from-id">Show Argument From Id</a> <sup><small>[top](#TOC)</small></sup>

## URL

> /argument/id

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
[Argument - Complete]
```

## Error Response

* **Code**: 404
* **Content**: 

``` 
{
   error : "No Argument found."
}
```

## Sample Call
```javascript
$.ajax({
  url: "/argument/15", 
  dataType: "json", 
  type : "GET", 
  success : function(r) { console.log(r); }
});
```









***
# <a name="show-argument-tree-from-id">Show Argument Tree From Id</a> <sup><small>[top](#TOC)</small></sup>

## URL

> /argument/id/tree

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
[Argument - Tree Node]
```

## Error Response

* **Code**: 404
* **Content**: 

```javascript
{
   error : "No Argument found."
}
```

## Sample Call
```javascript
$.ajax({
  url: "/argument/15/tree?max_depth=50", 
  dataType: "json", 
  type : "GET", 
  success : function(r) { console.log(r); }
});
```
