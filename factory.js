/**@class FactoryPoint */
class FactoryPoint {
    constructor(prop,valide) {
        if(valide){
            for (const key in prop) { this[key] = prop[key] };
        }else{
            Object.keys(prop).filter((p)=>this._circulars.indexOf(p)<0)
            .forEach(p=>{
                const point = prop[p];
                p = this._mappers[p] || p;
                this[p] = point;
            });
        };
    };
    
    to(point){
        Object.keys(this).forEach(key=>{ point[key] = this[key] });
        if(point.cb){
            point.cb.call(point.scope);
        };
    };
};

/**@class Factory data manager for objets */
class Factory {
    /** Know proprety with circular reference or proprety to remove in FactoryPoint */
    static FromJson = {
        Projection:['euler','proj','legacy','local'],
        Observable:['cb','scope','world',"position","pivot","scale","skew"],
        get ALL() {
            return [].concat(...Object.keys(this).slice(0,length-1).map(k=>this[k]));
        }
    };
    
    /** Know proprety with circular reference or proprety to remove in FactoryPoint preset */
    static CIRCULARS = {
        Projection:['euler','proj','legacy','local'],
        Observable:['cb','scope','world',"position","pivot","scale","skew"],
        get ALL() {
            return [].concat(...Object.keys(this).slice(0,length-1).map(k=>this[k]));
        }
    };
    /** Parent proprety of objet to includes in FactoryPoint */
    static FLATTERS = {
        Observable:["position","pivot","scale","skew"],
        Display:["renderable","visible","zOrder","alpha","interactive","tint"],
        Projection3d:["euler","position3d","pivot3d","scale3d","proj"],
        Filters:[],
        get ALL() {
            return [].concat(...Object.keys(this).slice(0,length-1).map(k=>this[k]));
        }
    };
    /** Custom mapper for propreties names */
    static MAPPERS = {
        Points:{_x:'x',_y:'y',_z:'z',_affine:'affine'},
    };
    /** set circular options */
    static set circulars(circulars) {
        Object.defineProperty(this.prototype, '_circulars', {
            value:circulars,
            configurable:true,
        });
        FactoryPoint.prototype._circulars = this.prototype._circulars;
    };
    /** set flatters options */
    static set flatters(flatters) {
        Object.defineProperty(this.prototype, '_flatters', {
            value:flatters,
            configurable:true,
        });
        FactoryPoint.prototype._flatters = this.prototype._flatters;
    };
    /** set mappers options */
    static set mappers(mappers) {
        Object.defineProperty(this.prototype, '_mappers', {
            value:mappers,
            configurable:true,
        });
        FactoryPoint.prototype._mappers = this.prototype._mappers;
    };
    constructor(obj,valide) {
        valide && this.initializeFromParse(obj) || this.initialize(obj);
    };

    /** initialize from a non secure obj */
    initialize(obj){
        for (let i=0, l=this._flatters.length; i<l; i++) {
            const key = this._flatters[i];
            const prop = obj[key];
            if(prop !==undefined ){
                this[key] = prop instanceof Object ? new FactoryPoint(prop) : prop;
            };
        };
    };

    /** initialize from a secure parsed factory obj */
    initializeFromParse(obj){
        for (const key in obj) {
            this[key] = obj[key] instanceof Object ? new FactoryPoint(obj[key],true) : obj[key];
        }
    };

    /** past factory data to a obj */
    to(obj){
        Object.keys(this).forEach(key=>{
            if(this[key] instanceof FactoryPoint){
                this[key].to(obj[key]);
            }else{
                obj[key] = this[key];
            };
        })
    };
};

Factory.circulars = Factory.CIRCULARS.ALL;
Factory.flatters = Factory.FLATTERS.ALL;
Factory.mappers = Factory.MAPPERS.Points;





