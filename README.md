# pixi-factory

## FEATURE
Data factory parser for make a complex rpg game with pixijs.

- Convert PIXI element or obj into valide Parsed for JSON
- Track and access obj data everywhere
- customised preset for pixijs and plugins without circular error.

# EXAMPLE

```js
Factory.circulars = Factory.CIRCULARS.ALL;
Factory.flatters = Factory.FLATTERS.ALL;
Factory.mappers = Factory.MAPPERS.Points;
```

```js
const container = new PIXI.Container();
const factory = new Factory(container);
```
```js
console.log(factory);
```

<img src="https://images2.imgbox.com/60/d9/PnLqkNE2_o.png" width="120" />

```js
console.log(JSON.stringify(factory,null,"/t"));
```

<img src="https://images2.imgbox.com/fe/64/6DCwPb9y_o.png" width="120" />


 # CUSTOM SETUP
 ### 3 options need to setup with preset, by default it use all preset from static classes.
 Parameter
* <font color='green'>Factory.circulars</font> - Know propreties with circular reference 
* <font color='green'>Factory.flatters</font> - Parent propreties to flatt in factoryPoint
* <font color='green'>Factory.mappers</font>  - Custom mapper for propreties names


## Factory.circulars
 Preset avaible
* <font color='green'>Projection</font> - `['euler','proj','legacy','local']`
* <font color='green'>Observable</font> - `['cb','scope','world',"position","pivot","scale","skew"]`

Set circular with all preset only

```js
Factory.circulars = Factory.CIRCULARS.ALL; // include preset Observable,Projection
```
Set circular with pixi-Projection and some custom

```js
Factory.circulars = [...Factory.CIRCULARS.Projection,"custom1","custom."]; // include only Projection and preset 
```

## Factory.flatters

 Preset avaible
* <font color='green'>Observable</font> - `["position","pivot","scale","skew"]`
* <font color='green'>Display</font> - `["renderable","visible","zOrder","alpha","interactive","tint"]`
* <font color='green'>Projection3d</font> - `["euler","position3d","pivot3d","scale3d","proj"]`

Set flatters with all presets

```js
Factory.circulars = Factory.FLATTERS.ALL;
```
custom flatters with preset

```js
Factory.circulars = [...Factory.FLATTERS.Observable,"zOrder"];
```

## Factory.mappers

 Preset avaible
* <font color='green'>Points</font> - `{_x:'x',_y:'y',_z:'z',_affine:'affine'}`

Set mappers with pixi points

```js
Factory.mappers = Factory.MAPPERS.Points;
```
custom mappers with preset points

```js
Factory.circulars = {_foo:'foo',...Factory.MAPPERS.Points};
```

# TODO:
* add preset - `pixiv5, pixi-display, pixi-heavens, pixi-filters and mode..`
* optimize mode codes
* add hash integrity checker 